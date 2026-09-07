# Manual da marca Evena

Manual interativo em Angular com Conceito, Propósito, Posicionamento, Vibe e Estética.

## Abrir no computador

Na pasta do projeto:

```bash
npm ci
npm start
```

Abra http://localhost:4200. Alterações nos arquivos são refletidas no navegador enquanto o servidor estiver em execução.

## Gerar a versão de produção

```bash
npm run build
```

Os arquivos públicos ficam em `dist/manual-marca-evena/browser`. Essa é a pasta de saída a configurar na hospedagem. O arquivo `vercel.json` mantém o redirecionamento necessário às páginas internas da aplicação.

Para verificar os testes existentes:

```bash
npm test -- --watch=false
```

Um commit local não atualiza o site publicado. Envie as alterações à branch usada pela hospedagem e acompanhe o resultado do deploy.

## O que esta revisão inclui

- Revisões anteriores incorporadas ao estado do repositório enviado no ZIP.
- Cabeçalho com a coroa colorida e o logotipo oficial, preservando os PNGs originais.
- Cards roxos com texto branco; verde com texto preto na interação.
- Conceito com valores interativos e acesso direto ao manifesto.
- Posicionamento com públicos, diferenciais da plataforma e manifesto expansível com cópia.
- Cores com descrições voltadas a eventos, cópia de HEX/RGB e a paleta principal do documento mais recente.
- Poppins como fonte principal, Lato e Comfortaa como secundárias. Fredoka permanece na interface dos cards.
- Galeria com uma única coroa branca, as demais variações e o logotipo.
- Navegação interna em Estética e redirecionamento de endereços antigos.

## Fontes e arquivos originais

Poppins e Lato são carregadas pelo stylesheet oficial do Google Fonts, reduzindo o peso versionado do projeto. Comfortaa e Fredoka continuam usando os arquivos já existentes no repositório.

**Ganker-Storm:** foi fornecida uma cópia demo cujo `Read Me.txt` limita o uso a fins pessoais. Por isso, os arquivos TTF/OTF não são incorporados nem redistribuídos neste repositório público. O laboratório aceita um arquivo TTF, OTF, WOFF ou WOFF2 para prévia local, sem envio a um servidor. Para publicar a Ganker-Storm na identidade da Evena, use uma cópia coberta por licença comercial/web apropriada. [Fonte do estúdio responsável](https://cikareotype.com/product/ganker-storm-wild-graffiti-font/).

A coroa colorida reutiliza `public/evena-logo.svg`; as versões verde e branca reutilizam os arquivos já existentes. O novo logotipo usado no cabeçalho fica em `public/assets/logos/logotipo-evena.webp`, otimizado para web para reduzir o peso de carregamento. O enquadramento do cabeçalho usa CSS para desconsiderar as margens transparentes do canvas; os desenhos não são distorcidos, recoloridos ou regravados.

As definições de público, diferenciais e manifesto foram desenvolvidas a partir do texto fornecido pelo responsável pela marca. As descrições de cor consideram esse texto e o contexto do [site Evena](https://www.evena.online/).

## Verificação desta revisão

- Build de produção concluído.
- 3 testes do projeto aprovados.
- 8 verificações adicionais de lógica e arquivos aprovadas: fontes, clipboard, valores, públicos, diferenciais, âncoras e integridade dos logos.
- Sem validação visual em navegador nesta sessão.
