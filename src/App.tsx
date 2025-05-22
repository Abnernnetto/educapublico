import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
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

interface DadosFederaisType {
  macro: DadoItem[];
  detalhado: DadosDetalhados;
}

interface DadosEstadoType {
  macro: DadoItem[];
  detalhado: DadosDetalhados;
}

interface DadosEstaduaisType {
  [estado: string]: DadosEstadoType;
}

// Dados simulados para demonstração
const dadosFederais: DadosFederaisType = {
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

// Lista de estados brasileiros
const estados = [
  'São Paulo',
  'Rio de Janeiro',
  'Minas Gerais',
  'Bahia',
  'Paraná',
  'Rio Grande do Sul',
  'Pernambuco',
  'Ceará',
  'Pará',
  'Santa Catarina',
  'Goiás',
  'Maranhão',
  'Amazonas',
  'Espírito Santo',
  'Paraíba',
  'Mato Grosso',
  'Rio Grande do Norte',
  'Alagoas',
  'Piauí',
  'Distrito Federal',
  'Mato Grosso do Sul',
  'Sergipe',
  'Rondônia',
  'Tocantins',
  'Acre',
  'Amapá',
  'Roraima'
];

// Tipo para os setores disponíveis
type SetorType = 'Educação' | 'Saúde' | 'Segurança';

// Componente principal
export default function App() {
  // Estados para controlar os filtros
  const [nivel, setNivel] = useState<'federal' | 'estadual'>('federal');
  const [estado, setEstado] = useState<string>('São Paulo');
  const [visualizacao, setVisualizacao] = useState<'macro' | 'detalhada'>('macro');
  const [setor, setSetor] = useState<SetorType>('Educação');
  
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
  
  // Função para formatar valores em bilhões
  
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
            <h1 className="text-xl font-bold">EducaPúblico</h1>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="text-white hover:text-blue-100">Início</Button>
            <Button variant="ghost" className="text-white hover:text-blue-100">Sobre</Button>
            <Button variant="ghost" className="text-white hover:text-blue-100">Contato</Button>
            <Select defaultValue="pt-BR">
              <SelectTrigger className="w-[100px] bg-blue-700 border-blue-500 text-white">
                <SelectValue placeholder="Idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">Português</SelectItem>
                <SelectItem value="en-US">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>
      
      {/* Conteúdo principal */}
      <main className="container mx-auto p-4 mt-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Transparência Orçamentária</CardTitle>
            <CardDescription>
              Explore os dados de investimentos em Educação, Saúde e Segurança nos níveis federal e estadual.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Filtro de Nível */}
              <div>
                <label className="block text-sm font-medium mb-2">Nível</label>
                <Tabs defaultValue="federal" value={nivel} onValueChange={(value) => setNivel(value as 'federal' | 'estadual')} className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="federal" className="w-1/2">Federal</TabsTrigger>
                    <TabsTrigger value="estadual" className="w-1/2">Estadual</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Filtro de Estado (visível apenas quando nível estadual está selecionado) */}
              <div className={nivel === 'estadual' ? 'block' : 'hidden'}>
                <label className="block text-sm font-medium mb-2">Estado</label>
                <Select value={estado} onValueChange={setEstado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um estado" />
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
                <label className="block text-sm font-medium mb-2">Visualização</label>
                <Tabs defaultValue="macro" value={visualizacao} onValueChange={(value) => setVisualizacao(value as 'macro' | 'detalhada')} className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="macro" className="w-1/2">Macro</TabsTrigger>
                    <TabsTrigger value="detalhada" className="w-1/2">Detalhada</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Filtro de Setor (visível apenas quando visualização detalhada está selecionada) */}
              <div className={visualizacao === 'detalhada' ? 'block' : 'hidden'}>
                <label className="block text-sm font-medium mb-2">Setor</label>
                <Select value={setor} onValueChange={(value) => setSetor(value as SetorType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um setor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Educação">Educação</SelectItem>
                    <SelectItem value="Saúde">Saúde</SelectItem>
                    <SelectItem value="Segurança">Segurança</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Visualização dos dados */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">
                {visualizacao === 'macro' 
                  ? `Comparativo de Investimentos - ${nivel === 'federal' ? 'Federal' : estado}`
                  : `Distribuição do Orçamento em ${setor} - ${nivel === 'federal' ? 'Federal' : estado}`
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
                      <Bar dataKey="valor" name="Valor (em bilhões de R$)">
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
                      <th className="py-2 px-4 border-b text-left">Categoria</th>
                      <th className="py-2 px-4 border-b text-right">Valor (R$ bilhões)</th>
                      <th className="py-2 px-4 border-b text-right">Percentual</th>
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
              Fonte: Portal da Transparência, {new Date().getFullYear()}
            </div>
            <div>
              Acessos: {acessosTotal} | Usuários únicos: {acessosUnicos}
            </div>
          </CardFooter>
        </Card>
        
        {/* Seção de explicação */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Como interpretar estes dados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p>
                Os dados apresentados mostram a distribuição orçamentária entre os setores de Educação, Saúde e Segurança. 
                É importante entender que:
              </p>
              <ul>
                <li>Os valores são apresentados em bilhões de reais</li>
                <li>Os percentuais representam a proporção em relação ao total dos três setores analisados</li>
                <li>Na visualização detalhada, os percentuais são relativos ao total do setor selecionado</li>
              </ul>
              <p>
                Ao comparar dados entre diferentes níveis (federal e estadual) ou entre estados, considere as diferenças 
                de escala orçamentária e as particularidades regionais.
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Seção de acessibilidade */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Acessibilidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p>
                O EducaPúblico foi desenvolvido com foco em acessibilidade. Recursos disponíveis:
              </p>
              <ul>
                <li>Navegação por teclado (use Tab para navegar entre elementos)</li>
                <li>Cores com contraste adequado para pessoas com daltonismo</li>
                <li>Textos alternativos para gráficos e visualizações</li>
                <li>Tabelas de dados como alternativa às visualizações gráficas</li>
              </ul>
              <p>
                Se encontrar problemas de acessibilidade ou tiver sugestões para melhorias, 
                entre em contato através da seção "Contato".
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      
      {/* Rodapé */}
      <footer className="bg-gray-800 text-white p-8 mt-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">EducaPúblico</h3>
              <p className="text-gray-300">
                Plataforma para educação política e transparência orçamentária, 
                facilitando o acesso a informações sobre investimentos públicos.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Links Úteis</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-300 hover:underline">Portal da Transparência</a></li>
                <li><a href="#" className="text-blue-300 hover:underline">Dados Abertos do Governo</a></li>
                <li><a href="#" className="text-blue-300 hover:underline">Lei de Acesso à Informação</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contato</h3>
              <p className="text-gray-300">
                Para dúvidas, sugestões ou reportar problemas, entre em contato:
              </p>
              <p className="text-blue-300">contato@educapublico.org.br</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} EducaPúblico. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
