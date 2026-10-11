# Evena — Manual da marca

Manual interativo da identidade do Evena, desenvolvido em Angular 21. O projeto reúne conceito, propósito e posicionamento, tom de voz, identidade visual, aplicações demonstrativas e recursos para download.

## Executar localmente

Requisitos: Node.js 22.12 ou superior e npm.

```bash
npm ci
npm start
```

Abra http://localhost:4200. Não é necessário banco de dados nem API para executar o manual.

## Seções do manual

- **Conceito:** propósito, valores, públicos, posicionamento, manifesto e hierarquia da assinatura verbal.
- **Vibe:** voz, personalidade, energia e exemplos de comunicação.
- **Estética:** cores principais e de apoio, cores específicas do aplicativo, contraste, tipografia, símbolo e logotipo.
- **Aplicações:** modelos demonstrativos de cartaz, post, story, ingresso e card, com exportação em SVG e PNG.
- **Recursos:** kit, paleta em CSS e JSON, guia de voz, checklist e versão de leitura para imprimir.

A assinatura principal é **“Viver é melhor ao vivo!”**. As outras frases são linhas de apoio para campanhas e peças específicas.

## Arquivos e identidade

Os materiais públicos ficam em `public/`. As imagens, fontes e logos usados pelo manual são carregados de `public/assets`; os modelos para baixar ficam em `public/downloads`.

A pasta `src/assets` e a animação herdada do Dropbox foram removidas por não serem usadas pelo build atual. Fredoka é usada na interface do manual; Poppins, Lato e Comfortaa têm as funções descritas no capítulo de tipografia. A Ganker-Storm permanece como recurso expressivo do manual.

## Build e testes

```bash
npm run build
npm test -- --watch=false
```

A saída de produção fica em `dist/manual-marca-evena/browser`. A hospedagem precisa redirecionar rotas para `index.html`; o projeto mantém a configuração da Vercel.

## Estrutura

- `src/app/shared`: navegação, dados de marca, ícones e serviços.
- `src/app/pages/home`: entrada do manual.
- `src/app/pages/concept`: conceito, propósito e posicionamento.
- `src/app/pages/expression`: voz, energia e personalidade.
- `src/app/pages/identity`: cores, tipografia, símbolo e logotipo.
- `src/app/pages/applications`: estúdio de aplicações e exportação.
- `src/app/pages/resources`: kit, checklist e versão de leitura.
- `public/downloads`: PDF e recursos prontos para baixar.
