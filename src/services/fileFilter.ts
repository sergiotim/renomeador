export function filterAndSortFiles(files: FileList | File[]): File[] {
  // Converte para array caso seja um FileList
  const fileArray = Array.from(files);

  // Filtra apenas imagens JPEG/JPG (valida MIME type ou extensão)
  const filtered = fileArray.filter((file) => {
    const isJpegMime = file.type === 'image/jpeg';
    const hasJpgExtension = /\.(jpe?g)$/i.test(file.name);
    return isJpegMime || hasJpgExtension;
  });

  // Ordena alfabeticamente pelo nome original. 
  // O formato de timestamp da Lexmark garante que ordem alfabética = ordem cronológica.
  return filtered.sort((a, b) => a.name.localeCompare(b.name));
}
