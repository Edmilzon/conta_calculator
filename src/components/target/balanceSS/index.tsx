"use client";

import { useBalanceSS } from "./hooks/useBalanceSS";
import { Header } from "./components/Header";
import { BalanceTable } from "./components/BalanceTable";
import { BalanceSummary } from "./components/BalanceSummary";

export default function BalanceSSComponent() {
  const { balanceData, loading, refreshData } = useBalanceSS();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-white mb-2">Cargando Balance de Comprobación</h3>
            <p className="text-gray-400">Procesando datos del libro diario...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!balanceData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Error al cargar datos</h3>
            <p className="text-gray-400">No se pudieron cargar los datos del balance de comprobación.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <Header onRefresh={refreshData} loading={loading} />
        
        <BalanceTable entries={balanceData.entries} />
        
        <BalanceSummary data={balanceData} />
      </div>
    </div>
  );
} 