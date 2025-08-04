import { useState, useEffect } from "react";
import { LibroDiarioEntry, GrupoEntradas, InputRow } from "../types";
import { FolioService } from "../services/folioService";

export const useLibroDiario = () => {
  const [grupos, setGrupos] = useState<GrupoEntradas[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [inputRows, setInputRows] = useState<InputRow[]>([
    { folio: 0, concepto: "", debe: "", haber: "" },
    { folio: 0, concepto: "", debe: "", haber: "" },
    { folio: 0, concepto: "", debe: "", haber: "" },
    { folio: 0, concepto: "", debe: "", haber: "" },
  ]);

  const folioService = FolioService.getInstance();

  // Cargar datos al inicializar
  useEffect(() => {
    const savedGrupos = folioService.getGrupos();
    setGrupos(savedGrupos);
  }, [folioService]);

  const addEntry = () => {
    if (selectedDate) {
      const filasConContenido = inputRows.filter(row => 
        row.folio > 0 && row.concepto.trim() !== "" && (parseFloat(row.debe) > 0 || parseFloat(row.haber) > 0)
      );

      if (filasConContenido.length > 0) {
        const fecha = selectedDate;
        const grupoExistente = grupos.find(g => g.fecha === fecha);
        
        if (!grupoExistente) {
          const nuevoGrupo: GrupoEntradas = {
            id: Date.now().toString(),
            fecha,
            entradas: []
          };
          
          filasConContenido.forEach((row, index) => {
            const entrada: LibroDiarioEntry = {
              id: `${Date.now()}-${index}`,
              fecha,
              folio: row.folio,
              concepto: row.concepto,
              debe: parseFloat(row.debe) || 0,
              haber: parseFloat(row.haber) || 0,
              grupoId: nuevoGrupo.id,
            };
            nuevoGrupo.entradas.push(entrada);
            folioService.addEntry(entrada);
          });
          
          const filasVaciasNecesarias = 4 - filasConContenido.length;
          for (let i = 0; i < filasVaciasNecesarias; i++) {
            const filaVacia: LibroDiarioEntry = {
              id: `empty-${Date.now()}-${i}`,
              fecha,
              folio: 0,
              concepto: "",
              debe: 0,
              haber: 0,
              grupoId: nuevoGrupo.id,
            };
            nuevoGrupo.entradas.push(filaVacia);
          }
          
          const newGrupos = [...grupos, nuevoGrupo];
          setGrupos(newGrupos);
          folioService.addGrupo(nuevoGrupo);
        } else {
          const entradasNuevas: LibroDiarioEntry[] = filasConContenido.map((row, index) => ({
            id: `${Date.now()}-${index}`,
            fecha,
            folio: row.folio,
            concepto: row.concepto,
            debe: parseFloat(row.debe) || 0,
            haber: parseFloat(row.haber) || 0,
            grupoId: grupoExistente.id,
          }));
          
          const grupoActualizado = {
            ...grupoExistente,
            entradas: [...grupoExistente.entradas, ...entradasNuevas]
          };
          
          const updatedGrupos = grupos.map(g => g.id === grupoExistente.id ? grupoActualizado : g);
          setGrupos(updatedGrupos);
          
          // Guardar entradas en el servicio
          entradasNuevas.forEach(entrada => folioService.addEntry(entrada));
          folioService.updateGrupo(grupoExistente.id, grupoActualizado);
        }
        
        setInputRows([
          { folio: 0, concepto: "", debe: "", haber: "" },
          { folio: 0, concepto: "", debe: "", haber: "" },
          { folio: 0, concepto: "", debe: "", haber: "" },
          { folio: 0, concepto: "", debe: "", haber: "" },
        ]);
      }
    }
  };

  const updateInputRow = (index: number, field: keyof InputRow, value: string | number) => {
    const newInputRows = [...inputRows];
    newInputRows[index] = { ...newInputRows[index], [field]: value };
    
    // Si se está actualizando el concepto y no tiene folio, generar uno automáticamente
    if (field === 'concepto' && typeof value === 'string' && value.trim() !== '' && newInputRows[index].folio === 0) {
      const folioService = FolioService.getInstance();
      const newFolio = folioService.addFolio(value.trim(), value.trim(), 'activo'); // Tipo por defecto
      newInputRows[index].folio = newFolio.folio;
    }
    
    // Si se está actualizando el folio, buscar el concepto correspondiente
    if (field === 'folio' && typeof value === 'number' && value > 0) {
      const folioService = FolioService.getInstance();
      const folio = folioService.getFolioByNumber(value);
      if (folio && newInputRows[index].concepto === '') {
        newInputRows[index].concepto = folio.concepto;
      }
    }
    
    setInputRows(newInputRows);
  };

  const deleteEntry = (id: string) => {
    const updatedGrupos = grupos.map(grupo => ({
      ...grupo,
      entradas: grupo.entradas.map(entrada => 
        entrada.id === id 
          ? { ...entrada, concepto: "", debe: 0, haber: 0, folio: 0 }
          : entrada
      )
    }));
    
    setGrupos(updatedGrupos);
    
    // Actualizar en el servicio
    updatedGrupos.forEach(grupo => {
      folioService.updateGrupo(grupo.id, grupo);
    });
  };

  const allEntries = grupos.flatMap(g => g.entradas).filter(e => e.concepto !== "");
  const totalDebe = allEntries.reduce((sum, entry) => sum + entry.debe, 0);
  const totalHaber = allEntries.reduce((sum, entry) => sum + entry.haber, 0);
  const balance = totalDebe - totalHaber;

  const clearAllData = () => {
    folioService.clearEntriesAndGrupos();
    setGrupos([]);
    setSelectedDate("");
    setInputRows([
      { folio: 0, concepto: "", debe: "", haber: "" },
      { folio: 0, concepto: "", debe: "", haber: "" },
      { folio: 0, concepto: "", debe: "", haber: "" },
      { folio: 0, concepto: "", debe: "", haber: "" },
    ]);
  };

  return {
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
    folioService,
  };
}; 