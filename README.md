# 🌱 SoulMove 

## 📖 Sobre o Projeto

O **SoulMove** é uma aplicação web desenvolvida para incentivar hábitos sustentáveis por meio de mobilidade consciente, gamificação, pontuação e recompensas.

A versão final combina uma landing page pública com uma área interna autenticada. Nela, o usuário consulta seus MOVE Points, registra ações sustentáveis, acompanha o ranking da comunidade e visualiza ou resgata recompensas disponíveis.

---

## 🖥️ Como Funciona

Na área interna, os usuários podem registrar atividades sustentáveis como:

- ♻️ Reciclagem
- 💡 Redução do consumo de energia
- 🚌 Uso de transporte público
- 🚴 Trajetos de bicicleta
- 🚶 Trajetos de caminhada

Cada registro é enviado para a API e atualiza o saldo de `pontuacaoSoul` do usuário.

Também é possível acompanhar a quantidade de ações realizadas, a posição individual no ranking e os dez usuários com maior pontuação.

---

## 🏆 Sistema de Recompensas

Os MOVE Points podem ser utilizados para resgatar recompensas cadastradas pela API.

O catálogo é carregado por `GET /recompensas`, e cada item informa sua descrição, seu identificador e seu valor em pontos. O resgate usa `POST /recompensas/resgatar`. O fluxo atual inclui confirmação, validação do saldo, atualização do saldo após o resgate e aviso visual de que a experiência de desconto ainda é um protótipo.

---

## 🎯 Objetivo do Projeto

O principal objetivo do **SoulMove** é incentivar hábitos saudáveis e sustentáveis por meio da tecnologia e da gamificação.

A plataforma busca transformar pequenas ações do cotidiano em impactos positivos reais, promovendo:

- Consciência ambiental
- Mobilidade sustentável
- Engajamento social
- Incentivo à participação contínua
- Adoção de hábitos mais sustentáveis

---

## ⚙️ Funcionalidades

- Registro de atividades sustentáveis
- Envio de evidências das atividades
- Sistema de pontuação
- Ranking global
- Validação de ações
- Sistema de recompensas
- Ranking individual e Top 10 da comunidade
- Cadastro e login
- Interface responsiva

---

## 🌍 Proposta do SoulMove

A ideia do SoulMove surgiu com o objetivo de expandir a proposta da plataforma SoulUp, criando uma área dedicada especificamente para ações sustentáveis realizadas pelos usuários.

A solução permite que os usuários:

- Registrem atividades sustentáveis
- Compartilhem evidências por meio de imagens
- Acumulem pontos
- Conquistem recompensas
- Acompanhem sua posição no ranking

O projeto utiliza elementos de gamificação para aumentar o engajamento e incentivar atitudes sustentáveis no dia a dia.

---

## 📁 Estrutura do Projeto

A aplicação está organizada em uma estrutura atual com a pasta principal do app em `soul-move-app`, contendo os arquivos e pastas do frontend, além dos assets visuais e da configuração do Vite.

```bash
challenge-frontend-soulMove/
├── README.md
├── soul-move-app/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── eslint.config.js
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── router.tsx
│   │   ├── assets/
│   │   │   ├── banners/
│   │   │   ├── favicon/
│   │   │   ├── icones/
│   │   │   ├── integrantes/
│   │   │   ├── logo/
│   │   │   └── markdown-img/
│   │   ├── components/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── data/
│   │   ├── types/
│   │   └── utils/
│   └── public/ (quando necessário)
└── ...
```

A estrutura atual reflete o estado real do projeto, com páginas, componentes e assets organizados dentro da aplicação frontend.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:

- **React 19** — construção da interface e dos componentes
- **TypeScript** — tipagem estática e maior segurança no desenvolvimento
- **Vite** — ferramenta de build e ambiente de desenvolvimento rápido
- **React Router (v8)** — roteamento e navegação entre páginas
- **Tailwind CSS (v4)** — estilização moderna e responsiva da interface
- **React Hook Form & Zod** — gerenciamento e validação de formulários com esquemas seguros
- **React Icons** — conjunto de ícones reutilizáveis para a interface
- **API Moondream** — integração de visão computacional e inteligência artificial para análise visual de imagens e validações.
- **Render** — hospedagem e implantação do serviço de backend em spring boot.
- **ESLint** — análise estática para padronização e qualidade do código
- **Git e GitHub** — versionamento de código e fluxo de trabalho colaborativo

### Referência visual

