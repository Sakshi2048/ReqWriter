import React from "react";

function Info() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <form className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="grid-first-name">
              Project Name
            </label>
            <input className="appearance-none block w-full bg-gray-700 text-white border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600" id="grid-first-name" type="text" placeholder="e.g. Fraud detection" />
           
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="grid-last-name">
              Lead ID
            </label>
            <input className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600" id="grid-last-name" type="text" placeholder="e.g. 642135243" />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="grid-state">
              Project Type
            </label>
            <div className="relative">
              <select className="block appearance-none w-full bg-gray-700 text-white border border-gray-600 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-600" id="grid-state">
                <option>Software</option>
                <option>Buiseness</option>
               
              </select>
            </div>
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="grid-state">
              Template
            </label>
            <div className="relative">
              <select className="block appearance-none w-full bg-gray-700 text-white border border-gray-600 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-600" id="grid-state">
                <option>Scrum</option>
                <option>Kanban</option>
               
              </select>
            </div>
          </div>

          
        </div>
      
        <button className="mt-5 w-24 mx-auto flex items-center justify-center py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
              <span className="">Submit</span>
            </button>

      </form>
    </div>
  );
}

export default Info;