import { LibroMayorEntry } from "../../../../lib/math/libroMayor";
import { FolioTable } from "./FolioTable";

interface FolioGroupProps {
  tipo: string;
  entries: LibroMayorEntry[];
}

export const FolioGroup = ({ tipo, entries }: FolioGroupProps) => {
  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'activo': return 'text-green-400';
      case 'pasivo': return 'text-red-400';
      case 'patrimonio': return 'text-blue-400';
      case 'ingreso': return 'text-purple-400';
      case 'gasto': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getTipoBgColor = (tipo: string) => {
    switch (tipo) {
      case 'activo': return 'bg-green-900/20 border-green-500/20';
      case 'pasivo': return 'bg-red-900/20 border-red-500/20';
      case 'patrimonio': return 'bg-blue-900/20 border-blue-500/20';
      case 'ingreso': return 'bg-purple-900/20 border-purple-500/20';
      case 'gasto': return 'bg-orange-900/20 border-orange-500/20';
      default: return 'bg-gray-900/20 border-gray-500/20';
    }
  };

  const totalDebe = entries.reduce((sum, entry) => sum + entry.totalDebe, 0);
  const totalHaber = entries.reduce((sum, entry) => sum + entry.totalHaber, 0);
  const balance = totalDebe - totalHaber;

  return (
    <div className="mb-8">
      {/* Header del grupo */}
      <div className={`p-4 rounded-lg border ${getTipoBgColor(tipo)} mb-4`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold ${getTipoColor(tipo)} capitalize`}>
              {tipo}
            </h2>
            <p className="text-gray-400">
              {entries.length} {entries.length === 1 ? 'folio' : 'folios'}
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm text-gray-400">Total Debe</p>
              <p className="text-lg font-bold text-green-400">${totalDebe.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Total Haber</p>
              <p className="text-lg font-bold text-red-400">${totalHaber.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Balance</p>
              <p className={`text-lg font-bold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${Math.abs(balance).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tablas de folios en grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map((entry) => (
          <FolioTable key={entry.folio} entry={entry} />
        ))}
      </div>
    </div>
  );
}; 