import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { FaSun, FaWhatsapp, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.light};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.colors.gradient.secondary};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s ease;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    padding: 0.8rem 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  img {
    height: 80px;
    width: auto;
    object-fit: contain;
  }
`;

const Nav = styled.nav`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 1rem;
    width: 100%;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 0.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
  }
`;

const NavItem = styled.li`
  position: relative;
  margin-left: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 0.5rem 0;
    margin-left: 0;
  }

  a {
    color: ${({ theme }) => theme.colors.dark};
    font-weight: 500;
    padding: 0.5rem 0;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: ${({ theme }) => theme.colors.secondary};
      transform: scaleX(0);
      transform-origin: bottom right;
      transition: transform 0.3s ease;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.primary};

      &:after {
        transform: scaleX(1);
        transform-origin: bottom left;
      }
    }
  }
`;

const WhatsAppButton = styled.a`
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 600;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: all 0.3s ease;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
    background: linear-gradient(135deg, #128C7E 0%, #075E54 100%);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Main = styled.main`
  min-height: calc(100vh - 160px);
`;

const Footer = styled.footer`
  background: linear-gradient(to bottom, ${({ theme }) => theme.colors.dark} 0%, #0f0f1e 100%);
  color: ${({ theme }) => theme.colors.light};
  padding: 3rem 0 2rem;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.colors.gradient.secondary};
  }
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 1.5rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: 1.2rem;
    font-size: 1.2rem;
    position: relative;
    display: inline-block;

    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      background: ${({ theme }) => theme.colors.gradient.secondary};
      border-radius: ${({ theme }) => theme.borderRadius.small};
    }
  }

  p {
    margin-bottom: 0.8rem;
    font-size: 0.95rem;
    opacity: 0.9;
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.5rem;
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 1.5rem;

  a {
    color: ${({ theme }) => theme.colors.light};
    font-size: 1.5rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);

    &:hover {
      color: white;
      background-color: ${({ theme }) => theme.colors.secondary};
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(236, 104, 27, 0.3);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding: 1.5rem 0;
  margin-top: 2.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  opacity: 0.8;
`;

const Layout = ({ children, title = 'Energia Solar | Soluções Sustentáveis' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Soluções em energia solar para residências e empresas. Economize na conta de luz e contribua para um futuro sustentável." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <Header>
        <HeaderContainer>
          <Logo>
            <img src="/images/logo.png" alt="Volt Energia Solar" />
          </Logo>

          <Nav>
            <NavList>
              <NavItem>
                <Link href="/" legacyBehavior><a>Início</a></Link>
              </NavItem>
              <NavItem>
                <Link href="/sobre" legacyBehavior><a>Sobre</a></Link>
              </NavItem>
              <NavItem>
                <Link href="/servicos" legacyBehavior><a>Serviços</a></Link>
              </NavItem>
              <NavItem>
                <Link href="/projetos" legacyBehavior><a>Projetos</a></Link>
              </NavItem>
              <NavItem>
                <Link href="/calculadora" legacyBehavior><a>Calculadora Solar</a></Link>
              </NavItem>
              <NavItem>
                <Link href="/contato" legacyBehavior><a>Contato</a></Link>
              </NavItem>
              <NavItem>
                <WhatsAppButton href="https://wa.me/5585981934321" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp /> Fale Conosco
                </WhatsAppButton>
              </NavItem>
            </NavList>
          </Nav>
        </HeaderContainer>
      </Header>

      <Main>{children}</Main>

      <Footer>
        <FooterContainer>
          <FooterSection>
            <h3>VOLT ENERGIA SOLAR</h3>
            <p>Soluções em energia solar para um futuro sustentável.</p>
            <p>Transformando a energia do sol em economia para você desde 2019.</p>
            <p>CNPJ: 34.382.240/0001-10</p>
          </FooterSection>

          <FooterSection>
            <h3>Contato</h3>
            <p><FaPhone /> (85) 98193-4321</p>
            <p><FaWhatsapp /> (85) 98193-4321</p>
            <p><FaEnvelope /> contato@voltenergiasolar.com.br</p>
            <p><FaMapMarkerAlt /> Avenida Jose Leon, 2701, Loja 9 - Cidade dos Funcionarios - Fortaleza/CE</p>
          </FooterSection>

          <FooterSection>
            <h3>Redes Sociais</h3>
            <SocialLinks>
              <a href="https://facebook.com/voltenergiasolar" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://instagram.com/voltenergiasolar" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com/company/voltenergiasolar" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </SocialLinks>
          </FooterSection>
        </FooterContainer>

        <Copyright>
          <p>&copy; {new Date().getFullYear()} Volt Energia Solar Ltda. Todos os direitos reservados.</p>
        </Copyright>
      </Footer>
    </>
  );
};

export default Layout;
