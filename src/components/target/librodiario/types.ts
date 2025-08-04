export interface Folio {
  id: string;
  codigo: string;
  concepto: string;
  descripcion: string;
  tipo: 'activo' | 'pasivo' | 'patrimonio' | 'ingreso' | 'gasto';
}

export interface LibroDiarioEntry {
  id: string;
  fecha: string;
  folio: number;
  concepto: string;
  debe: number;
  haber: number;
  grupoId: string;
}

export interface GrupoEntradas {
  id: string;
  fecha: string;
  entradas: LibroDiarioEntry[];
}

export interface InputRow {
  folio: number; // Se generará automáticamente
  concepto: string;
  debe: string;
  haber: string;
}

export interface FolioConcepto {
  id: string;
  folio: number;
  concepto: string;
  descripcion: string;
  tipo: 'activo' | 'pasivo' | 'patrimonio' | 'ingreso' | 'gasto';
}

export interface FolioData {
  folios: FolioConcepto[];
  entries: LibroDiarioEntry[];
  grupos: GrupoEntradas[];
} 