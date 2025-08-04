import { FolioConcepto } from "../../components/target/librodiario/types";

export interface LibroDiarioEntry {
  id: string;
  fecha: string;
  folio: number;
  concepto: string;
  debe: number;
  haber: number;
}

export interface LibroMayorEntry {
  folio: number;
  folioInfo: FolioConcepto;
  entries: LibroDiarioEntry[];
  totalDebe: number;
  totalHaber: number;
  balance: number;
  saldoInicial: number;
  saldoFinal: number;
}

export interface LibroMayorData {
  entries: LibroMayorEntry[];
  totalGeneralDebe: number;
  totalGeneralHaber: number;
  balanceGeneral: number;
}

export function generarLibroMayor(entries: LibroDiarioEntry[], folios: FolioConcepto[]): LibroMayorData {
  // Obtener folios únicos utilizados
  const foliosUtilizados = new Set<number>();
  entries.forEach(entry => {
    if (entry.folio > 0) {
      foliosUtilizados.add(entry.folio);
    }
  });

  // Crear entradas del libro mayor para cada folio
  const libroMayorEntries: LibroMayorEntry[] = Array.from(foliosUtilizados).map(folioNum => {
    const folioInfo = folios.find(f => f.folio === folioNum);
    const entriesFolio = entries.filter(e => e.folio === folioNum);
    
    const totalDebe = entriesFolio.reduce((sum, entry) => sum + entry.debe, 0);
    const totalHaber = entriesFolio.reduce((sum, entry) => sum + entry.haber, 0);
    const balance = totalDebe - totalHaber;
    
    // Calcular saldos (simplificado - en contabilidad real sería más complejo)
    const saldoInicial = 0; // Por defecto, se podría cargar desde configuración
    const saldoFinal = saldoInicial + balance;
    
    // Si no encuentra el folio, crear uno temporal usando el concepto de la primera entrada
    const primerConcepto = entriesFolio.find(e => e.concepto)?.concepto || `Folio ${folioNum}`;
    const folioInfoFinal = folioInfo || {
      id: `temp-${folioNum}`,
      folio: folioNum,
      concepto: primerConcepto,
      descripcion: primerConcepto,
      tipo: 'activo' as const,
    };
    
    return {
      folio: folioNum,
      folioInfo: folioInfoFinal,
      entries: entriesFolio,
      totalDebe,
      totalHaber,
      balance,
      saldoInicial,
      saldoFinal,
    };
  });

  // Ordenar por código de folio
  libroMayorEntries.sort((a, b) => a.folio - b.folio);

  // Calcular totales generales
  const totalGeneralDebe = libroMayorEntries.reduce((sum, entry) => sum + entry.totalDebe, 0);
  const totalGeneralHaber = libroMayorEntries.reduce((sum, entry) => sum + entry.totalHaber, 0);
  const balanceGeneral = totalGeneralDebe - totalGeneralHaber;

  return {
    entries: libroMayorEntries,
    totalGeneralDebe,
    totalGeneralHaber,
    balanceGeneral,
  };
}

export function filtrarLibroMayorPorTipo(
  libroMayorData: LibroMayorData, 
  tipo: FolioConcepto['tipo']
): LibroMayorEntry[] {
  return libroMayorData.entries.filter(entry => entry.folioInfo.tipo === tipo);
}

export function calcularBalancePorTipo(
  libroMayorData: LibroMayorData, 
  tipo: FolioConcepto['tipo']
): { debe: number; haber: number; balance: number } {
  const entriesTipo = filtrarLibroMayorPorTipo(libroMayorData, tipo);
  
  const debe = entriesTipo.reduce((sum, entry) => sum + entry.totalDebe, 0);
  const haber = entriesTipo.reduce((sum, entry) => sum + entry.totalHaber, 0);
  
  return {
    debe,
    haber,
    balance: debe - haber,
  };
}

export function obtenerTiposDisponibles(libroMayorData: LibroMayorData): FolioConcepto['tipo'][] {
  const tipos = new Set<FolioConcepto['tipo']>();
  libroMayorData.entries.forEach(entry => {
    tipos.add(entry.folioInfo.tipo);
  });
  return Array.from(tipos);
}

export function calcularBalanceGeneral(libroMayorData: LibroMayorData): {
  activos: number;
  pasivos: number;
  patrimonio: number;
  ingresos: number;
  gastos: number;
  balanceFinal: number;
} {
  const activos = calcularBalancePorTipo(libroMayorData, 'activo').balance;
  const pasivos = calcularBalancePorTipo(libroMayorData, 'pasivo').balance;
  const patrimonio = calcularBalancePorTipo(libroMayorData, 'patrimonio').balance;
  const ingresos = calcularBalancePorTipo(libroMayorData, 'ingreso').balance;
  const gastos = calcularBalancePorTipo(libroMayorData, 'gasto').balance;
  
  // Balance final = Activos - Pasivos - Patrimonio + Ingresos - Gastos
  const balanceFinal = activos - pasivos - patrimonio + ingresos - gastos;
  
  return {
    activos,
    pasivos,
    patrimonio,
    ingresos,
    gastos,
    balanceFinal,
  };
}

export function exportarLibroMayor(libroMayorData: LibroMayorData): string {
  let csv = "Folio,Concepto,Tipo,Total Debe,Total Haber,Balance,Saldo Inicial,Saldo Final\n";
  
  libroMayorData.entries.forEach(entry => {
    csv += `${entry.folio},"${entry.folioInfo.concepto}",${entry.folioInfo.tipo},${entry.totalDebe},${entry.totalHaber},${entry.balance},${entry.saldoInicial},${entry.saldoFinal}\n`;
  });
  
  return csv;
}
