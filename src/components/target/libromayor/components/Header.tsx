import { BookOpen, RefreshCw, Trash2 } from "lucide-react";

interface HeaderProps {
  onRefresh: () => void;
  onClearAll?: () => void;
  loading: boolean;
}

export const Header = ({ onRefresh, onClearAll, loading }: HeaderProps) => {
  const handleClearAll = () => {
    if (onClearAll && window.confirm("¿Estás seguro de que quieres eliminar todos los datos del Libro Mayor? Esta acción también limpiará el Libro Diario. Esta acción no se puede deshacer.")) {
      onClearAll();
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-purple-900/50 rounded-full border border-purple-500/20 mr-4">
            <BookOpen className="h-8 w-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Libro Mayor</h1>
            <p className="text-gray-300">Visualiza las cuentas individuales y sus movimientos</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
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