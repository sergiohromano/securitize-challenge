## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Configurations

There is a env.example in both projects `web` and `api` to configure.


```bash
cp env.example .env
```

## Docker

To make development easier there is a docker-compose.yml file to run a db and nginx:

```bash
docker-compose up -d
```
