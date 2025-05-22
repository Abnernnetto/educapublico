import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Definição de tipos
interface DadoItem {
  nome: string;
  valor: number;
  percentual: number;
  cor: string;
}

interface DadosDetalhados {
  'Educação': DadoItem[];
  'Saúde': DadoItem[];
  'Segurança': DadoItem[];
  [key: string]: DadoItem[]; // Índice de string para permitir acesso dinâmico
}

interface DadosEstadoType {
  macro: DadoItem[];
  detalhado: DadosDetalhados;
}

interface DadosEstaduaisType {
  [estado: string]: DadosEstadoType;
}

// Função para gerar dados simulados para um estado
const gerarDadosEstado = (multiplicador: number): DadosEstadoType => {
  return {
    macro: [
      { nome: 'Educação', valor: 15.7 * multiplicador, percentual: 37.4, cor: '#1e88e5' },
      { nome: 'Saúde', valor: 18.5 * multiplicador, percentual: 44.0, cor: '#43a047' },
      { nome: 'Segurança', valor: 7.8 * multiplicador, percentual: 18.6, cor: '#e53935' },
    ],
    detalhado: {
      'Educação': [
        { nome: 'Ensino Fundamental', valor: 6.3 * multiplicador, percentual: 40.0, cor: '#1e88e5' },
        { nome: 'Ensino Médio', valor: 4.7 * multiplicador, percentual: 30.0, cor: '#42a5f5' },
        { nome: 'Ensino Superior', valor: 3.1 * multiplicador, percentual: 20.0, cor: '#90caf9' },
        { nome: 'Outros', valor: 1.6 * multiplicador, percentual: 10.0, cor: '#bbdefb' },
      ],
      'Saúde': [
        { nome: 'Atenção Básica', valor: 5.6 * multiplicador, percentual: 30.0, cor: '#43a047' },
        { nome: 'Média e Alta Complexidade', valor: 7.4 * multiplicador, percentual: 40.0, cor: '#66bb6a' },
        { nome: 'Assistência Farmacêutica', valor: 2.8 * multiplicador, percentual: 15.0, cor: '#a5d6a7' },
        { nome: 'Vigilância em Saúde', valor: 2.8 * multiplicador, percentual: 15.0, cor: '#c8e6c9' },
      ],
      'Segurança': [
        { nome: 'Policiamento', valor: 3.9 * multiplicador, percentual: 50.0, cor: '#e53935' },
        { nome: 'Sistema Prisional', valor: 2.3 * multiplicador, percentual: 30.0, cor: '#ef5350' },
        { nome: 'Prevenção', valor: 0.8 * multiplicador, percentual: 10.0, cor: '#e57373' },
        { nome: 'Outros', valor: 0.8 * multiplicador, percentual: 10.0, cor: '#ffcdd2' },
      ]
    }
  };
};

// Dados simulados para demonstração
const dadosFederais = {
  macro: [
    { nome: 'Educação', valor: 152.7, percentual: 41.4, cor: '#1e88e5' },
    { nome: 'Saúde', valor: 159.9, percentual: 43.3, cor: '#43a047' },
    { nome: 'Segurança', valor: 56.4, percentual: 15.3, cor: '#e53935' },
  ],
  detalhado: {
    'Educação': [
      { nome: 'Ensino Fundamental', valor: 15.2, percentual: 41.4, cor: '#1e88e5' },
      { nome: 'Ensino Médio', valor: 9.8, percentual: 20.0, cor: '#42a5f5' },
      { nome: 'Ensino Superior', valor: 9.4, percentual: 29.0, cor: '#90caf9' },
      { nome: 'Outros', valor: 3.4, percentual: 9.6, cor: '#bbdefb' },
    ],
    'Saúde': [
      { nome: 'Atenção Básica', valor: 45.2, percentual: 28.3, cor: '#43a047' },
      { nome: 'Média e Alta Complexidade', valor: 62.4, percentual: 39.0, cor: '#66bb6a' },
      { nome: 'Assistência Farmacêutica', valor: 18.7, percentual: 11.7, cor: '#a5d6a7' },
      { nome: 'Vigilância em Saúde', valor: 33.6, percentual: 21.0, cor: '#c8e6c9' },
    ],
    'Segurança': [
      { nome: 'Policiamento', valor: 22.6, percentual: 40.0, cor: '#e53935' },
      { nome: 'Sistema Prisional', valor: 17.5, percentual: 31.0, cor: '#ef5350' },
      { nome: 'Prevenção', valor: 8.4, percentual: 15.0, cor: '#e57373' },
      { nome: 'Outros', valor: 7.9, percentual: 14.0, cor: '#ffcdd2' },
    ]
  }
};

