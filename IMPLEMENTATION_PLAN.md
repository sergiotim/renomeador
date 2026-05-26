# Plano de Implementação: Renomeador de Gabaritos

Este checklist segue uma arquitetura baseada em separação de responsabilidades (Clean Code / MVC-like). 
As etapas devem ser executadas em ordem.

## Fase 1: Setup e Infraestrutura
- [x] 1. Inicializar Next.js (App Router, Tailwind, TS) no diretório atual.
- [x] 2. Ajustar `next.config.js` (ou `next.config.ts`) para `output: 'export'`.
- [x] 3. Limpar boilerplate do `src/app/page.tsx` e `src/app/globals.css`.
- [x] 4. Instalar dependências (`jszip`, `file-saver`, `lucide-react`, `@types/file-saver`).
- [x] 5. Criar a estrutura de diretórios base (`components/ui`, `hooks`, `services`, `types`, `utils`).
- [x] 6. Escrever os contratos de dados em `src/types/index.ts`.

## Fase 2: Regras de Negócio (Services)
*Estes serviços não devem ter dependência do React.*
- [x] 7. Implementar `src/services/fileFilter.ts`:
  - Receber `FileList` ou `File[]`.
  - Filtrar apenas `image/jpeg` e `image/jpg` (case-insensitive).
  - Ordenar arquivos alfabeticamente usando `localeCompare` no `file.name` (garante ordem Lexmark).
- [x] 8. Implementar `src/services/renameEngine.ts`:
  - Receber `File[]` filtrado e `RenamerConfig`.
  - Retornar `ProcessedFile[]`.
  - Aplicar lógica de zero-fill baseada no input numérico (`padding`).
- [x] 9. Implementar `src/services/zipGenerator.ts`:
  - Receber `ProcessedFile[]`.
  - Utilizar `JSZip` para adicionar arquivos.
  - Retornar um `Blob` (com batching nativo/async se possível para evitar OOM).

## Fase 3: Orquestração e Estado (Hooks)
- [x] 10. Implementar `src/hooks/useRenamerLogic.ts`:
  - Gerenciar estados de: `files` selecionados, `isProcessing`, `progress` (se aplicável), e `errors`.
  - Orquestrar a chamada sequencial: `fileFilter` -> `renameEngine` -> `zipGenerator` -> `FileSaver.saveAs`.
  - Limpar as referências de memória dos arquivos após a finalização (Prevenção de Memory Leak).

## Fase 4: Interface de Usuário (Components & View)
- [ ] 11. Criar componentes UI puros (`src/components/ui/Button.tsx`, `src/components/ui/Input.tsx`, etc.) usando Tailwind.
- [ ] 12. Implementar `src/components/FileUploadForm.tsx`:
  - Formulário com input `webkitdirectory` para pastas.
  - Campos controlados para prefixo (RF03) e padding (RF04).
  - Tratamento visual de validações e erros.
- [ ] 13. Integrar tudo em `src/app/page.tsx`:
  - Importar e renderizar o form.
  - Conectar aos hooks.
  - Adicionar cabeçalho, instruções e rodapé seguindo um design limpo e acessível.

## Fase 5: Revisão e Testes Manuais
- [ ] 14. Validar proteção de clique duplo (loading state).
- [ ] 15. Validar filtragem: tentar subir pasta com PDFs e PNGs (não devem processar).
- [ ] 16. Build Estático: Rodar `npm run build` e confirmar geração da pasta `out/`.
