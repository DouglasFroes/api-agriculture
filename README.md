# Brain Agriculture API

API para gerenciamento de produtores rurais, propriedades e culturas.

## Requisitos

- Node.js 22+
- Docker e Docker Compose

## Como rodar o projeto

### Opção 1: Usando Docker (recomendado)

1. Clone o repositório

```sh
git clone <url-do-repositorio>
cd api-agriculture
```

2. Suba o banco de dados e a aplicação com Docker Compose

```sh
docker-compose up --build
```

A aplicação estará disponível em `http://localhost:3000`.

**Acesse a documentação interativa da API em:**

👉 [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)

### Opção 2: Rodando localmente (sem Docker)

1. Instale as dependências:

```sh
npm install
```

2. Suba um banco Postgres localmente (pode usar Docker apenas para o banco):

```sh
docker run --name agriculture-db -e POSTGRES_DB=agriculture -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16-alpine
```

3. Configure o arquivo `.env` na raiz do projeto:

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/agriculture
```

4. Rode as migrações do banco:

```sh
npx prisma migrate dev
```

5. Inicie a aplicação:

```sh
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3000`.

**Acesse a documentação interativa da API em:**

👉 [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)

## Mock de dados (Seed)

Para popular o banco com dados de exemplo, execute:

```sh
npm run prisma:seed
```

Isso irá criar produtores, propriedades e culturas aleatórias.

## Rodando os testes

### Testes unitários e de integração

```sh
npm test
```

### Testes end-to-end (e2e)

```sh
npm run test:e2e
```

Os testes e2e estão em `test/app.e2e-spec.ts` e cobrem os principais fluxos da API.

## Observabilidade

O sistema inclui logs nos pontos principais das operações de criação, atualização, exclusão e busca, facilitando o monitoramento e a identificação de problemas.

## Documentação

- O código segue boas práticas de Clean Code, SOLID e arquitetura em camadas.
- Endpoints RESTful para produtores, propriedades, culturas e dashboard.

---
