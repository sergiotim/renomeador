/**
 * Configurações preenchidas pelo usuário no formulário
 */
export interface RenamerConfig {
  prefix: string;
  padding: number; // Ex: 2 para '01', 3 para '001'
}

/**
 * Representa um arquivo durante e após o processamento em memória
 */
export interface ProcessedFile {
  originalFile: File;     // O binário mantido em memória
  originalName: string;   // Nome original da Lexmark (ex: img_20260526_153022.jpg) - Usado para ordenação
  newName: string;        // Nome final gerado (ex: GABARITO_01.jpg)
}

/**
 * Resultado final do service de empacotamento
 */
export interface ZipResult {
  blob: Blob;
  filename: string;
}
