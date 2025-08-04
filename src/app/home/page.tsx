import Link from "next/link";
import { Calculator, BookOpen, FileText, BarChart3, Database, TrendingUp } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      title: "Balance SS",
      description: "Calcula y visualiza el balance de situación general",
      href: "/balanceSS",
      icon: BarChart3,
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
      darkGradient: "from-blue-600 to-blue-700",
    },
    {
      title: "Estado de Resultados",
      description: "Analiza el estado de resultados de tu empresa",
      href: "/estadoResultados",
      icon: FileText,
      color: "bg-green-500",
      gradient: "from-green-500 to-green-600",
      darkGradient: "from-green-600 to-green-700",
    },
    {
      title: "Kardex",
      description: "Gestiona el inventario con métodos PEPS, UEPS y PM",
      href: "/kardex",
      icon: Database,
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
      darkGradient: "from-purple-600 to-purple-700",
    },
    {
      title: "Libro Diario",
      description: "Registra y organiza todas las transacciones contables",
      href: "/libroDiario",
      icon: BookOpen,
      color: "bg-orange-500",
      gradient: "from-orange-500 to-orange-600",
      darkGradient: "from-orange-600 to-orange-700",
    },
    {
      title: "Libro Mayor",
      description: "Visualiza las cuentas individuales y sus movimientos",
      href: "/libroMayor",
      icon: BookOpen,
      color: "bg-red-500",
      gradient: "from-red-500 to-red-600",
      darkGradient: "from-red-600 to-red-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="bg-gray-800 shadow-2xl border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-900/50 rounded-full border border-blue-500/20">
                <Calculator className="h-12 w-12 text-blue-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Calculadora Contable
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Herramienta completa para el análisis y cálculo contable. 
              Gestiona balances, estados de resultados, inventarios y libros contables de manera eficiente.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="group block"
              >
                <div className="bg-gray-800 rounded-xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1 border border-gray-700 overflow-hidden hover:border-gray-600">
                  <div className={`h-2 bg-gradient-to-r ${feature.darkGradient}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-lg ${feature.color} bg-opacity-20 border border-${feature.color.replace('bg-', '')}/20`}>
                        <Icon className={`h-6 w-6 ${feature.color.replace('bg-', 'text-')}`} />
                      </div>
                      <h3 className="ml-3 text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-4 flex items-center text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                      <span>Acceder</span>
                      <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-800 shadow-2xl border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Por qué elegir nuestra calculadora?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Herramientas precisas y fáciles de usar para profesionales contables
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-900/50 rounded-full border border-green-500/20">
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Precisión</h3>
              <p className="text-gray-300">Cálculos exactos y verificables para todos tus reportes contables</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-900/50 rounded-full border border-blue-500/20">
                  <Calculator className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Facilidad</h3>
              <p className="text-gray-300">Interfaz intuitiva que simplifica los procesos contables complejos</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-purple-900/50 rounded-full border border-purple-500/20">
                  <Database className="h-8 w-8 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Completitud</h3>
              <p className="text-gray-300">Todas las herramientas necesarias en una sola plataforma</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
