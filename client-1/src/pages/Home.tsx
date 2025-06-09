import { useState } from "react";
import ProgramDropdown from "@/components/ProgramDropdown";

const Home = () => {
  const [selectedProgram, setSelectedProgram] = useState("");

  const handleProgramChange = (program: string) => {
    setSelectedProgram(program);
    // Additional logic can be added here if needed
  };

  return (
    <div className="home-container">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Student Portal</h1>
      <ProgramDropdown onChange={handleProgramChange} />
      {selectedProgram && <p className="mt-4">Selected Program: {selectedProgram}</p>}
    </div>
  );
};

export default Home;