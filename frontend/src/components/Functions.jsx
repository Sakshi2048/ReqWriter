import { FaCheck } from "react-icons/fa";
import { BsChatSquareText, BsShieldLock } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";

export default function Functions() {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center ">
      <div className="px-20 w-full flex flex-col md:flex-row ">
        {/* Left Section - Text */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold">Comprehensive <span className="text-blue-500">Requirement Generation</span> with AI</h1>
          
          <div className="space-y-4 pt-4">
            <div className="flex items-center space-x-3">
              <BsChatSquareText className="text-blue-400 text-2xl" />
              <div>
                <h2 className="text-xl font-semibold text-blue-400">Functional Requirements</h2>
                <p className="text-gray-400 text-md">Clearly defined actions and processes the system must perform.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <BsShieldLock className="text-green-400 text-2xl" />
              <div>
                <h2 className="text-xl font-semibold text-green-400">Non Functional Requirements</h2>
                <p className="text-gray-400 text-md">Essential qualities like performance, security, and usability.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <IoLocationSharp className="text-orange-400 text-2xl" />
              <div>
                <h2 className="text-xl font-semibold text-orange-400">User Stories</h2>
                <p className="text-gray-400 text-md">Real-world scenarios that capture user needs and interactions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Graphic Representation */}
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <div className="absolute w-full h-full rounded-full border-8 border-gray-600"></div>
            <div className="absolute w-2/3 h-2/3 rounded-full border-8 border-blue-500"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center text-black">
              <FaCheck />
            </div>
            <div className="absolute top-0 left-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-black">
              <FaCheck />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
