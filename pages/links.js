import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styled, { keyframes, css } from 'styled-components';
import { FaInstagram, FaMapMarkerAlt, FaWhatsapp, FaGlobe, FaEnvelope, FaBolt, FaSun, FaMoon } from 'react-icons/fa';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Theme toggle
const ThemeToggleContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10;
`;

const ThemeToggleButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 1.2rem;
  backdrop-filter: blur(5px);
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    transition: all 0.3s ease;
  }
`;

// Background pattern
const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${({ darkMode }) => 
    darkMode 
      ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  };
  opacity: 0.6;
  z-index: 0;
`;

// Main container for the page
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${({ theme, darkMode }) => 
    darkMode 
      ? `linear-gradient(135deg, #121212 0%, #2d3748 100%)`
      : `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`
  };
  position: relative;
  overflow: hidden;
  transition: background 0.5s ease;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: ${({ darkMode }) => 
      darkMode 
        ? `radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 60%)`
        : `radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)`
    };
    z-index: 1;
  }
`;

// Card container
const Card = styled.div`
  position: relative;
  z-index: 2;
  background: ${({ darkMode }) => 
    darkMode 
      ? `rgba(30, 30, 40, 0.7)`
      : `rgba(255, 255, 255, 0.1)`
  };
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 2.5rem;
  box-shadow: ${({ theme, darkMode }) => 
    darkMode 
      ? `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.2)`
      : `${theme.shadows.large}, 0 0 20px rgba(255, 255, 255, 0.1)`
  };
  width: 100%;
  max-width: 550px;
  animation: ${fadeIn} 0.8s ease-out;
  border: 1px solid ${({ darkMode }) => 
    darkMode 
      ? `rgba(50, 50, 70, 0.5)`
      : `rgba(255, 255, 255, 0.2)`
  };
  transition: all 0.5s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

// Logo container
const LogoContainer = styled.div`
  margin-bottom: 2.5rem;
  text-align: center;
  position: relative;
  transition: all 0.5s ease;
`;

const LogoWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
  animation: ${float} 6s ease-in-out infinite;
`;

const LogoBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 160px;
  height: 160px;
  background: ${({ darkMode }) => 
    darkMode 
      ? `radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)`
      : `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`
  };
  border-radius: 50%;
  z-index: -1;
  transition: background 0.5s ease;
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
  filter: ${({ darkMode }) => 
    darkMode 
      ? `drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4)) brightness(0.95)`
      : `drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))`
  };
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CompanyName = styled.h1`
  color: white;
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  text-shadow: ${({ darkMode }) => 
    darkMode 
      ? `0 2px 10px rgba(0, 0, 0, 0.4)`
      : `0 2px 10px rgba(0, 0, 0, 0.2)`
  };
  transition: all 0.5s ease;

  span {
    color: ${({ theme, darkMode }) => 
      darkMode 
        ? `#ff9f5a`
        : theme.colors.secondary
    };
    position: relative;
    display: inline-block;
    transition: color 0.5s ease;

    &::after {
      content: '';
      position: absolute;
      bottom: 5px;
      left: 0;
      width: 100%;
      height: 8px;
      background-color: ${({ theme, darkMode }) => 
        darkMode 
          ? `#ff9f5a`
          : theme.colors.secondary
      };
      opacity: 0.3;
      z-index: -1;
      transition: background-color 0.5s ease;
    }
  }
`;

const Tagline = styled.p`
  color: ${({ darkMode }) => 
    darkMode 
      ? `rgba(255, 255, 255, 0.8)`
      : `rgba(255, 255, 255, 0.9)`
  };
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  font-weight: 500;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  transition: color 0.5s ease;
`;

// Links container
const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.2rem;
`;

// Link button
const LinkButton = styled.a`
  display: flex;
  align-items: center;
  padding: 1.2rem 1.8rem;
  background: ${({ darkMode }) => 
    darkMode 
      ? `rgba(255, 255, 255, 0.08)`
      : `rgba(255, 255, 255, 0.9)`
  };
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: ${({ darkMode }) => 
    darkMode 
      ? `rgba(255, 255, 255, 0.95)`
      : `#1a1a2e`
  };
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: ${({ theme, darkMode }) => 
    darkMode 
      ? `0 4px 12px rgba(0, 0, 0, 0.3)`
      : theme.shadows.medium
  };
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => 
      props.darkMode
        ? `linear-gradient(135deg, ${props.iconColor}10 0%, ${props.iconColor}20 100%)`
        : `linear-gradient(135deg, ${props.iconColor}20 0%, ${props.iconColor}40 100%)`
    };
    opacity: 0;
    z-index: -1;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: ${({ theme, darkMode }) => 
      darkMode 
        ? `0 8px 20px rgba(0, 0, 0, 0.4)`
        : theme.shadows.large
    };

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-2px) scale(0.98);
  }

  svg {
    font-size: 1.8rem;
    margin-right: 1.2rem;
    color: ${props => props.iconColor || props.theme.colors.secondary};
    transition: all 0.3s ease;

    ${props => props.iconAnimation && css`
      animation: ${pulse} 2s infinite ease-in-out;
    `}
  }
