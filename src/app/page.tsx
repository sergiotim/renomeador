import { FileUploadForm } from "@/components/FileUploadForm";

export default function Home() {
  return (
    <main className="min-h-screen p-4 sm:p-8 bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Cabeçalho */}
        <header className="text-center space-y-3 pt-8 pb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Renomeador de Arquivos JPG/JPEG em Massa
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
            Padronize rapidamente os nomes dos seus arquivos jpg/jpeg. 
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
          
          <div className="mt-8 flex justify-center">
            <p className="flex items-center gap-1.5 text-gray-500 bg-gray-100 px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <span>Desenvolvido por</span>
              <a 
                href="https://github.com/sergiotim" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-gray-700 hover:text-blue-600 hover:underline transition-all"
                title="Visitar GitHub de Sérgio Timoteo"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                Sérgio Timoteo
              </a>
            </p>
          </div>
        </footer>

      </div>
    </main>
  );
}
