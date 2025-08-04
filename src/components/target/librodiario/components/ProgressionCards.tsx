import { TrendingUp, Calendar } from "lucide-react";
import { GrupoEntradas } from "../types";

interface ProgressionCardsProps {
  grupos: GrupoEntradas[];
}

export const ProgressionCards = ({ grupos }: ProgressionCardsProps) => {
  if (grupos.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <TrendingUp className="h-6 w-6 mr-2 text-blue-400" />
        Progresión de Grupos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {grupos.map((grupo, index) => {
          const totalDebeGrupo = grupo.entradas.filter(e => e.concepto).reduce((sum, e) => sum + e.debe, 0);
          const totalHaberGrupo = grupo.entradas.filter(e => e.concepto).reduce((sum, e) => sum + e.haber, 0);
          const balanceGrupo = totalDebeGrupo - totalHaberGrupo;
          const entradasConContenido = grupo.entradas.filter(e => e.concepto).length;
          
          return (
            <div key={grupo.id} className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6 hover:shadow-blue-500/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-900/50 rounded-full border border-blue-500/20 mr-3">
                    <Calendar className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Grupo {index + 1}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {new Date(grupo.fecha).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Entradas</div>
                  <div className="text-lg font-bold text-blue-400">{entradasConContenido}/4</div>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Total Debe:</span>
                  <span className="font-semibold text-green-400">${totalDebeGrupo.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Total Haber:</span>
                  <span className="font-semibold text-red-400">${totalHaberGrupo.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Balance:</span>
                  <span className={`font-semibold ${balanceGrupo >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>
                    ${Math.abs(balanceGrupo).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-3">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Progreso</span>
                  <span>{Math.round((entradasConContenido / 4) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(entradasConContenido / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 