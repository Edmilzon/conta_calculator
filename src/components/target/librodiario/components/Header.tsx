import { Calculator, Trash2 } from "lucide-react";

interface HeaderProps {
  totalDebe: number;
  onClearAll?: () => void;
}

export const Header = ({ totalDebe, onClearAll }: HeaderProps) => {
  const handleClearAll = () => {
    if (onClearAll && window.confirm("¿Estás seguro de que quieres eliminar todos los datos del Libro Diario? Esta acción no se puede deshacer.")) {
      onClearAll();
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-900/50 rounded-full border border-blue-500/20 mr-4">
            <Calculator className="h-8 w-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Libro Diario</h1>
            <p className="text-gray-300">Registra y organiza todas las transacciones contables</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-gray-400">Total Debe</div>
            <div className="text-2xl font-bold text-green-400">${totalDebe.toLocaleString()}</div>
          </div>
          {onClearAll && (
            <button
              onClick={handleClearAll}
              className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              title="Limpiar todos los datos"
            >
              <Trash2 className="h-5 w-5 mr-2" />
              <span className="font-medium">Limpiar Todo</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 