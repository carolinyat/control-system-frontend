# 🎙️ Pro-Nuncia – Ferramenta de Análise de Pronúncia

## 📋 Índice

- [✨ Funcionalidades](#-funcionalidades)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📋 Pré-requisitos](#-pré-requisitos)
- [🔧 Como Executar o Projeto](#-como-executar-o-projeto)

---

## ✨ Funcionalidades

- 🔐 **Autenticação de Usuários**: Login individual para cada usuário (administrador ou comum).

- 🔑 **Recuperação de Senha**: Opção para redefinir senha via e-mail.

- 📊 **Dashboard Administrativo**: Administradores podem listar, cadastrar, editar e redefinir senha de usuários por empresa.

- 👥 **Gerenciamento de Usuários**: CRUD de usuários restrito a administradores.

- 🎮 **Treino Gamificado**: Usuários têm acesso a um “jogo de pronúncia”, semelhante ao Duolingo, com pontuação e níveis de dificuldade.

- 🗣️ **Análise de Pronúncia com IA**: Avaliação automática da pronúncia do usuário.

- 📈 **Evolução**: Visualização do progresso do usuário ao longo do tempo.

- 📑 **Relatórios**: Geração de relatórios com desempenho e exportação em PDF.

- 👤 **Perfil do Usuário**: Área para visualizar e atualizar informações pessoais.

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

| Ferramenta | Descrição |
| :--- | :--- |
| **React** | Biblioteca principal para a construção da interface. |
| **Vite** | Ferramenta de build rápida e moderna para o frontend. |
| **TypeScript** | Superset do JavaScript que adiciona tipagem estática. |
| **React Router DOM** | Para gerenciamento de rotas e navegação entre páginas. |
| **React Icons** | Biblioteca com uma vasta gama de ícones populares. |
| **CSS Modules** | Estilização modular e organizada dos componentes. |

---

## 📋 Pré-requisitos

- [**Node.js**](https://nodejs.org/) (versão 20 ou superior)
- [**Git**](https://git-scm.com/) (para clonar o repositório)

---

## 🔧 Como Executar o Projeto

Siga os passos abaixo para rodar o Tasknado em seu ambiente local:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/carolinyat/control-system-frontend](https://github.com/carolinyat/control-system-frontend)
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd control-system-frontend
    ```

3.  **Instale as dependências:**
    *Este comando instalará todas as dependências listadas no `package.json`.*
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  **Acesse a aplicação:**
    *Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada no seu terminal).*
