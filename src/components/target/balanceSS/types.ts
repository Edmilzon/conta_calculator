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