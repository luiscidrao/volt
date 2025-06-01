import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { FaSolarPanel, FaLeaf, FaMoneyBillWave, FaShieldAlt, FaArrowRight, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  background-color: ${({ theme }) => theme.colors.secondary};

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

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
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

const HeroSection = styled.section`
  position: relative;
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  min-height: 500px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 4rem 1rem;
    min-height: 400px;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.a`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
`;

const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: white;
  border: 2px solid white;

  &:hover {
    background-color: white;
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const Section = styled.section`
  padding: 5rem 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 3rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
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
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const StepsSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.light};
`;

const StepsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StepItem = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const StepNumber = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const StepDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const CtaSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  text-align: center;
`;

const CtaContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CtaTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const CtaText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const CtaButton = styled(Button)`
  background-color: white;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
  }
`;

const TestimonialsSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.light};
`;

const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TestimonialCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  max-width: 800px;
`;

const TestimonialText = styled.p`
  font-style: italic;
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 1.5rem;
  line-height: 1.8;

  &::before {
    content: '"';
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.secondary};
  }

  &::after {
    content: '"';
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const TestimonialAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ddd;
  margin-right: 1rem;
`;

const TestimonialInfo = styled.div`
  h4 {
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
  }

  p {
    color: #777;
    font-size: 0.9rem;
  }
`;

const TestimonialControls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const TestimonialDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ active, theme }) => active ? theme.colors.secondary : '#ddd'};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ active, theme }) => active ? theme.colors.secondary : '#bbb'};
  }
`;

const ProjectsSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.light};
`;

const ProjectsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const ProjectsCarousel = styled.div`
  display: flex;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProjectCard = styled.div`
  background-color: white;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease;
  transform: translateX(-${props => props.activeIndex * 100}%);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const ProjectImage = styled.div`
  height: 300px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 200px;
  }
`;

const ProjectCategory = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProjectContent = styled.div`
  padding: 2rem;
  flex: 1;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ProjectMeta = styled.div`
  display: flex;
  align-items: center;
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;

  svg {
    margin-right: 0.5rem;
  }
`;

const ProjectDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
`;

const ProjectDetail = styled.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    color: #666;
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
  }

  span:last-child {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  color: ${({ theme }) => theme.colors.primary};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.prev {
    left: -20px;
  }

  &.next {
    right: -20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 30px;
    height: 30px;

    &.prev {
      left: -15px;
    }

    &.next {
      right: -15px;
    }
  }
`;

const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  gap: 0.5rem;
`;

const CarouselDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ active, theme }) => active ? theme.colors.secondary : '#ddd'};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ active, theme }) => active ? theme.colors.secondary : '#bbb'};
  }
