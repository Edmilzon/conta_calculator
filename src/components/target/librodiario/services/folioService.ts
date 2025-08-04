import { Folio, LibroDiarioEntry, GrupoEntradas, FolioData, FolioConcepto } from "../types";

const STORAGE_KEY = 'libro_diario_data';

// Folios dinámicos - se irán agregando automáticamente
const FOLIOS_INICIALES: FolioConcepto[] = [];

export class FolioService {
  private static instance: FolioService;
  private folios: FolioConcepto[] = [];
  private entries: LibroDiarioEntry[] = [];
  private grupos: GrupoEntradas[] = [];
  private nextFolioNumber: number = 1;

  private constructor() {
    this.loadData();
  }

  static getInstance(): FolioService {
    if (!FolioService.instance) {
      FolioService.instance = new FolioService();
    }
    return FolioService.instance;
  }

  private loadData(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: FolioData = JSON.parse(stored);
        this.folios = data.folios.length > 0 ? data.folios : FOLIOS_INICIALES;
        this.entries = data.entries || [];
        this.grupos = data.grupos || [];
        this.updateNextFolioNumber();
      } else {
        this.folios = FOLIOS_INICIALES;
      }
    } catch (error) {
      console.error('Error loading data:', error);
      this.folios = FOLIOS_INICIALES;
    }
  }

  private updateNextFolioNumber(): void {
    if (this.folios.length > 0) {
      const maxFolio = Math.max(...this.folios.map(f => f.folio));
      this.nextFolioNumber = maxFolio + 1;
    } else {
      this.nextFolioNumber = 1;
    }
  }

  private saveData(): void {
    try {
      const data: FolioData = {
        folios: this.folios,
        entries: this.entries,
        grupos: this.grupos,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  // Métodos para folios
  getFolios(): FolioConcepto[] {
    return [...this.folios];
  }

  getFolioByNumber(numero: number): FolioConcepto | undefined {
    return this.folios.find(f => f.folio === numero);
  }

  addFolio(concepto: string, descripcion: string, tipo: FolioConcepto['tipo']): FolioConcepto {
    const newFolio: FolioConcepto = {
      id: Date.now().toString(),
      folio: this.nextFolioNumber,
      concepto,
      descripcion,
      tipo,
    };
    this.folios.push(newFolio);
    this.nextFolioNumber++;
    this.saveData();
    return newFolio;
  }

  updateFolio(id: string, updates: Partial<FolioConcepto>): FolioConcepto | null {
    const index = this.folios.findIndex(f => f.id === id);
    if (index !== -1) {
      this.folios[index] = { ...this.folios[index], ...updates };
      this.saveData();
      return this.folios[index];
    }
    return null;
  }

  deleteFolio(id: string): boolean {
    const index = this.folios.findIndex(f => f.id === id);
    if (index !== -1) {
      this.folios.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Métodos para entradas
  getEntries(): LibroDiarioEntry[] {
    return [...this.entries];
  }

  addEntry(entry: LibroDiarioEntry): void {
    this.entries.push(entry);
    this.saveData();
  }

  updateEntry(id: string, updates: Partial<LibroDiarioEntry>): LibroDiarioEntry | null {
    const index = this.entries.findIndex(e => e.id === id);
    if (index !== -1) {
      this.entries[index] = { ...this.entries[index], ...updates };
      this.saveData();
      return this.entries[index];
    }
    return null;
  }

  deleteEntry(id: string): boolean {
    const index = this.entries.findIndex(e => e.id === id);
    if (index !== -1) {
      this.entries.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Métodos para grupos
  getGrupos(): GrupoEntradas[] {
    return [...this.grupos];
  }

  addGrupo(grupo: GrupoEntradas): void {
    this.grupos.push(grupo);
    this.saveData();
  }

  updateGrupo(id: string, updates: Partial<GrupoEntradas>): GrupoEntradas | null {
    const index = this.grupos.findIndex(g => g.id === id);
    if (index !== -1) {
      this.grupos[index] = { ...this.grupos[index], ...updates };
      this.saveData();
      return this.grupos[index];
    }
    return null;
  }

  deleteGrupo(id: string): boolean {
    const index = this.grupos.findIndex(g => g.id === id);
    if (index !== -1) {
      this.grupos.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Métodos de utilidad
  getFoliosByTipo(tipo: FolioConcepto['tipo']): FolioConcepto[] {
    return this.folios.filter(f => f.tipo === tipo);
  }

  searchFolios(query: string): FolioConcepto[] {
    const lowerQuery = query.toLowerCase();
    return this.folios.filter(f => 
      f.folio.toString().includes(lowerQuery) ||
      f.concepto.toLowerCase().includes(lowerQuery) ||
      f.descripcion.toLowerCase().includes(lowerQuery)
    );
  }

  // Métodos para el libro mayor
  getEntriesByFolio(folio: number): LibroDiarioEntry[] {
    return this.entries.filter(e => e.folio === folio);
  }

  getBalanceByFolio(folio: number): { debe: number; haber: number; balance: number } {
    const entries = this.getEntriesByFolio(folio);
    const debe = entries.reduce((sum, e) => sum + e.debe, 0);
    const haber = entries.reduce((sum, e) => sum + e.haber, 0);
    return { debe, haber, balance: debe - haber };
  }

  // Exportar datos para el libro mayor
  exportDataForLibroMayor(): { folios: FolioConcepto[]; entries: LibroDiarioEntry[] } {
    return {
      folios: this.folios,
      entries: this.entries,
    };
  }

  // Limpiar solo las entradas y grupos (mantener folios)
  clearEntriesAndGrupos(): void {
    this.entries = [];
    this.grupos = [];
    this.saveData();
  }

  // Forzar recarga de folios desde localStorage
  reloadFolios(): void {
    this.loadData();
  }

  // Limpiar todo incluyendo folios
  clearAllData(): void {
    this.entries = [];
    this.grupos = [];
    this.folios = FOLIOS_INICIALES;
    this.nextFolioNumber = 1;
    this.saveData();
  }
} 