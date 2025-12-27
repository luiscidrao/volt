# Volt Energia Solar - Sistema para Empresa de Energia Solar

Este projeto é uma solução para empresas de energia solar, desenvolvida com Next.js e React. O sistema inclui uma landing page moderna com calculadora de energia solar, integração com WhatsApp para atendimento ao cliente, página de contato e um sistema de gerenciamento de conteúdo para projetos realizados.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor
- **React**: Biblioteca JavaScript para construção de interfaces
- **Styled Components**: CSS-in-JS para estilização de componentes
- **React Icons**: Biblioteca de ícones para React
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados
- **Mongoose**: ODM (Object Data Modeling) para MongoDB e Node.js
- **JWT**: JSON Web Tokens para autenticação
- **bcryptjs**: Biblioteca para criptografia de senhas

## Funcionalidades

### 1. Página Inicial
- Design moderno e responsivo
- Seções de destaque para benefícios da energia solar
- Processo de instalação passo a passo
- Depoimentos de clientes
- Chamadas para ação estratégicas

### 2. Calculadora de Energia Solar
- Formulário interativo para cálculo de economia
- Estimativa de potência do sistema necessário
- Cálculo de retorno do investimento
- Estimativa de redução de emissões de CO₂

### 3. Integração com WhatsApp
- Botão de contato rápido via WhatsApp
- Integração direta com o número da empresa

### 4. Página de Contato
- Formulário de contato completo
- Informações de contato da empresa
- Mapa de localização
- Links para redes sociais

### 5. Sistema de Gerenciamento de Projetos
- Exibição de projetos realizados
- Filtros por categoria, potência e ano
- Busca por texto
- Paginação para navegação entre projetos

## Estrutura do Projeto

```
landingpagelccn/
├── components/
│   └── Layout.js         # Componente de layout com header e footer
├── pages/
│   ├── _app.js           # Configuração global do Next.js
│   ├── index.js          # Página inicial
│   ├── calculadora.js    # Calculadora de energia solar
│   ├── contato.js        # Página de contato
│   ├── projetos.js       # Sistema de gerenciamento de projetos
│   └── api/
│       ├── auth/
│       │   └── login.js  # API de autenticação
│       ├── clients/
│       │   └── [id].js   # API de gerenciamento de clientes
│       ├── clients.js    # API de listagem de clientes
│       ├── database.js   # Configuração de conexão com MongoDB
│       ├── migrate.js    # Utilitário para migração de dados
│       ├── models/       # Modelos de dados Mongoose
│       │   ├── Client.js
│       │   ├── Lead.js
│       │   ├── Project.js
│       │   └── User.js
│       ├── middleware/
│       │   └── auth.js   # Middleware de autenticação
│       └── utils/
│           └── migrateData.js # Utilitário para migração de dados
├── data/
│   └── projects.json     # Dados de projetos (legado)
├── public/
│   └── images/           # Imagens utilizadas no site
├── next.config.js        # Configuração do Next.js
└── package.json          # Dependências do projeto
```

