# Product Requirements Document (PRD) - Renomeador de Gabaritos

## 1. Visão Geral e Problema
O processo atual de digitalização de gabaritos de estudantes utilizando a impressora Lexmark MX711de gera arquivos de imagem `.jpg` com nomes baseados em *timestamps* (ex: `img_20260526_153022.jpg`). Para o processamento posterior (leitura óptica ou correção automatizada), é necessário que os arquivos sigam um padrão iterativo rigoroso (ex: `GABARITO_ALUNO_01.jpg`, `GABARITO_ALUNO_02.jpg`).
Renomear centenas de arquivos manualmente, turma por turma, é ineficiente e propenso a erros humanos.

**Objetivo do Produto:** Desenvolver uma ferramenta web simples, acessível via navegador e hospedada no GitHub Pages, que permita aos colaboradores da escola selecionar uma pasta de gabaritos recém-escaneados e aplicar um padrão de nomenclatura iterativo automaticamente, gerando um arquivo `.zip` com os resultados.

## 2. Público-Alvo
* **Colaboradores da Escola (Secretaria, Professores, Monitores):** Usuários que não possuem necessariamente conhecimento técnico avançado. A interface deve ser direta, amigável e à prova de falhas.

## 3. Escopo e Limitações
* **Dentro do Escopo:** Aplicação 100% *Client-Side* (rodando na memória do navegador). Seleção de diretório via `webkitdirectory`, filtragem de imagens JPG/JPEG, ordenação cronológica/alfabética, renomeação em lote e empacotamento via JSZip.
* **Fora do Escopo:** Armazenamento de arquivos em banco de dados ou nuvem, processamento de leitura óptica (OCR) para correção dos gabaritos, e manipulação de arquivos originais diretamente no disco rígido do usuário (limitação de segurança nativa de navegadores).

---

## 4. Requisitos Funcionais (RF)

| ID | Nome | Descrição Detalhada |
| :--- | :--- | :--- |
| **RF01** | **Seleção de Diretório** | O sistema deve fornecer um botão que abra o explorador de arquivos do sistema operacional, permitindo exclusivamente a seleção de pastas (utilizando o atributo `webkitdirectory`). |
| **RF02** | **Filtragem de Extensão** | Ao ler os arquivos da pasta selecionada, o sistema deve ignorar arquivos que não sejam imagens nos formatos `.jpg` ou `.jpeg` (case-insensitive). |
| **RF03** | **Input de Padrão de Nome** | O sistema deve conter um campo de texto obrigatório onde o usuário insere o prefixo desejado para os arquivos (ex: `PROVA_MAT_`). |
| **RF04** | **Input de Casas Decimais** | O sistema deve conter um campo numérico (valor padrão: `2`) que define o preenchimento de zeros à esquerda na iteração (ex: `2` = `01, 02`; `3` = `001, 002`). |
| **RF05** | **Ordenação de Origem** | O sistema deve ordenar os arquivos selecionados em ordem alfabética crescente com base no nome original antes de renomeá-los, garantindo que o *timestamp* da Lexmark mantenha a ordem cronológica do scanner. |
| **RF06** | **Processamento em Memória** | O sistema deve gerar novos nomes unindo o "Padrão" + "Número Iterativo" + ".jpg". A iteração deve começar obrigatoriamente no número 1. |
| **RF07** | **Geração de Arquivo ZIP** | O sistema deve compactar todas as imagens renomeadas em um único arquivo `.zip` sem enviá-las para nenhum servidor. |
| **RF08** | **Download Automático** | Ao finalizar a compactação, o sistema deve acionar automaticamente o download do arquivo gerado para a máquina do usuário. O nome do arquivo zip deve ser `arquivos_renomeados.zip` ou o próprio nome do padrão digitado. |

---

## 5. Requisitos Não Funcionais (RNF)

