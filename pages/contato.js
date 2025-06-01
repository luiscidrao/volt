import { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp, FaPaperPlane, FaCheck } from 'react-icons/fa';

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

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ContactFormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ContactInfoContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ContactInfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ContactInfoItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;

  svg {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 1.2rem;
    margin-right: 1rem;
    margin-top: 0.2rem;
  }
`;

const ContactInfoContent = styled.div`
  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.3rem;
    color: ${({ theme }) => theme.colors.dark};
  }

  p {
    color: #666;
    line-height: 1.5;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const WhatsAppButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #25D366;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  margin-top: 1.5rem;
  transition: background-color 0.3s;
  text-decoration: none;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: #128C7E;
  }
`;

const MapContainer = styled.div`
  margin-top: 2rem;
  border-radius: 8px;
  overflow: hidden;
  height: 300px;

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const SuccessMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.success};
  color: white;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }
`;

const ContatoPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulando envio do formulário
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: ''
      });
    }, 1500);
  };

  return (
    <Layout title="Contato | Volt Energia Solar">
      <PageContainer>
        <PageTitle>Entre em Contato</PageTitle>
        <PageDescription>
          Estamos prontos para ajudar você a encontrar a melhor solução em energia solar para sua residência ou empresa.
          Preencha o formulário abaixo ou entre em contato diretamente pelos nossos canais de atendimento.
        </PageDescription>

        <ContactContainer>
          <ContactFormContainer>
            <SectionTitle>
              <FaEnvelope /> Formulário de Contato
            </SectionTitle>

            {submitted && (
              <SuccessMessage>
                <FaCheck /> Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.
              </SuccessMessage>
            )}

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input 
                  type="text" 
                  id="nome" 
                  name="nome" 
                  placeholder="Digite seu nome completo" 
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Digite seu e-mail" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="telefone">Telefone</Label>
                <Input 
                  type="tel" 
                  id="telefone" 
                  name="telefone" 
                  placeholder="(00) 00000-0000" 
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="assunto">Assunto</Label>
                <Select 
                  id="assunto" 
                  name="assunto" 
                  value={formData.assunto}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione um assunto</option>
                  <option value="orcamento">Solicitar Orçamento</option>
                  <option value="duvida">Dúvidas sobre Energia Solar</option>
                  <option value="visita">Agendar Visita Técnica</option>
                  <option value="suporte">Suporte Técnico</option>
                  <option value="outro">Outro Assunto</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="mensagem">Mensagem</Label>
                <TextArea 
                  id="mensagem" 
                  name="mensagem" 
                  placeholder="Digite sua mensagem" 
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : (
                  <>
                    <FaPaperPlane /> Enviar Mensagem
                  </>
                )}
              </Button>
            </form>
          </ContactFormContainer>

          <ContactInfoContainer>
            <SectionTitle>
              <FaPhone /> Informações de Contato
            </SectionTitle>

            <ContactInfoList>
              <ContactInfoItem>
                <FaPhone />
                <ContactInfoContent>
                  <h3>Telefone</h3>
                  <p><a href="tel:+5585981934321">(85) 98193-4321</a></p>
                </ContactInfoContent>
              </ContactInfoItem>

              <ContactInfoItem>
                <FaWhatsapp />
                <ContactInfoContent>
                  <h3>WhatsApp</h3>
                  <p><a href="https://wa.me/5585981934321">(85) 98193-4321</a></p>
                </ContactInfoContent>
              </ContactInfoItem>

              <ContactInfoItem>
                <FaEnvelope />
                <ContactInfoContent>
                  <h3>E-mail</h3>
                  <p><a href="mailto:contato@voltenergiasolar.com.br">contato@voltenergiasolar.com.br</a></p>
                </ContactInfoContent>
              </ContactInfoItem>

              <ContactInfoItem>
                <FaMapMarkerAlt />
                <ContactInfoContent>
                  <h3>Endereço</h3>
                  <p>Avenida Jose Leon, 2701, Loja 9<br />Cidade dos Funcionarios - Fortaleza/CE</p>
                </ContactInfoContent>
              </ContactInfoItem>
            </ContactInfoList>

            <WhatsAppButton href="https://wa.me/5585981934321" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp /> Fale Conosco pelo WhatsApp
            </WhatsAppButton>

            <MapContainer>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.3225691815897!2d-38.48271532412567!3d-3.7995963437469354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c74f2c1d7c3619%3A0x1db1c70e99656636!2sAv.%20Jos%C3%A9%20Leon%2C%202701%20-%20Cidade%20dos%20Funcion%C3%A1rios%2C%20Fortaleza%20-%20CE!5e0!3m2!1spt-BR!2sbr!4v1651789000000!5m2!1spt-BR!2sbr" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Volt Energia Solar"
              ></iframe>
            </MapContainer>
          </ContactInfoContainer>
        </ContactContainer>
      </PageContainer>
    </Layout>
  );
};

export default ContatoPage;
