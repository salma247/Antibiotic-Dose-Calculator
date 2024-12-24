import { Home, Pill, Menu, X } from "lucide-react";
import { useState } from "react";
import { GiKidneys, GiLiver } from "react-icons/gi";

export default function Navbar({ activeTab, setActiveTab }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const NavItem = ({ icon: Icon, text, value }: { icon: React.ComponentType<{ className?: string }>, text: string, value: string }) => (
    <button
      onClick={() => {
        setActiveTab(value);
        setIsOpen(false);
      }}
      className={`${
        activeTab === value
          ? " text-gray-900"
          : " text-gray-500"
      } inline-flex items-center px-1 pt-1 text-sm font-medium
      ${isOpen ? " w-full p-3" : "p-3"}`}
    >
      <Icon className="h-4 w-4 mr-1" />
      {text}
    </button>
  );

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Pill className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Antibiotic Dose
              </span>
            </div>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <NavItem icon={Home} text="Home" value="home" />
            <NavItem icon={GiKidneys} text="Kidney Dosing" value="kidney" />
            <NavItem icon={GiLiver} text="Liver Dosing" value="liver" />
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1 border-t border-gray-200">
          <NavItem icon={Home} text="Home" value="home" />
          <NavItem icon={GiKidneys} text="Adult Dosing" value="kidney" />
          <NavItem icon={GiLiver} text="Liver Dosing" value="liver" />
        </div>
      </div>
    </nav>
  );
}