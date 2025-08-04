import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { useState } from "react";
import { LibroMayorEntry } from "../../../../lib/math/libroMayor";

interface FolioTableProps {
  entry: LibroMayorEntry;
}

export const FolioTable = ({ entry }: FolioTableProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'activo': return 'text-green-400';
      case 'pasivo': return 'text-red-400';
      case 'patrimonio': return 'text-blue-400';
      case 'ingreso': return 'text-purple-400';
      case 'gasto': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden mb-4">
      {/* Header del Folio - Compacto */}
      <div 
        className="p-4 cursor-pointer hover:bg-gray-700 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-purple-900/50 rounded-full border border-purple-500/20 mr-3">
              <BookOpen className="h-4 w-4 text-purple-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {entry.folioInfo.folio}, {entry.folioInfo.concepto}
              </h3>
              <p className="text-xs text-gray-400">{entry.folioInfo.descripcion}</p>
              <div className="flex items-center mt-1 space-x-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTipoColor(entry.folioInfo.tipo)} bg-opacity-20`}>
                  {entry.folioInfo.tipo.toUpperCase()}
                </span>
                <span className="text-xs text-gray-400">
                  {entry.entries.length} mov.
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-xs text-gray-400">Debe</p>
              <p className="text-sm font-bold text-green-400">${entry.totalDebe.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Haber</p>
              <p className="text-sm font-bold text-red-400">${entry.totalHaber.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Balance</p>
              <p className={`text-sm font-bold ${entry.balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${Math.abs(entry.balance).toLocaleString()}
              </p>
            </div>
            <div className="ml-2">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabla expandible compacta y cuadrada */}
      {isExpanded && (
        <div className="border-t border-gray-700 p-4">
          <div className="flex justify-center">
            <div className="w-80">
              {/* Título del folio centrado */}
              <div className="text-center mb-3">
                <h4 className="text-sm font-bold text-white">
                  {entry.folioInfo.folio}, {entry.folioInfo.concepto}
                </h4>
              </div>
              
              {/* Tabla compacta */}
              <table className="w-full border-2 border-gray-600 text-xs">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="border border-gray-600 px-2 py-1 text-center font-bold text-white">DEBE</th>
                    <th className="border border-gray-600 px-2 py-1 text-center font-bold text-white">HABER</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Fila vacía inicial */}
                  <tr>
                    <td className="border border-gray-600 px-2 py-1 bg-yellow-100/20"></td>
                    <td className="border border-gray-600 px-2 py-1 bg-yellow-100/20"></td>
                  </tr>
                  
                  {/* Entradas del libro diario (máximo 4 para mantener compacto) */}
                  {entry.entries.slice(0, 4).map((diarioEntry) => (
                    <tr key={diarioEntry.id}>
                      <td className="border border-gray-600 px-2 py-1 text-right">
                        {diarioEntry.debe > 0 ? (
                          <span className="font-medium text-green-400">
                            {diarioEntry.debe.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="border border-gray-600 px-2 py-1 text-right">
                        {diarioEntry.haber > 0 ? (
                          <span className="font-medium text-red-400">
                            {diarioEntry.haber.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  
                  {/* Si hay más de 4 entradas, mostrar indicador */}
                  {entry.entries.length > 4 && (
                    <tr>
                      <td className="border border-gray-600 px-2 py-1 text-center text-gray-400" colSpan={2}>
                        ... y {entry.entries.length - 4} más
                      </td>
                    </tr>
                  )}
                  
                  {/* Fila vacía después de las entradas */}
                  <tr>
                    <td className="border border-gray-600 px-2 py-1"></td>
                    <td className="border border-gray-600 px-2 py-1"></td>
                  </tr>
                  
                  {/* Fila de totales */}
                  <tr>
                    <td className="border border-gray-600 px-2 py-1 bg-green-100/20 text-right">
                      <span className="font-bold text-green-400">
                        {entry.totalDebe.toLocaleString()}
                      </span>
                    </td>
                    <td className="border border-gray-600 px-2 py-1 bg-red-100/20 text-right">
                      <span className="font-bold text-red-400">
                        {entry.totalHaber.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                  
                  {/* Fila final vacía */}
                  <tr>
                    <td className="border border-gray-600 px-2 py-1 bg-yellow-100/20"></td>
                    <td className="border border-gray-600 px-2 py-1 bg-yellow-100/20"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 