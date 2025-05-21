import React from 'react';
import './App.css';

// Componentes de exemplo para o protótipo
const Header = () => (
  <header className="bg-blue-700 text-white p-4">
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">EducaPúblico</h1>
      <p className="text-sm">Transparência e educação política para todos</p>
    </div>
  </header>
);

const AccessCounter = () => (
  <div className="bg-gray-100 p-2 text-center text-sm">
    <span className="mr-4">Acessos totais: <strong>1,245</strong></span>
    <span>Visitantes únicos: <strong>876</strong></span>
  </div>
);

const SectionSelector = () => (
  <div className="flex justify-center my-4">
    <button className="mx-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" aria-label="Ver dados de Educação">Educação</button>
    <button className="mx-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" aria-label="Ver dados de Saúde">Saúde</button>
    <button className="mx-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" aria-label="Ver dados de Segurança">Segurança</button>
  </div>
);

const FilterSection = () => (
  <div className="container mx-auto p-4 bg-gray-50 rounded-lg mb-6">
    <h2 className="text-lg font-semibold mb-2">Filtros</h2>
    <div className="flex flex-wrap gap-4">
      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">Ano</label>
        <select id="year" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
          <option>2024</option>
          <option>2023</option>
          <option>2022</option>
        </select>
      </div>
      <div>
        <label htmlFor="level" className="block text-sm font-medium text-gray-700">Nível</label>
        <select id="level" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
          <option>Federal</option>
          <option>Estadual</option>
        </select>
      </div>
      <div>
        <label htmlFor="view" className="block text-sm font-medium text-gray-700">Visualização</label>
        <select id="view" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
          <option>Gráfico de Barras</option>
          <option>Gráfico de Pizza</option>
          <option>Tabela</option>
        </select>
      </div>
    </div>
  </div>
);

const ChartPlaceholder = () => (
  <div className="container mx-auto p-6 bg-white rounded-lg shadow-md mb-6">
    <h2 className="text-xl font-bold mb-4">Distribuição Orçamentária - Educação (2024)</h2>
    <div className="bg-gray-200 h-64 flex items-center justify-center rounded" aria-label="Gráfico de distribuição orçamentária para Educação em 2024">
      <p className="text-gray-600">[Visualização do gráfico]</p>
    </div>
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Descrição do gráfico</h3>
      <p className="text-gray-700">
        Este gráfico mostra a distribuição do orçamento federal para Educação em 2024. 
        O total de R$ 146,5 bilhões foi distribuído principalmente entre ensino superior (35%), 
        educação básica (40%), e outros programas educacionais (25%).
      </p>
    </div>
  </div>
);

const ComparisonSection = () => (
  <div className="container mx-auto p-6 bg-white rounded-lg shadow-md mb-6">
    <h2 className="text-xl font-bold mb-4">Comparativo entre Áreas (2024)</h2>
    <div className="bg-gray-200 h-64 flex items-center justify-center rounded" aria-label="Gráfico comparativo entre Educação, Saúde e Segurança em 2024">
      <p className="text-gray-600">[Visualização do gráfico comparativo]</p>
    </div>
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Análise comparativa</h3>
      <p className="text-gray-700">
        Em 2024, o orçamento federal distribuiu R$ 146,5 bilhões para Educação, 
        R$ 188,3 bilhões para Saúde e R$ 63,7 bilhões para Segurança Pública. 
        A Saúde recebeu a maior fatia do orçamento entre as três áreas.
      </p>
    </div>
  </div>
);

const GlossarySection = () => (
  <div className="container mx-auto p-6 bg-white rounded-lg shadow-md mb-6">
    <h2 className="text-xl font-bold mb-4">Glossário</h2>
    <dl>
      <div className="mb-2">
        <dt className="font-semibold">Orçamento Público</dt>
        <dd className="pl-4">Instrumento de planejamento que estima receitas e fixa despesas para um determinado período.</dd>
      </div>
      <div className="mb-2">
        <dt className="font-semibold">LOA</dt>
        <dd className="pl-4">Lei Orçamentária Anual - Lei que estima receitas e autoriza despesas do governo conforme o plano de trabalho.</dd>
      </div>
      <div className="mb-2">
        <dt className="font-semibold">Função Programática</dt>
        <dd className="pl-4">Classificação da despesa pública que identifica em qual área de atuação a ação governamental será realizada.</dd>
      </div>
    </dl>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white p-6">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold mb-2">EducaPúblico</h2>
          <p className="text-sm">Transparência e educação política para todos</p>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-2">Fontes de Dados</h3>
          <ul className="text-sm">
            <li>Portal da Transparência do Governo Federal</li>
            <li>Portal de Dados Abertos</li>
            <li>Portais de Transparência Estaduais</li>
          </ul>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-center">
        <p>© 2025 EducaPúblico - Todos os direitos reservados</p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AccessCounter />
      <main className="flex-grow bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <SectionSelector />
          <FilterSection />
          <ChartPlaceholder />
          <ComparisonSection />
          <GlossarySection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
