import requests
import json
import os
import pandas as pd
from datetime import datetime

class DadosIBGE:
    """
    Classe para extração e processamento de dados populacionais do IBGE
    """
    def __init__(self):
        self.base_url = "https://servicodados.ibge.gov.br/api/v3"
        self.cache_dir = os.path.join(os.getcwd(), "cache", "ibge")
        os.makedirs(self.cache_dir, exist_ok=True)
        
    def obter_populacao_estados(self, ano=2024):
        """
        Obtém dados de população por estado do Brasil
        
        Args:
            ano (int): Ano de referência para os dados
            
        Returns:
            pandas.DataFrame: DataFrame com população por estado
        """
        # Verificar se já temos dados em cache
        cache_file = os.path.join(self.cache_dir, f"populacao_estados_{ano}.csv")
        
        if os.path.exists(cache_file):
            # Verificar se o cache é recente (menos de 30 dias)
            file_time = os.path.getmtime(cache_file)
            if (datetime.now().timestamp() - file_time) < 30 * 24 * 60 * 60:
                print(f"Usando dados em cache para população de estados ({ano})")
                return pd.read_csv(cache_file)
        
        # Se não temos cache ou está desatualizado, buscar da API
        print(f"Buscando dados de população por estado ({ano}) da API do IBGE")
        
        # Endpoint para dados de população por UF
        # Usando o agregado 4714 (Projeções populacionais)
        url = f"{self.base_url}/agregados/4714/periodos/{ano}/variaveis?localidades=N3[all]"
        
        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
            
            # Processar os dados
            estados = []
            for resultado in data:
                for localidade in resultado['resultados']:
                    for serie in localidade['series']:
                        estado = {
                            'uf': serie['localidade']['sigla'],
                            'nome': serie['localidade']['nome'],
                            'populacao': int(serie['serie'][str(ano)])
                        }
                        estados.append(estado)
            
            # Criar DataFrame
            df = pd.DataFrame(estados)
            
            # Salvar em cache
            df.to_csv(cache_file, index=False)
            
            return df
            
        except Exception as e:
            print(f"Erro ao obter dados de população: {e}")
            
            # Se falhar, tentar usar cache mesmo que antigo
            if os.path.exists(cache_file):
                print("Usando dados em cache antigos como fallback")
                return pd.read_csv(cache_file)
            
            # Se não tiver cache, criar dados simulados
            print("Criando dados simulados de população")
            return self._criar_dados_simulados_populacao()
    
    def _criar_dados_simulados_populacao(self):
        """
        Cria dados simulados de população para casos de falha na API
        
        Returns:
            pandas.DataFrame: DataFrame com população simulada por estado
        """
        # Dados aproximados de população por estado
        dados = [
            {"uf": "SP", "nome": "São Paulo", "populacao": 46000000},
            {"uf": "MG", "nome": "Minas Gerais", "populacao": 21000000},
            {"uf": "RJ", "nome": "Rio de Janeiro", "populacao": 17000000},
            {"uf": "BA", "nome": "Bahia", "populacao": 14000000},
            {"uf": "PR", "nome": "Paraná", "populacao": 11500000},
            {"uf": "RS", "nome": "Rio Grande do Sul", "populacao": 11300000},
            {"uf": "PE", "nome": "Pernambuco", "populacao": 9500000},
            {"uf": "CE", "nome": "Ceará", "populacao": 9000000},
            {"uf": "PA", "nome": "Pará", "populacao": 8500000},
            {"uf": "SC", "nome": "Santa Catarina", "populacao": 7000000},
            {"uf": "MA", "nome": "Maranhão", "populacao": 7000000},
            {"uf": "GO", "nome": "Goiás", "populacao": 7000000},
            {"uf": "AM", "nome": "Amazonas", "populacao": 4000000},
            {"uf": "ES", "nome": "Espírito Santo", "populacao": 4000000},
            {"uf": "PB", "nome": "Paraíba", "populacao": 4000000},
            {"uf": "RN", "nome": "Rio Grande do Norte", "populacao": 3500000},
            {"uf": "MT", "nome": "Mato Grosso", "populacao": 3500000},
            {"uf": "AL", "nome": "Alagoas", "populacao": 3300000},
            {"uf": "PI", "nome": "Piauí", "populacao": 3200000},
            {"uf": "DF", "nome": "Distrito Federal", "populacao": 3000000},
            {"uf": "MS", "nome": "Mato Grosso do Sul", "populacao": 2800000},
            {"uf": "SE", "nome": "Sergipe", "populacao": 2300000},
            {"uf": "RO", "nome": "Rondônia", "populacao": 1800000},
            {"uf": "TO", "nome": "Tocantins", "populacao": 1600000},
            {"uf": "AC", "nome": "Acre", "populacao": 900000},
            {"uf": "AP", "nome": "Amapá", "populacao": 850000},
            {"uf": "RR", "nome": "Roraima", "populacao": 600000}
        ]
        
        return pd.DataFrame(dados)


