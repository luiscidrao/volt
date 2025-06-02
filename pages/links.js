import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { FaInstagram, FaMapMarkerAlt, FaWhatsapp, FaGlobe, FaEnvelope } from 'react-icons/fa';

// Main container for the page
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.accent} 100%);
`;

// Logo container
const LogoContainer = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 1rem;
`;

const CompanyName = styled.h1`
  color: white;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const Tagline = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin-bottom: 2rem;
`;

// Links container
const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  gap: 1rem;
`;

// Link button
const LinkButton = styled.a`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.dark};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.15);
    background-color: white;
  }

  svg {
    font-size: 1.5rem;
    margin-right: 1rem;
    color: ${props => props.iconColor || props.theme.colors.secondary};
  }
`;

// Footer
const Footer = styled.footer`
  margin-top: 3rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const LinksPage = () => {
  return (
    <>
      <Head>
        <title>Volt Energia Solar | Links</title>
        <meta name="description" content="Links importantes da Volt Energia Solar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <LogoContainer>
          <Logo src="/images/logo.png" alt="Volt Energia Solar" />
          <CompanyName>Volt Energia Solar</CompanyName>
          <Tagline>Soluções em energia solar para um futuro sustentável</Tagline>
        </LogoContainer>

        <LinksContainer>
          <LinkButton 
            href="https://instagram.com/voltenergiasolar" 
            target="_blank" 
            rel="noopener noreferrer"
            iconColor="#E1306C"
          >
            <FaInstagram /> Instagram
          </LinkButton>
          
          <LinkButton 
            href="https://wa.me/5585981934321" 
            target="_blank" 
            rel="noopener noreferrer"
            iconColor="#25D366"
          >
            <FaWhatsapp /> WhatsApp
          </LinkButton>
          
          <LinkButton 
            href="https://maps.app.goo.gl/JLgvZdYqQvHnWULs5" 
            target="_blank" 
            rel="noopener noreferrer"
            iconColor="#4285F4"
          >
            <FaMapMarkerAlt /> Nossa Localização
          </LinkButton>
          
          <LinkButton 
            href="https://voltenergiasolar.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            iconColor="#040287"
          >
            <FaGlobe /> Site Oficial
          </LinkButton>
          
          <LinkButton 
            href="mailto:contato@voltenergiasolar.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            iconColor="#D44638"
          >
            <FaEnvelope /> E-mail
          </LinkButton>
        </LinksContainer>

        <Footer>
          <p>&copy; {new Date().getFullYear()} Volt Energia Solar Ltda. Todos os direitos reservados.</p>
          <p>CNPJ: 34.382.240/0001-10</p>
        </Footer>
      </Container>
    </>
  );
};

export default LinksPage;