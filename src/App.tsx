import { useState } from "react";
import KidneyDose from "./components/KidneyDose";
import LiverDose from "./components/LiverDose";
import Navbar from "./components/Navbar";
function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === "home" && (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Welcome to Antiboitic Dose Calculator
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              A tool for healthcare professionals to calculate medication doses.
            </p>
            <button
              onClick={() => setActiveTab("adult")}
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Start Calculating
            </button>
          </div>
        )}

        {activeTab === "kidney" && <KidneyDose />}
        {activeTab === "liver" && <LiverDose />}
      </main>
    </div>
  );
}

export default App;
