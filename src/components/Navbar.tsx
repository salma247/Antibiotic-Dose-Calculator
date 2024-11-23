import { Home, Pill, PersonStanding, Baby } from "lucide-react";
export default function Navbar({ activeTab, setActiveTab }: any) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Pill className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Antibiotic Dose Calculator
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <button
                onClick={() => setActiveTab("home")}
                className={`${
                  activeTab === "home"
                    ? "border-primary text-gray-900"
                    : "border-transparent text-gray-500"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </button>
              <button
                onClick={() => setActiveTab("adult")}
                className={`${
                  activeTab === "adult"
                    ? "border-primary text-gray-900"
                    : "border-transparent text-gray-500"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                <PersonStanding className="h-5 w-5 mr-1" />
                Adult Dosing
              </button>
              <button
                onClick={() => setActiveTab("pediatric")}
                className={`${
                  activeTab === "pediatric"
                    ? "border-primary text-gray-900"
                    : "border-transparent text-gray-500"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                <Baby className="h-4 w-4 mr-1" />
                Pediatric Dosing
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
