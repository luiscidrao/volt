# SolarTech - Sistema para Empresa de Energia Solar

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

## Como Executar o Projeto

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/landingpagelccn.git
cd landingpagelccn
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Configuração do Banco de Dados

Para configurar o banco de dados MongoDB, siga os passos abaixo:

1. Configure o banco de dados MongoDB:
   - Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) ou instale o MongoDB localmente
   - Crie um banco de dados para o projeto
   - Crie um arquivo `.env.local` na raiz do projeto e configure as variáveis de ambiente:
     ```
     MONGODB_URI=sua_string_de_conexao_mongodb
     JWT_SECRET=sua_chave_secreta_para_jwt

     # Configuração de Email (para envio de formulários)
     EMAIL_HOST=smtp.seu_provedor.com
     EMAIL_PORT=587
     EMAIL_SECURE=false
     EMAIL_USER=seu_email@exemplo.com
     EMAIL_PASS=sua_senha_ou_app_password
     EMAIL_FROM=noreply@voltenergiasolar.com.br
     ```

2. Execute a migração de dados (opcional):
   - Se você já possui dados nos arquivos JSON em `/data`, pode migrá-los para o MongoDB
   - Faça uma requisição POST para `/api/migrate` com o corpo apropriado

3. Reinicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### Solução de Problemas

#### Problemas de Conexão com o Banco de Dados
- Verifique se a string de conexão do MongoDB está correta
- Certifique-se de que o IP do seu servidor está na lista de IPs permitidos no MongoDB Atlas
- Verifique se o banco de dados está acessível

#### Problemas de Autenticação
- Limpe os cookies e o localStorage do navegador
- Verifique se o JWT_SECRET está configurado corretamente no arquivo .env.local
- Certifique-se de que o usuário existe no banco de dados

## Personalização

Para personalizar o site para sua empresa de energia solar:

1. Substitua as imagens em `public/images/` por imagens da sua empresa
2. Atualize as informações de contato no componente `Layout.js`
3. Modifique os textos e descrições nas páginas conforme necessário
4. Ajuste as cores e estilos no arquivo `_app.js` para corresponder à identidade visual da sua empresa

## Implantação

Este projeto pode ser facilmente implantado em plataformas como Vercel, Netlify ou qualquer outro serviço que suporte Next.js.

Para implantar na Vercel:

1. Faça push do seu código para um repositório GitHub
2. Importe o projeto na Vercel
3. A Vercel detectará automaticamente que é um projeto Next.js e configurará as opções de build

## Licença

Este projeto está licenciado sob a licença MIT.
# volt
