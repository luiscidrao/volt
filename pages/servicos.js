import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { FaSolarPanel, FaTools, FaChartLine, FaClipboardCheck, FaLightbulb, FaHome, FaBuilding, FaIndustry, FaQuestion, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

const HeroSection = styled.section`
  position: relative;
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  margin-bottom: 3rem;
  border-radius: 8px;
  min-height: 500px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 4rem 1rem;
    min-height: 400px;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
    z-index: 1;
  }
`;

const HeroCarousel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  transition: transform 0.8s ease-in-out;
  transform: translateX(-${props => props.activeIndex * 100}%);
`;

const HeroCarouselSlide = styled.div`
  min-width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.8s ease-in-out;
  }

  &.active {
    &::before {
      opacity: 1;
    }
  }
`;

const HeroCarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 30px;
    height: 30px;
  }
`;

const HeroCarouselDots = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 2;
`;

const HeroCarouselDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ active, theme }) => active ? theme.colors.secondary : 'rgba(255, 255, 255, 0.5)'};
  border: 2px solid white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ active, theme }) => active ? theme.colors.secondary : 'rgba(255, 255, 255, 0.8)'};
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.dark};

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: ${({ theme }) => theme.colors.secondary};
    margin: 1rem auto 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`;

const ServiceHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1.5rem;
  display: flex;
  align-items: center;
`;

const ServiceIcon = styled.div`
  font-size: 2.5rem;
  margin-right: 1rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
`;

const ServiceContent = styled.div`
  padding: 1.5rem;
`;

const ServiceDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ServiceFeatureItem = styled.li`
  padding: 0.5rem 0;
  display: flex;
  align-items: center;

  &:before {
    content: '✓';
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const FAQSection = styled.section`
  background-color: ${({ theme }) => theme.colors.light};
  padding: 3rem 2rem;
  border-radius: 8px;
  margin-bottom: 4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 2rem 1rem;
  }
`;

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  margin-bottom: 1.5rem;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FAQQuestion = styled.button`
  width: 100%;
  text-align: left;
  padding: 1rem 1.5rem;
  background-color: white;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark};

  &:focus {
    outline: none;
  }

  svg {
    transition: transform 0.3s;
    transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0)'};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const FAQAnswer = styled.div`
  padding: ${({ isOpen }) => isOpen ? '1rem 1.5rem 1.5rem' : '0 1.5rem'};
  max-height: ${({ isOpen }) => isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  line-height: 1.6;
  color: #666;
`;

const CTASection = styled.section`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 3rem 2rem;
  text-align: center;
  border-radius: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 2rem 1rem;
  }
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.8rem;
  }
`;

const CTAText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  background-color: white;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
  }
`;

const ServicosPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [heroSlides, setHeroSlides] = useState([]);
  const [loadingHeroSlides, setLoadingHeroSlides] = useState(true);
  const [heroSlidesError, setHeroSlidesError] = useState('');
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  // Auto-play interval in milliseconds
  const autoPlayInterval = 5000;

  // Navigate to previous hero slide
  const prevHeroSlide = () => {
    setActiveHeroSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  // Navigate to next hero slide
  const nextHeroSlide = () => {
    setActiveHeroSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  // Fetch hero slides from API
  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        setLoadingHeroSlides(true);
        const response = await fetch('/api/hero-slides');
        const data = await response.json();

        if (data.success) {
          setHeroSlides(data.slides);
          // Reset active slide if needed
          if (activeHeroSlide >= data.slides.length) {
            setActiveHeroSlide(0);
          }
        } else {
          setHeroSlidesError('Erro ao carregar slides: ' + data.message);
        }
      } catch (err) {
        setHeroSlidesError('Erro ao carregar slides: ' + err.message);
      } finally {
        setLoadingHeroSlides(false);
      }
    };

    fetchHeroSlides();
  }, []);

  // Auto-play functionality for hero carousel
  useEffect(() => {
    let interval;

    if (autoPlayEnabled && heroSlides.length > 1 && !loadingHeroSlides) {
      interval = setInterval(() => {
        setActiveHeroSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
      }, autoPlayInterval);
    }

    // Pause auto-play when user interacts with carousel
    const pauseAutoPlay = () => {
      if (interval) {
        clearInterval(interval);
        // Re-enable after a delay
        setTimeout(() => setAutoPlayEnabled(true), autoPlayInterval * 2);
      }
    };

    // Add event listeners to pause auto-play on user interaction
    const carouselButtons = document.querySelectorAll('.hero-carousel-button, .hero-carousel-dot');
    carouselButtons.forEach(button => {
      button.addEventListener('click', () => {
        setAutoPlayEnabled(false);
        pauseAutoPlay();
      });
    });

    return () => {
      if (interval) {
        clearInterval(interval);
      }

      // Clean up event listeners
      carouselButtons.forEach(button => {
        button.removeEventListener('click', pauseAutoPlay);
      });
    };
  }, [autoPlayEnabled, heroSlides.length, loadingHeroSlides, autoPlayInterval]);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "Quanto tempo leva para instalar um sistema de energia solar?",
      answer: "O tempo de instalação varia de acordo com o tamanho e complexidade do projeto. Para residências, geralmente leva de 2 a 3 dias. Para projetos comerciais ou industriais maiores, pode levar de 1 a 3 semanas. Após a instalação, o processo de homologação junto à concessionária pode levar de 30 a 60 dias."
    },
    {
      question: "Qual é a economia real que posso esperar com energia solar?",
      answer: "A economia varia de acordo com o consumo, tarifa de energia e condições de instalação. Em média, nossos clientes economizam entre 75% e 95% na conta de luz. Um sistema bem dimensionado pode se pagar em 4 a 6 anos, e tem vida útil de mais de 25 anos, gerando economia por décadas."
    },
    {
      question: "Os painéis solares funcionam em dias nublados ou chuvosos?",
      answer: "Sim, os painéis solares continuam gerando energia mesmo em dias nublados ou chuvosos, embora com eficiência reduzida. O dimensionamento do sistema leva em consideração as condições climáticas da região ao longo do ano, garantindo que você tenha a geração necessária mesmo nos meses menos ensolarados."
    },
    {
      question: "Preciso fazer manutenção constante nos painéis solares?",
      answer: "Não, os sistemas fotovoltaicos requerem manutenção mínima. Recomendamos uma limpeza dos painéis a cada 6 meses para remover poeira e sujeira que podem reduzir a eficiência. Além disso, oferecemos um serviço de monitoramento remoto que identifica qualquer queda de desempenho, permitindo manutenção preventiva quando necessário."
    },
    {
      question: "O que acontece com a energia gerada que não é consumida?",
      answer: "A energia excedente gerada pelo seu sistema é injetada na rede da concessionária, gerando créditos de energia que podem ser utilizados em até 60 meses. Esses créditos podem ser usados nos períodos noturnos, em dias com pouca geração solar ou até mesmo em outras unidades consumidoras do mesmo titular, desde que estejam na mesma área de concessão."
    }
  ];

  return (
    <Layout title="Serviços | SolarTech">
      <PageContainer>
        <PageTitle>Nossos Serviços</PageTitle>
        <PageDescription>
          Oferecemos soluções completas em energia solar para residências, empresas e indústrias.
          Conheça nossos serviços e descubra como podemos ajudar você a economizar e contribuir para um futuro sustentável.
        </PageDescription>

        <HeroSection>
          <HeroBackground>
            {loadingHeroSlides ? (
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white',
                zIndex: 2
              }}>
                <p>Carregando...</p>
              </div>
            ) : heroSlidesError ? (
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white',
                zIndex: 2
              }}>
                <p>{heroSlidesError}</p>
              </div>
            ) : heroSlides.length > 0 ? (
              <>
                <HeroCarousel activeIndex={activeHeroSlide}>
                  {heroSlides.map((slide, index) => (
                    <HeroCarouselSlide 
                      key={slide.id} 
                      src={slide.image}
                      className={index === activeHeroSlide ? 'active' : ''}
                    />
                  ))}
                </HeroCarousel>

                <HeroCarouselButton 
                  className="prev hero-carousel-button" 
                  onClick={prevHeroSlide}
                >
                  <FaChevronLeft />
                </HeroCarouselButton>

                <HeroCarouselButton 
                  className="next hero-carousel-button" 
                  onClick={nextHeroSlide}
                >
                  <FaChevronRight />
                </HeroCarouselButton>

                <HeroCarouselDots>
                  {heroSlides.map((slide, index) => (
                    <HeroCarouselDot 
                      key={slide.id} 
                      className="hero-carousel-dot"
                      active={index === activeHeroSlide} 
                      onClick={() => setActiveHeroSlide(index)}
                    />
                  ))}
                </HeroCarouselDots>
              </>
            ) : (
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white',
                zIndex: 2
              }}>
                <p>Nenhum slide encontrado.</p>
              </div>
            )}
          </HeroBackground>

          <HeroContent>
            <HeroTitle>Soluções Personalizadas em Energia Solar</HeroTitle>
            <HeroSubtitle>
              Da avaliação inicial à instalação e monitoramento, cuidamos de todo o processo para garantir
              o máximo de eficiência e economia para o seu projeto de energia solar.
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        <Section>
          <SectionTitle>Serviços Principais</SectionTitle>
          <ServicesGrid>
            <ServiceCard>
              <ServiceHeader>
                <ServiceIcon>
                  <FaSolarPanel />
                </ServiceIcon>
                <ServiceTitle>Instalação de Sistemas Fotovoltaicos</ServiceTitle>
              </ServiceHeader>
              <ServiceContent>
                <ServiceDescription>
                  Instalação completa de sistemas de energia solar para residências, empresas e indústrias,
                  com equipamentos de alta qualidade e garantia estendida.
                </ServiceDescription>
                <ServiceFeatures>
                  <ServiceFeatureItem>Projeto personalizado</ServiceFeatureItem>
                  <ServiceFeatureItem>Equipamentos de alta eficiência</ServiceFeatureItem>
                  <ServiceFeatureItem>Instalação por equipe especializada</ServiceFeatureItem>
                  <ServiceFeatureItem>Garantia de 25 anos nos painéis</ServiceFeatureItem>
                  <ServiceFeatureItem>Homologação junto à concessionária</ServiceFeatureItem>
                </ServiceFeatures>
              </ServiceContent>
            </ServiceCard>

            <ServiceCard>
              <ServiceHeader>
                <ServiceIcon>
                  <FaTools />
                </ServiceIcon>
                <ServiceTitle>Manutenção e Suporte Técnico</ServiceTitle>
              </ServiceHeader>
              <ServiceContent>
                <ServiceDescription>
                  Serviços de manutenção preventiva e corretiva para sistemas fotovoltaicos,
                  garantindo o máximo desempenho e vida útil dos equipamentos.
                </ServiceDescription>
                <ServiceFeatures>
                  <ServiceFeatureItem>Limpeza especializada de painéis</ServiceFeatureItem>
                  <ServiceFeatureItem>Verificação de conexões e cabeamento</ServiceFeatureItem>
                  <ServiceFeatureItem>Diagnóstico e reparo de falhas</ServiceFeatureItem>
                  <ServiceFeatureItem>Substituição de componentes</ServiceFeatureItem>
                  <ServiceFeatureItem>Suporte técnico remoto</ServiceFeatureItem>
                </ServiceFeatures>
              </ServiceContent>
            </ServiceCard>

            <ServiceCard>
              <ServiceHeader>
                <ServiceIcon>
                  <FaChartLine />
                </ServiceIcon>
                <ServiceTitle>Monitoramento de Desempenho</ServiceTitle>
              </ServiceHeader>
              <ServiceContent>
                <ServiceDescription>
                  Sistema de monitoramento remoto que permite acompanhar a geração de energia em tempo real,
                  identificar falhas e garantir o máximo rendimento do seu investimento.
                </ServiceDescription>
                <ServiceFeatures>
                  <ServiceFeatureItem>Monitoramento 24/7 da geração</ServiceFeatureItem>
                  <ServiceFeatureItem>Alertas de falhas ou baixo desempenho</ServiceFeatureItem>
                  <ServiceFeatureItem>Relatórios mensais de produção</ServiceFeatureItem>
                  <ServiceFeatureItem>Acesso via aplicativo móvel</ServiceFeatureItem>
                  <ServiceFeatureItem>Suporte técnico prioritário</ServiceFeatureItem>
                </ServiceFeatures>
              </ServiceContent>
            </ServiceCard>

            <ServiceCard>
              <ServiceHeader>
                <ServiceIcon>
                  <FaClipboardCheck />
                </ServiceIcon>
                <ServiceTitle>Consultoria e Projetos</ServiceTitle>
              </ServiceHeader>
              <ServiceContent>
                <ServiceDescription>
                  Consultoria especializada para dimensionamento, viabilidade econômica e
                  desenvolvimento de projetos fotovoltaicos personalizados.
                </ServiceDescription>
                <ServiceFeatures>
                  <ServiceFeatureItem>Análise de consumo energético</ServiceFeatureItem>
                  <ServiceFeatureItem>Estudo de viabilidade técnica e econômica</ServiceFeatureItem>
                  <ServiceFeatureItem>Dimensionamento otimizado do sistema</ServiceFeatureItem>
                  <ServiceFeatureItem>Projetos elétricos e estruturais</ServiceFeatureItem>
                  <ServiceFeatureItem>Assessoria para financiamento</ServiceFeatureItem>
                </ServiceFeatures>
              </ServiceContent>
            </ServiceCard>
          </ServicesGrid>
        </Section>

        <Section>
          <SectionTitle>Soluções por Segmento</SectionTitle>
          <ServicesGrid>
            <ServiceCard>
              <ServiceHeader>
                <ServiceIcon>
                  <FaHome />
                </ServiceIcon>
                <ServiceTitle>Residencial</ServiceTitle>
              </ServiceHeader>
              <ServiceContent>
                <ServiceDescription>
                  Sistemas fotovoltaicos para residências, proporcionando economia na conta de luz
                  e valorização do imóvel com energia limpa e renovável.
                </ServiceDescription>
                <ServiceFeatures>
                  <ServiceFeatureItem>Sistemas de 2 a 15 kWp</ServiceFeatureItem>
                  <ServiceFeatureItem>Instalação rápida e sem transtornos</ServiceFeatureItem>
                  <ServiceFeatureItem>Financiamento facilitado</ServiceFeatureItem>
                  <ServiceFeatureItem>Monitoramento via aplicativo</ServiceFeatureItem>
                  <ServiceFeatureItem>Economia de até 95% na conta de luz</ServiceFeatureItem>
                </ServiceFeatures>
              </ServiceContent>
            </ServiceCard>

            <ServiceCard>
              <ServiceHeader>
                <ServiceIcon>
                  <FaBuilding />
                </ServiceIcon>
                <ServiceTitle>Comercial</ServiceTitle>
              </ServiceHeader>
              <ServiceContent>
                <ServiceDescription>
                  Soluções para empresas, comércios e escritórios que buscam reduzir custos operacionais
                  e melhorar sua imagem com sustentabilidade.
                </ServiceDescription>
                <ServiceFeatures>
                  <ServiceFeatureItem>Sistemas de 10 a 100 kWp</ServiceFeatureItem>
                  <ServiceFeatureItem>Projeto adaptado ao consumo comercial</ServiceFeatureItem>
                  <ServiceFeatureItem>Instalação com mínima interferência na operação</ServiceFeatureItem>
                  <ServiceFeatureItem>Monitoramento avançado de desempenho</ServiceFeatureItem>
                  <ServiceFeatureItem>Consultoria para incentivos fiscais</ServiceFeatureItem>
                </ServiceFeatures>
              </ServiceContent>
            </ServiceCard>

            <ServiceCard>
              <ServiceHeader>
                <ServiceIcon>
                  <FaIndustry />
                </ServiceIcon>
                <ServiceTitle>Industrial</ServiceTitle>
              </ServiceHeader>
              <ServiceContent>
                <ServiceDescription>
                  Projetos de grande porte para indústrias, com foco em redução de custos energéticos
                  e aumento da competitividade no mercado.
                </ServiceDescription>
                <ServiceFeatures>
                  <ServiceFeatureItem>Sistemas acima de 75 kWp</ServiceFeatureItem>
                  <ServiceFeatureItem>Projetos customizados para alta demanda</ServiceFeatureItem>
                  <ServiceFeatureItem>Integração com sistemas de gestão energética</ServiceFeatureItem>
                  <ServiceFeatureItem>Análise de retorno de investimento detalhada</ServiceFeatureItem>
                  <ServiceFeatureItem>Manutenção preventiva programada</ServiceFeatureItem>
                </ServiceFeatures>
              </ServiceContent>
            </ServiceCard>

            <ServiceCard>
              <ServiceHeader>
                <ServiceIcon>
                  <FaLightbulb />
                </ServiceIcon>
                <ServiceTitle>Eficiência Energética</ServiceTitle>
              </ServiceHeader>
              <ServiceContent>
                <ServiceDescription>
                  Soluções integradas que combinam energia solar com outras tecnologias para
                  maximizar a eficiência energética de edificações.
                </ServiceDescription>
                <ServiceFeatures>
                  <ServiceFeatureItem>Auditoria energética completa</ServiceFeatureItem>
                  <ServiceFeatureItem>Iluminação LED de alta eficiência</ServiceFeatureItem>
                  <ServiceFeatureItem>Automação para controle de consumo</ServiceFeatureItem>
                  <ServiceFeatureItem>Sistemas de aquecimento solar</ServiceFeatureItem>
                  <ServiceFeatureItem>Certificação de eficiência energética</ServiceFeatureItem>
                </ServiceFeatures>
              </ServiceContent>
            </ServiceCard>
          </ServicesGrid>
        </Section>

        <FAQSection>
          <SectionTitle>Perguntas Frequentes</SectionTitle>
          <FAQContainer>
            {faqs.map((faq, index) => (
              <FAQItem key={index}>
                <FAQQuestion 
                  isOpen={openFAQ === index} 
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <FaQuestion />
                </FAQQuestion>
                <FAQAnswer isOpen={openFAQ === index}>
                  {faq.answer}
                </FAQAnswer>
              </FAQItem>
            ))}
          </FAQContainer>
        </FAQSection>

        <CTASection>
          <CTATitle>Pronto para economizar com energia solar?</CTATitle>
          <CTAText>
            Entre em contato conosco hoje mesmo para uma avaliação gratuita e descubra quanto você pode economizar
            com um sistema de energia solar personalizado para suas necessidades.
          </CTAText>
          <CTAButton href="/contato">Solicitar Orçamento Gratuito</CTAButton>
        </CTASection>
      </PageContainer>
    </Layout>
  );
};

export default ServicosPage;
