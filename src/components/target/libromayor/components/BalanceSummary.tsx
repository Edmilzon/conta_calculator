import { Calculator, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { LibroMayorData, calcularBalanceGeneral } from "../../../../lib/math/libroMayor";

interface BalanceSummaryProps {
  data: LibroMayorData;
}

export const BalanceSummary = ({ data }: BalanceSummaryProps) => {
  const balanceGeneral = calcularBalanceGeneral(data);

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Totales Generales */}
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400">Total General Debe</p>
            <p className="text-2xl font-bold text-green-400">${data.totalGeneralDebe.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-green-900/50 rounded-full border border-green-500/20">
            <TrendingUp className="h-6 w-6 text-green-400" />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400">Total General Haber</p>
            <p className="text-2xl font-bold text-red-400">${data.totalGeneralHaber.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-red-900/50 rounded-full border border-red-500/20">
            <TrendingDown className="h-6 w-6 text-red-400" />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400">Balance General</p>
            <p className={`text-2xl font-bold ${data.balanceGeneral >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>
              ${Math.abs(data.balanceGeneral).toLocaleString()}
            </p>
            <p className={`text-sm ${data.balanceGeneral >= 0 ? 'text-blue-300' : 'text-orange-300'}`}>
              {data.balanceGeneral >= 0 ? 'Favorable' : 'Desfavorable'}
            </p>
          </div>
          <div className={`p-3 rounded-full border ${data.balanceGeneral >= 0 ? 'bg-blue-900/50 border-blue-500/20' : 'bg-orange-900/50 border-orange-500/20'}`}>
            <Calculator className={`h-6 w-6 ${data.balanceGeneral >= 0 ? 'text-blue-400' : 'text-orange-400'}`} />
          </div>
        </div>
      </div>

      {/* Balance por Tipos */}
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400">Activos</p>
            <p className="text-xl font-bold text-green-400">${balanceGeneral.activos.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-green-900/50 rounded-full border border-green-500/20">
            <DollarSign className="h-6 w-6 text-green-400" />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400">Pasivos</p>
            <p className="text-xl font-bold text-red-400">${balanceGeneral.pasivos.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-red-900/50 rounded-full border border-red-500/20">
            <DollarSign className="h-6 w-6 text-red-400" />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400">Patrimonio</p>
            <p className="text-xl font-bold text-blue-400">${balanceGeneral.patrimonio.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-blue-900/50 rounded-full border border-blue-500/20">
            <DollarSign className="h-6 w-6 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Ingresos y Gastos */}
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400">Ingresos</p>
            <p className="text-xl font-bold text-purple-400">${balanceGeneral.ingresos.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-purple-900/50 rounded-full border border-purple-500/20">
            <TrendingUp className="h-6 w-6 text-purple-400" />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400">Gastos</p>
            <p className="text-xl font-bold text-orange-400">${balanceGeneral.gastos.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-orange-900/50 rounded-full border border-orange-500/20">
            <TrendingDown className="h-6 w-6 text-orange-400" />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400">Balance Final</p>
            <p className={`text-xl font-bold ${balanceGeneral.balanceFinal >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${Math.abs(balanceGeneral.balanceFinal).toLocaleString()}
            </p>
            <p className={`text-sm ${balanceGeneral.balanceFinal >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              {balanceGeneral.balanceFinal >= 0 ? 'Positivo' : 'Negativo'}
            </p>
          </div>
          <div className={`p-3 rounded-full border ${balanceGeneral.balanceFinal >= 0 ? 'bg-green-900/50 border-green-500/20' : 'bg-red-900/50 border-red-500/20'}`}>
            <Calculator className={`h-6 w-6 ${balanceGeneral.balanceFinal >= 0 ? 'text-green-400' : 'text-red-400'}`} />
          </div>
        </div>
      </div>
    </div>
  );
}; 