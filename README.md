# MCPFlix

**MCPFlix** é um hub para exibição dos filmes produzidos pelos alunos dos 2ºs anos da EEEP Maria Célia Pinheiro Falcão (escola de ensino médio técnico profissional). Este projeto foi idealizado para armazenar e exibir de forma intuitiva, moderna e acessível as obras cinematográficas criadas no âmbito do trabalho de Naturezas e suas Tecnologias.

## 🎥 Objetivo
O objetivo do MCPFlix é centralizar, organizar e oferecer uma plataforma moderna para que alunos, professores e demais interessados possam assistir aos filmes produzidos pelas turmas. Além de ser um desafio técnico para explorar e aprimorar conhecimentos em programação web, o projeto busca resolver uma necessidade prática da escola.

## 🛠️ Tecnologias Utilizadas
- **Front-end**:
  - [Next.js](https://nextjs.org/): Framework React para construção de aplicações web modernas e performáticas.
  - [React](https://reactjs.org/): Biblioteca para criação de interfaces de usuário dinâmicas.
  - [Tailwind CSS](https://tailwindcss.com/): Framework CSS utilitário para estilização rápida e consistente.

- **Back-end e Banco de Dados**:
  - [Supabase](https://supabase.com/): Plataforma que oferece banco de dados PostgreSQL e autenticação pronta para uso.

## 🌟 Funcionalidades
- **Catálogo de filmes**: Navegue por uma lista de filmes com informações como título, ano de lançamento e sinopse.
- **Favoritos**: Marque seus filmes preferidos para acesso rápido.
- **Player integrado**: Assista aos filmes diretamente pelo site com links armazenados no Google Drive.
- **Design moderno e intuitivo**: Interface leve e amigável, ideal para todos os usuários.

## 📂 Estrutura do Banco de Dados
O banco de dados foi configurado com as seguintes tabelas principais:

1. **movies**:
   - `id`: Identificador único do filme.
   - `titulo`: Título do filme.
   - `release_year`: Ano de lançamento.
   - `link_drive`: Link para o filme armazenado no Google Drive.
   - `synopsis`: Descrição breve do filme.
   - `duration`: Duração do filme em minutos
   - `category_id`: Chave estrangeira para a tabela `category`
   - `link_cover`: Link para a capa do filme

2. **category**:
   - `id`: Identificador da categoria.
   - `name`: Nome da categoria, eg (Ação, Comédia...).

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado (versão 16 ou superior)
- Conta no [Supabase](https://supabase.com/) configurada
- Gerenciador de pacotes (npm ou yarn)

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/GuilhermmeDev/mcpflix.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd mcpflix
   ```
3. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```
4. Configure as variáveis de ambiente:
   Crie um arquivo `.env.local` na raiz do projeto e adicione as chaves do Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
6. Acesse o projeto em `http://localhost:3000`.

## 👨‍💻 Desenvolvedor
Este projeto foi desenvolvido por **Guilherme Morais**, aluno da EEEP Maria Célia Pinheiro Falcão. Além de ser um desafio pessoal, o MCPFlix foi criado com a intenção de contribuir para a realidade escolar e explorar tecnologias modernas no desenvolvimento web.

- GitHub: [@GuilhermmeDev](https://github.com/GuilhermmeDev)

---

Feito com ❤️ para a comunidade escolar. **MCPFlix: Onde o cinema escolar ganha vida!**

