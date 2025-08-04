import { BalanceSSEntry } from "../../../../lib/math/balanceSS";

interface BalanceTableProps {
  entries: BalanceSSEntry[];
}

export const BalanceTable = ({ entries }: BalanceTableProps) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden mb-6">
      <div className="bg-gray-700 px-6 py-3 border-b border-gray-600">
        <h3 className="text-lg font-semibold text-white">
          BALANCE DE COMPROBACIÓN DE SUMAS Y SALDOS
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                N° CUENTA
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                DETALLE
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                DEBE
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                HABER
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                DEUDOR
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                ACREEDOR
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {entries.map((entry) => (
              <tr key={entry.folio} className="hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 text-sm text-center">
                  <span className="font-medium text-white">{entry.folio}</span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="text-gray-300">{entry.detalle}</span>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span className={`font-medium ${entry.deudor > 0 ? 'text-blue-400' : 'text-gray-500'}`}>
                    {entry.deudor > 0 ? `$${entry.deudor.toLocaleString()}` : '-'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span className={`font-medium ${entry.acreedor > 0 ? 'text-purple-400' : 'text-gray-500'}`}>
                    {entry.acreedor > 0 ? `$${entry.acreedor.toLocaleString()}` : '-'}
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