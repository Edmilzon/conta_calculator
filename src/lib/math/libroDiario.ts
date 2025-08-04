export interface Folio {
  id: string;
  codigo: string;
  concepto: string;
  descripcion: string;
  tipo: 'activo' | 'pasivo' | 'patrimonio' | 'ingreso' | 'gasto';
}

export interface LibroDiarioEntry {
  id: string;
  fecha: Date;
  folio: number;
  concepto: string;
  debe: number;
  haber: number;
}

export function libroDiario(fecha: Date, folio: number, concepto: string, debe: number, haber: number): LibroDiarioEntry {
  return {
    id: Date.now().toString(),
    fecha,
    folio,
    concepto,
    debe,
    haber,
  };
}

export function incremente(debe: number[], haber: number[]): { totalDebe: number; totalHaber: number } {
  const totalDebe = debe.reduce((sum, amount) => sum + amount, 0);
  const totalHaber = haber.reduce((sum, amount) => sum + amount, 0);
  
  return {
    totalDebe,
    totalHaber,
  };
}

export function totadebe(debe: number[]): number {
  return debe.reduce((sum, amount) => sum + amount, 0);
}

export function totalhaber(haber: number[]): number {
  return haber.reduce((sum, amount) => sum + amount, 0);
}

export function calcularBalance(entries: LibroDiarioEntry[]): {
  totalDebe: number;
  totalHaber: number;
  balance: number;
  esBalanceado: boolean;
} {
  const totalDebe = entries.reduce((sum, entry) => sum + entry.debe, 0);
  const totalHaber = entries.reduce((sum, entry) => sum + entry.haber, 0);
  const balance = totalDebe - totalHaber;
  
  return {
    totalDebe,
    totalHaber,
    balance,
    esBalanceado: Math.abs(balance) < 0.01, // Tolerancia para errores de redondeo
  };
}

export function filtrarPorFecha(entries: LibroDiarioEntry[], fechaInicio: Date, fechaFin: Date): LibroDiarioEntry[] {
  return entries.filter(entry => {
    const entryDate = new Date(entry.fecha);
    return entryDate >= fechaInicio && entryDate <= fechaFin;
  });
}

export function buscarPorConcepto(entries: LibroDiarioEntry[], concepto: string): LibroDiarioEntry[] {
  return entries.filter(entry => 
    entry.concepto.toLowerCase().includes(concepto.toLowerCase())
  );
}

export function buscarPorFolio(entries: LibroDiarioEntry[], folio: number): LibroDiarioEntry[] {
  return entries.filter(entry => entry.folio === folio);
}

export function calcularBalancePorFolio(entries: LibroDiarioEntry[], folio: number): {
  debe: number;
  haber: number;
  balance: number;
} {
  const entriesFolio = buscarPorFolio(entries, folio);
  const debe = entriesFolio.reduce((sum, entry) => sum + entry.debe, 0);
  const haber = entriesFolio.reduce((sum, entry) => sum + entry.haber, 0);
  
  return {
    debe,
    haber,
    balance: debe - haber,
  };
}

export function obtenerFoliosUtilizados(entries: LibroDiarioEntry[]): number[] {
  const folios = new Set<number>();
  entries.forEach(entry => {
    if (entry.folio > 0) {
      folios.add(entry.folio);
    }
  });
  return Array.from(folios);
}

export function generarLibroMayor(entries: LibroDiarioEntry[], folios: Folio[]): {
  folio: number;
  folioInfo: Folio;
  entries: LibroDiarioEntry[];
  balance: { debe: number; haber: number; balance: number };
}[] {
  const foliosUtilizados = obtenerFoliosUtilizados(entries);
  
  return foliosUtilizados.map(folio => {
    const folioInfo = folios.find(f => parseInt(f.codigo) === folio);
    const entriesFolio = buscarPorFolio(entries, folio);
    const balance = calcularBalancePorFolio(entries, folio);
    
    return {
      folio,
      folioInfo: folioInfo!,
      entries: entriesFolio,
      balance,
    };
  });
}