| ID | Nome | Descrição Detalhada |
| :--- | :--- | :--- |
| **RNF01** | **Arquitetura Client-Side** | O sistema não deve possuir dependência de backend (Node/Python). Toda a manipulação de `File` / `Blob` deve ocorrer no cliente para permitir a hospedagem no GitHub Pages. |
| **RNF02** | **Privacidade e Segurança** | Sob nenhuma circunstância as imagens dos alunos devem trafegar pela rede (sem requisições HTTP POST para APIs externas). |
| **RNF03** | **Feedback Visual** | O sistema deve exibir um *loading* (indicador de carregamento) durante a geração do arquivo ZIP, bloqueando o botão de ação para evitar duplos cliques. |
| **RNF04** | **Tratamento de Erros** | O sistema deve exibir alertas visuais claros se o usuário tentar processar sem preencher o padrão, ou se a pasta selecionada não contiver imagens JPG. |

---

## 6. Plano de Testes e Critérios de Aceite

Para garantir a qualidade e a confiabilidade da aplicação escolar, cada requisito funcional deve ser testado seguindo o roteiro abaixo.

### Teste 01: Validação de Inputs Vazios (RF03, RF04, RNF04)
* **Passos:** 1. Abra a aplicação.
    2. Deixe o campo "Padrão de Nome" vazio.
    3. Clique no botão de processar/renomear.
* **Resultado Esperado:** A aplicação não deve avançar. Deve exibir uma mensagem de erro clara informando que o preenchimento do padrão é obrigatório.

### Teste 02: Filtragem de Extensões (RF02)
* **Passos:** 1. Crie uma pasta no seu computador.
    2. Coloque 3 arquivos `.jpg`, 1 arquivo `.png`, e 1 arquivo `.pdf`.
    3. Na aplicação, selecione esta pasta.
    4. Digite o padrão `TESTE_` e casas decimais `2`.
    5. Processe e baixe o ZIP.
* **Resultado Esperado:** O arquivo ZIP gerado deve conter exatamente **3 arquivos** (`TESTE_01.jpg`, `TESTE_02.jpg`, `TESTE_03.jpg`). O PNG e o PDF devem ser completamente ignorados.

### Teste 03: Validação da Ordenação Lexmark (RF05)
* **Passos:** 1. Crie 3 arquivos vazios `.jpg` e nomeie-os simulando o scanner: `scan_1003.jpg`, `scan_1001.jpg`, `scan_1002.jpg`.
    2. Selecione a pasta com eles.
    3. Digite o padrão `ORDEM_` com `1` casa decimal.
    4. Processe e extraia o ZIP.
* **Resultado Esperado:** O arquivo `scan_1001.jpg` deve ter virado `ORDEM_1.jpg`, o `scan_1002.jpg` virado `ORDEM_2.jpg` e o `scan_1003.jpg` virado `ORDEM_3.jpg`, provando que o sistema organizou os nomes originais em ordem crescente antes de iterar.

### Teste 04: Regra das Casas Decimais (RF04, RF06)
* **Passos:** 1. Selecione uma pasta com 15 imagens `.jpg`.
    2. Digite o padrão `GABARITO_` e defina **3** casas decimais.
    3. Processe e baixe.
* **Resultado Esperado:** Os primeiros arquivos devem ser `GABARITO_001.jpg`, `GABARITO_002.jpg` e o último arquivo deve ser `GABARITO_015.jpg`.

### Teste 05: Proteção de Duplo Clique e UX (RNF03)
* **Passos:** 1. Selecione uma pasta com uma quantidade grande de imagens (ex: 50+).
    2. Preencha os campos e clique repetidamente e rapidamente no botão de "Gerar ZIP".
* **Resultado Esperado:** O botão deve entrar em estado de *loading* ou desabilitar no primeiro clique. Apenas 1 download deve ser acionado no final do processo, independentemente de quantos cliques foram dados.

### Teste 06: Modo Avião / Offline (RNF01, RNF02)
* **Passos:** 1. Carregue a página da ferramenta no navegador.
    2. Desconecte o computador da internet (desligue o Wi-Fi).
    3. Selecione uma pasta, preencha os dados e mande processar.
* **Resultado Esperado:** O processo deve ocorrer perfeitamente e o download do ZIP deve ser concluído com sucesso, comprovando que nenhum dado precisa ser enviado para a internet para o software funcionar.