import { FileUploadForm } from "@/components/FileUploadForm";

export default function Home() {
  return (
    <main className="min-h-screen p-4 sm:p-8 bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Cabeçalho */}
        <header className="text-center space-y-3 pt-8 pb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Renomeador de Gabaritos
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
            Padronize rapidamente os nomes das provas escaneadas da Lexmark. 
            Seus arquivos não são enviados para a internet; tudo acontece de forma segura no seu computador.
          </p>
        </header>

        {/* Formulário Principal */}
        <FileUploadForm />

        {/* Rodapé e Instruções de Uso */}
        <footer className="pt-8 pb-12 text-sm text-gray-500 border-t border-gray-200 mt-12">
          <h3 className="font-semibold text-gray-700 mb-2">Como usar:</h3>
          <ol className="list-decimal pl-5 space-y-1 mb-6">
            <li>Coloque as imagens geradas pelo scanner em uma única pasta no seu computador.</li>
            <li>Use o botão de upload acima para selecionar essa pasta.</li>
            <li>Defina o padrão de nomenclatura (ex: <code>PROVA_MAT_</code>) e a quantidade de zeros.</li>
            <li>Clique em "Gerar e Baixar ZIP". O sistema vai ordenar pela ordem de digitalização e empacotar tudo em ordem!</li>
          </ol>
          <p className="text-center">Desenvolvido para uso estático 100% Client-Side. Hospedagem via GitHub Pages.</p>
        </footer>

      </div>
    </main>
  );
}
