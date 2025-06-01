import styled from 'styled-components';
import Layout from '../components/Layout';
import { FaUser, FaCalculator, FaSolarPanel, FaEdit, FaTrash, FaPlus, FaLightbulb, FaMapMarkerAlt } from 'react-icons/fa';

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

const GerenciadorClientesInstrucoesPage = () => {
  return (
    <Layout title="Instruções do Gerenciador de Clientes | SolarTech">
      <PageContainer>
        <PageTitle>Instruções do Gerenciador de Clientes</PageTitle>
        <PageDescription>
          Aprenda a utilizar o sistema de gerenciamento de clientes para cadastrar, calcular consumo médio
          e dimensionar sistemas fotovoltaicos ideais para seus clientes.
        </PageDescription>
        
        <Section>
          <SectionTitle><FaUser /> Visão Geral do Sistema</SectionTitle>
          <InstructionText>
            <p>
              O sistema de gerenciamento de clientes da SolarTech permite que você cadastre e gerencie informações
              de clientes, calcule o consumo médio de energia e dimensione sistemas fotovoltaicos ideais com base
              na localização e consumo. Este sistema foi desenvolvido para facilitar o processo de venda e
              dimensionamento de sistemas solares.
            </p>
            <p>
              Com este sistema, você pode:
            </p>
            <ul>
              <li>Cadastrar novos clientes com informações detalhadas</li>
              <li>Calcular o consumo médio mensal ou anual de energia</li>
              <li>Dimensionar sistemas fotovoltaicos com base na localização e consumo</li>
              <li>Estimar economia mensal e redução de CO₂</li>
              <li>Editar e excluir informações de clientes</li>
            </ul>
          </InstructionText>
          
          <ImageContainer>
            <Image src="/images/gerenciador-clientes-visao-geral.jpg" alt="Visão geral do gerenciador de clientes" />
            <ImageCaption>Visão geral da página de gerenciamento de clientes</ImageCaption>
          </ImageContainer>
        </Section>
        
        <Section>
          <SectionTitle><FaPlus /> Cadastrando Novos Clientes</SectionTitle>
          
          <StepContainer>
            <StepTitle><FaPlus /> Passo 1: Acessar o Gerenciador de Clientes</StepTitle>
            <InstructionText>
              <p>
                Para acessar o gerenciador de clientes, navegue até a página <code>/admin-clientes</code> e faça login
                com suas credenciais de administrador. As credenciais padrão são:
              </p>
              <ul>
                <li><strong>Usuário:</strong> admin</li>
                <li><strong>Senha:</strong> solar123</li>
              </ul>
              <p>
                Após o login bem-sucedido, você terá acesso ao formulário de cadastro de clientes e à lista de
                clientes já cadastrados.
              </p>
            </InstructionText>
          </StepContainer>
          
          <StepContainer>
            <StepTitle><FaEdit /> Passo 2: Preencher as Informações do Cliente</StepTitle>
            <InstructionText>
              <p>
                O formulário de cadastro de clientes está dividido em seções para facilitar o preenchimento.
                Preencha todas as informações necessárias:
              </p>
              <ol>
                <li><strong>Informações Pessoais:</strong> Nome, e-mail, telefone, endereço, cidade, estado e CEP.</li>
                <li><strong>Consumo de Energia:</strong> Tipo de consumo (mensal ou anual), valor do consumo em kWh.</li>
                <li><strong>Informações do Telhado:</strong> Área disponível para instalação (m²) e tipo de telhado.</li>
                <li><strong>Observações:</strong> Informações adicionais relevantes sobre o cliente ou o projeto.</li>
              </ol>
              <p>
                Certifique-se de preencher corretamente o estado, pois essa informação será usada para calcular
                a irradiação solar na região e dimensionar o sistema fotovoltaico.
              </p>
            </InstructionText>
            
            <TipBox>
              <h4><FaLightbulb /> Dica</h4>
              <p>
                Para obter um dimensionamento mais preciso, é importante ter informações exatas sobre o consumo
                de energia. Peça ao cliente uma cópia da conta de luz dos últimos 12 meses para calcular a média
                de consumo.
              </p>
            </TipBox>
          </StepContainer>
        </Section>
        
        <Section>
          <SectionTitle><FaCalculator /> Calculando o Dimensionamento do Sistema</SectionTitle>
          
          <InstructionText>
            <p>
              Após preencher as informações do cliente, você pode calcular o dimensionamento do sistema fotovoltaico
              ideal para atender às necessidades de consumo. O sistema utiliza os seguintes dados para o cálculo:
            </p>
            <ul>
              <li><strong>Consumo de energia:</strong> Mensal ou anual, em kWh</li>
              <li><strong>Localização:</strong> Estado brasileiro, que determina a irradiação solar média</li>
              <li><strong>Área disponível:</strong> Espaço disponível para instalação dos painéis</li>
            </ul>
            <p>
              Para calcular o dimensionamento, clique no botão "Calcular Dimensionamento" após preencher as
              informações necessárias. O sistema realizará os cálculos automaticamente e exibirá os resultados.
            </p>
          </InstructionText>
          
          <StepContainer>
            <StepTitle><FaSolarPanel /> Como o Cálculo é Realizado</StepTitle>
            <InstructionText>
              <p>
                O dimensionamento do sistema fotovoltaico é calculado seguindo estas etapas:
              </p>
              <ol>
                <li>
                  <strong>Conversão para consumo mensal:</strong> Se o consumo informado for anual, o sistema
                  divide por 12 para obter a média mensal.
                </li>
                <li>
                  <strong>Determinação da irradiação solar:</strong> Com base no estado selecionado, o sistema
                  identifica a irradiação solar média diária (kWh/m²/dia).
                </li>
                <li>
                  <strong>Cálculo da potência do sistema:</strong> Utilizando a fórmula:
                  <CodeBlock>Potência (kWp) = Consumo mensal (kWh) / (30 dias × irradiação × 0.8)</CodeBlock>
                  Onde 0.8 é o fator de eficiência que considera perdas do sistema.
                </li>
                <li>
                  <strong>Cálculo do número de painéis:</strong> Considerando painéis de 400Wp:
                  <CodeBlock>Número de painéis = Potência (kWp) × 1000 / 400</CodeBlock>
                </li>
                <li>
                  <strong>Estimativa de produção mensal:</strong>
                  <CodeBlock>Produção (kWh) = Potência (kWp) × 30 dias × irradiação × 0.8</CodeBlock>
                </li>
                <li>
                  <strong>Cálculo da economia mensal:</strong> Considerando tarifa média de R$ 0,75/kWh:
                  <CodeBlock>Economia (R$) = Produção mensal (kWh) × 0.75</CodeBlock>
                </li>
                <li>
                  <strong>Cálculo da redução de CO₂:</strong> Considerando fator de 0,075 kg CO₂/kWh:
                  <CodeBlock>Redução de CO₂ (kg/ano) = Produção mensal (kWh) × 12 × 0.075</CodeBlock>
                </li>
              </ol>
            </InstructionText>
            
            <TipBox>
              <h4><FaLightbulb /> Dica</h4>
              <p>
                O sistema também verifica se a área disponível informada é suficiente para a instalação dos painéis.
                Em média, cada kWp de sistema requer aproximadamente 7m² de área. Se a área disponível for insuficiente,
                o sistema alertará sobre essa limitação.
              </p>
            </TipBox>
          </StepContainer>
        </Section>
        
        <Section>
          <SectionTitle><FaEdit /> Gerenciando Clientes Cadastrados</SectionTitle>
          
          <InstructionText>
            <p>
              Após cadastrar clientes, você pode gerenciá-los através da tabela "Clientes Cadastrados" que exibe
              todos os clientes registrados no sistema. Para cada cliente, você pode:
            </p>
            <ul>
              <li><strong>Visualizar informações básicas:</strong> ID, nome, e-mail, telefone, localização e consumo</li>
              <li><strong>Editar informações:</strong> Clicando no botão de edição (ícone de lápis)</li>
              <li><strong>Excluir cliente:</strong> Clicando no botão de exclusão (ícone de lixeira)</li>
            </ul>
            <p>
              Ao editar um cliente, o formulário será preenchido com as informações existentes, incluindo os
              resultados do dimensionamento, se disponíveis. Você pode modificar qualquer informação e recalcular
              o dimensionamento se necessário.
            </p>
          </InstructionText>
          
          <StepContainer>
            <StepTitle><FaTrash /> Excluindo Clientes</StepTitle>
            <InstructionText>
              <p>
                Para excluir um cliente, clique no botão de exclusão (ícone de lixeira) na linha correspondente
                ao cliente na tabela. O sistema solicitará uma confirmação antes de excluir permanentemente o cliente.
              </p>
              <p>
                <strong>Atenção:</strong> A exclusão de um cliente é permanente e não pode ser desfeita. Certifique-se
                de que realmente deseja excluir o cliente antes de confirmar a ação.
              </p>
            </InstructionText>
          </StepContainer>
        </Section>
        
        <Section>
          <SectionTitle><FaMapMarkerAlt /> Utilizando os Dados de Irradiação Solar</SectionTitle>
          
          <InstructionText>
            <p>
              O sistema utiliza dados de irradiação solar média para cada estado brasileiro para calcular o
              dimensionamento do sistema fotovoltaico. Esses valores são baseados em estudos do Atlas Brasileiro
              de Energia Solar e representam a média anual de irradiação solar diária em kWh/m²/dia.
            </p>
            <p>
              A tabela abaixo mostra os valores de irradiação utilizados para cada estado:
            </p>
          </InstructionText>
          
          <CodeBlock>
{`// Valores de irradiação solar por estado (kWh/m²/dia)
AC: 4.8  AL: 5.5  AP: 4.9  AM: 4.8  BA: 5.6  CE: 5.7  DF: 5.4
ES: 5.2  GO: 5.4  MA: 5.5  MT: 5.3  MS: 5.3  MG: 5.4  PA: 5.0
PB: 5.6  PR: 5.0  PE: 5.6  PI: 5.7  RJ: 5.1  RN: 5.7  RS: 4.9
RO: 4.9  RR: 4.8  SC: 4.8  SP: 5.2  SE: 5.5  TO: 5.5`}
          </CodeBlock>
          
          <TipBox>
            <h4><FaLightbulb /> Dica</h4>
            <p>
              Para dimensionamentos mais precisos em projetos de grande porte, considere utilizar dados de
              irradiação específicos para a cidade ou região, que podem ser obtidos através de bases de dados
              meteorológicos mais detalhadas ou medições locais.
            </p>
          </TipBox>
        </Section>
        
        <Section>
          <SectionTitle><FaLightbulb /> Melhores Práticas</SectionTitle>
          
          <InstructionText>
            <p>
              Para obter o máximo do sistema de gerenciamento de clientes, recomendamos seguir estas melhores práticas:
            </p>
            <ol>
              <li>
                <strong>Mantenha os dados atualizados:</strong> Atualize regularmente as informações dos clientes,
                especialmente se houver mudanças no consumo de energia ou nas condições do local de instalação.
              </li>
              <li>
                <strong>Verifique a precisão dos dados:</strong> Certifique-se de que as informações de consumo
                estão corretas, preferencialmente baseadas em histórico real de contas de energia.
              </li>
              <li>
                <strong>Considere fatores adicionais:</strong> Ao apresentar o dimensionamento para o cliente,
                considere fatores que o sistema não calcula automaticamente, como sombreamento, orientação do
                telhado e inclinação.
              </li>
              <li>
                <strong>Documente as premissas:</strong> Utilize o campo de observações para documentar premissas
                importantes consideradas no dimensionamento.
              </li>
              <li>
                <strong>Acompanhe o progresso:</strong> Utilize o sistema para acompanhar o progresso das negociações
                com os clientes, desde o contato inicial até a instalação.
              </li>
            </ol>
          </InstructionText>
        </Section>
        
        <Section>
          <SectionTitle><FaMapMarkerAlt /> Suporte e Ajuda</SectionTitle>
          
          <InstructionText>
            <p>
              Se você encontrar dificuldades ao usar o sistema de gerenciamento de clientes ou tiver dúvidas sobre
              como realizar cálculos específicos, entre em contato com nossa equipe de suporte técnico:
            </p>
            <ul>
              <li>Email: suporte@solartech.com.br</li>
              <li>Telefone: (00) 0000-0000</li>
            </ul>
            <p>
              Nossa equipe está disponível para ajudar com qualquer questão relacionada ao gerenciamento de clientes
              e dimensionamento de sistemas fotovoltaicos.
            </p>
          </InstructionText>
        </Section>
      </PageContainer>
    </Layout>
  );
};

export default GerenciadorClientesInstrucoesPage;