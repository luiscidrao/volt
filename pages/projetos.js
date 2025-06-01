import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { FaSolarPanel, FaFilter, FaSearch, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

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

const FiltersContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FiltersTitle = styled.h2`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark};
  font-size: 0.9rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(46, 134, 171, 0.2);
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(46, 134, 171, 0.2);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }
`;

const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border-radius: 4px;
    width: 100%;
    justify-content: center;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
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
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ProjectMeta = styled.div`
  display: flex;
  align-items: center;
  color: #999;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;

  svg {
    margin-right: 0.5rem;
    font-size: 0.9rem;
  }
`;

const ProjectDetails = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const ProjectDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;

  span:first-child {
    color: #666;
  }

  span:last-child {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ active, theme }) => active ? theme.colors.primary : '#ddd'};
  background-color: ${({ active, theme }) => active ? theme.colors.primary : 'white'};
  color: ${({ active }) => active ? 'white' : '#666'};
  border-radius: 4px;
  margin: 0 0.3rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ active, theme }) => active ? theme.colors.primary : '#f5f5f5'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.dark};
    margin-bottom: 1rem;
  }

  p {
    color: #666;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 3rem;

  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.dark};
    margin-bottom: 1rem;
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #fff8f8;
  border-radius: 8px;
  border-left: 4px solid ${({ theme }) => theme.colors.danger};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.danger};
    margin-bottom: 1rem;
  }

  p {
    color: #666;
  }
`;

const ProjetosPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    categoria: '',
    potencia: '',
    ano: ''
  });
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects');
        const data = await response.json();

        if (data.success) {
          setProjectsData(data.projects);
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

  // Filtrar projetos com base nos filtros e termo de busca
  const filteredProjects = projectsData.filter(project => {
    // Filtrar por categoria
    if (filters.categoria && project.category !== filters.categoria) {
      return false;
    }

    // Filtrar por potência
    if (filters.potencia) {
      const powerValue = parseFloat(project.power);
      if (filters.potencia === 'pequeno' && powerValue > 10) return false;
      if (filters.potencia === 'medio' && (powerValue <= 10 || powerValue > 50)) return false;
      if (filters.potencia === 'grande' && powerValue <= 50) return false;
    }

    // Filtrar por ano
    if (filters.ano && !project.date.includes(filters.ano)) {
      return false;
    }

    // Filtrar por termo de busca
    if (searchTerm && !project.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !project.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !project.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Paginação
  const projectsPerPage = 6;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout title="Projetos Realizados | SolarTech">
      <PageContainer>
        <PageTitle>Projetos Realizados</PageTitle>
        <PageDescription>
          Conheça alguns dos nossos projetos de energia solar realizados em diferentes setores.
          Cada projeto representa economia, sustentabilidade e satisfação para nossos clientes.
        </PageDescription>

        {loading ? (
          <LoadingContainer>
            <h3>Carregando projetos...</h3>
          </LoadingContainer>
        ) : error ? (
          <ErrorContainer>
            <h3>Erro ao carregar projetos</h3>
            <p>{error}</p>
          </ErrorContainer>
        ) : (
          <>
            <FiltersContainer>
              <FiltersTitle>
                <FaFilter /> Filtrar Projetos
              </FiltersTitle>

              <FiltersGrid>
                <FilterGroup>
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select 
                    id="categoria" 
                    name="categoria" 
                    value={filters.categoria}
                    onChange={handleFilterChange}
                  >
                    <option value="">Todas as Categorias</option>
                    <option value="Residencial">Residencial</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Rural">Rural</option>
                    <option value="Condomínio">Condomínio</option>
                    <option value="Público">Público</option>
                  </Select>
                </FilterGroup>

                <FilterGroup>
                  <Label htmlFor="potencia">Potência do Sistema</Label>
                  <Select 
                    id="potencia" 
                    name="potencia" 
                    value={filters.potencia}
                    onChange={handleFilterChange}
                  >
                    <option value="">Qualquer Potência</option>
                    <option value="pequeno">Pequeno (até 10 kWp)</option>
                    <option value="medio">Médio (10-50 kWp)</option>
                    <option value="grande">Grande (acima de 50 kWp)</option>
                  </Select>
                </FilterGroup>

                <FilterGroup>
                  <Label htmlFor="ano">Ano de Instalação</Label>
                  <Select 
                    id="ano" 
                    name="ano" 
                    value={filters.ano}
                    onChange={handleFilterChange}
                  >
                    <option value="">Todos os Anos</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </Select>
                </FilterGroup>
              </FiltersGrid>

              <form onSubmit={handleSearch}>
                <SearchContainer>
                  <SearchInput 
                    type="text" 
                    placeholder="Buscar por título, descrição ou localização..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <SearchButton type="submit">
                    <FaSearch /> Buscar
                  </SearchButton>
                </SearchContainer>
              </form>
            </FiltersContainer>

            {currentProjects.length > 0 ? (
              <>
                <ProjectsGrid>
                  {currentProjects.map(project => (
                    <ProjectCard key={project.id}>
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
                            <span>Potência:</span>
                            <span>{project.power}</span>
                          </ProjectDetail>
                          <ProjectDetail>
                            <span>Painéis:</span>
                            <span>{project.panels}</span>
                          </ProjectDetail>
                          <ProjectDetail>
                            <span>Economia:</span>
                            <span>{project.economy}</span>
                          </ProjectDetail>
                          <ProjectDetail>
                            <span>Redução de CO₂:</span>
                            <span>{project.co2Reduction}</span>
                          </ProjectDetail>
                        </ProjectDetails>
                      </ProjectContent>
                    </ProjectCard>
                  ))}
                </ProjectsGrid>

                {totalPages > 1 && (
                  <Pagination>
                    <PageButton 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      &lt;
                    </PageButton>

                    {[...Array(totalPages)].map((_, index) => (
                      <PageButton 
                        key={index + 1}
                        active={currentPage === index + 1}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </PageButton>
                    ))}

                    <PageButton 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      &gt;
                    </PageButton>
                  </Pagination>
                )}
              </>
            ) : (
              <NoResults>
                <h3>Nenhum projeto encontrado</h3>
                <p>Tente ajustar os filtros ou termos de busca para encontrar projetos.</p>
              </NoResults>
            )}
          </>
        )}
      </PageContainer>
    </Layout>
  );
};

export default ProjetosPage;