`;

const ViewAllButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto 0;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;

  svg {
    margin-left: 0.5rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const HomePage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for hero slides
  const [heroSlides, setHeroSlides] = useState([]);
  const [loadingHeroSlides, setLoadingHeroSlides] = useState(true);
  const [heroSlidesError, setHeroSlidesError] = useState('');
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  // State for testimonials
  const [testimonials, setTestimonials] = useState([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [testimonialsError, setTestimonialsError] = useState('');

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

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects');
        const data = await response.json();

        if (data.success) {
          setProjects(data.projects);
        } else {
          setError('Erro ao carregar projetos: ' + data.message);
        }
      } catch (err) {
        setError('Erro ao carregar projetos: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Navigate to previous project
  const prevProject = () => {
    setActiveProject(prev => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  // Navigate to next project
  const nextProject = () => {
    setActiveProject(prev => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoadingTestimonials(true);
        const response = await fetch('/api/testimonials');
        const data = await response.json();

        if (data.success) {
          setTestimonials(data.testimonials);
        } else {
          setTestimonialsError('Erro ao carregar depoimentos: ' + data.message);
        }
      } catch (err) {
        setTestimonialsError('Erro ao carregar depoimentos: ' + err.message);
      } finally {
        setLoadingTestimonials(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <Layout title="Volt | Energia Solar para Residências e Empresas">
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
          <HeroTitle>Transforme o Sol em Economia para sua Casa ou Empresa</HeroTitle>
          <HeroSubtitle>
            Soluções em energia solar que reduzem sua conta de luz e contribuem para um futuro sustentável.
            Instalação profissional, financiamento facilitado e garantia de qualidade.
          </HeroSubtitle>
          <ButtonGroup>
            <PrimaryButton href="/calculadora">Calcule sua Economia</PrimaryButton>
            <SecondaryButton href="/contato">Solicite um Orçamento</SecondaryButton>
          </ButtonGroup>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionTitle>Por que escolher energia solar?</SectionTitle>
        <FeaturesContainer>
          <FeatureCard>
            <FeatureIcon>
              <FaMoneyBillWave />
            </FeatureIcon>
            <FeatureTitle>Economia Garantida</FeatureTitle>
            <FeatureDescription>
              Reduza sua conta de luz em até 95% e tenha retorno do investimento em aproximadamente 5 anos.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FaLeaf />
            </FeatureIcon>
            <FeatureTitle>Energia Limpa</FeatureTitle>
            <FeatureDescription>
              Contribua para um planeta mais sustentável utilizando uma fonte de energia renovável e não poluente.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FaSolarPanel />
            </FeatureIcon>
            <FeatureTitle>Tecnologia Avançada</FeatureTitle>
            <FeatureDescription>
              Utilizamos equipamentos de última geração com alta eficiência e durabilidade comprovada.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FaShieldAlt />
            </FeatureIcon>
            <FeatureTitle>Garantia Estendida</FeatureTitle>
            <FeatureDescription>
              Oferecemos garantia de 25 anos para os painéis solares e 10 anos para os inversores.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesContainer>
      </Section>

      <StepsSection>
        <SectionTitle>Como funciona</SectionTitle>
        <StepsContainer>
          <StepsList>
            <StepItem>
              <StepNumber>1</StepNumber>
              <StepContent>
                <StepTitle>Avaliação e Orçamento</StepTitle>
                <StepDescription>
                  Nossa equipe técnica avalia seu consumo de energia e as características do local para dimensionar o sistema ideal para suas necessidades. Apresentamos um orçamento detalhado e transparente.
                </StepDescription>
              </StepContent>
            </StepItem>

            <StepItem>
              <StepNumber>2</StepNumber>
              <StepContent>
                <StepTitle>Projeto e Aprovação</StepTitle>
                <StepDescription>
                  Desenvolvemos o projeto técnico e cuidamos de toda a documentação necessária para aprovação junto à concessionária de energia. Você não precisa se preocupar com a burocracia.
                </StepDescription>
              </StepContent>
            </StepItem>

            <StepItem>
              <StepNumber>3</StepNumber>
              <StepContent>
                <StepTitle>Instalação Profissional</StepTitle>
                <StepDescription>
                  Nossa equipe especializada realiza a instalação com segurança e eficiência, seguindo todas as normas técnicas. O processo é rápido e causa mínima interferência na sua rotina.
                </StepDescription>
              </StepContent>
            </StepItem>

            <StepItem>
              <StepNumber>4</StepNumber>
              <StepContent>
                <StepTitle>Homologação e Monitoramento</StepTitle>
                <StepDescription>
                  Após a instalação, realizamos a homologação junto à concessionária e configuramos o sistema de monitoramento para que você possa acompanhar a produção de energia em tempo real.
                </StepDescription>
              </StepContent>
            </StepItem>
          </StepsList>
        </StepsContainer>
      </StepsSection>

      <ProjectsSection>
        <SectionTitle>Projetos Realizados</SectionTitle>
        <ProjectsContainer>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p>Carregando projetos...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'red' }}>
              <p>{error}</p>
            </div>
          ) : projects.length > 0 ? (
            <>
              <ProjectsCarousel>
                {projects.map((project, index) => (
                  <ProjectCard key={project.id} activeIndex={activeProject}>
                    <ProjectImage src={project.image}>
                      <ProjectCategory>{project.category}</ProjectCategory>
                    </ProjectImage>
                    <ProjectContent>
                      <ProjectTitle>{project.title}</ProjectTitle>
                      <ProjectDescription>{project.description}</ProjectDescription>

                      <ProjectMeta>
                        <FaMapMarkerAlt /> {project.location}
                      </ProjectMeta>
                      <ProjectMeta>
                        <FaCalendarAlt /> {project.date}
                      </ProjectMeta>

                      <ProjectDetails>
                        <ProjectDetail>
                          <span>Potência</span>
                          <span>{project.power}</span>
                        </ProjectDetail>
                        <ProjectDetail>
                          <span>Painéis</span>
                          <span>{project.panels}</span>
                        </ProjectDetail>
                        <ProjectDetail>
                          <span>Economia</span>
                          <span>{project.economy}</span>
                        </ProjectDetail>
                        <ProjectDetail>
                          <span>Redução de CO₂</span>
                          <span>{project.co2Reduction}</span>
                        </ProjectDetail>
                      </ProjectDetails>
                    </ProjectContent>
                  </ProjectCard>
                ))}
              </ProjectsCarousel>

              <CarouselButton 
                className="prev" 
                onClick={prevProject} 
                disabled={projects.length <= 1}
              >
                <FaChevronLeft />
              </CarouselButton>

              <CarouselButton 
                className="next" 
                onClick={nextProject} 
                disabled={projects.length <= 1}
              >
                <FaChevronRight />
              </CarouselButton>

              <CarouselDots>
                {projects.map((_, index) => (
                  <CarouselDot 
                    key={index} 
                    active={index === activeProject} 
                    onClick={() => setActiveProject(index)}
                  />
                ))}
              </CarouselDots>

              <ViewAllButton as={Link} href="/projetos">
                Ver Todos os Projetos <FaArrowRight />
              </ViewAllButton>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p>Nenhum projeto encontrado.</p>
            </div>
          )}
        </ProjectsContainer>
      </ProjectsSection>

      <TestimonialsSection>
        <SectionTitle>O que nossos clientes dizem</SectionTitle>
        <TestimonialsContainer>
          {loadingTestimonials ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p>Carregando depoimentos...</p>
            </div>
          ) : testimonialsError ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'red' }}>
              <p>{testimonialsError}</p>
            </div>
          ) : testimonials.length > 0 ? (
            <>
              <TestimonialCard>
                <TestimonialText>
                  {testimonials[activeTestimonial].text}
                </TestimonialText>
                <TestimonialAuthor>
                  {testimonials[activeTestimonial].avatar ? (
                    <TestimonialAvatar style={{ 
                      backgroundImage: `url(${testimonials[activeTestimonial].avatar})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} />
                  ) : (
                    <TestimonialAvatar />
                  )}
                  <TestimonialInfo>
                    <h4>{testimonials[activeTestimonial].name}</h4>
                    <p>{testimonials[activeTestimonial].location}</p>
                  </TestimonialInfo>
                </TestimonialAuthor>
              </TestimonialCard>

              <TestimonialControls>
                {testimonials.map((_, index) => (
                  <TestimonialDot 
                    key={index} 
                    active={index === activeTestimonial} 
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </TestimonialControls>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p>Nenhum depoimento encontrado.</p>
            </div>
          )}
        </TestimonialsContainer>
      </TestimonialsSection>

      <CtaSection>
        <CtaContainer>
          <CtaTitle>Pronto para economizar?</CtaTitle>
          <CtaText>
            Dê o primeiro passo para a independência energética e contribua para um futuro mais sustentável.
            Nossa equipe está pronta para ajudar você a encontrar a melhor solução em energia solar.
          </CtaText>
          <CtaButton as={Link} href="/contato">
            Fale com um Especialista <FaArrowRight style={{ marginLeft: '0.5rem' }} />
          </CtaButton>
        </CtaContainer>
      </CtaSection>
    </Layout>
  );
};

export default HomePage;
