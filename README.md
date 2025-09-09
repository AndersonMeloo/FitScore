🚀 Tecnologias:
- Backend: Node.js - Fastify, Prisma ORM
- Banco de dados: MongoDB
- Frontend: React, TypeScript, TailwindCSS

### 📁 Estrutura de Pastas Back-End

```bash
backend/
├── node_modules/           
├── prisma/                 
│   └── schema.prisma       
├── src/                    
│   ├── controllers/        
│   │   ├── CreateUserController.ts
│   │   ├── DeleteUserController.ts
│   │   ├── ListUserController.ts
│   │   └── UpdateUserController.ts
│   ├── services/          
│   │   ├── CreateUserService.ts
│   │   ├── DeleteUserService.ts
│   │   ├── ListUserService.ts
│   │   └── UpdateUserService.ts
│   ├── routes.ts           
│   └── server.ts           
├── .env                    
├── package.json            
├── package-lock.json       
└── tsconfig.json           
```
### 🚀 Como Rodar o Backend
```bash

## Acesse a pasta
cd backend

## Inicie o Servidor
npm run dev

## Inicie o Prisma
npx prisma studio
```

### Backend

- [x]  Integração com o MongoDB
- [x]  ORM: Prisma para acesso e manipulação do banco de dados
- [x]  Services - Lógica e manipulação de Dados
- [x]  Cadastro de Usuários, Logins
- [x]  Controllers - Recebe as Requisições da API, valida e chama Services
- [x]  Rotas - Criação de endpoints e integração com Frontend
- [x]  Criação das Rotas do Formulário POST e GET  
- [x]  CRUD dos Usuários - (GET, POST, PUT, DELETE)

### 📁 Estrutura de Pastas Front-End
```bash
frontend/
├── public/                 
├── src/                   
│   ├── components/         
│   ├── contexts/           
│   ├── pages/              
│   ├── services/          
│   ├── App.tsx             
│   └── main.tsx           
├── index.html              
├── package.json            
├── package-lock.json       
├── tailwind.config.js      
├── tsconfig.json           
└── vite.config.ts        
```

### Frontend

- [x] Criação das Páginas. Sidebar (Aonde ficará a Dashboard) Login, Cadastro, Dashboard, Formulário, Relatório
- [x] Contexto de Autenticação (AuthContext)
- [x] Redirecionamento após autenticação
- [x] Bloco de Perguntas do Formulário 
- [x] Integração da API 
- [ ] Estilização com Tailwind. Em andamento

### 🚀 Como Rodar o Projeto
#### Clonar repositório 
```bash
git clone https://github.com/seu-usuario/fitscore.git

## Acesse a pasta
cd fitscore

## Instalando as dependências
npm install / npm i

## Executando o projeto
npm run dev
```

