# Arquitetura: Renomeador de Gabaritos

Este documento descreve a arquitetura de alto nível, as decisões de design e o fluxo de dados da aplicação "Renomeador de Gabaritos". Serve como um mapa para desenvolvedores e mantenedores entenderem como o sistema está estruturado.

## 1. Visão geral do sistema

Aplicação web estática para processar imagens de gabaritos em lote, executando todo o processamento localmente no navegador do usuário.

### Invariantes da arquitetura

Regras que nunca devem ser quebradas:

- **100% client-side:** a aplicação não deve ter back-end ativo para processamento de arquivos.
- **Zero tráfego de imagens:** os arquivos de imagem e o `.zip` gerado NUNCA são enviados por requisições HTTP a servidores externos; todo processamento ocorre em memória no navegador.
- **Agnóstico de OCR:** a aplicação trata apenas de nomenclatura e padronização dos arquivos da impressora Lexmark — não realiza OCR nas provas.

## 2. Decisões arquiteturais (ADRs)

| Decisão | Tecnologia escolhida | Justificativa |
| :--- | :--- | :--- |
| **Framework base** | **Next.js (Static Export) com React** | `output: 'export'` produz HTML/CSS/JS estático, permitindo hospedagem em GitHub Pages sem servidor. |
| **Linguagem** | **TypeScript** | Tipagem forte para manipulação segura das APIs nativas do navegador (`File`, `Blob`, `FileList`). |
| **Estilização** | **Tailwind CSS** | Desenvolvimento rápido de UI diretamente nos componentes, mantendo o repositório enxuto. |
| **Processamento ZIP** | **JSZip & FileSaver.js** | Geração do pacote em memória (JSZip) e acionamento do download no cliente (FileSaver). |

## 3. Mapa do código (code map)

A estrutura segue separação entre interface (view), controle/estado (hooks/controllers) e regras de negócio (services):

```text
src/
├── app/                      # Entry point (Next.js App Router - export estático)
│   ├── page.tsx              # Página principal (view container)
│   ├── layout.tsx            # Estrutura base do HTML
│   └── globals.css           # Variáveis e injeção do Tailwind
│
├── components/               # Componentes de UI (burros)
│   ├── ui/                   # Botões, inputs, cards padronizados
│   └── FileUploadForm.tsx    # Formulário para seleção de pasta (`webkitdirectory`)
│
├── hooks/                    # Gerenciamento de estado e fluxo
│   └── useRenamerLogic.ts    # Orquestra inputs, validações e carregamento
│
├── services/                 # Regras de negócio puras (sem React)
│   ├── fileFilter.ts         # Filtra apenas `.jpg`/`.jpeg` e ordena
│   ├── renameEngine.ts       # Algoritmo de renomeação e zero-fill (zfill)
│   └── zipGenerator.ts       # Montagem do pacote com JSZip
│
├── types/                    # Tipagens globais TypeScript
│   └── index.ts              # Definições (ex: `ProcessedFile`)
│
└── utils/                    # Utilitários (formatadores, validadores)
```

Como navegar pelo código:

- Para alterar como os zeros são preenchidos: `services/renameEngine.ts`.
- Para adicionar suporte a `.png`: `services/fileFilter.ts`.
- Para ajustar o visual de botões: `components/ui/Button.tsx`.

## 4. Fluxo de dados (data flow)

O ciclo de vida da informação ocorre em quatro estágios:

1. **Seleção (input):** o usuário usa `<input type="file" webkitdirectory />` e o navegador gera um array de objetos `File`.
2. **Filtragem e ordenação (service):** `fileFilter.ts` descarta tudo que não for `image/jpeg` e aplica `sort()` com base em `.name` (timestamp Lexmark).
3. **Processamento em memória (service):** `renameEngine.ts` gera um mapeamento `[arquivo_original, novo_nome_gerado]`.
4. **Empacotamento (service & output):** `zipGenerator.ts` cria um `JSZip`, insere cada imagem com o novo nome, gera um `Blob` e dispara o download.

## 5. Considerações de segurança e performance

- **Gerenciamento de memória (OOM):** processar muitas imagens de alta resolução pode estourar a memória do navegador. `zipGenerator.ts` deve processar em lotes assíncronos (batching) se o payload exceder um limiar (ex.: 500 MB).
- **Limpeza de estado:** após o download do `.zip`, liberar referências (por exemplo, setar o estado que guarda os `File[]` para `null`) para permitir que o garbage collector recupere memória.

---

Se quiser, posso rodar uma revisão ortográfica ou adaptar o arquivo para seguir um padrão ADR separado (ex: uma pasta `docs/adr`).