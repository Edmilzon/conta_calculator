import { BalanceSSData } from "../../../../lib/math/balanceSS";
import { TrendingUp, DollarSign, Calculator } from "lucide-react";

interface BalanceSummaryProps {
  data: BalanceSSData;
}

export const BalanceSummary = ({ data }: BalanceSummaryProps) => {
  const isBalanced = data.totalDebe === data.totalHaber && data.totalDeudor === data.totalAcreedor;

  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-green-900/50 rounded-full border border-green-500/20 mr-4">
          <TrendingUp className="h-8 w-8 text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Resumen del Balance</h2>
          <p className="text-gray-300">Totales y verificación de igualdad</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-900/50 rounded-full border border-green-500/20 mr-3">
              <DollarSign className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Debe</p>
              <p className="text-xl font-bold text-green-400">${data.totalDebe.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-900/50 rounded-full border border-red-500/20 mr-3">
              <DollarSign className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Haber</p>
              <p className="text-xl font-bold text-red-400">${data.totalHaber.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-900/50 rounded-full border border-blue-500/20 mr-3">
              <Calculator className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Deudor</p>
              <p className="text-xl font-bold text-blue-400">${data.totalDeudor.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-900/50 rounded-full border border-purple-500/20 mr-3">
              <Calculator className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Acreedor</p>
              <p className="text-xl font-bold text-purple-400">${data.totalAcreedor.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg border-2 border-dashed">
        <div className="flex items-center justify-center">
          <div className={`p-2 rounded-full border-2 mr-3 ${
            isBalanced 
              ? 'bg-green-900/50 border-green-500/20' 
              : 'bg-red-900/50 border-red-500/20'
          }`}>
            <Calculator className={`h-6 w-6 ${
              isBalanced ? 'text-green-400' : 'text-red-400'
            }`} />
          </div>
          <div className="text-center">
            <p className={`text-lg font-bold ${
              isBalanced ? 'text-green-400' : 'text-red-400'
            }`}>
              {isBalanced ? '✓ BALANCEADO' : '✗ NO BALANCEADO'}
            </p>
            <p className="text-sm text-gray-400">
              {isBalanced 
                ? 'Los totales son iguales - Balance correcto'
                : 'Los totales no coinciden - Revisar entradas'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 