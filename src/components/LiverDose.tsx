import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import antiFungalData from "../data/anti-fungal.json";
import antiViralData from "../data/anti-viral.json";

export default function LiverDose() {
  const [selectedType, setSelectedType] = useState<"antifungal" | "antiviral">(
    "antifungal"
  );
  const [selectedMed, setSelectedMed] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const calculateDose = () => {
    if (!selectedMed) {
      setResult("Please select a medication.");
      return;
    }

    const data = selectedType === "antifungal" ? antiFungalData : antiViralData;
    const medicationData = data[selectedMed];

    if (!medicationData) {
      setResult("No data available for the selected medication.");
      return;
    }

    // For now, just show all available dosing information
    const doseInfo = medicationData
      .map((info) => {
        let result = "";
        if (info.Type) {
          result += `${info.Type}: `;
        }
        if (info.Form) {
          result += `${info.Form}: `;
        }
        result += `${info.Dose} (CrCl ${info.CrCl})`;
        return result;
      })
      .join("\n");

    setResult(doseInfo);
  };

  const currentData =
    selectedType === "antifungal" ? antiFungalData : antiViralData;
  const filteredMedications = Object.keys(currentData).filter((med) =>
    med.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Liver Dose Calculator
      </h2>

      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => {
              setSelectedType("antifungal");
              setSelectedMed("");
              setSearchTerm("");
              setResult("");
            }}
            className={`flex-1 py-2 px-4 rounded-md ${
              selectedType === "antifungal"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Anti-Fungal
          </button>
          <button
            onClick={() => {
              setSelectedType("antiviral");
              setSelectedMed("");
              setSearchTerm("");
              setResult("");
            }}
            className={`flex-1 py-2 px-4 rounded-md ${
              selectedType === "antiviral"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Anti-Viral
          </button>
        </div>
      </div>

      <div className="mb-6 relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Medication
        </label>
        <div ref={dropdownRef} className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search medication..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute top-0 right-0 mt-3 mr-3"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
          {isOpen && filteredMedications.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredMedications.map((med) => (
                <button
                  key={med}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  onClick={() => {
                    setSelectedMed(med);
                    setSearchTerm(med);
                    setIsOpen(false);
                  }}
                >
                  {med}
                </button>
              ))}
            </div>
          )}
        </div>
        {selectedMed && (
          <div className="mt-2 text-sm text-primary">
            Selected: {selectedMed}
          </div>
        )}
      </div>

      <button
        onClick={calculateDose}
        className="w-full bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-teal-700 transition-colors"
      >
        Show Dosing Information
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Dosing Information:
          </h3>
          <pre className="text-gray-700 whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}