class DadosTransparencia:
    """
    Classe para extração e processamento de dados orçamentários do Portal da Transparência
    """
    def __init__(self, token=None):
        self.base_url = "https://api.portaldatransparencia.gov.br/api-de-dados"
        self.token = token
        self.cache_dir = os.path.join(os.getcwd(), "cache", "transparencia")
        os.makedirs(self.cache_dir, exist_ok=True)
        
        # Códigos das funções orçamentárias
        self.codigos_funcao = {
            "educacao": "12",
            "saude": "10",
            "seguranca": "06"
        }
    
    def obter_orcamento_federal_por_funcao(self, ano=2024):
        """
        Obtém dados de orçamento federal por função (Educação, Saúde, Segurança)
        
        Args:
            ano (int): Ano de referência para os dados
            
        Returns:
            pandas.DataFrame: DataFrame com orçamento por função
        """
        # Verificar se já temos dados em cache
        cache_file = os.path.join(self.cache_dir, f"orcamento_federal_{ano}.csv")
        
        if os.path.exists(cache_file):
            # Verificar se o cache é recente (menos de 7 dias)
            file_time = os.path.getmtime(cache_file)
            if (datetime.now().timestamp() - file_time) < 7 * 24 * 60 * 60:
                print(f"Usando dados em cache para orçamento federal ({ano})")
                return pd.read_csv(cache_file)
        
        # Se não temos cache ou está desatualizado, buscar da API
        print(f"Buscando dados de orçamento federal ({ano}) da API do Portal da Transparência")
        
        # Se não temos token, usar dados simulados
        if not self.token:
            print("Token não fornecido. Usando dados simulados.")
            return self._criar_dados_simulados_orcamento_federal(ano)
        
        # Endpoint para despesas por função
        url = f"{self.base_url}/despesas/por-funcao"
        
        headers = {
            "accept": "application/json",
            "chave-api-dados": self.token
        }
        
        params = {
            "ano": ano,
            "pagina": 1
        }
        
        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            data = response.json()
            
            # Filtrar apenas as funções que nos interessam
            funcoes_interesse = list(self.codigos_funcao.values())
            dados_filtrados = [item for item in data if item['codigo'] in funcoes_interesse]
            
            # Criar DataFrame
            df = pd.DataFrame(dados_filtrados)
            
            # Salvar em cache
            df.to_csv(cache_file, index=False)
            
            return df
            
        except Exception as e:
            print(f"Erro ao obter dados de orçamento federal: {e}")
            
            # Se falhar, tentar usar cache mesmo que antigo
            if os.path.exists(cache_file):
                print("Usando dados em cache antigos como fallback")
                return pd.read_csv(cache_file)
            
            # Se não tiver cache, criar dados simulados
            print("Criando dados simulados de orçamento federal")
            return self._criar_dados_simulados_orcamento_federal(ano)
    
    def obter_orcamento_estadual(self, estado, ano=2024):
        """
        Obtém dados de orçamento estadual por função (Educação, Saúde, Segurança)
        
        Args:
            estado (str): Sigla do estado (ex: SP, RJ)
            ano (int): Ano de referência para os dados
            
        Returns:
            pandas.DataFrame: DataFrame com orçamento por função
        """
        # Como não há API unificada para dados estaduais, usamos dados simulados
        # Em uma implementação real, seria necessário integrar com APIs específicas de cada estado
        return self._criar_dados_simulados_orcamento_estadual(estado, ano)
    
    def _criar_dados_simulados_orcamento_federal(self, ano):
        """
        Cria dados simulados de orçamento federal para casos de falha na API
        
        Args:
            ano (int): Ano de referência
            
        Returns:
            pandas.DataFrame: DataFrame com orçamento simulado por função
        """
        dados = [
            {
                "codigo": "12",
                "descricao": "Educação",
                "orcamentoAtual": 142500000000.0,
                "orcamentoRealizado": 138700000000.0,
                "percentualRealizado": 97.33
            },
            {
                "codigo": "10",
                "descricao": "Saúde",
                "orcamentoAtual": 189300000000.0,
                "orcamentoRealizado": 185600000000.0,
                "percentualRealizado": 98.05
            },
            {
                "codigo": "06",
                "descricao": "Segurança Pública",
                "orcamentoAtual": 21500000000.0,
                "orcamentoRealizado": 20800000000.0,
                "percentualRealizado": 96.74
            }
        ]
        
        return pd.DataFrame(dados)
    
    def _criar_dados_simulados_orcamento_estadual(self, estado, ano):
        """
        Cria dados simulados de orçamento estadual
        
        Args:
            estado (str): Sigla do estado
            ano (int): Ano de referência
            
        Returns:
            pandas.DataFrame: DataFrame com orçamento simulado por função
        """
        # Fatores de multiplicação baseados no estado (simulando diferentes orçamentos)
        fatores = {
            "SP": 1.0,
            "RJ": 0.65,
            "MG": 0.7,
            "BA": 0.5,
            "PR": 0.45,
            "RS": 0.48,
            "PE": 0.4,
            "CE": 0.38,
            "PA": 0.35,
            "SC": 0.33,
            "MA": 0.3,
            "GO": 0.32,
            "AM": 0.28,
            "ES": 0.25,
            "PB": 0.22,
            "RN": 0.2,
            "MT": 0.23,
            "AL": 0.18,
            "PI": 0.17,
            "DF": 0.3,
            "MS": 0.19,
            "SE": 0.15,
            "RO": 0.12,
            "TO": 0.1,
            "AC": 0.08,
            "AP": 0.07,
            "RR": 0.06
        }
        
        # Usar fator 0.3 para estados não listados
        fator = fatores.get(estado, 0.3)
        
        # Valores base para SP (maior orçamento)
        base_educacao = 45000000000.0
        base_saude = 38000000000.0
        base_seguranca = 12000000000.0
        
        # Aplicar fator de multiplicação
        dados = [
            {
                "codigo": "12",
                "descricao": "Educação",
                "orcamentoAtual": base_educacao * fator,
                "orcamentoRealizado": base_educacao * fator * 0.96,
                "percentualRealizado": 96.0
            },
            {
                "codigo": "10",
                "descricao": "Saúde",
                "orcamentoAtual": base_saude * fator,
                "orcamentoRealizado": base_saude * fator * 0.97,
                "percentualRealizado": 97.0
            },
            {
                "codigo": "06",
                "descricao": "Segurança Pública",
                "orcamentoAtual": base_seguranca * fator,
                "orcamentoRealizado": base_seguranca * fator * 0.95,
                "percentualRealizado": 95.0
            }
        ]
        
        return pd.DataFrame(dados)