// Lista de estados brasileiros em ordem alfabética
const estados = [
  'Acre',
  'Alagoas',
  'Amapá',
  'Amazonas',
  'Bahia',
  'Ceará',
  'Distrito Federal',
  'Espírito Santo',
  'Goiás',
  'Maranhão',
  'Mato Grosso',
  'Mato Grosso do Sul',
  'Minas Gerais',
  'Pará',
  'Paraíba',
  'Paraná',
  'Pernambuco',
  'Piauí',
  'Rio de Janeiro',
  'Rio Grande do Norte',
  'Rio Grande do Sul',
  'Rondônia',
  'Roraima',
  'Santa Catarina',
  'São Paulo',
  'Sergipe',
  'Tocantins'
];

// Dados simulados para estados
const dadosEstaduais: DadosEstaduaisType = {
  'São Paulo': {
    macro: [
      { nome: 'Educação', valor: 36.7, percentual: 38.4, cor: '#1e88e5' },
      { nome: 'Saúde', valor: 42.9, percentual: 44.9, cor: '#43a047' },
      { nome: 'Segurança', valor: 16.0, percentual: 16.7, cor: '#e53935' },
    ],
    detalhado: {
      'Educação': [
        { nome: 'Ensino Fundamental', valor: 15.2, percentual: 41.4, cor: '#1e88e5' },
        { nome: 'Ensino Médio', valor: 9.8, percentual: 26.7, cor: '#42a5f5' },
        { nome: 'Ensino Superior', valor: 9.4, percentual: 25.6, cor: '#90caf9' },
        { nome: 'Outros', valor: 2.3, percentual: 6.3, cor: '#bbdefb' },
      ],
      'Saúde': [
        { nome: 'Atenção Básica', valor: 12.9, percentual: 30.0, cor: '#43a047' },
        { nome: 'Média e Alta Complexidade', valor: 17.2, percentual: 40.0, cor: '#66bb6a' },
        { nome: 'Assistência Farmacêutica', valor: 6.4, percentual: 15.0, cor: '#a5d6a7' },
        { nome: 'Vigilância em Saúde', valor: 6.4, percentual: 15.0, cor: '#c8e6c9' },
      ],
      'Segurança': [
        { nome: 'Policiamento', valor: 8.0, percentual: 50.0, cor: '#e53935' },
        { nome: 'Sistema Prisional', valor: 4.8, percentual: 30.0, cor: '#ef5350' },
        { nome: 'Prevenção', valor: 1.6, percentual: 10.0, cor: '#e57373' },
        { nome: 'Outros', valor: 1.6, percentual: 10.0, cor: '#ffcdd2' },
      ]
    }
  },
  'Rio de Janeiro': {
    macro: [
      { nome: 'Educação', valor: 18.3, percentual: 36.6, cor: '#1e88e5' },
      { nome: 'Saúde', valor: 21.5, percentual: 43.0, cor: '#43a047' },
      { nome: 'Segurança', valor: 10.2, percentual: 20.4, cor: '#e53935' },
    ],
    detalhado: {
      'Educação': [
        { nome: 'Ensino Fundamental', valor: 7.3, percentual: 40.0, cor: '#1e88e5' },
        { nome: 'Ensino Médio', valor: 5.5, percentual: 30.0, cor: '#42a5f5' },
        { nome: 'Ensino Superior', valor: 3.7, percentual: 20.0, cor: '#90caf9' },
        { nome: 'Outros', valor: 1.8, percentual: 10.0, cor: '#bbdefb' },
      ],
      'Saúde': [
        { nome: 'Atenção Básica', valor: 6.5, percentual: 30.0, cor: '#43a047' },
        { nome: 'Média e Alta Complexidade', valor: 8.6, percentual: 40.0, cor: '#66bb6a' },
        { nome: 'Assistência Farmacêutica', valor: 3.2, percentual: 15.0, cor: '#a5d6a7' },
        { nome: 'Vigilância em Saúde', valor: 3.2, percentual: 15.0, cor: '#c8e6c9' },
      ],
      'Segurança': [
        { nome: 'Policiamento', valor: 5.1, percentual: 50.0, cor: '#e53935' },
        { nome: 'Sistema Prisional', valor: 3.1, percentual: 30.0, cor: '#ef5350' },
        { nome: 'Prevenção', valor: 1.0, percentual: 10.0, cor: '#e57373' },
        { nome: 'Outros', valor: 1.0, percentual: 10.0, cor: '#ffcdd2' },
      ]
    }
  },
  'Minas Gerais': {
    macro: [
      { nome: 'Educação', valor: 15.7, percentual: 37.4, cor: '#1e88e5' },
      { nome: 'Saúde', valor: 18.5, percentual: 44.0, cor: '#43a047' },
      { nome: 'Segurança', valor: 7.8, percentual: 18.6, cor: '#e53935' },
    ],
    detalhado: {
      'Educação': [
        { nome: 'Ensino Fundamental', valor: 6.3, percentual: 40.0, cor: '#1e88e5' },
        { nome: 'Ensino Médio', valor: 4.7, percentual: 30.0, cor: '#42a5f5' },
        { nome: 'Ensino Superior', valor: 3.1, percentual: 20.0, cor: '#90caf9' },
        { nome: 'Outros', valor: 1.6, percentual: 10.0, cor: '#bbdefb' },
      ],
      'Saúde': [
        { nome: 'Atenção Básica', valor: 5.6, percentual: 30.0, cor: '#43a047' },
        { nome: 'Média e Alta Complexidade', valor: 7.4, percentual: 40.0, cor: '#66bb6a' },
        { nome: 'Assistência Farmacêutica', valor: 2.8, percentual: 15.0, cor: '#a5d6a7' },
        { nome: 'Vigilância em Saúde', valor: 2.8, percentual: 15.0, cor: '#c8e6c9' },
      ],
      'Segurança': [
        { nome: 'Policiamento', valor: 3.9, percentual: 50.0, cor: '#e53935' },
        { nome: 'Sistema Prisional', valor: 2.3, percentual: 30.0, cor: '#ef5350' },
        { nome: 'Prevenção', valor: 0.8, percentual: 10.0, cor: '#e57373' },
        { nome: 'Outros', valor: 0.8, percentual: 10.0, cor: '#ffcdd2' },
      ]
    }
  }
};

