import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { FaSolarPanel, FaPlus, FaEdit, FaTrash, FaImage, FaSave, FaSignInAlt, FaLock } from 'react-icons/fa';

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

const Section = styled.section`
  margin-bottom: 4rem;
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const LoginForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  margin-top: 0.5rem;
  font-size: 0.9rem;
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

const ProjectsTable = styled.div`
  overflow-x: auto;
  margin-top: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: ${({ theme }) => theme.colors.light};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.dark};
  }

  tr:hover {
    background-color: ${({ theme }) => theme.colors.light};
  }
`;

const ActionButton = styled.button`
  background-color: ${props => props.edit ? props.theme.colors.primary : props.theme.colors.danger};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const ImagePreview = styled.div`
  margin-top: 1rem;
  border: 1px dashed #ddd;
  border-radius: 4px;
  padding: 1rem;
  text-align: center;

  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }

  p {
    margin-top: 0.5rem;
    color: #666;
    font-size: 0.9rem;
  }
`;

const FileInput = styled.div`
  position: relative;
  margin-top: 1rem;

  input[type="file"] {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const FileInputLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px dashed ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;

  svg {
    margin-right: 0.5rem;
  }
`;

const AdminProjetosPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    date: '',
    power: '',
    panels: '',
    economy: '',
    co2Reduction: ''
  });

  // Hero slides state
  const [heroSlides, setHeroSlides] = useState([]);
  const [loadingHeroSlides, setLoadingHeroSlides] = useState(false);
  const [heroSlidesError, setHeroSlidesError] = useState('');
  const [heroSlidesSuccess, setHeroSlidesSuccess] = useState('');

  const [editingHeroSlide, setEditingHeroSlide] = useState(null);
  const [heroSlideFormData, setHeroSlideFormData] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    order: ''
  });

  // Testimonials state
  const [testimonials, setTestimonials] = useState([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);
  const [testimonialsError, setTestimonialsError] = useState('');
  const [testimonialsSuccess, setTestimonialsSuccess] = useState('');

  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [testimonialFormData, setTestimonialFormData] = useState({
    text: '',
    name: '',
    location: '',
    avatarUrl: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Simulated authentication - in a real app, this would be handled securely
  const handleLogin = (e) => {
    e.preventDefault();
    // Simple authentication for demo purposes
    // In a real application, this would be handled securely with proper authentication
    if (username === 'admin' && password === 'solar123') {
      setIsAuthenticated(true);
      setLoginError('');
      loadProjects();
      loadHeroSlides();
      loadTestimonials();
    } else {
      setLoginError('Nome de usuário ou senha incorretos');
    }
  };

  // Load hero slides from the API
  const loadHeroSlides = async () => {
    try {
      setLoadingHeroSlides(true);
      setHeroSlidesError('');

      const response = await fetch('/api/hero-slides');
      const data = await response.json();

      if (data.success) {
        setHeroSlides(data.slides);
      } else {
        setHeroSlidesError('Erro ao carregar slides: ' + data.message);
      }
    } catch (err) {
      setHeroSlidesError('Erro ao carregar slides: ' + err.message);
    } finally {
      setLoadingHeroSlides(false);
    }
  };

  // Load testimonials from the API
  const loadTestimonials = async () => {
    try {
      setLoadingTestimonials(true);
      setTestimonialsError('');

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

  // Load projects from the API
  const loadProjects = async () => {
    try {
      setLoading(true);
      // In a real application, this would fetch data from an API
      // For now, we'll use the hardcoded data from projetos.js
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle hero slide form input changes
  const handleHeroSlideInputChange = (e) => {
    const { name, value } = e.target;
    setHeroSlideFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle testimonial form input changes
  const handleTestimonialInputChange = (e) => {
    const { name, value } = e.target;
    setTestimonialFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle hero slide image file selection
  const handleHeroSlideImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle testimonial image file selection
  const handleTestimonialImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission for adding/editing a project
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Create FormData object to handle file upload
      const formDataObj = new FormData();

      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });

      // Add image file if selected
      if (imageFile) {
        formDataObj.append('image', imageFile);
      }

      // Add project ID if editing
      if (editingProject) {
        formDataObj.append('id', editingProject.id);
      }

      // Send data to API
      const url = editingProject 
        ? `/api/projects/${editingProject.id}` 
        : '/api/projects';

      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataObj
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(editingProject 
          ? 'Projeto atualizado com sucesso!' 
          : 'Projeto adicionado com sucesso!');

        // Reset form
        setFormData({
          title: '',
          description: '',
          category: '',
          location: '',
          date: '',
          power: '',
          panels: '',
          economy: '',
          co2Reduction: ''
        });
        setImageFile(null);
        setImagePreview('');
        setEditingProject(null);

        // Reload projects
        loadProjects();
      } else {
        setError('Erro: ' + data.message);
      }
    } catch (err) {
      setError('Erro ao salvar projeto: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle editing a project
  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      location: project.location,
      date: project.date,
      power: project.power,
      panels: project.panels,
      economy: project.economy,
      co2Reduction: project.co2Reduction
    });
    setImagePreview(project.image);
  };

  // Handle deleting a project
  const handleDelete = async (projectId) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Projeto excluído com sucesso!');
        loadProjects();
      } else {
        setError('Erro ao excluir projeto: ' + data.message);
      }
    } catch (err) {
      setError('Erro ao excluir projeto: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      location: '',
      date: '',
      power: '',
      panels: '',
      economy: '',
      co2Reduction: ''
    });
    setImageFile(null);
    setImagePreview('');
  };

  // Handle hero slide form submission
  const handleHeroSlideSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoadingHeroSlides(true);
      setHeroSlidesError('');
      setHeroSlidesSuccess('');

      // Create FormData object to handle file upload
      const formDataObj = new FormData();

      // Add all form fields to FormData
      Object.keys(heroSlideFormData).forEach(key => {
        formDataObj.append(key, heroSlideFormData[key]);
      });

      // Add image file if selected
      if (imageFile) {
        formDataObj.append('image', imageFile);
      }

      // Add slide ID if editing
      if (editingHeroSlide) {
        formDataObj.append('id', editingHeroSlide.id);
      }

      // Send data to API
      const url = editingHeroSlide 
        ? `/api/hero-slides` 
        : '/api/hero-slides';

      const method = editingHeroSlide ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataObj
      });

      const data = await response.json();

      if (data.success) {
        setHeroSlidesSuccess(editingHeroSlide 
          ? 'Slide atualizado com sucesso!' 
          : 'Slide adicionado com sucesso!');

        // Reset form
        setHeroSlideFormData({
          title: '',
          subtitle: '',
          imageUrl: '',
          order: ''
        });
        setImageFile(null);
        setImagePreview('');
        setEditingHeroSlide(null);

        // Reload hero slides
        loadHeroSlides();
      } else {
        setHeroSlidesError('Erro: ' + data.message);
      }
    } catch (err) {
      setHeroSlidesError('Erro ao salvar slide: ' + err.message);
    } finally {
      setLoadingHeroSlides(false);
    }
  };

  // Handle editing a hero slide
  const handleEditHeroSlide = (slide) => {
    setEditingHeroSlide(slide);
    setHeroSlideFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      imageUrl: slide.image,
      order: slide.order.toString()
    });
    setImagePreview(slide.image);
  };

  // Handle deleting a hero slide
  const handleDeleteHeroSlide = async (slideId) => {
    if (!confirm('Tem certeza que deseja excluir este slide?')) {
      return;
    }

    try {
      setLoadingHeroSlides(true);

      const formDataObj = new FormData();
      formDataObj.append('id', slideId);

      const response = await fetch(`/api/hero-slides`, {
        method: 'DELETE',
        body: formDataObj
      });

      const data = await response.json();

      if (data.success) {
        setHeroSlidesSuccess('Slide excluído com sucesso!');
        loadHeroSlides();
      } else {
        setHeroSlidesError('Erro ao excluir slide: ' + data.message);
      }
    } catch (err) {
      setHeroSlidesError('Erro ao excluir slide: ' + err.message);
    } finally {
      setLoadingHeroSlides(false);
    }
  };

  // Cancel editing hero slide
  const handleCancelEditHeroSlide = () => {
    setEditingHeroSlide(null);
    setHeroSlideFormData({
      title: '',
      subtitle: '',
      imageUrl: '',
      order: ''
    });
    setImageFile(null);
    setImagePreview('');
  };

  // Handle testimonial form submission
  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoadingTestimonials(true);
      setTestimonialsError('');
      setTestimonialsSuccess('');

      // Create FormData object to handle file upload
      const formDataObj = new FormData();

      // Add all form fields to FormData
      Object.keys(testimonialFormData).forEach(key => {
        formDataObj.append(key, testimonialFormData[key]);
      });

      // Add avatar file if selected
      if (imageFile) {
        formDataObj.append('avatar', imageFile);
      }

      // Add testimonial ID if editing
      if (editingTestimonial) {
        formDataObj.append('id', editingTestimonial.id);
      }

      // Send data to API
      const url = editingTestimonial 
        ? `/api/testimonials` 
        : '/api/testimonials';

      const method = editingTestimonial ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataObj
      });

      const data = await response.json();

      if (data.success) {
        setTestimonialsSuccess(editingTestimonial 
          ? 'Depoimento atualizado com sucesso!' 
          : 'Depoimento adicionado com sucesso!');

        // Reset form
        setTestimonialFormData({
          text: '',
          name: '',
          location: '',
          avatarUrl: ''
        });
        setImageFile(null);
        setImagePreview('');
        setEditingTestimonial(null);

        // Reload testimonials
        loadTestimonials();
      } else {
        setTestimonialsError('Erro: ' + data.message);
      }
    } catch (err) {
      setTestimonialsError('Erro ao salvar depoimento: ' + err.message);
    } finally {
      setLoadingTestimonials(false);
    }
  };

  // Handle editing a testimonial
  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial);
    setTestimonialFormData({
      text: testimonial.text,
      name: testimonial.name,
      location: testimonial.location,
      avatarUrl: testimonial.avatar
    });
    setImagePreview(testimonial.avatar);
  };

  // Handle deleting a testimonial
  const handleDeleteTestimonial = async (testimonialId) => {
    if (!confirm('Tem certeza que deseja excluir este depoimento?')) {
      return;
    }

    try {
      setLoadingTestimonials(true);

      const formDataObj = new FormData();
      formDataObj.append('id', testimonialId);

      const response = await fetch(`/api/testimonials`, {
        method: 'DELETE',
        body: formDataObj
      });

      const data = await response.json();

      if (data.success) {
        setTestimonialsSuccess('Depoimento excluído com sucesso!');
        loadTestimonials();
      } else {
        setTestimonialsError('Erro ao excluir depoimento: ' + data.message);
      }
    } catch (err) {
      setTestimonialsError('Erro ao excluir depoimento: ' + err.message);
    } finally {
      setLoadingTestimonials(false);
    }
  };

  // Cancel editing testimonial
  const handleCancelEditTestimonial = () => {
    setEditingTestimonial(null);
    setTestimonialFormData({
      text: '',
      name: '',
      location: '',
      avatarUrl: ''
    });
    setImageFile(null);
    setImagePreview('');
  };

  return (
    <Layout title="Gerenciador de Projetos | SolarTech">
      <PageContainer>
        <PageTitle>Gerenciador de Projetos</PageTitle>
        <PageDescription>
          Adicione, edite e gerencie os projetos realizados pela SolarTech que são exibidos no site.
        </PageDescription>

        {!isAuthenticated ? (
          <Section>
            <SectionTitle><FaLock /> Login</SectionTitle>
            <LoginForm onSubmit={handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Nome de Usuário</Label>
                <Input 
                  type="text" 
                  id="username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Senha</Label>
                <Input 
                  type="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormGroup>

              {loginError && <ErrorMessage>{loginError}</ErrorMessage>}

              <Button type="submit">
                <FaSignInAlt /> Entrar
              </Button>
            </LoginForm>
          </Section>
        ) : (
          <>
            <Section>
              <SectionTitle>
                {editingProject ? <><FaEdit /> Editar Projeto</> : <><FaPlus /> Adicionar Novo Projeto</>}
              </SectionTitle>

              {success && <SuccessMessage>{success}</SuccessMessage>}
              {error && <ErrorMessage>{error}</ErrorMessage>}

              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="title">Título do Projeto</Label>
                  <Input 
                    type="text" 
                    id="title" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: Residência Solar em São Paulo"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="description">Descrição</Label>
                  <TextArea 
                    id="description" 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    placeholder="Descreva o projeto em detalhes..."
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="category">Categoria</Label>
                  <Select 
                    id="category" 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Residencial">Residencial</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Rural">Rural</option>
                    <option value="Condomínio">Condomínio</option>
                    <option value="Público">Público</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="location">Localização</Label>
                  <Input 
                    type="text" 
                    id="location" 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: São Paulo, SP"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="date">Data de Instalação</Label>
                  <Input 
                    type="text" 
                    id="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: Janeiro 2023"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="power">Potência do Sistema</Label>
                  <Input 
                    type="text" 
                    id="power" 
                    name="power"
                    value={formData.power}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: 5.2 kWp"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="panels">Número de Painéis</Label>
                  <Input 
                    type="text" 
                    id="panels" 
                    name="panels"
                    value={formData.panels}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: 13 painéis"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="economy">Economia Mensal</Label>
                  <Input 
                    type="text" 
                    id="economy" 
                    name="economy"
                    value={formData.economy}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: R$ 850/mês"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="co2Reduction">Redução de CO₂</Label>
                  <Input 
                    type="text" 
                    id="co2Reduction" 
                    name="co2Reduction"
                    value={formData.co2Reduction}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: 2.5 ton/ano"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Imagem do Projeto</Label>
                  <FileInput>
                    <FileInputLabel>
                      <FaImage /> {imageFile ? 'Alterar imagem' : 'Selecionar imagem'}
                    </FileInputLabel>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      required={!editingProject}
                    />
                  </FileInput>

                  {imagePreview && (
                    <ImagePreview>
                      <img src={imagePreview} alt="Preview" />
                      <p>Preview da imagem selecionada</p>
                    </ImagePreview>
                  )}
                </FormGroup>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <Button type="submit" disabled={loading}>
                    <FaSave /> {editingProject ? 'Salvar Alterações' : 'Adicionar Projeto'}
                  </Button>

                  {editingProject && (
                    <Button type="button" onClick={handleCancelEdit} style={{ backgroundColor: '#999' }}>
                      Cancelar Edição
                    </Button>
                  )}
                </div>
              </form>
            </Section>

            <Section>
              <SectionTitle>
                {editingHeroSlide ? <><FaEdit /> Editar Slide do Carrossel</> : <><FaPlus /> Adicionar Novo Slide do Carrossel</>}
              </SectionTitle>

              {heroSlidesSuccess && <SuccessMessage>{heroSlidesSuccess}</SuccessMessage>}
              {heroSlidesError && <ErrorMessage>{heroSlidesError}</ErrorMessage>}

              <form onSubmit={handleHeroSlideSubmit}>
                <FormGroup>
                  <Label htmlFor="hero-title">Título do Slide</Label>
                  <Input 
                    type="text" 
                    id="hero-title" 
                    name="title"
                    value={heroSlideFormData.title}
                    onChange={handleHeroSlideInputChange}
                    placeholder="Ex: Residencial Solar"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="hero-subtitle">Subtítulo do Slide</Label>
                  <Input 
                    type="text" 
                    id="hero-subtitle" 
                    name="subtitle"
                    value={heroSlideFormData.subtitle}
                    onChange={handleHeroSlideInputChange}
                    placeholder="Ex: Soluções para sua casa"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="hero-order">Ordem de Exibição</Label>
                  <Input 
                    type="number" 
                    id="hero-order" 
                    name="order"
                    value={heroSlideFormData.order}
                    onChange={handleHeroSlideInputChange}
                    required
                    placeholder="Ex: 1"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Imagem do Slide</Label>
                  <FileInput>
                    <FileInputLabel>
                      <FaImage /> {imageFile ? 'Alterar imagem' : 'Selecionar imagem'}
                    </FileInputLabel>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleHeroSlideImageChange}
                    />
                  </FileInput>

                  <FormGroup>
                    <Label htmlFor="hero-imageUrl">Ou URL da Imagem</Label>
                    <Input 
                      type="text" 
                      id="hero-imageUrl" 
                      name="imageUrl"
                      value={heroSlideFormData.imageUrl}
                      onChange={handleHeroSlideInputChange}
                      placeholder="Ex: https://exemplo.com/imagem.jpg"
                    />
                    <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                      Você pode selecionar um arquivo ou informar a URL de uma imagem existente.
                    </p>
                  </FormGroup>

                  {imagePreview && (
                    <ImagePreview>
                      <img src={imagePreview} alt="Preview" />
                      <p>Preview da imagem selecionada</p>
                    </ImagePreview>
                  )}
                </FormGroup>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <Button type="submit" disabled={loadingHeroSlides}>
                    <FaSave /> {editingHeroSlide ? 'Salvar Alterações' : 'Adicionar Slide'}
                  </Button>

                  {editingHeroSlide && (
                    <Button type="button" onClick={handleCancelEditHeroSlide} style={{ backgroundColor: '#999' }}>
                      Cancelar Edição
                    </Button>
                  )}
                </div>
              </form>
            </Section>

            <Section>
              <SectionTitle><FaSolarPanel /> Slides do Carrossel</SectionTitle>

              {loadingHeroSlides ? (
                <p>Carregando slides...</p>
              ) : heroSlides.length > 0 ? (
                <ProjectsTable>
                  <Table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Subtítulo</th>
                        <th>Ordem</th>
                        <th>Imagem</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {heroSlides.map(slide => (
                        <tr key={slide.id}>
                          <td>{slide.id}</td>
                          <td>{slide.title}</td>
                          <td>{slide.subtitle}</td>
                          <td>{slide.order}</td>
                          <td>
                            {slide.image && (
                              <img 
                                src={slide.image} 
                                alt={slide.title} 
                                style={{ width: '50px', height: '30px', objectFit: 'cover' }} 
                              />
                            )}
                          </td>
                          <td>
                            <ActionButton 
                              edit 
                              onClick={() => handleEditHeroSlide(slide)}
                              title="Editar slide"
                            >
                              <FaEdit />
                            </ActionButton>
                            <ActionButton 
                              onClick={() => handleDeleteHeroSlide(slide.id)}
                              title="Excluir slide"
                            >
                              <FaTrash />
                            </ActionButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </ProjectsTable>
              ) : (
                <p>Nenhum slide cadastrado.</p>
              )}
            </Section>

            <Section>
              <SectionTitle><FaSolarPanel /> Projetos Cadastrados</SectionTitle>

              {loading ? (
                <p>Carregando projetos...</p>
              ) : projects.length > 0 ? (
                <ProjectsTable>
                  <Table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Categoria</th>
                        <th>Localização</th>
                        <th>Data</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map(project => (
                        <tr key={project.id}>
                          <td>{project.id}</td>
                          <td>{project.title}</td>
                          <td>{project.category}</td>
                          <td>{project.location}</td>
                          <td>{project.date}</td>
                          <td>
                            <ActionButton 
                              edit 
                              onClick={() => handleEdit(project)}
                              title="Editar projeto"
                            >
                              <FaEdit />
                            </ActionButton>
                            <ActionButton 
                              onClick={() => handleDelete(project.id)}
                              title="Excluir projeto"
                            >
                              <FaTrash />
                            </ActionButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </ProjectsTable>
              ) : (
                <p>Nenhum projeto cadastrado.</p>
              )}
            </Section>

            <Section>
              <SectionTitle>
                {editingTestimonial ? <><FaEdit /> Editar Depoimento</> : <><FaPlus /> Adicionar Novo Depoimento</>}
              </SectionTitle>

              {testimonialsSuccess && <SuccessMessage>{testimonialsSuccess}</SuccessMessage>}
              {testimonialsError && <ErrorMessage>{testimonialsError}</ErrorMessage>}

              <form onSubmit={handleTestimonialSubmit}>
                <FormGroup>
                  <Label htmlFor="testimonial-text">Depoimento</Label>
                  <TextArea 
                    id="testimonial-text" 
                    name="text"
                    value={testimonialFormData.text}
                    onChange={handleTestimonialInputChange}
                    required
                    placeholder="Ex: Instalamos painéis solares em nossa residência há 6 meses e já percebemos uma redução significativa na conta de luz..."
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="testimonial-name">Nome do Cliente</Label>
                  <Input 
                    type="text" 
                    id="testimonial-name" 
                    name="name"
                    value={testimonialFormData.name}
                    onChange={handleTestimonialInputChange}
                    required
                    placeholder="Ex: João Silva"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="testimonial-location">Localização</Label>
                  <Input 
                    type="text" 
                    id="testimonial-location" 
                    name="location"
                    value={testimonialFormData.location}
                    onChange={handleTestimonialInputChange}
                    required
                    placeholder="Ex: São Paulo, SP"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Foto do Cliente (Avatar)</Label>
                  <FileInput>
                    <FileInputLabel>
                      <FaImage /> {imageFile ? 'Alterar imagem' : 'Selecionar imagem'}
                    </FileInputLabel>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleTestimonialImageChange}
                    />
                  </FileInput>

                  <FormGroup>
                    <Label htmlFor="testimonial-avatarUrl">Ou URL da Imagem</Label>
                    <Input 
                      type="text" 
                      id="testimonial-avatarUrl" 
                      name="avatarUrl"
                      value={testimonialFormData.avatarUrl}
                      onChange={handleTestimonialInputChange}
                      placeholder="Ex: https://exemplo.com/avatar.jpg"
                    />
                    <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                      Você pode selecionar um arquivo ou informar a URL de uma imagem existente.
                    </p>
                  </FormGroup>

                  {imagePreview && (
                    <ImagePreview>
                      <img src={imagePreview} alt="Preview" />
                      <p>Preview da imagem selecionada</p>
                    </ImagePreview>
                  )}
                </FormGroup>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <Button type="submit" disabled={loadingTestimonials}>
                    <FaSave /> {editingTestimonial ? 'Salvar Alterações' : 'Adicionar Depoimento'}
                  </Button>

                  {editingTestimonial && (
                    <Button type="button" onClick={handleCancelEditTestimonial} style={{ backgroundColor: '#999' }}>
                      Cancelar Edição
                    </Button>
                  )}
                </div>
              </form>
            </Section>

            <Section>
              <SectionTitle><FaSolarPanel /> Depoimentos Cadastrados</SectionTitle>

              {loadingTestimonials ? (
                <p>Carregando depoimentos...</p>
              ) : testimonials.length > 0 ? (
                <ProjectsTable>
                  <Table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Localização</th>
                        <th>Depoimento</th>
                        <th>Avatar</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonials.map(testimonial => (
                        <tr key={testimonial.id}>
                          <td>{testimonial.id}</td>
                          <td>{testimonial.name}</td>
                          <td>{testimonial.location}</td>
                          <td>{testimonial.text.substring(0, 50)}...</td>
                          <td>
                            {testimonial.avatar && (
                              <img 
                                src={testimonial.avatar} 
                                alt={testimonial.name} 
                                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }} 
                              />
                            )}
                          </td>
                          <td>
                            <ActionButton 
                              edit 
                              onClick={() => handleEditTestimonial(testimonial)}
                              title="Editar depoimento"
                            >
                              <FaEdit />
                            </ActionButton>
                            <ActionButton 
                              onClick={() => handleDeleteTestimonial(testimonial.id)}
                              title="Excluir depoimento"
                            >
                              <FaTrash />
                            </ActionButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </ProjectsTable>
              ) : (
                <p>Nenhum depoimento cadastrado.</p>
              )}
            </Section>
          </>
        )}
      </PageContainer>
    </Layout>
  );
};

export default AdminProjetosPage;
