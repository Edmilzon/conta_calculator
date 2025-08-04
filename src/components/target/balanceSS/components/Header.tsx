import { Calculator, RefreshCw } from "lucide-react";

interface HeaderProps {
  onRefresh: () => void;
  loading: boolean;
}

export const Header = ({ onRefresh, loading }: HeaderProps) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-green-900/50 rounded-full border border-green-500/20 mr-4">
            <Calculator className="h-8 w-8 text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Balance de Comprobación</h1>
            <p className="text-gray-300">Sumas y Saldos - Verificación de igualdad</p>
          </div>
        </div>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Actualizar
        </button>
      </div>
    </div>
  );
}; 