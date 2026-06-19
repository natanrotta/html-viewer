# HTML Viewer — Visualizador de HTML & Markdown

App de página única para **colar HTML (ou Markdown) e ver o resultado renderizado em
tempo real**. Editor + pré-visualização ao vivo, biblioteca de documentos recentes
salva no navegador, tema claro/escuro e modo tela cheia.

Construído a partir do handoff de design **Cuidda** (base Chakra UI): azul de marca
`#2f80ed`, verde/teal de apoio `#1eb28a`, tipografia Nunito Sans / JetBrains Mono.

## Funcionalidades

- **Render ao vivo** de HTML (cru) ou **Markdown** (via `marked`) num `<iframe>` isolado.
- **Alternância HTML ⇄ Markdown** por documento.
- **Recentes** persistidos em `localStorage` — abrir, excluir e **limpar tudo**.
- **3 modos de visão**: Código · Dividir · Visualizar (persistido).
- **Tema claro/escuro** (persistido, sem flash na carga).
- **Sidebar recolhível** e **tela cheia** do resultado (sai com `Esc`).
- **Autosave** com debounce e título derivado de `<title>`/`<h1>`.
- **Divisória redimensionável** no modo Dividir (arraste · duplo-clique iguala).
- **Atalhos de teclado** com popover de referência no rodapé da sidebar.
- **Persistência comprimida** (lz-string) para ocupar menos espaço no navegador.
- **Visão automática** — abrir um documento salta para Visualizar; criar um novo entra em Código.
- **Confirmação** antes de excluir um documento ou apagar todos.
- **Apoie o projeto** — botão no sidebar abre um modal com o [Buy Me a Coffee](https://www.buymeacoffee.com/natanrotta).
- **Ícones animados** (hover) do [lucide-animated.com](https://lucide-animated.com) via Motion.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Chakra UI v3** (tema customizado com os design tokens do Cuidda)
- **next-themes** (color mode), **marked** (Markdown), **motion** (ícones)

## Como rodar

```bash
yarn install
yarn dev        # desenvolvimento (http://localhost:5173)
yarn build      # build de produção (tsc -b && vite build)
yarn preview    # pré-visualiza o build
yarn typecheck  # checagem de tipos
```

## Atalhos

Funcionam com **Ctrl** (Windows/Linux) ou **⌘** (macOS):

| Atalho        | Ação                                            |
| ------------- | ----------------------------------------------- |
| `B`           | Abrir/fechar painel lateral                     |
| `Alt + N`     | Novo documento                                  |
| `S`           | Salvar documento                                |
| `←` / `→`     | Alternar visão (código · dividir · visualizar)  |
| `Shift + L`   | Alternar tema claro/escuro                      |
| `F`           | Tela cheia                                       |

## Arquitetura

Camadas independentes, de dentro para fora (clean architecture):

```
src/
├── domain/                 # entidades e regras puras (sem framework)
│   ├── document.ts         #   VitrineDocument, deriveTitle, upsert, limites
│   ├── view.ts             #   ViewMode (code | split | preview)
│   ├── time.ts             #   tempo relativo pt-BR
│   └── sample.ts           #   documento de boas-vindas
├── services/rendering/     # casos de uso de render (HTML / Markdown)
├── infrastructure/storage/ # adaptadores de localStorage (repositórios)
├── hooks/                  # casos de uso com estado (useDocuments, useViewMode…)
├── theme/                  # sistema Chakra (tokens, semantic tokens, motion)
├── components/             # apresentação (sidebar, topbar, editor, preview, …)
│   └── icons/              #   ícones animados Lucide + registry/handle
└── App.tsx                 # composition root: liga hooks ↔ layout
```

Os componentes são “burros” (recebem dados + callbacks); todo o estado e as regras
ficam nos hooks/domínio. A persistência é isolada atrás de repositórios.

## Persistência (`localStorage`)

| Chave             | Conteúdo                                              |
| ----------------- | ----------------------------------------------------- |
| `vitrine:docs`    | documentos recentes (máx. 40) — comprimidos (lz-string) |
| `vitrine:current` | id do documento aberto                                |
| `vitrine:view`    | modo de visão (`code` \| `split` \| `preview`)        |
| `vitrine:sidebar` | sidebar aberta (`1`) ou recolhida (`0`)               |
| `vitrine:split`   | largura do editor no modo dividir (%)                 |
| `vitrine:theme`   | tema (`light` \| `dark`) — gerido pelo next-themes    |

## Alias de importação

`@/*` aponta para `src/*` (configurado em `tsconfig.app.json` + `vite-tsconfig-paths`).
