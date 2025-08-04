import { useState, useEffect } from "react";
import { LibroMayorData, generarLibroMayor } from "../../../../lib/math/libroMayor";
import { FolioService } from "../../librodiario/services/folioService";

export const useLibroMayor = () => {
  const [libroMayorData, setLibroMayorData] = useState<LibroMayorData | null>(null);
  const [loading, setLoading] = useState(true);

  const folioService = FolioService.getInstance();

  useEffect(() => {
    const loadData = () => {
      try {
        const entries = folioService.getEntries();
        const folios = folioService.getFolios();
        
        if (entries.length > 0) {
          const data = generarLibroMayor(entries, folios);
          setLibroMayorData(data);
        } else {
          setLibroMayorData({
            entries: [],
            totalGeneralDebe: 0,
            totalGeneralHaber: 0,
            balanceGeneral: 0,
          });
        }
      } catch (error) {
        console.error('Error loading libro mayor data:', error);
        setLibroMayorData({
          entries: [],
          totalGeneralDebe: 0,
          totalGeneralHaber: 0,
          balanceGeneral: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);



  const refreshData = () => {
    setLoading(true);
    const entries = folioService.getEntries();
    const folios = folioService.getFolios();
    
    if (entries.length > 0) {
      const data = generarLibroMayor(entries, folios);
      setLibroMayorData(data);
    } else {
      setLibroMayorData({
        entries: [],
        totalGeneralDebe: 0,
        totalGeneralHaber: 0,
        balanceGeneral: 0,
      });
    }
    setLoading(false);
  };

  const clearAllData = () => {
    folioService.clearEntriesAndGrupos();
    setLibroMayorData({
      entries: [],
      totalGeneralDebe: 0,
      totalGeneralHaber: 0,
      balanceGeneral: 0,
    });
  };

  return {
    libroMayorData,
    loading,
    refreshData,
    clearAllData,
  };
}; 