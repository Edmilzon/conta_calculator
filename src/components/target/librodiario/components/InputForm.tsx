import { Plus } from "lucide-react";
import { InputRow } from "../types";

interface InputFormProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  inputRows: InputRow[];
  updateInputRow: (index: number, field: keyof InputRow, value: string | number) => void;
  addEntry: () => void;
}

export const InputForm = ({ 
  selectedDate, 
  setSelectedDate, 
  inputRows, 
  updateInputRow, 
  addEntry 
}: InputFormProps) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6 mb-6">
      <div className="mb-4">
        <div className="flex items-center mb-4">
          <label className="block text-sm font-medium text-gray-300 mr-4">Fecha:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-white mb-4">Entradas (4 filas)</h3>
          
          <div className="space-y-3">
            {inputRows.map((row, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Concepto {index + 1}
                  </label>
                  <input
                    type="text"
                    value={row.concepto}
                    onChange={(e) => updateInputRow(index, 'concepto', e.target.value)}
                    placeholder={`Descripción ${index + 1}`}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Folio {index + 1}
                  </label>
                  <input
                    type="number"
                    value={row.folio || ''}
                    onChange={(e) => updateInputRow(index, 'folio', parseInt(e.target.value) || 0)}
                    placeholder="Número de folio"
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {row.folio > 0 && (
                    <div className="text-xs text-gray-400 mt-1">
                      {row.concepto ? `Concepto: ${row.concepto}` : 'Nuevo folio'}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Debe
                  </label>
                  <input
                    type="number"
                    value={row.debe}
                    onChange={(e) => updateInputRow(index, 'debe', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Haber
                  </label>
                  <input
                    type="number"
                    value={row.haber}
                    onChange={(e) => updateInputRow(index, 'haber', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={addEntry}
            disabled={!selectedDate}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Grupo de Entradas
          </button>
        </div>
      </div>
    </div>
  );
}; 