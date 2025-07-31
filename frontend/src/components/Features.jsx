import { FaJira, FaAws } from "react-icons/fa";
import { SiConfluence } from "react-icons/si";
import { GiArtificialIntelligence } from "react-icons/gi";

const features = [
  {
    icon: <GiArtificialIntelligence className="text-blue-500 text-4xl" />, 
    title: "Automated Writing",
    description: "Generate structured requirements automatically using advanced Large Language Model AI."
  },
  {
    icon: <FaJira className="text-blue-500 text-4xl" />, 
    title: "Jira Integration",
    description: "Seamlessly integrate with Jira to manage and track requirements within your workflow."
  },
  {
    icon: <SiConfluence className="text-blue-500 text-4xl" />, 
    title: "Confluence Integration",
    description: "Connect with Confluence to easily document and share your project requirements."
  },
  {
    icon: <FaAws className="text-yellow-500 text-4xl" />, 
    title: "Scalable Hybrid Cloud Storage",
    description: "Leverage the scalability and reliability of AWS cloud storage to handle growing project needs."
  }
];

export default function Features() {
  return (
    <section className="bg-black to-black text-white py-16 px-24">
      
      <div className="max-w-6xl mx-auto text-start">
        <h2 className="text-4xl font-bold ">Key Features of <br /> Our <span className="text-blue-400 ">AI-Powered  Requirements Writing </span>Platform </h2>
        <p className="text-gray-400 mt-4">
          Discover the powerful capabilities designed to streamline your requirement engineering process, <br />from automated writing to seamless integrations.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-start text-left w-full h-full transition-transform transform hover:scale-105 hover:bg-gray-700 hover:shadow-xl"
          >
            <div className="mb-4 text-5xl">{feature.icon}</div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-400 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
