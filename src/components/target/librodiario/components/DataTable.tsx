import { Trash2 } from "lucide-react";
import { GrupoEntradas } from "../types";
import { FolioService } from "../services/folioService";

interface DataTableProps {
  grupos: GrupoEntradas[];
  deleteEntry: (id: string) => void;
}

export const DataTable = ({ grupos, deleteEntry }: DataTableProps) => {
  const folioService = FolioService.getInstance();

  const getFolioInfo = (folio: number) => {
    if (!folio || folio === 0) return null;
    return folioService.getFolioByNumber(folio);
  };

  return (
    <>
      {grupos.map((grupo) => (
        <div key={grupo.id} className="mb-8">
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
            <div className="bg-gray-700 px-6 py-3 border-b border-gray-600">
              <h3 className="text-lg font-semibold text-white">
                Fecha: {new Date(grupo.fecha).toLocaleDateString()}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Concepto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Folio</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Debe</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Haber</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {grupo.entradas.map((entry) => {
                    const folio = getFolioInfo(entry.folio);
                    return (
                      <tr key={entry.id} className="hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 text-sm">
                          {entry.concepto ? (
                            <span className="text-gray-300">{entry.concepto}</span>
                          ) : (
                            <span className="text-gray-500 italic">Fila vacía</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {entry.folio > 0 ? (
                            <div>
                              <div className="font-medium text-white">{entry.folio}</div>
                              <div className="text-xs text-gray-400">{folio?.concepto}</div>
                            </div>
                          ) : (
                            <span className="text-gray-500 italic">Sin folio</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <span className={`font-medium ${entry.debe > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                            {entry.debe > 0 ? `$${entry.debe.toLocaleString()}` : '-'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <span className={`font-medium ${entry.haber > 0 ? 'text-red-400' : 'text-gray-500'}`}>
                            {entry.haber > 0 ? `$${entry.haber.toLocaleString()}` : '-'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          {entry.concepto && (
                            <button
                              onClick={() => deleteEntry(entry.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-gray-700">
                  <tr>
                    <td className="px-6 py-4 font-bold text-gray-300">TOTALES</td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-green-400">
                        ${grupo.entradas.filter(e => e.concepto).reduce((sum, e) => sum + e.debe, 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-red-400">
                        ${grupo.entradas.filter(e => e.concepto).reduce((sum, e) => sum + e.haber, 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}; 