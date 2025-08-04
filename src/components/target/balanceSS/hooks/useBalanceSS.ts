import { useState, useEffect } from "react";
import { BalanceSSData, generarBalanceSS } from "../../../../lib/math/balanceSS";
import { FolioService } from "../../librodiario/services/folioService";

export const useBalanceSS = () => {
  const [balanceData, setBalanceData] = useState<BalanceSSData | null>(null);
  const [loading, setLoading] = useState(true);

  const folioService = FolioService.getInstance();

  useEffect(() => {
    const loadData = () => {
      try {
        const entries = folioService.getEntries();
        const folios = folioService.getFolios();
        
        if (entries.length > 0) {
          const data = generarBalanceSS(entries, folios);
          setBalanceData(data);
        } else {
          setBalanceData({
            entries: [],
            totalDebe: 0,
            totalHaber: 0,
            totalDeudor: 0,
            totalAcreedor: 0,
            balance: 0,
          });
        }
      } catch (error) {
        console.error('Error loading balance data:', error);
        setBalanceData({
          entries: [],
          totalDebe: 0,
          totalHaber: 0,
          totalDeudor: 0,
          totalAcreedor: 0,
          balance: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [folioService]);

  const refreshData = () => {
    setLoading(true);
    const entries = folioService.getEntries();
    const folios = folioService.getFolios();
    
    if (entries.length > 0) {
      const data = generarBalanceSS(entries, folios);
      setBalanceData(data);
    } else {
      setBalanceData({
        entries: [],
        totalDebe: 0,
        totalHaber: 0,
        totalDeudor: 0,
        totalAcreedor: 0,
        balance: 0,
      });
    }
    setLoading(false);
  };

  return {
    balanceData,
    loading,
    refreshData,
  };
}; 