import React, { useState, useEffect } from 'react';
import { VisualizacaoComparativa, EstatisticasNacionais, ContadoresAcesso } from './visualizacoes';
import './App.css';

// Bandeiras para seletor de idioma
import bandeiraBrasil from './assets/bandeira-brasil.png';
import bandeiraEUA from './assets/bandeira-eua.png';
import bandeiraEspanha from './assets/bandeira-espanha.png';

function App() {
  // Estados para controle de interface
  const [nivel, setNivel] = useState('federal');
  const [estado, setEstado] = useState('SP');
  const [tipoVisualizacao, setTipoVisualizacao] = useState('macro');
  const [setor, setSetor] = useState('educacao');
  const [tipoMetrica, setTipoMetrica] = useState('valor_absoluto');
  const [ano, setAno] = useState(2024);
  const [idioma, setIdioma] = useState('pt-BR');
  const [mostrarSobre, setMostrarSobre] = useState(false);
  
  // Estado para dados
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  
  // Estados para contadores
  const [acessosTotais, setAcessosTotais] = useState(1245678);
  const [usuariosUnicos, setUsuariosUnicos] = useState(358921);
  const [usuariosAtivos, setUsuariosAtivos] = useState(127);
  
  // Carregar dados ao iniciar
  useEffect(() => {
    carregarDados();
    
    // Simular incremento de contadores
    const intervaloContadores = setInterval(() => {
      setAcessosTotais(prev => prev + Math.floor(Math.random() * 5));
      setUsuariosUnicos(prev => prev + Math.floor(Math.random() * 2));
      setUsuariosAtivos(prev => 120 + Math.floor(Math.random() * 20));
    }, 5000);
    
    return () => clearInterval(intervaloContadores);
  }, []);
  
  // Função para carregar dados
  const carregarDados = async () => {
    setCarregando(true);
    
    try {
      // Em produção, buscaríamos os dados da API
      // const resposta = await fetch('/api/dados');
      // const dadosJson = await resposta.json();
      
      // Para desenvolvimento, usamos dados simulados
      const dadosSimulados = await import('./dados_simulados.json');
      
      setDados(dadosSimulados.default);
      setCarregando(false);
    } catch (erro) {
      console.error('Erro ao carregar dados:', erro);
      setCarregando(false);
    }
  };
  
  // Lista de estados em ordem alfabética
  const estados = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ];
  
  // Traduções
  const traducoes = {
    'pt-BR': {
      titulo: 'EducaPúblico',
      subtitulo: 'Transparência orçamentária para todos',
      nivel: {
        label: 'Nível',
        federal: 'Federal',
        estadual: 'Estadual'
      },
      estado: 'Estado',
      visualizacao: {
        label: 'Visualização',
        macro: 'Macro (comparativo)',
        detalhada: 'Detalhada por setor'
      },
      setor: {
        label: 'Setor',
        educacao: 'Educação',
        saude: 'Saúde',
        seguranca: 'Segurança'
      },
      metrica: {
        label: 'Métrica',
        valor_absoluto: 'Valor absoluto',
        per_capita: 'Per capita',
        percentual: 'Percentual'
      },
      ano: 'Ano',
      sobre: 'Sobre',
      fechar: 'Fechar',
      carregando: 'Carregando dados...',
      sobre_conteudo: `
        <h2>Sobre o EducaPúblico</h2>
        <p>O EducaPúblico é uma plataforma dedicada a aumentar a educação política da população brasileira, 
        fornecendo visualizações claras e acessíveis sobre como os recursos públicos são distribuídos 
        entre os setores de Educação, Saúde e Segurança.</p>
        
        <p>Nossa missão é dar maior condição à população brasileira de identificar para onde os recursos 
        estão sendo direcionados, permitindo um acompanhamento transparente e informado da gestão pública.</p>
        
        <h3>Por que isso é importante?</h3>
        <p>Apenas 8,33% da população brasileira acessa o Portal da Transparência, mesmo entre os usuários 
        de internet, esse número chega a apenas 11,13%. Acreditamos que simplificando o acesso e a 
        compreensão desses dados, podemos contribuir para uma sociedade mais participativa e consciente.</p>
      `
    },
    'en-US': {
      titulo: 'PublicEdu',
      subtitulo: 'Budget transparency for everyone',
      nivel: {
        label: 'Level',
        federal: 'Federal',
        estadual: 'State'
      },
      estado: 'State',
      visualizacao: {
        label: 'Visualization',
        macro: 'Macro (comparative)',
        detalhada: 'Detailed by sector'
      },
      setor: {
        label: 'Sector',
        educacao: 'Education',
        saude: 'Health',
        seguranca: 'Security'
      },
      metrica: {
        label: 'Metric',
        valor_absoluto: 'Absolute value',
        per_capita: 'Per capita',
        percentual: 'Percentage'
      },
      ano: 'Year',
      sobre: 'About',
      fechar: 'Close',
      carregando: 'Loading data...',
      sobre_conteudo: `
        <h2>About PublicEdu</h2>
        <p>PublicEdu is a platform dedicated to increasing the political education of the Brazilian population, 
        providing clear and accessible visualizations of how public resources are distributed 
        among the Education, Health, and Security sectors.</p>
        
        <p>Our mission is to give the Brazilian population greater ability to identify where resources 
        are being directed, allowing transparent and informed monitoring of public management.</p>
        
        <h3>Why is this important?</h3>
        <p>Only 8.33% of the Brazilian population accesses the Transparency Portal, even among internet users, 
        this number reaches only 11.13%. We believe that by simplifying access and understanding of this data, 
        we can contribute to a more participative and conscious society.</p>
      `
    },
    'es-ES': {
      titulo: 'EducaPúblico',
      subtitulo: 'Transparencia presupuestaria para todos',
      nivel: {
        label: 'Nivel',
        federal: 'Federal',
        estadual: 'Estatal'
      },
      estado: 'Estado',
      visualizacao: {
        label: 'Visualización',
        macro: 'Macro (comparativa)',
        detalhada: 'Detallada por sector'
      },
      setor: {
        label: 'Sector',
        educacao: 'Educación',
        saude: 'Salud',
        seguranca: 'Seguridad'
      },
      metrica: {
        label: 'Métrica',
        valor_absoluto: 'Valor absoluto',
        per_capita: 'Per cápita',
        percentual: 'Porcentaje'
      },
      ano: 'Año',
      sobre: 'Acerca de',
      fechar: 'Cerrar',
      carregando: 'Cargando datos...',
      sobre_conteudo: `
        <h2>Acerca de EducaPúblico</h2>
        <p>EducaPúblico es una plataforma dedicada a aumentar la educación política de la población brasileña, 
        proporcionando visualizaciones claras y accesibles sobre cómo se distribuyen los recursos públicos 
        entre los sectores de Educación, Salud y Seguridad.</p>
        
        <p>Nuestra misión es dar a la población brasileña mayor capacidad para identificar hacia dónde 
        se dirigen los recursos, permitiendo un seguimiento transparente e informado de la gestión pública.</p>
        
        <h3>¿Por qué es importante?</h3>
        <p>Solo el 8,33% de la población brasileña accede al Portal de Transparencia, incluso entre los usuarios de internet, 
        este número llega solo al 11,13%. Creemos que simplificando el acceso y la comprensión de estos datos, 
        podemos contribuir a una sociedad más participativa y consciente.</p>
      `
    }
  };
  
  // Obter tradução atual
  const t = traducoes[idioma];
  
  return (
    <div className="app">
      <header className="cabecalho">
        <div className="logo">
          <h1>{t.titulo}</h1>
          <p>{t.subtitulo}</p>
        </div>
        
        <div className="contadores-container">
          <ContadoresAcesso 
            acessosTotais={acessosTotais}
            usuariosUnicos={usuariosUnicos}
            usuariosAtivos={usuariosAtivos}
          />
        </div>
        
        <div className="idiomas">
          <button 
            className={idioma === 'pt-BR' ? 'ativo' : ''} 
            onClick={() => setIdioma('pt-BR')}
          >
            <img src={bandeiraBrasil} alt="Português (Brasil)" />
            <span>PT-BR</span>
          </button>
          <button 
            className={idioma === 'en-US' ? 'ativo' : ''} 
            onClick={() => setIdioma('en-US')}
          >
            <img src={bandeiraEUA} alt="English (US)" />
            <span>EN</span>
          </button>
          <button 
            className={idioma === 'es-ES' ? 'ativo' : ''} 
            onClick={() => setIdioma('es-ES')}
          >
            <img src={bandeiraEspanha} alt="Español" />
            <span>ES</span>
          </button>
        </div>
        
        <nav className="menu">
          <button onClick={() => setMostrarSobre(true)}>{t.sobre}</button>
        </nav>
      </header>
      
      <main className="conteudo">
        <section className="filtros">
          <div className="grupo-filtro">
            <label>{t.nivel.label}</label>
            <div className="botoes-opcao">
              <button 
                className={nivel === 'federal' ? 'ativo' : ''} 
                onClick={() => setNivel('federal')}
              >
                {t.nivel.federal}
              </button>
              <button 
                className={nivel === 'estadual' ? 'ativo' : ''} 
                onClick={() => setNivel('estadual')}
              >
                {t.nivel.estadual}
              </button>
            </div>
          </div>
          
          {nivel === 'estadual' && (
            <div className="grupo-filtro">
              <label>{t.estado}</label>
              <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                {estados.map(e => (
                  <option key={e.sigla} value={e.sigla}>{e.nome}</option>
                ))}
              </select>
            </div>
          )}
          
          <div className="grupo-filtro">
            <label>{t.visualizacao.label}</label>
            <div className="botoes-opcao">
              <button 
                className={tipoVisualizacao === 'macro' ? 'ativo' : ''} 
                onClick={() => setTipoVisualizacao('macro')}
              >
                {t.visualizacao.macro}
              </button>
              <button 
                className={tipoVisualizacao === 'detalhada' ? 'ativo' : ''} 
                onClick={() => setTipoVisualizacao('detalhada')}
              >
                {t.visualizacao.detalhada}
              </button>
            </div>
          </div>
          
          {tipoVisualizacao === 'detalhada' && (
            <div className="grupo-filtro">
              <label>{t.setor.label}</label>
              <div className="botoes-opcao">
                <button 
                  className={setor === 'educacao' ? 'ativo' : ''} 
                  onClick={() => setSetor('educacao')}
                >
                  {t.setor.educacao}
                </button>
                <button 
                  className={setor === 'saude' ? 'ativo' : ''} 
                  onClick={() => setSetor('saude')}
                >
                  {t.setor.saude}
                </button>
                <button 
                  className={setor === 'seguranca' ? 'ativo' : ''} 
                  onClick={() => setSetor('seguranca')}
                >
                  {t.setor.seguranca}
                </button>
              </div>
            </div>
          )}
          
          <div className="grupo-filtro">
            <label>{t.metrica.label}</label>
            <div className="botoes-opcao">
              <button 
                className={tipoMetrica === 'valor_absoluto' ? 'ativo' : ''} 
                onClick={() => setTipoMetrica('valor_absoluto')}
              >
                {t.metrica.valor_absoluto}
              </button>
              <button 
                className={tipoMetrica === 'per_capita' ? 'ativo' : ''} 
                onClick={() => setTipoMetrica('per_capita')}
              >
                {t.metrica.per_capita}
              </button>
              <button 
                className={tipoMetrica === 'percentual' ? 'ativo' : ''} 
                onClick={() => setTipoMetrica('percentual')}
              >
                {t.metrica.percentual}
              </button>
            </div>
          </div>
          
          <div className="grupo-filtro">
            <label>{t.ano}</label>
            <select value={ano} onChange={(e) => setAno(parseInt(e.target.value))}>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </section>
        
        <section className="visualizacoes">
          {carregando ? (
            <div className="carregando">{t.carregando}</div>
          ) : (
            <>
              {tipoVisualizacao === 'macro' ? (
                <EstatisticasNacionais dados={dados} />
              ) : (
                <VisualizacaoComparativa 
                  dados={dados}
                  tipoVisualizacao={tipoMetrica}
                  setor={setor}
                  ano={ano}
                />
              )}
            </>
          )}
        </section>
      </main>
      
      {mostrarSobre && (
        <div className="modal-sobre">
          <div className="modal-conteudo">
            <button className="fechar" onClick={() => setMostrarSobre(false)}>
              &times;
            </button>
            <div dangerouslySetInnerHTML={{ __html: t.sobre_conteudo }} />
            <button className="botao-fechar" onClick={() => setMostrarSobre(false)}>
              {t.fechar}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
