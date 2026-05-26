import { useState, useCallback } from 'react';
import { saveAs } from 'file-saver';
import { filterAndSortFiles } from '@/services/fileFilter';
import { generateRenamedFiles } from '@/services/renameEngine';
import { createZip } from '@/services/zipGenerator';
import type { RenamerConfig } from '@/types';

export function useRenamerLogic() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Manipula a seleção de arquivos, aplicando os filtros iniciais
  const handleFileSelection = useCallback((files: FileList | File[] | null) => {
    if (!files || files.length === 0) {
      setSelectedFiles([]);
      return;
    }
    
    const filteredFiles = filterAndSortFiles(files);
    setSelectedFiles(filteredFiles);
    setError(null);
    setProgress(0);
    
    if (filteredFiles.length === 0) {
      setError('A pasta selecionada não contém arquivos de imagem válidos (JPG/JPEG).');
    }
  }, []);

  // Orquestra o processamento e o download
  const processAndDownload = useCallback(async (config: RenamerConfig) => {
    if (selectedFiles.length === 0) {
      setError('Selecione uma pasta contendo arquivos JPG/JPEG antes de processar.');
      return;
    }

    if (!config.prefix || config.prefix.trim() === '') {
      setError('O padrão de nome (prefixo) é obrigatório.');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(0);

      // 1. Gera os novos nomes em memória
      const processedFiles = generateRenamedFiles(selectedFiles, config);

      // 2. Cria o arquivo ZIP (Reporta o progresso)
      const zipResult = await createZip(
        processedFiles, 
        config.prefix.trim(), 
        (percent) => setProgress(Math.round(percent))
      );

      // 3. Dispara o download nativo do navegador
      saveAs(zipResult.blob, zipResult.filename);

      // 4. Limpeza de memória (Prevenção de Memory Leak / OOM)
      // Como os blobs e as referências dos arquivos foram empacotados e salvos, 
      // limpar este array incentiva o Garbage Collector a recuperar a memória.
      setSelectedFiles([]);
      setTimeout(() => setProgress(0), 2000); // Reseta o progresso após 2s para UX

    } catch (err) {
      console.error('Erro ao processar o ZIP:', err);
      setError('Ocorreu um erro inesperado ao gerar o arquivo ZIP. Tente selecionar menos arquivos de uma vez.');
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFiles]);

  return {
    selectedFiles,
    isProcessing,
    progress,
    error,
    handleFileSelection,
    processAndDownload,
  };
}
