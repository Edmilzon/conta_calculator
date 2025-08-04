"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, BookOpen, FileText, BarChart3, Database } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      href: "/home",
      icon: Calculator,
    },
    {
      name: "Balance SS",
      href: "/balanceSS",
      icon: BarChart3,
    },
    {
      name: "Estado Resultados",
      href: "/estadoResultados",
      icon: FileText,
    },
    {
      name: "Kardex",
      href: "/kardex",
      icon: Database,
    },
    {
      name: "Libro Diario",
      href: "/libroDiario",
      icon: BookOpen,
    },
    {
      name: "Libro Mayor",
      href: "/libroMayor",
      icon: BookOpen,
    },
  ];

  return (
    <nav className="bg-gray-900 shadow-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Calculator className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">
                Calculadora Contable
              </span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white border-b-2 border-blue-400 shadow-lg"
                        : "text-gray-300 hover:text-blue-400 hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:text-blue-400 hover:bg-gray-800"
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;