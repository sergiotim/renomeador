import JSZip from "jszip";
import type { ProcessedFile, ZipResult } from "@/types";

export async function createZip(
  files: ProcessedFile[],
  zipFilename: string = "arquivos_renomeados.zip",
  onProgress?: (percent: number) => void
): Promise<ZipResult> {
  const zip = new JSZip();

  // Adiciona cada arquivo processado ao JSZip com o seu novo nome
  for (const file of files) {
    zip.file(file.newName, file.originalFile);
  }

  // Gera o Blob final. 
  // Usa "STORE" (sem compressão) pois JPEGs já são comprimidos, economizando muita CPU/Memória.
  const blob = await zip.generateAsync(
    { 
      type: "blob",
      compression: "STORE",
    },
    (metadata) => {
      // Repassa o progresso (0 a 100) para eventual barra de carregamento na UI
      if (onProgress) {
        onProgress(metadata.percent);
      }
    }
  );

  return {
    blob,
    filename: zipFilename.endsWith('.zip') ? zipFilename : `${zipFilename}.zip`,
  };
}
