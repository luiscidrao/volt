import { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { FaSolarPanel, FaCalculator, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';

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

const CalculatorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ResultsContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(46, 134, 171, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(46, 134, 171, 0.2);
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ResultCard = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-left: 4px solid ${({ theme }) => theme.colors.secondary};
`;

const ResultTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ResultValue = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0.5rem 0;
`;

const ResultDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const Disclaimer = styled.p`
  font-size: 0.8rem;
  color: #999;
  margin-top: 2rem;
  font-style: italic;
`;

const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
  text-align: center;

  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #ddd;
  }

  p {
    font-size: 1.1rem;
  }
`;

const CalculadoraPage = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [consumo, setConsumo] = useState('');
  const [estado, setEstado] = useState('');
  const [tipoImovel, setTipoImovel] = useState('residencial');
  const [areaDisponivel, setAreaDisponivel] = useState('');
  const [results, setResults] = useState(null);

  const estados = [
    { value: 'AC', label: 'Acre', irradiacao: 4.8 },
    { value: 'AL', label: 'Alagoas', irradiacao: 5.5 },
    { value: 'AP', label: 'Amapá', irradiacao: 4.9 },
    { value: 'AM', label: 'Amazonas', irradiacao: 4.8 },
    { value: 'BA', label: 'Bahia', irradiacao: 5.6 },
    { value: 'CE', label: 'Ceará', irradiacao: 5.7 },
    { value: 'DF', label: 'Distrito Federal', irradiacao: 5.4 },
    { value: 'ES', label: 'Espírito Santo', irradiacao: 5.2 },
    { value: 'GO', label: 'Goiás', irradiacao: 5.4 },
    { value: 'MA', label: 'Maranhão', irradiacao: 5.5 },
    { value: 'MT', label: 'Mato Grosso', irradiacao: 5.3 },
    { value: 'MS', label: 'Mato Grosso do Sul', irradiacao: 5.3 },
    { value: 'MG', label: 'Minas Gerais', irradiacao: 5.4 },
    { value: 'PA', label: 'Pará', irradiacao: 5.0 },
    { value: 'PB', label: 'Paraíba', irradiacao: 5.6 },
    { value: 'PR', label: 'Paraná', irradiacao: 5.0 },
    { value: 'PE', label: 'Pernambuco', irradiacao: 5.6 },
    { value: 'PI', label: 'Piauí', irradiacao: 5.7 },
    { value: 'RJ', label: 'Rio de Janeiro', irradiacao: 5.1 },
    { value: 'RN', label: 'Rio Grande do Norte', irradiacao: 5.7 },
    { value: 'RS', label: 'Rio Grande do Sul', irradiacao: 4.9 },
    { value: 'RO', label: 'Rondônia', irradiacao: 4.9 },
    { value: 'RR', label: 'Roraima', irradiacao: 4.8 },
    { value: 'SC', label: 'Santa Catarina', irradiacao: 4.8 },
    { value: 'SP', label: 'São Paulo', irradiacao: 5.2 },
    { value: 'SE', label: 'Sergipe', irradiacao: 5.5 },
    { value: 'TO', label: 'Tocantins', irradiacao: 5.5 }
  ];

  const calcularSistema = async () => {
    if (!nome || !email || !consumo || !estado || !tipoImovel || !areaDisponivel) {
      alert('Por favor, preencha todos os campos, incluindo nome e e-mail.');
      return;
    }

    // Validação básica de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um endereço de e-mail válido.');
      return;
    }

    // Encontrar a irradiação solar do estado selecionado
    const estadoSelecionado = estados.find(e => e.value === estado);
    const irradiacao = estadoSelecionado ? estadoSelecionado.irradiacao : 5.0;

    // Cálculos básicos para sistema fotovoltaico
    const consumoDiario = parseFloat(consumo) / 30; // kWh por dia
    const potenciaSistema = consumoDiario / irradiacao; // kWp
    const areaNecessaria = potenciaSistema * 7; // m² (aproximadamente 7m² por kWp)

    // Verificar se a área disponível é suficiente
    const areaSuficiente = parseFloat(areaDisponivel) >= areaNecessaria;

    // Calcular custo aproximado do sistema
    let custoSistema = 0;
    if (potenciaSistema <= 3) {
      custoSistema = potenciaSistema * 7000; // R$ 7.000 por kWp para sistemas pequenos
    } else if (potenciaSistema <= 10) {
      custoSistema = potenciaSistema * 6500; // R$ 6.500 por kWp para sistemas médios
    } else {
      custoSistema = potenciaSistema * 6000; // R$ 6.000 por kWp para sistemas grandes
    }

    // Calcular economia mensal e retorno do investimento
    const tarifaMedia = tipoImovel === 'residencial' ? 0.75 : 0.65; // R$/kWh
    const economiaMensal = parseFloat(consumo) * tarifaMedia;
    const retornoInvestimento = custoSistema / (economiaMensal * 12); // anos

    // Calcular redução de CO2
    const reducaoCO2 = parseFloat(consumo) * 0.075 * 12; // kg de CO2 por ano (0.075 kg por kWh)

    const resultados = {
      potenciaSistema: potenciaSistema.toFixed(2),
      areaNecessaria: areaNecessaria.toFixed(2),
      areaSuficiente,
      custoSistema: custoSistema.toFixed(2),
      economiaMensal: economiaMensal.toFixed(2),
      retornoInvestimento: retornoInvestimento.toFixed(1),
      reducaoCO2: reducaoCO2.toFixed(0)
    };

    setResults(resultados);

    // Enviar dados para o e-mail
    try {
      const estadoNome = estados.find(e => e.value === estado)?.label || estado;
      const tipoImovelFormatado = tipoImovel.charAt(0).toUpperCase() + tipoImovel.slice(1);

      const dadosEmail = {
        nome,
        email,
        consumo,
        estado: estadoNome,
        tipoImovel: tipoImovelFormatado,
        areaDisponivel,
        resultados
      };

      // Enviar dados para API que tratará o envio de e-mail
      const response = await fetch('/api/send-calculator-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'contato@voltenergiasolar.com.br',
          subject: 'Novo cálculo da Calculadora Solar',
          data: dadosEmail
        }),
      });

      if (!response.ok) {
        console.error('Erro ao enviar e-mail');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <Layout title="Calculadora Solar | SolarTech">
      <PageContainer>
        <PageTitle>Calculadora de Energia Solar</PageTitle>
        <PageDescription>
          Descubra quanto você pode economizar com energia solar. Nossa calculadora estima o tamanho do sistema, 
          custo de instalação e tempo de retorno do investimento com base no seu consumo de energia.
        </PageDescription>

        <CalculatorContainer>
          <FormContainer>
            <FormTitle>
              <FaCalculator /> Informe seus dados
            </FormTitle>

            <FormGroup>
              <Label htmlFor="nome">Nome</Label>
              <Input 
                type="text" 
                id="nome" 
                placeholder="Seu nome completo" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">E-mail</Label>
              <Input 
                type="email" 
                id="email" 
                placeholder="seu.email@exemplo.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="consumo">Consumo Mensal (kWh)</Label>
              <Input 
                type="number" 
                id="consumo" 
                placeholder="Ex: 300" 
                value={consumo}
                onChange={(e) => setConsumo(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="estado">Estado</Label>
              <Select 
                id="estado" 
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="">Selecione seu estado</option>
                {estados.map((estado) => (
                  <option key={estado.value} value={estado.value}>
                    {estado.label}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="tipoImovel">Tipo de Imóvel</Label>
              <Select 
                id="tipoImovel" 
                value={tipoImovel}
                onChange={(e) => setTipoImovel(e.target.value)}
              >
                <option value="residencial">Residencial</option>
                <option value="comercial">Comercial</option>
                <option value="industrial">Industrial</option>
                <option value="rural">Rural</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="areaDisponivel">Área Disponível para Instalação (m²)</Label>
              <Input 
                type="number" 
                id="areaDisponivel" 
                placeholder="Ex: 30" 
                value={areaDisponivel}
                onChange={(e) => setAreaDisponivel(e.target.value)}
              />
            </FormGroup>

            <Button onClick={calcularSistema}>
              <FaCalculator /> Calcular Economia
            </Button>
          </FormContainer>

          <ResultsContainer>
            <FormTitle>
              <FaChartLine /> Resultados
            </FormTitle>

            {results ? (
              <>
                <ResultCard>
                  <ResultTitle>
                    <FaSolarPanel /> Potência do Sistema
                  </ResultTitle>
                  <ResultValue>{results.potenciaSistema} kWp</ResultValue>
                  <ResultDescription>
                    Potência necessária para atender seu consumo mensal.
                  </ResultDescription>
                </ResultCard>

                <ResultCard>
                  <ResultTitle>
                    <FaMoneyBillWave /> Economia Mensal Estimada
                  </ResultTitle>
                  <ResultValue>R$ {results.economiaMensal}</ResultValue>
                  <ResultDescription>
                    Valor aproximado que você economizará mensalmente na conta de luz.
                  </ResultDescription>
                </ResultCard>

                <ResultCard>
                  <ResultTitle>
                    <FaCalculator /> Investimento Aproximado
                  </ResultTitle>
                  <ResultValue>R$ {results.custoSistema}</ResultValue>
                  <ResultDescription>
                    Custo estimado para instalação do sistema fotovoltaico.
                  </ResultDescription>
                </ResultCard>

                <ResultCard>
                  <ResultTitle>
                    <FaChartLine /> Retorno do Investimento
                  </ResultTitle>
                  <ResultValue>{results.retornoInvestimento} anos</ResultValue>
                  <ResultDescription>
                    Tempo estimado para recuperar o valor investido através da economia na conta de luz.
                  </ResultDescription>
                </ResultCard>

                {!results.areaSuficiente && (
                  <ResultDescription style={{ color: 'red', marginTop: '1rem' }}>
                    Atenção: A área disponível informada ({areaDisponivel} m²) é menor que a área necessária ({results.areaNecessaria} m²) para o sistema.
                  </ResultDescription>
                )}

                <Disclaimer>
                  Nota: Estes valores são estimativas baseadas em médias de mercado e podem variar de acordo com diversos fatores como qualidade dos equipamentos, condições de instalação, variações climáticas e tarifas de energia.
                </Disclaimer>
              </>
            ) : (
              <NoResults>
                <FaCalculator />
                <p>Preencha os dados ao lado e clique em "Calcular Economia" para ver os resultados.</p>
              </NoResults>
            )}
          </ResultsContainer>
        </CalculatorContainer>
      </PageContainer>
    </Layout>
  );
};

export default CalculadoraPage;
