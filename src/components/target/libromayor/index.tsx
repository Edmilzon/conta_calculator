"use client";

import { useLibroMayor } from "./hooks/useLibroMayor";
import { Header } from "./components/Header";
import { FolioGroup } from "./components/FolioGroup";
import { BalanceSummary } from "./components/BalanceSummary";
import { filtrarLibroMayorPorTipo, obtenerTiposDisponibles, LibroMayorData } from "../../../lib/math/libroMayor";
import { FolioConcepto } from "../librodiario/types";

export default function LibroMayorComponent() {
  const { libroMayorData, loading, refreshData, clearAllData } = useLibroMayor();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-white mb-2">Cargando Libro Mayor</h3>
            <p className="text-gray-400">Procesando datos del libro diario...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!libroMayorData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Error al cargar datos</h3>
            <p className="text-gray-400">No se pudieron cargar los datos del libro mayor.</p>
          </div>
        </div>
      </div>
    );
  }

  const tiposDisponibles = obtenerTiposDisponibles(libroMayorData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <Header onRefresh={refreshData} onClearAll={clearAllData} loading={loading} />
        
        {/* Tablas separadas por tipo */}
        {tiposDisponibles.map((tipo: FolioConcepto['tipo']) => {
          const entriesTipo = filtrarLibroMayorPorTipo(libroMayorData, tipo);
          return (
            <FolioGroup 
              key={tipo} 
              tipo={tipo} 
              entries={entriesTipo} 
            />
          );
        })}
        
        <BalanceSummary data={libroMayorData} />
      </div>
    </div>
  );
} 