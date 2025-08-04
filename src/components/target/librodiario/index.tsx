"use client";

import { useLibroDiario } from "./hooks/useLibroDiario";
import { Header } from "./components/Header";
import { InputForm } from "./components/InputForm";
import { ProgressionCards } from "./components/ProgressionCards";
import { DataTable } from "./components/DataTable";
import { BalanceSummary } from "./components/BalanceSummary";

export default function LibroDiarioComponent() {
  const {
    grupos,
    selectedDate,
    setSelectedDate,
    inputRows,
    addEntry,
    updateInputRow,
    deleteEntry,
    clearAllData,
    totalDebe,
    totalHaber,
    balance,
  } = useLibroDiario();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <Header totalDebe={totalDebe} onClearAll={clearAllData} />
        
        <InputForm
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          inputRows={inputRows}
          updateInputRow={updateInputRow}
          addEntry={addEntry}
        />

        <DataTable grupos={grupos} deleteEntry={deleteEntry} />

        <ProgressionCards grupos={grupos} />
        
        <BalanceSummary
          totalDebe={totalDebe}
          totalHaber={totalHaber}
          balance={balance}
        />
      </div>
    </div>
  );
} 