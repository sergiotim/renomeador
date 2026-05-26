import type { RenamerConfig, ProcessedFile } from "@/types";

export function generateRenamedFiles(files: File[], config: RenamerConfig): ProcessedFile[] {
  return files.map((file, index) => {
    // A iteração começa no 1
    const fileNumber = index + 1;
    
    // Aplica o preenchimento de zeros à esquerda (zero-fill/padding)
    const paddedNumber = String(fileNumber).padStart(config.padding, '0');
    
    // Concatena o prefixo, o número formatado e a extensão
    const newName = `${config.prefix}${paddedNumber}.jpg`;

    return {
      originalFile: file,
      originalName: file.name,
      newName: newName,
    };
  });
}
