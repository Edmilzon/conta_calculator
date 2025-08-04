import { BookOpen } from "lucide-react";
import { LibroMayorEntry } from "../../../../lib/math/libroMayor";

interface LibroMayorTableProps {
  entries: LibroMayorEntry[];
}

export const LibroMayorTable = ({ entries }: LibroMayorTableProps) => {
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

  const getBalanceColor = (balance: number) => {
    if (balance > 0) return 'text-green-400';
    if (balance < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  if (entries.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8 text-center">
        <div className="text-gray-400 mb-4">
          <BookOpen className="h-12 w-12 mx-auto mb-4" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No hay datos disponibles</h3>
        <p className="text-gray-400">
          No se encontraron entradas en el libro diario. 
          Agrega algunas entradas en el libro diario para ver el libro mayor.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Folio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Concepto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Total Debe</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Total Haber</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Balance</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Saldo Final</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {entries.map((entry) => (
              <tr key={entry.folio} className="hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="font-medium text-white">{entry.folioInfo.folio}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="text-gray-300">{entry.folioInfo.concepto}</div>
                  <div className="text-xs text-gray-500">{entry.folioInfo.descripcion}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTipoColor(entry.folioInfo.tipo)} bg-opacity-20`}>
                    {entry.folioInfo.tipo.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span className="font-medium text-green-400">
                    ${entry.totalDebe.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span className="font-medium text-red-400">
                    ${entry.totalHaber.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span className={`font-medium ${getBalanceColor(entry.balance)}`}>
                    ${Math.abs(entry.balance).toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span className={`font-medium ${getBalanceColor(entry.saldoFinal)}`}>
                    ${entry.saldoFinal.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 