// Gerar dados para os estados restantes
estados.forEach((estado) => {
  if (!dadosEstaduais[estado]) {
    // Usar um multiplicador baseado na primeira letra do estado para variar os dados
    const multiplicador = (estado.charCodeAt(0) - 65) / 10 + 0.5;
    dadosEstaduais[estado] = gerarDadosEstado(multiplicador);
  }
});

// Tipo para os setores disponíveis
type SetorType = 'Educação' | 'Saúde' | 'Segurança';

// Tipo para os idiomas disponíveis
type IdiomaType = 'pt-BR' | 'en-US' | 'es';

// Traduções
const traducoes = {
  'pt-BR': {
    titulo: 'EducaPúblico',
    inicio: 'Início',
    sobre: 'Sobre',
    transparencia: 'Transparência Orçamentária',
    descricao: 'Explore os dados de investimentos em Educação, Saúde e Segurança nos níveis federal e estadual.',
    nivel: 'Nível',
    federal: 'Federal',
    estadual: 'Estadual',
    estado: 'Estado',
    selecione_estado: 'Selecione um estado',
    visualizacao: 'Visualização',
    macro: 'Macro',
    detalhada: 'Detalhada',
    setor: 'Setor',
    selecione_setor: 'Selecione um setor',
    educacao: 'Educação',
    saude: 'Saúde',
    seguranca: 'Segurança',
    comparativo: 'Comparativo de Investimentos',
    distribuicao: 'Distribuição do Orçamento em',
    valor: 'Valor (em bilhões de R$)',
    categoria: 'Categoria',
    valor_bilhoes: 'Valor (R$ bilhões)',
    percentual: 'Percentual',
    fonte: 'Fonte: Portal da Transparência',
    acessos: 'Acessos',
    usuarios_unicos: 'Usuários únicos',
    como_interpretar: 'Como interpretar estes dados',
    dados_apresentados: 'Os dados apresentados mostram a distribuição orçamentária entre os setores de Educação, Saúde e Segurança. É importante entender que:',
    valores_bilhoes: 'Os valores são apresentados em bilhões de reais',
    percentuais_proporcao: 'Os percentuais representam a proporção em relação ao total dos três setores analisados',
    percentuais_relativos: 'Na visualização detalhada, os percentuais são relativos ao total do setor selecionado',
    comparar_dados: 'Ao comparar dados entre diferentes níveis (federal e estadual) ou entre estados, considere as diferenças de escala orçamentária e as particularidades regionais.',
    acessibilidade: 'Acessibilidade',
    recursos_disponiveis: 'O EducaPúblico foi desenvolvido com foco em acessibilidade. Recursos disponíveis:',
    navegacao_teclado: 'Navegação por teclado (use Tab para navegar entre elementos)',
    cores_contraste: 'Cores com contraste adequado para pessoas com daltonismo',
    textos_alternativos: 'Textos alternativos para gráficos e visualizações',
    tabelas_dados: 'Tabelas de dados como alternativa às visualizações gráficas',
    plataforma: 'Plataforma para educação política e transparência orçamentária, facilitando o acesso a informações sobre investimentos públicos.',
    links_uteis: 'Links Úteis',
    portal_transparencia: 'Portal da Transparência',
    dados_abertos: 'Dados Abertos do Governo',
    lei_acesso: 'Lei de Acesso à Informação',
    direitos_reservados: 'Todos os direitos reservados.',
    sobre_titulo: 'Sobre o EducaPúblico',
    sobre_descricao: 'O EducaPúblico é uma plataforma dedicada a aumentar a educação política da população brasileira, facilitando o acesso e a compreensão de dados orçamentários governamentais.',
    sobre_objetivo: 'Nosso objetivo é proporcionar uma visão clara e acessível sobre como os recursos públicos são distribuídos entre os setores de Educação, Saúde e Segurança, tanto no nível federal quanto estadual.',
    sobre_transparencia: 'Acreditamos que a transparência é fundamental para o exercício da cidadania. Ao compreender melhor como os recursos são alocados, os cidadãos podem participar mais ativamente do processo democrático e cobrar ações mais efetivas de seus representantes.',
    sobre_dados: 'Os dados apresentados nesta plataforma são obtidos de fontes oficiais, como o Portal da Transparência do Governo Federal e portais estaduais. Nosso compromisso é fornecer informações precisas e atualizadas, apresentadas de forma clara e compreensível para todos.',
    sobre_futuro: 'No futuro, pretendemos expandir a plataforma para incluir dados municipais e mais setores, além de implementar ferramentas de análise comparativa e histórica para um entendimento ainda mais profundo das políticas públicas brasileiras.'
  },
  'en-US': {
    titulo: 'PublicEdu',
    inicio: 'Home',
    sobre: 'About',
    transparencia: 'Budget Transparency',
    descricao: 'Explore investment data in Education, Health, and Security at federal and state levels.',
    nivel: 'Level',
    federal: 'Federal',
    estadual: 'State',
    estado: 'State',
    selecione_estado: 'Select a state',
    visualizacao: 'View',
    macro: 'Macro',
    detalhada: 'Detailed',
    setor: 'Sector',
    selecione_setor: 'Select a sector',
    educacao: 'Education',
    saude: 'Health',
    seguranca: 'Security',
    comparativo: 'Investment Comparison',
    distribuicao: 'Budget Distribution in',
    valor: 'Value (in billions of R$)',
    categoria: 'Category',
    valor_bilhoes: 'Value (R$ billions)',
    percentual: 'Percentage',
    fonte: 'Source: Transparency Portal',
    acessos: 'Visits',
    usuarios_unicos: 'Unique users',
    como_interpretar: 'How to interpret this data',
    dados_apresentados: 'The presented data shows the budget distribution among Education, Health, and Security sectors. It is important to understand that:',
    valores_bilhoes: 'Values are presented in billions of reais',
    percentuais_proporcao: 'Percentages represent the proportion relative to the total of the three analyzed sectors',
    percentuais_relativos: 'In the detailed view, percentages are relative to the total of the selected sector',
    comparar_dados: 'When comparing data between different levels (federal and state) or between states, consider the differences in budget scale and regional particularities.',
    acessibilidade: 'Accessibility',
    recursos_disponiveis: 'PublicEdu was developed with a focus on accessibility. Available features:',
    navegacao_teclado: 'Keyboard navigation (use Tab to navigate between elements)',
    cores_contraste: 'Colors with adequate contrast for people with color blindness',
    textos_alternativos: 'Alternative texts for graphics and visualizations',
    tabelas_dados: 'Data tables as an alternative to graphical visualizations',
    plataforma: 'Platform for political education and budget transparency, facilitating access to information about public investments.',
    links_uteis: 'Useful Links',
    portal_transparencia: 'Transparency Portal',
    dados_abertos: 'Government Open Data',
    lei_acesso: 'Information Access Law',
    direitos_reservados: 'All rights reserved.',
    sobre_titulo: 'About PublicEdu',
    sobre_descricao: 'PublicEdu is a platform dedicated to increasing the political education of the Brazilian population, facilitating access to and understanding of government budget data.',
    sobre_objetivo: 'Our goal is to provide a clear and accessible view of how public resources are distributed among the Education, Health, and Security sectors, both at the federal and state levels.',
    sobre_transparencia: 'We believe that transparency is fundamental to the exercise of citizenship. By better understanding how resources are allocated, citizens can participate more actively in the democratic process and demand more effective actions from their representatives.',
    sobre_dados: 'The data presented on this platform is obtained from official sources, such as the Federal Government Transparency Portal and state portals. Our commitment is to provide accurate and up-to-date information, presented in a clear and understandable way for everyone.',
    sobre_futuro: 'In the future, we intend to expand the platform to include municipal data and more sectors, as well as implement comparative and historical analysis tools for an even deeper understanding of Brazilian public policies.'
  },
  'es': {
    titulo: 'EducaPúblico',
    inicio: 'Inicio',
    sobre: 'Acerca de',
    transparencia: 'Transparencia Presupuestaria',
    descricao: 'Explore los datos de inversiones en Educación, Salud y Seguridad en los niveles federal y estatal.',
    nivel: 'Nivel',
    federal: 'Federal',
    estadual: 'Estatal',
    estado: 'Estado',
    selecione_estado: 'Seleccione un estado',
    visualizacao: 'Visualización',
    macro: 'Macro',
    detalhada: 'Detallada',
    setor: 'Sector',
    selecione_setor: 'Seleccione un sector',
    educacao: 'Educación',
    saude: 'Salud',
    seguranca: 'Seguridad',
    comparativo: 'Comparativo de Inversiones',
    distribuicao: 'Distribución del Presupuesto en',
    valor: 'Valor (en miles de millones de R$)',
    categoria: 'Categoría',
    valor_bilhoes: 'Valor (R$ miles de millones)',
    percentual: 'Porcentaje',
    fonte: 'Fuente: Portal de Transparencia',
    acessos: 'Accesos',
    usuarios_unicos: 'Usuarios únicos',
    como_interpretar: 'Cómo interpretar estos datos',
    dados_apresentados: 'Los datos presentados muestran la distribución presupuestaria entre los sectores de Educación, Salud y Seguridad. Es importante entender que:',
    valores_bilhoes: 'Los valores se presentan en miles de millones de reales',
    percentuais_proporcao: 'Los porcentajes representan la proporción en relación al total de los tres sectores analizados',
    percentuais_relativos: 'En la visualización detallada, los porcentajes son relativos al total del sector seleccionado',
    comparar_dados: 'Al comparar datos entre diferentes niveles (federal y estatal) o entre estados, considere las diferencias de escala presupuestaria y las particularidades regionales.',
    acessibilidade: 'Accesibilidad',
    recursos_disponiveis: 'EducaPúblico fue desarrollado con enfoque en accesibilidad. Recursos disponibles:',
    navegacao_teclado: 'Navegación por teclado (use Tab para navegar entre elementos)',
    cores_contraste: 'Colores con contraste adecuado para personas con daltonismo',
    textos_alternativos: 'Textos alternativos para gráficos y visualizaciones',
    tabelas_dados: 'Tablas de datos como alternativa a las visualizaciones gráficas',
    plataforma: 'Plataforma para educación política y transparencia presupuestaria, facilitando el acceso a informaciones sobre inversiones públicas.',
    links_uteis: 'Enlaces Útiles',
    portal_transparencia: 'Portal de Transparencia',
    dados_abertos: 'Datos Abiertos del Gobierno',
    lei_acesso: 'Ley de Acceso a la Información',
    direitos_reservados: 'Todos los derechos reservados.',
    sobre_titulo: 'Acerca de EducaPúblico',
    sobre_descricao: 'EducaPúblico es una plataforma dedicada a aumentar la educación política de la población brasileña, facilitando el acceso y la comprensión de datos presupuestarios gubernamentales.',
    sobre_objetivo: 'Nuestro objetivo es proporcionar una visión clara y accesible sobre cómo se distribuyen los recursos públicos entre los sectores de Educación, Salud y Seguridad, tanto a nivel federal como estatal.',
    sobre_transparencia: 'Creemos que la transparencia es fundamental para el ejercicio de la ciudadanía. Al comprender mejor cómo se asignan los recursos, los ciudadanos pueden participar más activamente en el proceso democrático y exigir acciones más efectivas de sus representantes.',
    sobre_dados: 'Los datos presentados en esta plataforma se obtienen de fuentes oficiales, como el Portal de Transparencia del Gobierno Federal y portales estatales. Nuestro compromiso es proporcionar información precisa y actualizada, presentada de forma clara y comprensible para todos.',
    sobre_futuro: 'En el futuro, pretendemos expandir la plataforma para incluir datos municipales y más sectores, además de implementar herramientas de análisis comparativo e histórico para una comprensión aún más profunda de las políticas públicas brasileñas.'
  }
};

