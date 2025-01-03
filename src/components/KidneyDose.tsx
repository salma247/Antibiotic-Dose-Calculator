import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import antifungal from "../data/kidney/anti-fungal.json";
import antiviral from "../data/kidney/anti-viral.json";
import antiboitic from "../data/kidney/antiboitic.json";

export default function KidneyDose() {
  const [crcl, setCrcl] = useState("");
  const [selectedMed, setSelectedMed] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectedType, setSelectedType] = useState<
    "antibiotic" | "antifungal" | "antiviral"
  >("antibiotic");

  useEffect(() => {
    function handleClickOutside(event: any) {
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
    const crclNum = parseFloat(crcl);
    if (isNaN(crclNum)) {
      setResult("Please enter a valid CrCl value.");
      return;
    }

    if (!selectedMed) {
      setResult("Please select a medication.");
      return;
    }

    const medicationData =
      getDataForType[selectedType][
        selectedMed as keyof (typeof getDataForType)[typeof selectedType]
      ];
    if (!medicationData) {
      setResult("No data available for the selected medication.");
      return;
    }

    let dose = "No dose adjustment required.";
    for (const adjustment of medicationData as any) {
      const range = adjustment.CrCl;
      if (range?.includes(">")) {
        const matches = range.match(/\d+/g);
        const [lower] = matches ? matches.map(Number) : [0];
        if (crclNum > lower) {
          dose = adjustment.Dose || "";
          break;
        }
      } else if (range?.includes("-")) {
        const matches = range.match(/\d+/g);
        const [lower, upper] = matches ? matches.map(Number) : [0, 0];
        if (crclNum >= lower && crclNum <= upper) {
          dose = adjustment.Dose || "";
          break;
        }
      } else if (range?.includes("<")) {
        const matches = range.match(/\d+/g);
        const [upper] = matches ? matches.map(Number) : [0];
        if (crclNum < upper) {
          dose = adjustment.Dose || "";
          break;
        }
      } else if (!isNaN(parseFloat(range)) && crclNum === parseFloat(range)) {
        dose = adjustment.Dose || "";
        break;
      }
    }

    setResult(dose);
  };

  const getDataForType = {
    antibiotic: antiboitic,
    antifungal: antifungal,
    antiviral: antiviral,
  };

  const currentData = getDataForType[selectedType] || {};
  const filteredMedications = Object.keys(currentData).filter((med) =>
    med.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Kidney Dose Calculator
      </h2>

      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => {
              setSelectedType("antibiotic");
              setSelectedMed("");
              setCrcl("");
              setSearchTerm("");
              setResult("");
            }}
            className={`flex-1 py-2 px-4 rounded-md ${
              selectedType === "antibiotic"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Antibiotic
          </button>
          <button
            onClick={() => {
              setSelectedType("antifungal");
              setSelectedMed("");
              setCrcl("");
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
              setCrcl("");
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

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Creatinine Clearance (mL/min)
        </label>
        <input
          type="number"
          value={crcl}
          onChange={(e) => setCrcl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter CrCl"
        />
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary relative"
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
        <p className="mt-2 text-sm text-primary font-semibold">
          not to be used for patients undergoing hemodialysis.
        </p>
      </div>

      <button
        onClick={calculateDose}
        className="w-full bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-teal-700 transition-colors"
      >
        Calculate Dose
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Recommended Dose:
          </h3>
          <p className="text-gray-700">{result}</p>
        </div>
      )}
    </div>
  );
}