`;

// Footer
const Footer = styled.footer`
  margin-top: 3rem;
  text-align: center;
  color: ${({ darkMode }) => 
    darkMode 
      ? `rgba(255, 255, 255, 0.7)`
      : `rgba(255, 255, 255, 0.8)`
  };
  font-size: 0.9rem;
  position: relative;
  z-index: 2;
  transition: color 0.5s ease;

  a {
    color: ${({ theme, darkMode }) => 
      darkMode 
        ? `#ff9f5a`
        : theme.colors.secondary
    };
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LinksPage = () => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Staggered animation for links
  useEffect(() => {
    // Apply staggered animation to links
    const links = document.querySelectorAll('.link-item');
    links.forEach((link, index) => {
      link.style.animationDelay = `${0.1 + index * 0.1}s`;
    });

    // Check user's preferred color scheme
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);

    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setDarkMode(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Volt Energia Solar | Links</title>
        <meta name="description" content="Links importantes da Volt Energia Solar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container darkMode={darkMode}>
        <BackgroundPattern darkMode={darkMode} />

        <ThemeToggleContainer>
          <ThemeToggleButton onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {darkMode ? <FaSun /> : <FaMoon />}
          </ThemeToggleButton>
        </ThemeToggleContainer>

        <Card darkMode={darkMode}>
          <LogoContainer>
            <LogoWrapper>
              <LogoBackground darkMode={darkMode} />
              <Logo src="/images/logo.png" alt="Volt Energia Solar" darkMode={darkMode} />
            </LogoWrapper>
            <CompanyName darkMode={darkMode}><span>Volt</span> Energia Solar</CompanyName>
            <Tagline darkMode={darkMode}>Soluções em energia solar para um futuro sustentável</Tagline>
          </LogoContainer>

          <LinksContainer>
            <LinkButton 
              href="https://instagram.com/voltenergiasolar" 
              target="_blank" 
              rel="noopener noreferrer"
              iconColor="#E1306C"
              darkMode={darkMode}
              className="link-item"
              style={{animation: `${fadeIn.toString()} 0.5s both`}}
            >
              <FaInstagram /> Instagram
            </LinkButton>

            <LinkButton 
              href="https://wa.me/5585981934321" 
              target="_blank" 
              rel="noopener noreferrer"
              iconColor="#25D366"
              iconAnimation={true}
              darkMode={darkMode}
              className="link-item"
              style={{animation: `${fadeIn.toString()} 0.5s both`}}
            >
              <FaWhatsapp /> WhatsApp
            </LinkButton>

            <LinkButton 
              href="https://maps.app.goo.gl/JLgvZdYqQvHnWULs5" 
              target="_blank" 
              rel="noopener noreferrer"
              iconColor="#4285F4"
              darkMode={darkMode}
              className="link-item"
              style={{animation: `${fadeIn.toString()} 0.5s both`}}
            >
              <FaMapMarkerAlt /> Nossa Localização
            </LinkButton>

            <LinkButton 
              href="https://voltenergiasolar.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              iconColor="#040287"
              darkMode={darkMode}
              className="link-item"
              style={{animation: `${fadeIn.toString()} 0.5s both`}}
            >
              <FaGlobe /> Site Oficial
            </LinkButton>

            <LinkButton 
              href="mailto:contato@voltenergiasolar.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              iconColor="#D44638"
              darkMode={darkMode}
              className="link-item"
              style={{animation: `${fadeIn.toString()} 0.5s both`}}
            >
              <FaEnvelope /> E-mail
            </LinkButton>
          </LinksContainer>
        </Card>

        <Footer darkMode={darkMode}>
          <p>&copy; {new Date().getFullYear()} <a href="https://voltenergiasolar.com.br">Volt Energia Solar</a> Ltda. Todos os direitos reservados.</p>
          <p>CNPJ: 34.382.240/0001-10</p>
        </Footer>
      </Container>
    </>
  );
};

export default LinksPage;
