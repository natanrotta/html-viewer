# html-viewer

Projeto React criado do zero com **Vite**, **TypeScript** e **[Chakra UI v3](https://chakra-ui.com/)**.

## Requisitos

- Node.js 20+ (testado com Node 22)
- npm 10+

## Como rodar

```bash
# instalar dependências
yarn install

# ambiente de desenvolvimento (http://localhost:5173)
yarn start        # ou: yarn dev

# build de produção
yarn build

# pré-visualizar o build
yarn preview

# checagem de tipos
yarn typecheck
```

## Estrutura

```
.
├── index.html                  # HTML raiz
├── vite.config.ts              # config do Vite (plugin React + alias @/*)
├── tsconfig*.json              # configuração do TypeScript
└── src
    ├── main.tsx                # ponto de entrada, monta o <Provider> do Chakra
    ├── App.tsx                 # tela inicial de exemplo
    ├── vite-env.d.ts
    └── components/ui
        ├── provider.tsx        # ChakraProvider + suporte a color mode
        └── color-mode.tsx      # hooks/botão de tema claro/escuro (next-themes)
```

## Alias de importação

O alias `@/*` aponta para `src/*` (configurado em `tsconfig.app.json` e
`vite-tsconfig-paths`). Exemplo: `import { Provider } from "@/components/ui/provider"`.
