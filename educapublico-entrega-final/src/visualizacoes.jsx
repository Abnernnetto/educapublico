import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Componente principal de visualização comparativa
const VisualizacaoComparativa = ({ dados, tipoVisualizacao, setor, ano }) => {
  // Estado para armazenar dados processados
  const [dadosProcessados, setDadosProcessados] = useState(null);
  
  // Processar dados quando as props mudarem
  useEffect(() => {
    if (dados) {
      processarDados();
    }
  }, [dados, tipoVisualizacao, setor, ano]);
  
  // Função para processar dados com base nos filtros
  const processarDados = () => {
    if (!dados || !dados.ranking) return;
    
    let dadosFiltrados;
    
    // Selecionar dados com base no setor
    switch (setor) {
      case 'educacao':
        dadosFiltrados = dados.ranking.educacao;
        break;
      case 'saude':
        dadosFiltrados = dados.ranking.saude;
        break;
      case 'seguranca':
        dadosFiltrados = dados.ranking.seguranca;
        break;
      default:
        dadosFiltrados = dados.ranking.educacao;
    }
    
    // Limitar a 10 estados para melhor visualização
    dadosFiltrados = dadosFiltrados.slice(0, 10);
    
    // Processar dados com base no tipo de visualização
    let dadosGrafico;
    
    switch (tipoVisualizacao) {
      case 'valor_absoluto':
        dadosGrafico = {
          labels: dadosFiltrados.map(item => item.uf),
          datasets: [{
            label: `Orçamento de ${setor} (R$ bilhões)`,
            data: dadosFiltrados.map(item => item.valor_total / 1000000000), // Converter para bilhões
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }]
        };
        break;
      case 'per_capita':
        dadosGrafico = {
          labels: dadosFiltrados.map(item => item.uf),
          datasets: [{
            label: `Orçamento de ${setor} per capita (R$)`,
            data: dadosFiltrados.map(item => item.valor_per_capita),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }]
        };
        break;
      case 'percentual':
        dadosGrafico = {
          labels: dadosFiltrados.map(item => item.uf),
          datasets: [{
            label: `Percentual do orçamento em ${setor} (%)`,
            data: dadosFiltrados.map(item => item.percentual_orcamento),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          }]
        };
        break;
      default:
        dadosGrafico = {
          labels: dadosFiltrados.map(item => item.uf),
          datasets: [{
            label: `Orçamento de ${setor} (R$ bilhões)`,
            data: dadosFiltrados.map(item => item.valor_total / 1000000000),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }]
        };
    }
    
    setDadosProcessados(dadosGrafico);
  };
  
  // Opções do gráfico
  const opcoes = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Ranking de Estados - ${setor} (${ano})`,
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += tipoVisualizacao === 'valor_absoluto' 
                ? `R$ ${context.parsed.y.toFixed(2)} bilhões`
                : tipoVisualizacao === 'per_capita'
                  ? `R$ ${context.parsed.y.toFixed(2)}`
                  : `${context.parsed.y.toFixed(2)}%`;
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return tipoVisualizacao === 'valor_absoluto' 
              ? `R$ ${value} bi`
              : tipoVisualizacao === 'per_capita'
                ? `R$ ${value}`
                : `${value}%`;
          }
        }
      }
    }
  };
  
  // Renderizar gráfico de barras horizontais
  return (
    <div className="visualizacao-comparativa" style={{ height: '500px', padding: '20px' }}>
      {dadosProcessados ? (
        <Bar data={dadosProcessados} options={{
          ...opcoes,
          indexAxis: 'y', // Barras horizontais
        }} />
      ) : (
        <div className="carregando">Carregando dados...</div>
      )}
    </div>
  );
};

// Componente para estatísticas nacionais
const EstatisticasNacionais = ({ dados }) => {
  // Verificar se temos dados
  if (!dados || !dados.estatisticas_nacionais) {
    return <div className="carregando">Carregando estatísticas nacionais...</div>;
  }
  
  const estatisticas = dados.estatisticas_nacionais;
  
  // Dados para o gráfico de pizza
  const dadosPizza = {
    labels: [
      'Acessam o Portal',
      'Usuários de Internet que não acessam',
      'Sem acesso à Internet'
    ],
    datasets: [{
      data: [
        estatisticas.acessos_portal,
        estatisticas.usuarios_internet - estatisticas.acessos_portal,
        estatisticas.populacao_total - estatisticas.usuarios_internet
      ],
      backgroundColor: [
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(255, 99, 132, 0.6)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1,
    }]
  };
  
  // Opções do gráfico de pizza
  const opcoesPizza = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Distribuição de Acesso ao Portal da Transparência',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw;
            const percentage = (value / estatisticas.populacao_total * 100).toFixed(2);
            return `${context.label}: ${(value / 1000000).toFixed(1)} milhões (${percentage}%)`;
          }
        }
      }
    }
  };
  
  // Formatar números para exibição
  const formatarNumero = (numero) => {
    return (numero / 1000000).toFixed(1).replace('.', ',') + ' milhões';
  };
  
  return (
    <div className="estatisticas-nacionais">
      <h2>Estatísticas Nacionais</h2>
      <p className="subtitulo">Painel sobre acesso ao Portal da Transparência</p>
      
      <div className="cards-container">
        <div className="card">
          <h3>População Total do Brasil</h3>
          <div className="valor">{formatarNumero(estatisticas.populacao_total)}</div>
        </div>
        
        <div className="card">
          <h3>Usuários de Internet</h3>
          <div className="valor">{formatarNumero(estatisticas.usuarios_internet)}</div>
          <div className="percentual">({estatisticas.percentual_internet}% da população)</div>
        </div>
        
        <div className="card">
          <h3>Acessos ao Portal da Transparência</h3>
          <div className="valor">{formatarNumero(estatisticas.acessos_portal)}</div>
          <div className="percentual">
            ({estatisticas.percentual_populacao_acessa}% da população)<br/>
            ({estatisticas.percentual_internet_acessa}% dos usuários de internet)
          </div>
        </div>
      </div>
      
      <div className="grafico-pizza" style={{ height: '400px', marginTop: '30px' }}>
        <Pie data={dadosPizza} options={opcoesPizza} />
      </div>
    </div>
  );
};

// Componente para contadores de acesso
const ContadoresAcesso = ({ acessosTotais, usuariosUnicos, usuariosAtivos }) => {
  // Estado para contadores animados
  const [contadores, setContadores] = useState({
    acessosTotais: 0,
    usuariosUnicos: 0,
    usuariosAtivos: 0
  });
  
  // Animar contadores ao montar o componente
  useEffect(() => {
    // Duração da animação em ms
    const duracao = 2000;
    // Número de passos da animação
    const passos = 50;
    // Intervalo entre passos
    const intervalo = duracao / passos;
    
    let passo = 0;
    
    const timer = setInterval(() => {
      passo++;
      
      if (passo <= passos) {
        const progresso = passo / passos;
        
        setContadores({
          acessosTotais: Math.floor(acessosTotais * progresso),
          usuariosUnicos: Math.floor(usuariosUnicos * progresso),
          usuariosAtivos: Math.floor(usuariosAtivos * progresso)
        });
      } else {
        // Garantir que os valores finais sejam exatos
        setContadores({
          acessosTotais,
          usuariosUnicos,
          usuariosAtivos
        });
        
        clearInterval(timer);
      }
    }, intervalo);
    
    // Limpar timer ao desmontar
    return () => clearInterval(timer);
  }, [acessosTotais, usuariosUnicos, usuariosAtivos]);
  
  // Formatar números com separadores de milhar
  const formatarNumero = (numero) => {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  
  return (
    <div className="contadores-acesso">
      <div className="contador">
        <div className="valor">{formatarNumero(contadores.acessosTotais)}</div>
        <div className="rotulo">visualizações totais</div>
      </div>
      
      <div className="contador">
        <div className="valor">{formatarNumero(contadores.usuariosUnicos)}</div>
        <div className="rotulo">visitantes únicos</div>
      </div>
      
      <div className="contador">
        <div className="valor">{formatarNumero(contadores.usuariosAtivos)}</div>
        <div className="rotulo">pessoas navegando agora</div>
      </div>
    </div>
  );
};

// Exportar componentes
export { VisualizacaoComparativa, EstatisticasNacionais, ContadoresAcesso };
