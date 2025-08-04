import { LibroDiarioEntry } from "./libroDiario";
import { FolioConcepto } from "../../components/target/librodiario/types";

export interface BalanceSSEntry {
  folio: number;
  detalle: string;
  debe: number;
  haber: number;
  deudor: number;
  acreedor: number;
}

export interface BalanceSSData {
  entries: BalanceSSEntry[];
  totalDebe: number;
  totalHaber: number;
  totalDeudor: number;
  totalAcreedor: number;
  balance: number;
}

export function generarBalanceSS(entries: LibroDiarioEntry[], folios: FolioConcepto[]): BalanceSSData {
  // Agrupar entradas por folio
  const foliosUtilizados = new Set<number>();
  entries.forEach(entry => {
    if (entry.folio > 0) {
      foliosUtilizados.add(entry.folio);
    }
  });

  // Crear entradas del balance para cada folio
  const balanceEntries: BalanceSSEntry[] = Array.from(foliosUtilizados).map(folioNum => {
    const folioInfo = folios.find(f => f.folio === folioNum);
    const entriesFolio = entries.filter(e => e.folio === folioNum);
    
    const debe = entriesFolio.reduce((sum, entry) => sum + entry.debe, 0);
    const haber = entriesFolio.reduce((sum, entry) => sum + entry.haber, 0);
    
    // Calcular deudor y acreedor
    const deudor = debe > haber ? debe - haber : 0;
    const acreedor = haber > debe ? haber - debe : 0;
    
    // Si no encuentra el folio, usar el concepto de la primera entrada
    const primerConcepto = entriesFolio.find(e => e.concepto)?.concepto || `Folio ${folioNum}`;
    const detalle = folioInfo?.concepto || primerConcepto;
    
    return {
      folio: folioNum,
      detalle,
      debe,
      haber,
      deudor,
      acreedor,
    };
  });

  // Ordenar por número de folio
  balanceEntries.sort((a, b) => a.folio - b.folio);

  // Calcular totales
  const totalDebe = balanceEntries.reduce((sum, entry) => sum + entry.debe, 0);
  const totalHaber = balanceEntries.reduce((sum, entry) => sum + entry.haber, 0);
  const totalDeudor = balanceEntries.reduce((sum, entry) => sum + entry.deudor, 0);
  const totalAcreedor = balanceEntries.reduce((sum, entry) => sum + entry.acreedor, 0);
  const balance = totalDebe - totalHaber;

  return {
    entries: balanceEntries,
    totalDebe,
    totalHaber,
    totalDeudor,
    totalAcreedor,
    balance,
  };
}

export function exportarBalanceSS(balanceData: BalanceSSData): string {
  let csv = "N° CUENTA,DETALLE,DEBE,HABER,DEUDOR,ACREEDOR\n";
  
  balanceData.entries.forEach(entry => {
    csv += `${entry.folio},"${entry.detalle}",${entry.debe},${entry.haber},${entry.deudor},${entry.acreedor}\n`;
  });
  
  csv += `TOTALES,${balanceData.totalDebe},${balanceData.totalHaber},${balanceData.totalDeudor},${balanceData.totalAcreedor}\n`;
  
  return csv;
}
