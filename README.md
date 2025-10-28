# 🎙️ Pro-Nuncia – Ferramenta de Análise de Pronúncia

## 📋 Índice
- [✨ Funcionalidades](#-funcionalidades)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📋 Pré-requisitos](#-pré-requisitos)
- [🔧 Como Executar o Projeto](#-como-executar-o-projeto)
- [🧩 Estrutura do Projeto](#-estrutura-do-projeto)
- [📂 Organização das Páginas](#-organização-das-páginas)

---

## ✨ Funcionalidades

- 🔐 **Autenticação de Usuários**  
  Login individual com controle de sessão e papéis de acesso (**Administrador** ou **Cliente**).

- 🔑 **Recuperação de Senha**  
  Função de redefinição via e-mail (simulada/local).

- 📊 **Dashboard Gamificado**  
  Tela inicial interativa com fases e desafios de pronúncia.

- 🗣️ **Análise de Pronúncia com IA**  
  O usuário grava sua voz e recebe feedback automático de pontuação.

- 📈 **Evolução**  
  Exibe a progressão do usuário com base nas pontuações médias por fase.

- 📑 **Relatórios**  
  Geração automática de relatórios de desempenho com **download em PDF** (usando `jspdf` e `html2canvas`).

- 👤 **Perfil do Usuário**  
  Página para editar nome, e-mail e visualizar CPF e data de nascimento.  
  Inclui modal para alteração de senha.

- 👥 **Gerenciamento de Usuários (Admin)**  
  CRUD completo de usuários com busca, edição e exclusão — acessível apenas para administradores.

- 🏆 **Pontuação Dinâmica**  
  A pontuação média é atualizada automaticamente e exibida em um card fixo nas telas principais.

---

## 🚀 Tecnologias Utilizadas

| Ferramenta | Descrição |
| :--- | :--- |
| **React** | Biblioteca principal para construção da interface. |
| **Vite** | Ambiente de desenvolvimento rápido e moderno. |
| **TypeScript** | Superset do JavaScript com tipagem estática. |
| **React Router DOM** | Controle de rotas e navegação entre páginas. |
| **React Icons** | Ícones populares utilizados na interface. |
| **CSS Modules** | Estilização modular e isolada por componente. |
| **jsPDF / html2canvas** | Geração de relatórios em PDF a partir do conteúdo da tela. |

---

## 📋 Pré-requisitos

Antes de começar, instale as seguintes ferramentas:

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

    ---

## 🧩 Estrutura do Projeto

```
pro-nuncia/
│
├── src/
│   ├── components/         # Componentes reutilizáveis (Sidebar, ScoreBox, etc)
│   ├── context/            # Contexto global (AuthContext)
│   ├── pages/              # Páginas principais (Dashboard, Perfil, Relatório, etc)
│   ├── styles/             # CSS Modules de cada componente/página
│   ├── assets/             # Ícones e imagens estáticas
│   ├── main.tsx            # Ponto de entrada do React
│   └── router.tsx          # Definição de rotas
│
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📂 Organização das Páginas

| Página | Caminho | Descrição |
| :--- | :--- | :--- |
| **Login** | `/` | Tela inicial de autenticação. |
| **Dashboard** | `/dashboard` | Exibe as fases e acesso ao treino de pronúncia. |
| **Pronúncia** | `/pronuncia` | Área de gravação e análise de voz. |
| **Evolução** | `/evolucao` | Mostra o progresso do usuário. |
| **Relatório** | `/relatorio` | Gera relatório e exporta para PDF. |
| **Perfil** | `/perfil` | Edição de informações do usuário. |
| **Admin/Usuários** | `/admin/usuarios` | CRUD de usuários (restrito a administradores). |

---

## 💬 Observações

- O controle de papéis (Administrador / Cliente) é armazenado temporariamente no `localStorage` durante o desenvolvimento.  
- Em versões futuras, a autenticação e os dados de pontuação serão integrados a um backend com API.

---

<!-- ## 🛠️ Autoria

Projeto desenvolvido por **Caroliny Abreu**,  
graduanda em **Engenharia de Software - INATEL**. -->

