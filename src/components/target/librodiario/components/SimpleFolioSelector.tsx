import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { FolioConcepto } from "../types";
import { FolioService } from "../services/folioService";

interface SimpleFolioSelectorProps {
  value: number;
  onChange: (folio: number) => void;
  placeholder?: string;
}

export const SimpleFolioSelector = ({ 
  value, 
  onChange, 
  placeholder = "Seleccionar folio..." 
}: SimpleFolioSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [folios, setFolios] = useState<FolioConcepto[]>([]);
  const [selectedFolio, setSelectedFolio] = useState<FolioConcepto | null>(null);

  const folioService = FolioService.getInstance();

  useEffect(() => {
    const currentFolios = folioService.getFolios();
    console.log('Folios cargados en SimpleFolioSelector:', currentFolios);
    setFolios(currentFolios);
    if (value > 0) {
      const folio = folioService.getFolioByNumber(value);
      setSelectedFolio(folio || null);
    }
  }, [value, folioService]);

  const handleSelect = (folio: FolioConcepto) => {
    setSelectedFolio(folio);
    onChange(folio.folio);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
      >
        <span className={selectedFolio ? "text-white" : "text-gray-400"}>
          {selectedFolio ? `${selectedFolio.folio} - ${selectedFolio.concepto}` : placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl max-h-60 overflow-hidden">
          <div className="max-h-48 overflow-y-auto">
            {folios.length > 0 ? (
              folios.map((folio) => (
                <button
                  key={folio.id}
                  onClick={() => handleSelect(folio)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">{folio.folio}</div>
                      <div className="text-sm text-gray-300">{folio.concepto}</div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-400 text-sm">
                No hay folios disponibles
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 