class GeradorDados:
    """
    Classe para gerar e processar dados combinados para o EducaPúblico
    """
    def __init__(self, token_transparencia=None):
        self.ibge = DadosIBGE()
        self.transparencia = DadosTransparencia(token=token_transparencia)
        self.output_dir = os.path.join(os.getcwd(), "data")
        os.makedirs(self.output_dir, exist_ok=True)
    
    def gerar_dados_completos(self, ano=2024):
        """
        Gera conjunto completo de dados para o EducaPúblico
        
        Args:
            ano (int): Ano de referência
            
        Returns:
            dict: Dicionário com todos os dados processados
        """
        # Obter dados de população
        df_populacao = self.ibge.obter_populacao_estados(ano)
        
        # Obter dados de orçamento federal
        df_orcamento_federal = self.transparencia.obter_orcamento_federal_por_funcao(ano)
        
        # Gerar dados de orçamento estadual para todos os estados
        dados_estaduais = {}
        for _, row in df_populacao.iterrows():
            uf = row['uf']
            df_orcamento = self.transparencia.obter_orcamento_estadual(uf, ano)
            dados_estaduais[uf] = df_orcamento
        
        # Calcular métricas per capita para estados
        dados_per_capita = self._calcular_metricas_per_capita(df_populacao, dados_estaduais)
        
        # Gerar ranking de estados por setor
        ranking_educacao = self._gerar_ranking_estados("Educação", dados_per_capita)
        ranking_saude = self._gerar_ranking_estados("Saúde", dados_per_capita)
        ranking_seguranca = self._gerar_ranking_estados("Segurança Pública", dados_per_capita)
        
        # Gerar estatísticas nacionais
        estatisticas_nacionais = self._gerar_estatisticas_nacionais()
        
        # Consolidar todos os dados
        dados_completos = {
            "meta": {
                "ano": ano,
                "data_atualizacao": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            },
            "populacao": df_populacao.to_dict(orient="records"),
            "orcamento_federal": df_orcamento_federal.to_dict(orient="records"),
            "orcamento_estadual": {uf: df.to_dict(orient="records") for uf, df in dados_estaduais.items()},
            "metricas_per_capita": dados_per_capita,
            "ranking": {
                "educacao": ranking_educacao,
                "saude": ranking_saude,
                "seguranca": ranking_seguranca
            },
            "estatisticas_nacionais": estatisticas_nacionais
        }
        
        # Salvar dados em arquivo JSON
        output_file = os.path.join(self.output_dir, f"dados_completos_{ano}.json")
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(dados_completos, f, ensure_ascii=False, indent=2)
        
        print(f"Dados completos gerados e salvos em {output_file}")
        
        return dados_completos
    
    def _calcular_metricas_per_capita(self, df_populacao, dados_estaduais):
        """
        Calcula métricas per capita para cada estado
        
        Args:
            df_populacao (DataFrame): DataFrame com população por estado
            dados_estaduais (dict): Dicionário com orçamento por estado
            
        Returns:
            dict: Dicionário com métricas per capita por estado
        """
        resultado = {}
        
        for _, row in df_populacao.iterrows():
            uf = row['uf']
            populacao = row['populacao']
            
            if uf in dados_estaduais:
                df_orcamento = dados_estaduais[uf]
                metricas = {}
                
                for _, orcamento in df_orcamento.iterrows():
                    setor = orcamento['descricao']
                    valor = orcamento['orcamentoRealizado']
                    
                    # Calcular valor per capita
                    per_capita = valor / populacao
                    
                    metricas[setor] = {
                        "valor_total": valor,
                        "valor_per_capita": per_capita,
                        "percentual_orcamento": orcamento['percentualRealizado']
                    }
                
                resultado[uf] = metricas
        
        return resultado
    
    def _gerar_ranking_estados(self, setor, dados_per_capita):
        """
        Gera ranking de estados por setor
        
        Args:
            setor (str): Nome do setor (Educação, Saúde, Segurança Pública)
            dados_per_capita (dict): Dicionário com métricas per capita por estado
            
        Returns:
            list: Lista de estados ordenados por valor per capita
        """
        ranking = []
        
        for uf, metricas in dados_per_capita.items():
            if setor in metricas:
                ranking.append({
                    "uf": uf,
                    "valor_total": metricas[setor]["valor_total"],
                    "valor_per_capita": metricas[setor]["valor_per_capita"],
                    "percentual_orcamento": metricas[setor]["percentual_orcamento"]
                })
        
        # Ordenar por valor per capita (decrescente)
        ranking_ordenado = sorted(ranking, key=lambda x: x["valor_per_capita"], reverse=True)
        
        return ranking_ordenado
    
    def _gerar_estatisticas_nacionais(self):
        """
        Gera estatísticas nacionais sobre acesso ao Portal da Transparência
        
        Returns:
            dict: Dicionário com estatísticas nacionais
        """
        # Dados fixos baseados na pesquisa realizada
        return {
            "populacao_total": 212600000,
            "usuarios_internet": 159000000,
            "percentual_internet": 74.8,
            "acessos_portal": 17700000,
            "percentual_populacao_acessa": 8.33,
            "percentual_internet_acessa": 11.13
        }


# Exemplo de uso
if __name__ == "__main__":
    # Token da API do Portal da Transparência (deve ser obtido via cadastro)
    # token = "seu-token-aqui"
    token = None  # Usando None para gerar dados simulados
    
    # Criar gerador de dados
    gerador = GeradorDados(token_transparencia=token)
    
    # Gerar dados completos
    dados = gerador.gerar_dados_completos(2024)
    
    print("Dados gerados com sucesso!")
