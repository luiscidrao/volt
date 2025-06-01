import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { FaSun, FaWhatsapp, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.light};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};

  img {
    height: 90px;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
  }
`;

const NavItem = styled.li`
  margin-left: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 0.5rem 0;
    margin-left: 0;
  }

  a {
    color: ${({ theme }) => theme.colors.dark};
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const WhatsAppButton = styled.a`
  display: flex;
  align-items: center;
  background-color: #25D366;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: #128C7E;
  }
`;

const Main = styled.main`
  min-height: calc(100vh - 160px);
`;

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light};
  padding: 2rem 0;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 0.5rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    color: ${({ theme }) => theme.colors.light};
    font-size: 1.5rem;
    transition: color 0.3s;

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding: 1rem 0;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Layout = ({ children, title = 'Energia Solar | Soluções Sustentáveis' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Soluções em energia solar para residências e empresas. Economize na conta de luz e contribua para um futuro sustentável." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
