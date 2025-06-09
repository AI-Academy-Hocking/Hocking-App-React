import { useState } from "react";
import ProgramDropdown from "../components/ProgramDropdown";

const Home = () => {
  const [selectedProgram, setSelectedProgram] = useState("");

  const handleProgramChange = (program: string) => {
    setSelectedProgram(program);
    // Additional logic can be added here if needed
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Student Portal</h1>
            <div className="w-64">
              <ProgramDropdown onChange={handleProgramChange} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
          {selectedProgram && (
            <div className="bg-blue-50 text-blue-700 p-4 rounded-md">
              Currently viewing: {selectedProgram}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;