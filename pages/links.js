import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { FaInstagram, FaMapMarkerAlt, FaWhatsapp, FaGlobe, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';

// Styled components
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

  span {
    color: ${({ theme }) => theme.colors.secondary};
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 5px;
      left: 0;
      width: 100%;
      height: 8px;
      background-color: ${({ theme }) => theme.colors.secondary};
      opacity: 0.2;
      z-index: -1;
    }
  }

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

const LinksContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LinkCard = styled.a`
  display: flex;
  align-items: center;
  padding: 1.2rem 1.5rem;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  color: ${({ theme }) => theme.colors.dark};
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 4px solid ${props => props.borderColor || props.theme.colors.primary};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
    z-index: 1;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.large};

    &::before {
      transform: translateX(100%);
    }
  }

  svg {
    font-size: 1.8rem;
    margin-right: 1.2rem;
    color: ${props => props.iconColor || props.theme.colors.secondary};
    transition: all 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

const ExternalLinkIcon = styled(FaExternalLinkAlt)`
  position: absolute;
  right: 1.5rem;
  font-size: 1rem !important;
  color: #aaa !important;
  margin-right: 0 !important;
  opacity: 0;
  transition: opacity 0.3s ease !important;

  ${LinkCard}:hover & {
    opacity: 1;
  }
`;

const CompanyInfoSection = styled.div`
  margin-top: 3rem;
  text-align: center;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const CompanyLogo = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 1rem;
`;

const CompanyName = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 0.5rem;

  span {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const CompanyAddress = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const CompanyCNPJ = styled.p`
  color: #888;
  font-size: 0.9rem;
`;

const LinksPage = () => {
  return (
    <Layout title="Links | Volt Energia Solar">
      <PageContainer>
        <PageTitle>
          <span>Volt</span> Energia Solar
        </PageTitle>
        <PageDescription>
          Acesse nossos canais de comunicação e redes sociais para ficar por dentro das novidades e entrar em contato conosco.
        </PageDescription>

        <LinksContainer>
          <LinkCard 
            href="https://instagram.com/voltenergiasolar" 
            target="_blank" 
            rel="noopener noreferrer"
            iconColor="#E1306C"
            borderColor="#E1306C"
          >
            <FaInstagram /> Instagram
            <ExternalLinkIcon />
          </LinkCard>

          <LinkCard 
            href="https://wa.me/5585981934321" 
            target="_blank" 
            rel="noopener noreferrer"
            iconColor="#25D366"
            borderColor="#25D366"
          >
            <FaWhatsapp /> WhatsApp
            <ExternalLinkIcon />
          </LinkCard>

          <LinkCard 
            href="https://maps.app.goo.gl/JLgvZdYqQvHnWULs5" 
            target="_blank" 
            rel="noopener noreferrer"
            iconColor="#4285F4"
            borderColor="#4285F4"
          >
            <FaMapMarkerAlt /> Nossa Localização
            <ExternalLinkIcon />
          </LinkCard>

          <LinkCard 
            href="https://voltenergiasolar.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            iconColor="#0a2896"
            borderColor="#0a2896"
          >
            <FaGlobe /> Site Oficial
            <ExternalLinkIcon />
          </LinkCard>

          <LinkCard 
            href="mailto:contato@voltenergiasolar.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            iconColor="#D44638"
            borderColor="#D44638"
          >
            <FaEnvelope /> E-mail
            <ExternalLinkIcon />
          </LinkCard>
        </LinksContainer>

        <CompanyInfoSection>
          <CompanyLogo src="/images/logo.png" alt="Volt Energia Solar" />
          <CompanyName><span>Volt</span> Energia Solar</CompanyName>
          <CompanyAddress>
            Avenida Jose Leon, 2701, Loja 9<br />
            Cidade dos Funcionarios - Fortaleza/CE
          </CompanyAddress>
          <CompanyCNPJ>CNPJ: 34.382.240/0001-10</CompanyCNPJ>
        </CompanyInfoSection>
      </PageContainer>
    </Layout>
  );
};

export default LinksPage;