// Componente principal
export default function App() {
  // Estados para controlar os filtros
  const [nivel, setNivel] = useState<'federal' | 'estadual'>('federal');
  const [estado, setEstado] = useState<string>('São Paulo');
  const [visualizacao, setVisualizacao] = useState<'macro' | 'detalhada'>('macro');
  const [setor, setSetor] = useState<SetorType>('Educação');
  const [idioma, setIdioma] = useState<IdiomaType>('pt-BR');
  const [sobreAberto, setSobreAberto] = useState(false);
  
  // Contadores de acesso
  const [acessosTotal, setAcessosTotal] = useState<number>(0);
  const [acessosUnicos, setAcessosUnicos] = useState<number>(0);
  
  // Efeito para simular contagem de acessos
  useEffect(() => {
    // Simular contagem de acessos totais
    setAcessosTotal(prev => prev + 1);
    
    // Verificar se é um novo usuário (simulado)
    const usuarioVisitouAntes = localStorage.getItem('educapublico_visitou');
    if (!usuarioVisitouAntes) {
      localStorage.setItem('educapublico_visitou', 'true');
      setAcessosUnicos(prev => prev + 1);
    }
    
    // Carregar contadores do localStorage (simulado)
    const totalSalvo = parseInt(localStorage.getItem('educapublico_acessos_total') || '0');
    const unicosSalvo = parseInt(localStorage.getItem('educapublico_acessos_unicos') || '0');
    
    setAcessosTotal(totalSalvo + 1);
    setAcessosUnicos(unicosSalvo + (usuarioVisitouAntes ? 0 : 1));
    
    // Salvar contadores atualizados
    localStorage.setItem('educapublico_acessos_total', (totalSalvo + 1).toString());
    localStorage.setItem('educapublico_acessos_unicos', (unicosSalvo + (usuarioVisitouAntes ? 0 : 1)).toString());
  }, []);
  
  // Função para obter os dados com base nos filtros selecionados
  const obterDados = (): DadoItem[] => {
    if (nivel === 'federal') {
      return visualizacao === 'macro' 
        ? dadosFederais.macro 
        : dadosFederais.detalhado[setor];
    } else {
      return visualizacao === 'macro' 
        ? dadosEstaduais[estado]?.macro || [] 
        : dadosEstaduais[estado]?.detalhado[setor] || [];
    }
  };
  
  // Dados filtrados com base nas seleções
  const dados = obterDados();
  
  // Obter traduções para o idioma atual
  const t = traducoes[idioma];
  
  // Função para renderizar a bandeira do idioma
  const renderizarBandeira = (idiomaCode: IdiomaType) => {
    switch (idiomaCode) {
      case 'pt-BR':
        return (
          <div className="w-5 h-3 mr-2 rounded-sm overflow-hidden flex-shrink-0">
            <div className="bg-green-600 w-full h-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-yellow-400 w-3/5 h-3/5 transform rotate-45 flex items-center justify-center">
                  <div className="bg-blue-800 w-2/3 h-2/3 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'en-US':
        return (
          <div className="w-5 h-3 mr-2 rounded-sm overflow-hidden flex-shrink-0">
            <div className="bg-blue-900 w-full h-full relative">
              <div className="absolute inset-0">
                <div className="absolute left-0 top-0 w-1/4 h-1/2 bg-white"></div>
                <div className="absolute left-1/4 top-0 right-0 h-1/6 bg-red-600"></div>
                <div className="absolute left-1/4 top-1/6 right-0 h-1/6 bg-white"></div>
                <div className="absolute left-1/4 top-2/6 right-0 h-1/6 bg-red-600"></div>
              </div>
            </div>
          </div>
        );
      case 'es':
        return (
          <div className="w-5 h-3 mr-2 rounded-sm overflow-hidden flex-shrink-0">
            <div className="flex flex-col h-full">
              <div className="bg-red-600 h-1/4 w-full"></div>
              <div className="bg-yellow-500 h-2/4 w-full"></div>
              <div className="bg-red-600 h-1/4 w-full"></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cabeçalho */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <h1 className="text-xl font-bold">{t.titulo}</h1>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="text-white hover:text-blue-100">{t.inicio}</Button>
            <Button variant="ghost" className="text-white hover:text-blue-100" onClick={() => setSobreAberto(true)}>{t.sobre}</Button>
            <Select value={idioma} onValueChange={(value) => setIdioma(value as IdiomaType)}>
              <SelectTrigger className="w-[140px] bg-blue-700 border-blue-500 text-white">
                <SelectValue>
                  <div className="flex items-center">
                    {renderizarBandeira(idioma)}
                    {idioma === 'pt-BR' ? 'Português' : idioma === 'en-US' ? 'English' : 'Español'}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">
                  <div className="flex items-center">
                    {renderizarBandeira('pt-BR')}
                    Português
                  </div>
                </SelectItem>
                <SelectItem value="en-US">
                  <div className="flex items-center">
                    {renderizarBandeira('en-US')}
                    English
                  </div>
                </SelectItem>
                <SelectItem value="es">
                  <div className="flex items-center">
                    {renderizarBandeira('es')}
                    Español
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>
      
      {/* Conteúdo principal */}
      <main className="container mx-auto p-4 mt-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t.transparencia}</CardTitle>
            <CardDescription>
              {t.descricao}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Filtro de Nível */}
              <div>
                <label className="block text-sm font-medium mb-2">{t.nivel}</label>
                <Tabs defaultValue="federal" value={nivel} onValueChange={(value) => setNivel(value as 'federal' | 'estadual')} className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="federal" className="w-1/2">{t.federal}</TabsTrigger>
                    <TabsTrigger value="estadual" className="w-1/2">{t.estadual}</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Filtro de Estado (visível apenas quando nível estadual está selecionado) */}
              <div className={nivel === 'estadual' ? 'block' : 'hidden'}>
                <label className="block text-sm font-medium mb-2">{t.estado}</label>
                <Select value={estado} onValueChange={setEstado}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selecione_estado} />
                  </SelectTrigger>
                  <SelectContent>
                    {estados.map((est) => (
                      <SelectItem key={est} value={est}>{est}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Filtro de Visualização */}
              <div>
                <label className="block text-sm font-medium mb-2">{t.visualizacao}</label>
                <Tabs defaultValue="macro" value={visualizacao} onValueChange={(value) => setVisualizacao(value as 'macro' | 'detalhada')} className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="macro" className="w-1/2">{t.macro}</TabsTrigger>
                    <TabsTrigger value="detalhada" className="w-1/2">{t.detalhada}</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Filtro de Setor (visível apenas quando visualização detalhada está selecionada) */}
              <div className={visualizacao === 'detalhada' ? 'block' : 'hidden'}>
                <label className="block text-sm font-medium mb-2">{t.setor}</label>
                <Select value={setor} onValueChange={(value) => setSetor(value as SetorType)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selecione_setor} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Educação">{t.educacao}</SelectItem>
                    <SelectItem value="Saúde">{t.saude}</SelectItem>
                    <SelectItem value="Segurança">{t.seguranca}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Visualização dos dados */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">
                {visualizacao === 'macro' 
                  ? `${t.comparativo} - ${nivel === 'federal' ? t.federal : estado}`
                  : `${t.distribuicao} ${setor} - ${nivel === 'federal' ? t.federal : estado}`
                }
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Gráfico de barras */}
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dados}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nome" />
                      <YAxis tickFormatter={(value) => `R$ ${value}B`} />
                      <Tooltip formatter={(value) => [`R$ ${value} bilhões`, 'Valor']} />
                      <Legend />
                      <Bar dataKey="valor" name={t.valor}>
                        {dados.map((entry: DadoItem, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.cor} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Gráfico de pizza */}
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dados}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ nome, percentual }) => `${nome}: ${percentual}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="valor"
                      >
                        {dados.map((entry: DadoItem, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.cor} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`R$ ${value} bilhões`, 'Valor']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Tabela de dados */}
              <div className="mt-8 overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left">{t.categoria}</th>
                      <th className="py-2 px-4 border-b text-right">{t.valor_bilhoes}</th>
                      <th className="py-2 px-4 border-b text-right">{t.percentual}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dados.map((item: DadoItem, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-2 px-4 border-b">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.cor }}></div>
                            {item.nome}
                          </div>
                        </td>
                        <td className="py-2 px-4 border-b text-right">{item.valor.toFixed(1)}</td>
                        <td className="py-2 px-4 border-b text-right">{item.percentual.toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-gray-500">
            <div>
              {t.fonte}, {new Date().getFullYear()}
            </div>
            <div>
              {t.acessos}: {acessosTotal} | {t.usuarios_unicos}: {acessosUnicos}
            </div>
          </CardFooter>
        </Card>
        
        {/* Seção de explicação */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t.como_interpretar}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p>
                {t.dados_apresentados}
              </p>
              <ul>
                <li>{t.valores_bilhoes}</li>
                <li>{t.percentuais_proporcao}</li>
                <li>{t.percentuais_relativos}</li>
              </ul>
              <p>
                {t.comparar_dados}
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Seção de acessibilidade */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t.acessibilidade}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p>
                {t.recursos_disponiveis}
              </p>
              <ul>
                <li>{t.navegacao_teclado}</li>
                <li>{t.cores_contraste}</li>
                <li>{t.textos_alternativos}</li>
                <li>{t.tabelas_dados}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
      
      {/* Rodapé */}
      <footer className="bg-gray-800 text-white p-8 mt-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">{t.titulo}</h3>
              <p className="text-gray-300">
                {t.plataforma}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">{t.links_uteis}</h3>
              <ul className="space-y-2">
                <li><a href="https://portaldatransparencia.gov.br/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">{t.portal_transparencia}</a></li>
                <li><a href="https://dados.gov.br/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">{t.dados_abertos}</a></li>
                <li><a href="https://www.gov.br/acessoainformacao/pt-br" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">{t.lei_acesso}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} {t.titulo}. {t.direitos_reservados}</p>
          </div>
        </div>
      </footer>
      
      {/* Modal Sobre */}
      <Dialog open={sobreAberto} onOpenChange={setSobreAberto}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t.sobre_titulo}</DialogTitle>
            <DialogDescription className="text-base mt-4">
              <div className="prose max-w-none">
                <p className="text-lg">{t.sobre_descricao}</p>
                <p>{t.sobre_objetivo}</p>
                <p>{t.sobre_transparencia}</p>
                <p>{t.sobre_dados}</p>
                <p>{t.sobre_futuro}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
