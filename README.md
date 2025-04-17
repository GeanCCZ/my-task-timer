<div align="center"> <img src="https://6t7sm2897i.ufs.sh/f/VCIgGDrhiGZSi594F93QKrVom0xsetjZJWXPNAbfFqz826c3" alt="Logo" width="300"/> </div>

Um sistema para organização e acompanhamento de tarefas utilizando um **kanban**, **timer**, **calendário mensal** e um **gráfico de atividades** no estilo do GitHub.

---

## Tecnologias

- ![Nx](https://img.shields.io/badge/Monorepo-Nx-143055?logo=nx&logoColor=white) [Nx](https://nx.dev/)
- ![Angular](https://img.shields.io/badge/Frontend-Angular-DD0031?logo=angular&logoColor=white) Angular
- ![NestJS](https://img.shields.io/badge/Backend-NestJS-E0234E?logo=nestjs&logoColor=white) NestJS
- ![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql&logoColor=white) PostgreSQL
- ![Redis](https://img.shields.io/badge/Cache-Redis-DC382D?logo=redis&logoColor=white) Redis
- ![Docker](https://img.shields.io/badge/Container-Docker-2496ED?logo=docker&logoColor=white) Docker
- ![DrizzleORM](https://img.shields.io/badge/ORM-DrizzleORM-000000?logo=data:image/svg+xml;base64,[INSERIR-LOGO-BASE64]) DrizzleORM
---

## Autenticação

A autenticação será baseada em **JWT (JSON Web Token)**, com suporte para:

- **Access Token** (tempo de vida curto, usado para requisições autenticadas).
- **Refresh Token** (armazenado no cache e utilizado para renovar o Access Token).

📌 **Cache:** O Redis será utilizado para armazenar os Refresh Tokens, garantindo segurança e eficiência.

---

## Funcionalidades

### **Gerenciamento de Tarefas**

- Organização de tarefas em um **Kanban** (to-do, in progress, done).
- Definição de **datas de vencimento** e **status**.

### **Timer para Foco e Rastreamento de Tempo**

- Contagem de tempo gasto em cada tarefa.
- Salvamento do tempo total trabalhado.

### **Calendário Mensal**

- Visualização das tarefas distribuídas ao longo do mês.

### **Gráfico de Atividades**

- Estilo "GitHub contribution graph".
- Representação visual do progresso ao longo do tempo.

---

## Requisitos Funcionais

### 📌 **Usuários e Autenticação**

- [RF001] O sistema deve permitir o **cadastro de usuários** com username e senha.
- [RF002] O usuário deve ser capaz de **fazer login** utilizando JWT (access e refresh token).
- [RF003] O sistema deve suportar **recuperação de senha** via e-mail.

### 📌 **Gerenciamento de Tarefas**

- [RF004] O usuário pode **criar, editar e excluir** tarefas.
- [RF005] O sistema deve permitir **organizar tarefas em um quadro Kanban**.
- [RF006] Cada tarefa deve ter um **status** (To-Do, In Progress, Done).
- [RF007] O usuário pode definir um **prazo (due date)** para cada tarefa.

### 📌 **Timer e Rastreamento de Tempo**

- [RF008] O usuário pode **iniciar e pausar um timer** para medir o tempo gasto na tarefa.
- [RF009] O sistema deve calcular e armazenar o **tempo total gasto** na tarefa.

### 📌 **Visualização e Relatórios**

- [RF010] O usuário pode visualizar um **calendário mensal** com suas tarefas.
- [RF011] O sistema deve exibir um **gráfico de atividades** com as tarefas concluídas por dia.

---

## API Endpoints

### **Autenticação** (`/auth`)(✅)

| Método | Endpoint         | Descrição                      | Autenticação |
| ------ | ---------------- | ------------------------------ | ------------ |
| `POST` | `/auth/register` | Criação de conta               | ❌           |
| `POST` | `/auth/login`    | Login e obtenção de tokens JWT | ❌           |
| `POST` | `/auth/refresh`  | Gera novo Access Token         | ✅ (refresh) |
| `POST` | `/auth/logout`   | Invalida o Refresh Token       | ✅           |

---

### **Tarefas** (`/tasks`)(✅)

| Método   | Endpoint     | Descrição                          | Autenticação |
| -------- | ------------ | ---------------------------------- | ------------ |
| `POST`   | `/tasks`     | Criar uma nova tarefa              | ✅           |
| `GET`    | `/tasks`     | Listar todas as tarefas do usuário | ✅           |
| `GET`    | `/tasks/:id` | Buscar detalhes de uma tarefa      | ✅           |
| `PUT`    | `/tasks/:id` | Atualizar uma tarefa               | ✅           |
| `DELETE` | `/tasks/:id` | Remover uma tarefa                 | ✅           |

---

### **Timer** (`/tasks/:id/timer`)(✅)

| Método | Endpoint                 | Descrição       | Autenticação |
| ------ | ------------------------ | --------------- | ------------ |
| `POST` | `/tasks/:id/timer/start` | Iniciar o timer | ✅           |
| `POST` | `/tasks/:id/timer/stop`  | Parar o timer   | ✅           |

---

### **Relatórios & Visualização** (`/reports`)()

| Método | Endpoint            | Descrição                                  | Autenticação |
| ------ | ------------------- | ------------------------------------------ | ------------ |
| `GET`  | `/reports/calendar` | Retorna as tarefas organizadas por mês     | ✅           |
| `GET`  | `/reports/activity` | Retorna o gráfico de atividades do usuário | ✅           |
