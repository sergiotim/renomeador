"use client";

import React, { useRef, useState } from 'react';
import { Upload, Folder, FileImage, Settings, Download } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useRenamerLogic } from '@/hooks/useRenamerLogic';

export const FileUploadForm: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Hook logic
  const {
    selectedFiles,
    isProcessing,
    progress,
    error,
    handleFileSelection,
    processAndDownload
  } = useRenamerLogic();

  // Local form state
  const [prefix, setPrefix] = useState('');
  const [padding, setPadding] = useState(2);

  const handleFolderClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelection(e.target.files);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processAndDownload({ prefix, padding });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <form onSubmit={onSubmit} className="space-y-6">
        
        {/* Step 1: File Selection */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
            <Folder className="w-5 h-5 text-blue-500" />
            1. Selecionar Imagens
          </h2>
          
          <div 
            onClick={handleFolderClick}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              selectedFiles.length > 0 ? 'border-green-300 bg-green-50 hover:bg-green-100' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={onFileInputChange} 
              className="hidden" 
              // @ts-expect-error - webkitdirectory is non-standard but required for folder selection
              webkitdirectory="" 
              directory=""
              multiple
            />
            
            {selectedFiles.length > 0 ? (
              <div className="flex flex-col items-center gap-2">
                <FileImage className="w-10 h-10 text-green-500" />
                <p className="font-medium text-green-800">
                  {selectedFiles.length} {selectedFiles.length === 1 ? 'imagem válida encontrada' : 'imagens válidas encontradas'}
                </p>
                <p className="text-sm text-green-600">Clique para selecionar outra pasta</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <Upload className="w-10 h-10 text-gray-400" />
                <p className="font-medium">Clique para selecionar a pasta com as provas (.jpg/.jpeg)</p>
                <p className="text-sm">Todo o processamento será feito localmente.</p>
              </div>
            )}
          </div>
        </section>

        {/* Step 2: Configuração */}
        <section className="space-y-4 pt-4 border-t border-gray-100">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
            <Settings className="w-5 h-5 text-blue-500" />
            2. Configurar Padrão
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Prefixo (obrigatório)" 
              placeholder="Ex: GABARITO_ALUNO_" 
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              required
            />
            <Input 
              label="Casas Decimais (Zero-fill)" 
              type="number"
              min={1}
              max={5}
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              required
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
            <strong>Exemplo de como ficará:</strong> <br />
            <span className="font-mono text-gray-800">
              {prefix || 'PREFIXO_'}{String(1).padStart(padding, '0')}.jpg
            </span>
          </div>
        </section>

        {/* Mensagens de Erro Globais */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md text-sm border border-red-200">
            {error}
          </div>
        )}

        {/* Progresso de Compressão */}
        {isProcessing && progress > 0 && progress < 100 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Gerando arquivo ZIP...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        {/* Botão Principal */}
        <Button 
          type="submit" 
          className="w-full py-3 text-lg" 
          isLoading={isProcessing}
          disabled={selectedFiles.length === 0 || !prefix.trim()}
        >
          {isProcessing ? 'Processando...' : (
            <span className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Gerar e Baixar ZIP
            </span>
          )}
        </Button>

      </form>
    </div>
  );
};
