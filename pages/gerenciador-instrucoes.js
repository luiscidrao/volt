import styled from 'styled-components';
import Layout from '../components/Layout';
import { FaEdit, FaFilter, FaPlus, FaTrash, FaImage, FaCalendarAlt, FaMapMarkerAlt, FaSolarPanel, FaSearch, FaLightbulb } from 'react-icons/fa';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const Section = styled.section`
  margin-bottom: 4rem;
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const InstructionText = styled.div`
  line-height: 1.8;
  color: #555;
  font-size: 1.1rem;
  margin-bottom: 2rem;

  p {
    margin-bottom: 1rem;
  }

  ul, ol {
    margin-left: 1.5rem;
    margin-bottom: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  strong {
    color: ${({ theme }) => theme.colors.dark};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const CodeBlock = styled.pre`
  background-color: ${({ theme }) => theme.colors.light};
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  border-left: 4px solid ${({ theme }) => theme.colors.secondary};
`;

const ImageContainer = styled.div`
  margin: 2rem 0;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const ImageCaption = styled.p`
  text-align: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.light};
  color: #666;
  font-size: 0.9rem;
  margin: 0;
`;

const StepContainer = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const StepTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const TipBox = styled.div`
  background-color: rgba(153, 194, 77, 0.1);
  border-left: 4px solid ${({ theme }) => theme.colors.accent};
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 8px 8px 0;

  h4 {
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.5rem;
    }
  }

  p {
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const GerenciadorInstrucoesPage = () => {
  return (
      <Layout title="Instruções do Gerenciador de Conteúdo | Volt">
      <PageContainer>
        <PageTitle>Instruções do Gerenciador de Conteúdo</PageTitle>
        <PageDescription>
          Aprenda a utilizar o sistema de gerenciamento de projetos para adicionar, editar e gerenciar
          os projetos realizados pela SolarTech que são exibidos no site.
        </PageDescription>

        <Section>
          <SectionTitle><FaEdit /> Visão Geral do Sistema</SectionTitle>
          <InstructionText>
            <p>
              O sistema de gerenciamento de conteúdo da SolarTech permite que você adicione, edite e gerencie os projetos
              realizados pela empresa que são exibidos na página "Projetos" do site. Este sistema foi desenvolvido para ser
              intuitivo e fácil de usar, mesmo para usuários sem conhecimentos técnicos avançados.
            </p>
            <p>
              Com este sistema, você pode:
            </p>
            <ul>
              <li>Adicionar novos projetos com informações detalhadas</li>
              <li>Editar projetos existentes</li>
              <li>Filtrar projetos por categoria, potência e ano</li>
              <li>Buscar projetos por texto</li>
              <li>Organizar a exibição dos projetos na página</li>
            </ul>
          </InstructionText>

          <ImageContainer>
            <Image src="/images/gerenciador-visao-geral.jpg" alt="Visão geral do gerenciador de projetos" />
            <ImageCaption>Visão geral da página de projetos com o sistema de gerenciamento</ImageCaption>
          </ImageContainer>
        </Section>

        <Section>
          <SectionTitle><FaPlus /> Adicionando Novos Projetos</SectionTitle>

          <StepContainer>
            <StepTitle><FaPlus /> Passo 1: Acessar o Formulário de Adição</StepTitle>
            <InstructionText>
              <p>
                Para adicionar um novo projeto, você precisa acessar o arquivo <code>pages/projetos.js</code> e localizar
                a matriz <code>projectsData</code>. Esta matriz contém todos os projetos exibidos no site.
              </p>
              <p>
                Cada projeto é representado por um objeto JavaScript com várias propriedades que definem as informações
                do projeto, como título, descrição, imagem, categoria, etc.
              </p>
            </InstructionText>

            <CodeBlock>
{`// Dados de exemplo para projetos
const projectsData = [
  {
    id: 1,
    title: 'Residência Solar em São Paulo',
    description: 'Instalação de sistema fotovoltaico em residência de alto padrão...',
    image: '/images/project1.jpg',
    category: 'Residencial',
    location: 'São Paulo, SP',
    date: 'Janeiro 2023',
    power: '5.2 kWp',
    panels: '13 painéis',
    economy: 'R$ 850/mês',
    co2Reduction: '2.5 ton/ano'
  },
  // Outros projetos...
];`}
            </CodeBlock>
          </StepContainer>

          <StepContainer>
            <StepTitle><FaEdit /> Passo 2: Preencher as Informações do Projeto</StepTitle>
            <InstructionText>
              <p>
                Para adicionar um novo projeto, crie um novo objeto seguindo o mesmo formato dos projetos existentes.
                Certifique-se de incluir todas as propriedades necessárias:
              </p>
              <ul>
                <li><strong>id:</strong> Um número único para identificar o projeto (incremente o último ID)</li>
                <li><strong>title:</strong> O título do projeto</li>
                <li><strong>description:</strong> Uma descrição detalhada do projeto</li>
                <li><strong>image:</strong> O caminho para a imagem do projeto (deve estar na pasta public/images)</li>
                <li><strong>category:</strong> A categoria do projeto (Residencial, Comercial, Industrial, etc.)</li>
                <li><strong>location:</strong> A localização do projeto</li>
                <li><strong>date:</strong> A data de instalação ou conclusão do projeto</li>
                <li><strong>power:</strong> A potência do sistema instalado</li>
                <li><strong>panels:</strong> O número de painéis instalados</li>
                <li><strong>economy:</strong> A economia mensal estimada</li>
                <li><strong>co2Reduction:</strong> A redução anual de CO₂</li>
              </ul>
            </InstructionText>

            <CodeBlock>
{`// Exemplo de novo projeto a ser adicionado
{
  id: 7, // Incremente o último ID
  title: 'Novo Projeto Solar',
  description: 'Descrição detalhada do novo projeto...',
  image: '/images/novo-projeto.jpg',
  category: 'Comercial',
  location: 'Curitiba, PR',
  date: 'Dezembro 2023',
  power: '30 kWp',
  panels: '75 painéis',
  economy: 'R$ 5.000/mês',
  co2Reduction: '18 ton/ano'
}`}
            </CodeBlock>
          </StepContainer>

          <StepContainer>
            <StepTitle><FaImage /> Passo 3: Adicionar a Imagem do Projeto</StepTitle>
            <InstructionText>
              <p>
                Para cada projeto, você precisa adicionar uma imagem representativa. Siga estas etapas:
              </p>
              <ol>
                <li>Prepare uma imagem de boa qualidade, preferencialmente com proporção 16:9</li>
                <li>Redimensione a imagem para um tamanho adequado (recomendado: 800x450 pixels)</li>
                <li>Salve a imagem em formato JPG ou PNG</li>
                <li>Faça upload da imagem para a pasta <code>public/images/</code> do projeto</li>
                <li>Referencie a imagem no objeto do projeto usando o caminho relativo (ex: <code>/images/nome-da-imagem.jpg</code>)</li>
              </ol>
            </InstructionText>

            <TipBox>
              <h4><FaLightbulb /> Dica</h4>
              <p>
                Use nomes descritivos para suas imagens, como "projeto-residencial-sp.jpg" ou "instalacao-comercial-rj.jpg".
                Evite espaços e caracteres especiais nos nomes dos arquivos.
              </p>
            </TipBox>
          </StepContainer>
        </Section>

        <Section>
          <SectionTitle><FaEdit /> Editando Projetos Existentes</SectionTitle>

          <InstructionText>
            <p>
              Para editar um projeto existente, localize o objeto correspondente na matriz <code>projectsData</code>
              e modifique as propriedades desejadas. Você pode alterar qualquer informação, como título, descrição,
              categoria, etc.
            </p>
          </InstructionText>

          <CodeBlock>
{`// Exemplo de edição de um projeto existente
// Localize o projeto pelo ID
const projectToEdit = projectsData.find(project => project.id === 3);

// Modifique as propriedades desejadas
projectToEdit.title = 'Novo título atualizado';
projectToEdit.description = 'Nova descrição atualizada...';
projectToEdit.power = '125 kWp'; // Atualizando a potência
projectToEdit.economy = 'R$ 19.000/mês'; // Atualizando a economia`}
          </CodeBlock>

          <TipBox>
            <h4><FaLightbulb /> Dica</h4>
            <p>
              Ao editar projetos, mantenha o ID original para preservar a consistência do sistema.
              Se precisar substituir a imagem, certifique-se de atualizar o caminho no objeto do projeto.
            </p>
          </TipBox>
        </Section>

        <Section>
          <SectionTitle><FaTrash /> Removendo Projetos</SectionTitle>

          <InstructionText>
            <p>
              Para remover um projeto, você pode simplesmente excluir o objeto correspondente da matriz <code>projectsData</code>.
              Alternativamente, se quiser manter o projeto no código mas não exibi-lo no site, você pode adicionar uma
              propriedade <code>hidden: true</code> ao objeto do projeto.
            </p>
          </InstructionText>

          <CodeBlock>
{`// Opção 1: Remover completamente o projeto
// Filtre a matriz para excluir o projeto com ID específico
projectsData = projectsData.filter(project => project.id !== 4);

// Opção 2: Ocultar o projeto sem removê-lo
// Adicione a propriedade hidden: true ao projeto
const projectToHide = projectsData.find(project => project.id === 4);
projectToHide.hidden = true;

// E então, ao filtrar projetos para exibição:
const visibleProjects = projectsData.filter(project => !project.hidden);`}
          </CodeBlock>
        </Section>

        <Section>
          <SectionTitle><FaFilter /> Utilizando os Filtros</SectionTitle>

          <InstructionText>
            <p>
              O sistema de gerenciamento de projetos inclui funcionalidades de filtragem que permitem aos usuários
              encontrar projetos específicos com base em diferentes critérios. Os filtros disponíveis são:
            </p>
            <ul>
              <li><strong>Categoria:</strong> Filtra projetos por tipo (Residencial, Comercial, Industrial, etc.)</li>
              <li><strong>Potência:</strong> Filtra projetos pelo tamanho do sistema (pequeno, médio, grande)</li>
              <li><strong>Ano:</strong> Filtra projetos pelo ano de instalação</li>
              <li><strong>Busca por texto:</strong> Permite buscar projetos por palavras-chave no título, descrição ou localização</li>
            </ul>
            <p>
              Estes filtros são implementados no código através de funções JavaScript que processam a matriz <code>projectsData</code>
              e retornam apenas os projetos que correspondem aos critérios selecionados.
            </p>
          </InstructionText>

          <ImageContainer>
            <Image src="/images/gerenciador-filtros.jpg" alt="Sistema de filtros de projetos" />
            <ImageCaption>Interface de filtros para busca e organização de projetos</ImageCaption>
          </ImageContainer>

          <StepContainer>
            <StepTitle><FaSearch /> Como os Filtros Funcionam</StepTitle>
            <InstructionText>
              <p>
                O código abaixo mostra como os filtros são implementados. A função <code>filteredProjects</code> aplica
                os filtros selecionados à matriz <code>projectsData</code> e retorna apenas os projetos que correspondem
                aos critérios.
              </p>
            </InstructionText>

            <CodeBlock>
{`// Filtrar projetos com base nos filtros e termo de busca
const filteredProjects = projectsData.filter(project => {
  // Filtrar por categoria
  if (filters.categoria && project.category !== filters.categoria) {
    return false;
  }

  // Filtrar por potência
  if (filters.potencia) {
    const powerValue = parseFloat(project.power);
    if (filters.potencia === 'pequeno' && powerValue > 10) return false;
    if (filters.potencia === 'medio' && (powerValue <= 10 || powerValue > 50)) return false;
    if (filters.potencia === 'grande' && powerValue <= 50) return false;
  }

  // Filtrar por ano
  if (filters.ano && !project.date.includes(filters.ano)) {
    return false;
  }

  // Filtrar por termo de busca
  if (searchTerm && !project.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
      !project.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !project.location.toLowerCase().includes(searchTerm.toLowerCase())) {
    return false;
  }

  return true;
});`}
            </CodeBlock>

            <TipBox>
              <h4><FaLightbulb /> Dica</h4>
              <p>
                Ao adicionar novos projetos, certifique-se de que as informações estejam em um formato consistente
                com os projetos existentes para garantir que os filtros funcionem corretamente. Por exemplo, a potência
                deve ser expressa em kWp e incluir esse sufixo.
              </p>
            </TipBox>
          </StepContainer>
        </Section>

        <Section>
          <SectionTitle><FaCalendarAlt /> Melhores Práticas</SectionTitle>

          <InstructionText>
            <p>
              Para manter o sistema de gerenciamento de projetos organizado e eficiente, recomendamos seguir estas
              melhores práticas:
            </p>
            <ol>
              <li>
                <strong>Mantenha os dados consistentes:</strong> Use o mesmo formato para todas as propriedades em todos os projetos.
                Por exemplo, sempre use o formato "Cidade, UF" para localização e "Mês AAAA" para datas.
              </li>
              <li>
                <strong>Otimize as imagens:</strong> Redimensione e comprima as imagens antes de adicioná-las ao projeto
                para garantir tempos de carregamento rápidos.
              </li>
              <li>
                <strong>Faça backup regularmente:</strong> Antes de fazer alterações significativas, faça uma cópia de segurança
                do arquivo <code>projetos.js</code>.
              </li>
              <li>
                <strong>Teste as alterações:</strong> Após adicionar ou editar projetos, verifique se eles aparecem corretamente
                na página e se os filtros funcionam como esperado.
              </li>
              <li>
                <strong>Mantenha descrições concisas:</strong> Escreva descrições claras e informativas, mas evite textos
                muito longos que podem sobrecarregar a interface.
              </li>
              <li>
                <strong>Atualize regularmente:</strong> Adicione novos projetos assim que forem concluídos para manter
                o site atualizado com os trabalhos mais recentes da empresa.
              </li>
            </ol>
          </InstructionText>
        </Section>

        <Section>
          <SectionTitle><FaMapMarkerAlt /> Suporte e Ajuda</SectionTitle>

          <InstructionText>
            <p>
              Se você encontrar dificuldades ao usar o sistema de gerenciamento de projetos ou tiver dúvidas sobre
              como implementar recursos específicos, entre em contato com nossa equipe de suporte técnico:
            </p>
            <ul>
              <li>Email: suporte@solartech.com.br</li>
              <li>Telefone: (00) 0000-0000</li>
            </ul>
            <p>
              Nossa equipe está disponível para ajudar com qualquer questão relacionada ao gerenciamento de conteúdo
              do site e pode fornecer treinamento adicional se necessário.
            </p>
          </InstructionText>
        </Section>
      </PageContainer>
    </Layout>
  );
};

export default GerenciadorInstrucoesPage;
