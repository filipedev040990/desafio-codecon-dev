# Desafio Técnico: Performance e Análise de Dados via API

## Objetivo

Criar uma API que recebe um arquivo JSON com 100.000 usuários e oferece endpoints performáticos e bem estruturados para análise dos dados.

- [Exemplos de respostas esperadas na API](https://github.com/codecon-dev/desafio-1-1s-vs-3j/blob/main/exemplos-endpoints.json)
- [Arquivo com 100 mil usuários para importar](https://drive.google.com/file/d/1zOweCB2jidgHwirp_8oBnFyDgJKkWdDA/view?usp=sharing)
- [Arquivo com 1 mil usuário para teste](https://drive.google.com/file/d/1BX03cWxkvB_MbZN8_vtTJBDGiCufyO92/view?usp=sharing)

---

## JSON de entrada

O JSON contém uma lista de usuários com a seguinte estrutura:

```json
{
  "id": "uuid",
  "name": "string",
  "age": "int",
  "score": "int",
  "active": "bool",
  "country": "string",
  "team": {
    "name": "string",
    "leader": "bool",
    "projects": [{ "name": "string", "completed": "bool" }]
  },
  "logs": [{ "date": "YYYY-MM-DD", "action": "login/logout" }]
}
```

---

## Endpoints obrigatórios

### `POST /users`

Recebe e armazena os usuários na memória. Pode simular um banco de dados em memória.

### `GET /superusers`

- Filtro: `score >= 900` e `active = true`
- Retorna os dados e o tempo de processamento da requisição.

### `GET /top-countries`

- Agrupa os superusuários por país.
- Retorna os 5 países com maior número de superusuários.


### `GET /team-insights`

- Agrupa por `team.name`.
- Retorna: total de membros, líderes, projetos concluídos e % de membros ativos.

### `GET /active-users-per-day`

- Conta quantos logins aconteceram por data.
- Query param opcional: `?min=3000` para filtrar dias com pelo menos 3.000 logins.

### `GET /evaluation`

Ele deve executar uma autoavaliação dos principais endpoints da API e retornar um relatório de pontuação.

A avaliação deve testar:

- Se o status retornado é 200
- O tempo em milisegundos de resposta
- Se o retorno é um JSON válido

Esse endpoint pode rodar scripts de teste embutidos no próprio projeto e retornar um JSON com os resultados. Ele será utilizado para validar a entrega de forma automática e rápida.

---

## Observação

Existe um arquivo chamado `json-users-example.json`. Ele pode ser usado no upload pois contém alguns registros para testes.

---

## 🛠 Ferramentas Utilizadas
- [Node](https://nodejs.dev)
- [Express](https://expressjs.com/pt-br/)
- [Jest](https://jestjs.io)
- [Docker](https://www.docker.com/)

---


## 💻 Clonando o repositório

- Clone o projeto

  ```bash
  git clone git@github.com:filipedev040990/desafio-codecon-dev.git
  ````
---

## 🏠 Adicionando variáveis de ambiente (.env)
Existe o arquivo `.env.example` com todas as variáveis utilizadas para rodar o sistema. Faça uma cópia desse arquivo e renomeie a cópia para `.env` antes de executar o comando para iniciar a aplicação.

---


## ▶️ Executando o projeto
- Execute um dos seguintes comandos:
  ```bash
    docker compose up -d && docker logs -f desafio_codecon_dev
    docker-compose up -d && docker-logs -f desafio_codecon_dev
    make up logs
  ```

- O Backend iniciará em [http://localhost:3000](http://localhost:3000)

---

## 🧩 Swagger
É possível acessar a documentação da API pelo [Swagger da API](http://localhost:3000/api-docs) e simular os endpoints

---

## 🧪 Testes:
- Rodar todos os testes
  ```bash
  npm run test
  ```
---


## 🚀 Commits no projeto

Exemplos de tipos:
  - feat: introduz uma nova funcionalidade à base de código;
  - fix: correção de um bug na base de código;
  - build: Introduz uma mudança que afeta o build do sistema ou alguma dependência externa (exemplos de escopos: gulp, broccoli, npm);
  - chore: atualização de ferramentas, configurações e bibliotecas
  - ci: Introduz uma mudança aos arquivos e scripts de configuração do CI/CD (exemplos de escopos: Travis, Circle, BrowserStack, SauceLabs)
  - docs: Alterações na documentação
  - style: Introduz uma mudança que não afeta o significado do código (remoção de espaços em branco, formatação, ponto e virgula faltando, etc)
  - refactor: Uma mudança no código que nem corrige um bug nem adiciona uma nova funcionalidade
  - perf: Um mundança no código que melhora a performance
  - test: Adicionar testes faltando ou corrigir testes existentes

Exemplos de commits válidos:
  ```bash
  git commit -m "feat(#300): creating auth service"
  git commit -m "fix(#30): correcting product type"