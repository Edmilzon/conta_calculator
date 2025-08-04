import { Calculator } from "lucide-react";

interface BalanceSummaryProps {
  totalDebe: number;
  totalHaber: number;
  balance: number;
}

export const BalanceSummary = ({ totalDebe, totalHaber, balance }: BalanceSummaryProps) => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Total Debe</p>
            <p className="text-2xl font-bold text-green-400">${totalDebe.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-green-900/50 rounded-full border border-green-500/20">
            <Calculator className="h-6 w-6 text-green-400" />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Total Haber</p>
            <p className="text-2xl font-bold text-red-400">${totalHaber.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-red-900/50 rounded-full border border-red-500/20">
            <Calculator className="h-6 w-6 text-red-400" />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Balance</p>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>
              ${Math.abs(balance).toLocaleString()}
            </p>
            <p className={`text-sm ${balance >= 0 ? 'text-blue-300' : 'text-orange-300'}`}>
              {balance >= 0 ? 'Favorable' : 'Desfavorable'}
            </p>
          </div>
          <div className={`p-3 rounded-full border ${balance >= 0 ? 'bg-blue-900/50 border-blue-500/20' : 'bg-orange-900/50 border-orange-500/20'}`}>
            <Calculator className={`h-6 w-6 ${balance >= 0 ? 'text-blue-400' : 'text-orange-400'}`} />
          </div>
        </div>
      </div>
    </div>
  );
}; 