- [Figma — SoulMove H2](https://www.figma.com/design/Vl2qsDRX2mpbC8IruAYc5p/SoulMove-H2?node-id=2190-4861)

---

## ▶️ Como Usar

### Links da entrega

- API SoulMove: [RENDER](https://soulmove-api-springboot.onrender.com)

- Repositório: [github.com/AnaMendes-25/challenge-frontend-soulMove](https://github.com/AnaMendes-25/challenge-frontend-soulMove)
- Vídeo de apresentação: [YouTube](https://www.youtube.com/watch?v=6yTrXKErPHQ)
- Aplicação publicada na Vercel: [Deploy-Frontend](https://challenge-frontend-soul-move.vercel.app/)


### Executar localmente

Para rodar o projeto em sua máquina, siga os passos abaixo:

1. Clone o repositório

```bash
git clone https://github.com/AnaMendes-25/challenge-frontend-soulMove.git
```

2. Acesse a pasta do projeto

```bash
cd challenge-frontend-soulMove/soul-move-app
```

3. Instale as dependências

```bash
npm install
```

4. Configure as variáveis de ambiente

Crie `soul-move-app/.env` a partir do exemplo:

```bash
copy .env.example .env
```

Preencha a URL pública da API sem adicionar tokens ou senhas ao repositório:

```env
VITE_API_SOULMOVE_URL=https://soulmove-api-springboot.onrender.com
```

`VITE_MOONDREAM_API_KEY` é opcional para a funcionalidade que utiliza o serviço Moondream. Nunca publique uma chave real; use uma variável local. 

5. Execute o projeto

```bash
npm run dev
```

6. Acesse a aplicação

```bash
http://localhost:5173/
```

### Scripts disponíveis

Executar dentro de `soul-move-app/`:

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento Vite |
| `npm run build` | Executa o type-check e gera a build de produção |
| `npm run lint` | Executa o ESLint |
| `npm run preview` | Serve localmente a build de produção |

### Fluxo de teste

1. Abra a landing page e use **Login** ou **Cadastre-se**.
2. Para testar com dados reais, use uma conta autorizada pelo responsável pela API; não inclua credenciais no README, no `.env.example` ou em commits.
3. Após o login, a aplicação guarda somente o `usuarioId` retornado pela API no `localStorage`.
4. A área interna consulta a API para carregar o usuário, o histórico de atividades, o ranking e as recompensas.
5. Em **Registrar ações**, escolha uma atividade, envie a comprovação solicitada e conclua o registro.
6. Em **Métricas**, consulte os pontos, o total de ações, o ranking e o catálogo de recompensas.

### Limitações atuais

- A aplicação depende da disponibilidade e da URL configurada da API remota.
- O contrato atual do ranking não fornece cidade; por isso, a lista exibe posição, nome, foto quando disponível e pontuação.
- O catálogo de recompensas fornece apenas `id`, `descricao` e `valor`; os cards usam um ícone genérico.
- O desconto associado ao resgate ainda é uma experiência de protótipo.
- Não há credenciais de teste públicas neste repositório.

---

## 🖼️ Imagens e Ícones do Projeto

Os recursos visuais do SoulMove estão armazenados na pasta `src/assets`, organizados por categoria:

- `banners/` — imagens destacadas da home e de campanhas
- `favicon/` — ícone do site e manifest
- `icones/` — ícones de interface
- `integrantes/` — fotos dos integrantes do grupo
- `logo/` — logo do projeto
- `markdown-img/` — imagens utilizadas em conteúdos e documentação

Esses ativos são utilizados diretamente pelos componentes e rotas da aplicação para manter a identidade visual do projeto.

---

## 🔗 Nosso projeto

O código-fonte do projeto está disponível no GitHub.

- Repositório oficial: [github.com/AnaMendes-25/challenge-frontend-soulMove](https://github.com/AnaMendes-25/challenge-frontend-soulMove)
- Link apresentando solução:  [YouTube](https://www.youtube.com/watch?v=6yTrXKErPHQ)

---

## 📚 Projeto Acadêmico

Projeto desenvolvido como parte das atividades acadêmicas do curso de Tecnologia em Análise e Desenvolvimento de Sistemas.

O SoulMove tem como objetivo aplicar na prática conhecimentos relacionados a:

- Desenvolvimento Front-end
- React
- Componentização
- Responsividade
- Git e GitHub
- Design de interfaces
- Experiência do usuário
- Desenvolvimento de produtos digitais

---

## 👥 Contatos do Grupo

A seguir, os membros que participaram do desenvolvimento do SoulMove:

<table width="100%" border="1" cellpadding="12" cellspacing="0" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr>
      <th align="left" width="180">Foto</th>
      <th align="left">Integrante</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center" valign="middle"><img src="./soul-move-app/src/assets/integrantes/alexandre-teixeira-profissional.png" width="120px" alt="Foto do integrante Alexandre Teixeira"></td>
      <td valign="middle"><strong>Alexandre Teixeira</strong><br>RM: RM572658<br>Turma: 1TDSPO<br><span style="display:inline-flex; align-items:center; gap:8px;"><a href="https://github.com/AlexandreTeixeiraS" target="_blank"><img src="https://github.githubassets.com/favicons/favicon.svg" width="20" height="20" alt="GitHub Alexandre Teixeira" style="vertical-align:middle;"></a><a href="https://www.linkedin.com/in/alexandre-teixeira-dos-santos-35a579403" target="_blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="20" height="20" alt="LinkedIn Alexandre Teixeira" style="vertical-align:middle;"></a></span></td>
    </tr>
    <tr>
      <td align="center" valign="middle"><img src="./soul-move-app/src/assets/integrantes/ana-mendes-profissional.png" width="120px" alt="Foto da integrante Ana Mendes"></td>
      <td valign="middle"><strong>Ana Mendes</strong><br>RM: RM571692<br>Turma: 1TDSPO<br><span style="display:inline-flex; align-items:center; gap:8px;"><a href="https://github.com/AnaMendes-25" target="_blank"><img src="https://github.githubassets.com/favicons/favicon.svg" width="20" height="20" alt="GitHub Ana Mendes" style="vertical-align:middle;"></a><a href="https://www.linkedin.com/in/ana-mendes-65b95839a" target="_blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="20" height="20" alt="LinkedIn Ana Mendes" style="vertical-align:middle;"></a></span></td>
    </tr>
    <tr>
      <td align="center" valign="middle"><img src="./soul-move-app/src/assets/integrantes/enzo-negrao-profissional.png" width="120px" alt="Foto do integrante Enzo Negrão Freitas"></td>
      <td valign="middle"><strong>Enzo Negrão Freitas</strong><br>RM: RM568857<br>Turma: 1TDSPO<br><span style="display:inline-flex; align-items:center; gap:8px;"><a href="https://github.com/Enzo-N-Freitas" target="_blank"><img src="https://github.githubassets.com/favicons/favicon.svg" width="20" height="20" alt="GitHub Enzo Negrão Freitas" style="vertical-align:middle;"></a><a href="https://www.linkedin.com/in/enzo-negrão-freitas-1b24a3348" target="_blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="20" height="20" alt="LinkedIn Enzo Negrão Freitas" style="vertical-align:middle;"></a></span></td>
    </tr>
    <tr>
      <td align="center" valign="middle"><img src="./soul-move-app/src/assets/integrantes/gustavo-borba-profissional.png" width="120px" alt="Foto do integrante Gustavo Borba"></td>
      <td valign="middle"><strong>Gustavo Borba</strong><br>RM: RM559202<br>Turma: 1TDSPO<br><span style="display:inline-flex; align-items:center; gap:8px;"><a href="https://github.com/BorbaGustavo" target="_blank"><img src="https://github.githubassets.com/favicons/favicon.svg" width="20" height="20" alt="GitHub Gustavo Borba" style="vertical-align:middle;"></a><a href="https://www.linkedin.com/in/borbagustavo" target="_blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="20" height="20" alt="LinkedIn Gustavo Borba" style="vertical-align:middle;"></a></span></td>
    </tr>
    <tr>
      <td align="center" valign="middle"><img src="./soul-move-app/src/assets/integrantes/oto-mendes-profissional.png" width="120px" alt="Foto do integrante Oto Mendes"></td>
      <td valign="middle"><strong>Oto Mendes</strong><br>RM: RM571625<br>Turma: 1TDSPO<br><span style="display:inline-flex; align-items:center; gap:8px;"><a href="https://github.com/otomendes" target="_blank"><img src="https://github.githubassets.com/favicons/favicon.svg" width="20" height="20" alt="GitHub Oto Mendes" style="vertical-align:middle;"></a><a href="https://www.linkedin.com/in/otomendes" target="_blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="20" height="20" alt="LinkedIn Oto Mendes" style="vertical-align:middle;"></a></span></td>
    </tr>
  </tbody>
</table>
