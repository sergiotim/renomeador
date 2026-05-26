<div align="center">
  <h1>📝 Renomeador de Gabaritos</h1>
  <p>Uma aplicação web estática e 100% client-side para renomeação em lote de imagens (gabaritos), projetada com foco em performance e privacidade.</p>

  <img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React" />
</div>

<br />

## 📖 Sobre o Projeto

O **Renomeador de Gabaritos** é uma ferramenta utilitária desenvolvida para facilitar a organização de arquivos digitalizados (especialmente de scanners Lexmark). Ele renomeia os arquivos de forma sequencial, adicionando preenchimento de zeros (padding) para manter a ordem correta.

**Diferenciais:**
- **Zero OCR:** Foco estrito em renomeação e organização. Não realiza reconhecimento de texto.
- **100% Client-Side:** Todo o processamento (leitura, ordenação, renomeação e compactação) ocorre diretamente no seu navegador. Nenhuma imagem é enviada para servidores externos, garantindo máxima **privacidade** e **segurança**.
- **Gestão de Memória:** Otimizado para lidar com grandes lotes de imagens de alta resolução sem causar travamentos (Out-Of-Memory) no navegador.

## ✨ Funcionalidades

- 📁 **Seleção de Diretórios:** Permite selecionar uma pasta inteira contendo as imagens de uma só vez.
- 🔤 **Ordenação Inteligente:** Mantém a ordem cronológica de digitalização ordenando os arquivos alfabeticamente pelo nome original.
- 📦 **Exportação em Lote:** Compacta automaticamente todos os arquivos renomeados em um único arquivo `.zip` para download fácil.
- ⚡ **Alta Performance:** Uso das APIs nativas do navegador (`File`, `Blob`, `FileList`), `jszip` e `file-saver`.

## 🛠️ Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JSZip](https://stuk.github.io/jszip/) (Para geração de arquivos .zip em memória)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js) (Para acionar os downloads)
- [Lucide React](https://lucide.dev/) (Ícones)

## 🏗️ Arquitetura e Estrutura

O projeto foi configurado como um **Static Export** (`output: 'export'` no `next.config.ts`), o que significa que ele pode ser hospedado facilmente em qualquer servidor estático, como o GitHub Pages.

A estrutura de pastas segue uma arquitetura baseada em responsabilidades:

- `/src/app`: Rotas e páginas do Next.js.
- `/src/components`: Componentes da interface do usuário (UI).
- `/src/hooks`: Gerenciamento de estado e regras de orquestração (ex: `useRenamerLogic`).
- `/src/services`: Lógica de negócios pura (filtragem, motor de renomeação, geração de zip).
- `/src/utils` & `/src/types`: Funções auxiliares globais e tipagens do TypeScript.

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18.17 ou superior)
- Gerenciador de pacotes: `npm`, `yarn`, `pnpm` ou `bun`.

### Passos para Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/renomeador.git
   cd renomeador
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação funcionando.

## 📦 Build para Produção

Para gerar a versão estática otimizada do projeto (para hospedagem em GitHub Pages, Vercel, Netlify, etc.), execute:

```bash
npm run build
```

Os arquivos estáticos serão gerados na pasta `/out`.

## 🤝 Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver uma ideia de melhoria, sinta-se à vontade para abrir uma *Issue* ou enviar um *Pull Request*.

1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/MinhaNovaFeature`)
3. Faça o Commit de suas mudanças (`git commit -m 'Add some MinhaNovaFeature'`)
4. Faça o Push para a Branch (`git push origin feature/MinhaNovaFeature`)
5. Abra um Pull Request

---

<div align="center">
  Desenvolvido com 💻 e ☕.
</div>
