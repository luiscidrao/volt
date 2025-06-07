import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { FaBuilding, FaHistory, FaUsers, FaAward, FaHandshake, FaLeaf, FaLightbulb, FaBullseye, FaChartLine, FaSolarPanel, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.secondary};
  }

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

const AboutText = styled.div`
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  color: #555;
  font-size: 1.1rem;

  p {
    margin-bottom: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const HistoryTimeline = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.light};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    margin-left: 60px;
  }
`;

const TimelineDate = styled.div`
  width: 45%;
  text-align: right;
  padding-right: 2rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: -10px;
    top: 15px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.secondary};
    z-index: 1;
  }

  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    text-align: left;
    padding-right: 0;
    padding-left: 1rem;
    margin-bottom: 1rem;

    &::after {
      left: -40px;
      right: auto;
    }
  }
`;

const TimelineContent = styled.div`
  width: 45%;
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  p {
    margin: 0;
    line-height: 1.6;
    color: #666;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const ValuesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const ValueCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`;

const ValueIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
`;

const ValueTitle = styled.h3`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 1rem;
`;

const ValueDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const TeamContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const TeamMemberCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`;

const TeamMemberPhoto = styled.div`
  height: 250px;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const TeamMemberInfo = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const TeamMemberName = styled.h3`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 0.5rem;
`;

const TeamMemberPosition = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 500;
  margin-bottom: 1rem;
`;

const TeamMemberBio = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const AchievementsSection = styled.section`
  background-color: ${({ theme }) => theme.colors.light};
  padding: 3rem 2rem;
  border-radius: 8px;
  margin-bottom: 4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 2rem 1rem;
  }
`;

const AchievementsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const AchievementCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`;

const AchievementIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
`;

const AchievementNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const AchievementTitle = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const SobrePage = () => {
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

  return (
    <Layout title="Sobre Nós | Volt Energia Solar">
      <PageContainer>
        <PageTitle>Sobre Nós</PageTitle>
        <PageDescription>
          Conheça a Volt Energia Solar, uma empresa comprometida com a sustentabilidade e a inovação no setor de energia solar.
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
            <HeroTitle>Transformando o Futuro da Energia</HeroTitle>
            <HeroSubtitle>
              Desde 2019, a Volt Energia Solar tem sido pioneira em soluções de energia solar no Brasil,
              ajudando residências e empresas a economizar e contribuir para um planeta mais sustentável.
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        <Section>
          <SectionTitle><FaBuilding /> Quem Somos</SectionTitle>
          <AboutText>
            <p>
              A Volt Energia Solar é uma empresa especializada em energia solar fotovoltaica, fundada em 2019 com a missão de democratizar o acesso à energia limpa e renovável no Brasil. Nascemos da visão de um grupo de engenheiros e empreendedores que acreditam no potencial da energia solar como solução para os desafios energéticos e ambientais do nosso tempo.
            </p>
            <p>
              Com uma equipe multidisciplinar de profissionais altamente qualificados, oferecemos soluções completas em energia solar para residências, comércios e indústrias. Nosso compromisso é entregar projetos de excelência, com equipamentos de alta qualidade, instalação profissional e suporte contínuo aos nossos clientes.
            </p>
            <p>
              Localizada em Fortaleza/CE, a Volt Energia Solar (CNPJ: 34.382.240/0001-10) tem construído uma reputação sólida no mercado, baseada na confiança, transparência e resultados. Cada projeto que realizamos é uma oportunidade de transformar a maneira como nossos clientes consomem energia, gerando economia financeira e impacto ambiental positivo.
            </p>
          </AboutText>
        </Section>

        <Section>
          <SectionTitle><FaHistory /> Nossa História</SectionTitle>
          <HistoryTimeline>
            <TimelineItem>
              <TimelineDate>
                <h3>2019</h3>
              </TimelineDate>
              <TimelineContent>
                <p>Fundação da Volt Energia Solar em Fortaleza/CE com o objetivo de democratizar o acesso à energia solar no Brasil. Primeiros projetos residenciais são implementados.</p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineDate>
                <h3>2020</h3>
              </TimelineDate>
              <TimelineContent>
                <p>Expansão para o setor comercial e industrial. Abertura da loja na Avenida Jose Leon e formação de parcerias estratégicas com fornecedores de equipamentos de alta qualidade.</p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineDate>
                <h3>2021</h3>
              </TimelineDate>
              <TimelineContent>
                <p>Implementação de sistema de monitoramento remoto para todos os clientes. Alcance da marca de 100 sistemas instalados e consolidação no mercado cearense.</p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineDate>
                <h3>2022</h3>
              </TimelineDate>
              <TimelineContent>
                <p>Implementação do primeiro projeto de médio porte para empresas locais. Lançamento do programa de treinamento e capacitação de novos profissionais do setor.</p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineDate>
                <h3>2023</h3>
              </TimelineDate>
              <TimelineContent>
                <p>Consolidação como uma das principais empresas do setor em Fortaleza. Expansão da equipe técnica e desenvolvimento de soluções integradas de eficiência energética.</p>
              </TimelineContent>
            </TimelineItem>
          </HistoryTimeline>
        </Section>

        <Section>
          <SectionTitle><FaLightbulb /> Missão, Visão e Valores</SectionTitle>
          <ValuesContainer>
            <ValueCard>
              <ValueIcon>
                <FaBullseye />
              </ValueIcon>
              <ValueTitle>Missão</ValueTitle>
              <ValueDescription>
                Democratizar o acesso à energia solar, oferecendo soluções de qualidade que geram economia financeira para nossos clientes e contribuem para um futuro mais sustentável.
              </ValueDescription>
            </ValueCard>

            <ValueCard>
              <ValueIcon>
                <FaChartLine />
              </ValueIcon>
              <ValueTitle>Visão</ValueTitle>
              <ValueDescription>
                Ser reconhecida como a empresa referência em energia solar no Brasil, liderando a transição energética com inovação, qualidade e excelência em atendimento.
              </ValueDescription>
            </ValueCard>

            <ValueCard>
              <ValueIcon>
                <FaLeaf />
              </ValueIcon>
              <ValueTitle>Sustentabilidade</ValueTitle>
              <ValueDescription>
                Compromisso com práticas sustentáveis em todas as nossas operações, promovendo a conscientização ambiental e o uso responsável dos recursos naturais.
              </ValueDescription>
            </ValueCard>

            <ValueCard>
              <ValueIcon>
                <FaHandshake />
              </ValueIcon>
              <ValueTitle>Integridade</ValueTitle>
              <ValueDescription>
                Atuamos com ética, transparência e honestidade em todos os relacionamentos, construindo confiança com clientes, parceiros e colaboradores.
              </ValueDescription>
            </ValueCard>
          </ValuesContainer>
        </Section>

        <Section>
          <SectionTitle><FaUsers /> Nossa Equipe</SectionTitle>
          <TeamContainer>
            <TeamMemberCard>
              <TeamMemberPhoto>
                <FaUsers />
              </TeamMemberPhoto>
              <TeamMemberInfo>
                <TeamMemberName>Luis Castelo Cidrão</TeamMemberName>
                <TeamMemberPosition>CEO e Fundador</TeamMemberPosition>
                <TeamMemberBio>
                 Eletrotécnico com experiência no setor de energia. Visionário e apaixonado por tecnologias sustentáveis, lidera a Volt Energia Solar com foco em inovação e excelência desde 2019.
                </TeamMemberBio>
              </TeamMemberInfo>
            </TeamMemberCard>
          </TeamContainer>
        </Section>

        <AchievementsSection>
          <SectionTitle><FaAward /> Nossas Conquistas</SectionTitle>
          <AchievementsContainer>
            <AchievementCard>
              <AchievementIcon>
                <FaSolarPanel />
              </AchievementIcon>
              <AchievementNumber>300+</AchievementNumber>
              <AchievementTitle>Sistemas Instalados</AchievementTitle>
            </AchievementCard>

            <AchievementCard>
              <AchievementIcon>
                <FaLeaf />
              </AchievementIcon>
              <AchievementNumber>2.500</AchievementNumber>
              <AchievementTitle>Toneladas de CO₂ Evitadas</AchievementTitle>
            </AchievementCard>

            <AchievementCard>
              <AchievementIcon>
                <FaUsers />
              </AchievementIcon>
              <AchievementNumber>20+</AchievementNumber>
              <AchievementTitle>Profissionais Especializados</AchievementTitle>
            </AchievementCard>

            <AchievementCard>
              <AchievementIcon>
                <FaHandshake />
              </AchievementIcon>
              <AchievementNumber>98%</AchievementNumber>
              <AchievementTitle>Satisfação dos Clientes</AchievementTitle>
            </AchievementCard>
          </AchievementsContainer>
        </AchievementsSection>
      </PageContainer>
    </Layout>
  );
};

export default SobrePage;
