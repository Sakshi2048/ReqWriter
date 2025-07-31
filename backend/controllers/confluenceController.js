import axios from "axios";

const confluenceAPI = `https://${process.env.BASE_URL}`;

const apiToken = process.env.API_TOKEN;

const email = process.env.JIRA_EMAIL;

const authHeaders = {
  headers: {
    Authorization: `Basic ${Buffer.from(`${email}:${apiToken}`).toString(
      "base64"
    )}`,
    "Content-Type": "application/json",
  },
};

export const getSpaceByName = async (req, res) => {
  const { name } = req.params;

  let allSpaces = [];

  try {
    while (true) {
      const response = await axios.get(
        `${confluenceAPI}/wiki/api/v2/spaces`,
        authHeaders
      );
      console.log("Hello");
      console.log(response.data);
      const { results } = response.data;

      if (results.length === 0) break;

      allSpaces.push(...results);
    }

    const space = allSpaces.find((space) => space.name === name);

    if (space) {
      console.log("Found space:", space);
      return res.status(200).json(space);
    } else {
      console.log("Space not found.");
      return res.status(404).json({ message: "Space not found" });
    }
  } catch (error) {
    console.error(
      "🚨 Axios error response:",
      error.response?.data || error.message
    );
    return res.status(500).json({ error: "Failed to check Confluence space" });
  }
};

export const createSpace = async (req, res) => {
  const { name, key } = req.body;

  try {
    const response = await axios.post(
      `${confluenceAPI}/wiki/rest/api/space`,
      {
        name,
        key,
      },
      {
        headers: authHeaders,
      }
    );

    res.status(201).json({ id: response.data.id });
  } catch (err) {
    console.error("Error creating space:", err.message);
    res.status(500).json({ error: "Failed to create Confluence space" });
  }
};

// export const createPage = async (req, res) => {
//   const { name, title, content } = req.body;

//   try {
//     // Step 1: Get all existing spaces (paginated)

//     let allSpaces = [];

//     const response = await axios.get(
//       `${confluenceAPI}/wiki/api/v2/spaces`,
//       authHeaders
//     );

//     const { results } = response.data;

//     allSpaces.push(...results);
// ;
//     // Step 2: Check if the space already exists
//     let space = allSpaces.find((s) => s.name === name);
//     // Step 3: Create the space if it doesn't exist
//     if (!space) {
//       const key =
//         name.substring(0, 10).toUpperCase().replace(/\s/g, "") || "SPACE";

//       const createRes = await axios.post(
//         `${confluenceAPI}/wiki/rest/api/space`,
//         {
//           key,
//           name: name,
//         },
//         authHeaders
//       );

//       space = createRes.data;
//     }

//     // Step 4: Create the page inside the space  - perfectly working - tested via postman
//     const pageRes = await axios.post(
//       `${confluenceAPI}/wiki/api/v2/pages`,
//       {
//         spaceId: space.id,
//         status: "current",
//         title,
//         body: {
//           representation: "storage",
//           value: `<p>${content}</p>`,
//         },
//       },
//       authHeaders
//     );

//     return res.status(201).json({
//       message: "Page created successfully",
//       pageId: pageRes.data.id,
//       spaceId: space.id,
//     });
//   } catch (err) {
//     console.error("❌ Confluence Error:", err.response?.data || err.message);
//     return res.status(500).json({ error: "Failed to create Confluence page" });
//   }
// };

export const createPage = async (req, res) => {
  const { name, title, content } = req.body;

  try {
    // Step 1: Get all existing spaces (paginated)
    let allSpaces = [];

    const response = await axios.get(
      `${confluenceAPI}/wiki/api/v2/spaces`,
      authHeaders
    );

    const { results } = response.data;
    allSpaces.push(...results);

    // Step 2: Check if the space already exists
    let space = allSpaces.find((s) => s.name === name);

    // Step 3: Create the space if it doesn't exist
    if (!space) {
      const key =
        name.substring(0, 10).toUpperCase().replace(/\s/g, "") || "SPACE";

      const createRes = await axios.post(
        `${confluenceAPI}/wiki/rest/api/space`,
        {
          key,
          name: name,
        },
        authHeaders
      );

      space = createRes.data;
    }

    // Step 4: Check if the page already exists in the space
    const existingPagesRes = await axios.get(
      `${confluenceAPI}/wiki/rest/api/content`,
      {
        ...authHeaders,
        params: {
          title,
          spaceKey: space.key,
          expand: "version",
        },
      }
    );

    const existingPage = existingPagesRes.data.results[0];

    if (existingPage) {
      // Step 5: Update the existing page (increment version)
      const updatedVersion = existingPage.version.number + 1;

      const updateRes = await axios.put(
        `${confluenceAPI}/wiki/rest/api/content/${existingPage.id}`,
        {
          id: existingPage.id,
          type: "page",
          title,
          space: { key: space.key },
          body: {
            storage: {
              value: `<p>${content}</p>`,
              representation: "storage",
            },
          },
          version: {
            number: updatedVersion,
          },
        },
        authHeaders
      );

      return res.status(200).json({
        message: "Page updated with a new version",
        pageId: updateRes.data.id,
        version: updatedVersion,
        spaceId: space.id,
      });
    } else {
      // Step 6: Create a new page
      const pageRes = await axios.post(
        `${confluenceAPI}/wiki/api/v2/pages`,
        {
          spaceId: space.id,
          status: "current",
          title,
          body: {
            representation: "storage",
            value: `<p>${content}</p>`,
          },
        },
        authHeaders
      );

      return res.status(201).json({
        message: "Page created successfully",
        pageId: pageRes.data.id,
        version: 1,
        spaceId: space.id,
      });
    }
  } catch (err) {
    console.error("❌ Confluence Error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to create or update page" });
  }
};
