import type { FaqSection } from "../types/FaqTypes";

export const faqData: FaqSection[] = [
  {
    id: 1,
    title: "Sobre o Soul Move",
    items: [
      { 
        id: "1", 
        number: "01", 
        question: "O que é o Soul Move?", 
        answer: "O Soul Move e um programa de pontos sustentaveis da SoulUp. Ele transforma acoes como reciclagem, transporte publico, trajetos de bike, caminhadas e economia de energia em pontos, ranking e recompensas."
      },
      { 
        id: "2", 
        number: "02", 
        question: "Como funciona o programa de pontos?", 
        answer: "O usuario escolhe uma acao sustentavel, envia uma comprovacao simples e recebe pontos de acordo com a categoria da acao. Esses pontos ajudam a subir no ranking e participar de missoes e recompensas."
      },
      { 
        id: "3", 
        number: "03", 
        question: "Quais ações sustentáveis geram pontos?", 
        answer: "O usuario escolhe uma acao sustentavel, envia uma comprovacao simples e recebe pontos de acordo com a categoria da acao. Esses pontos ajudam a subir no ranking e participar de missoes e recompensas."
      }
    ]
  },
  // Agora você consegue adicionar a próxima seção facilmente:
  {
    id: 2,
    title: "Sobre pontuação",
    items: [
      { 
        id: "4", 
        number: "01", 
        question: "Como as ações são pontuadas?", 
        answer: "Cada ação possui uma pontuação base definida pelo impacto ambiental e pela facilidade de comprovação. Transporte público, reciclagem e bike podem valer 30 pontos; caminhada pode valer 20 pontos; economia de energia pode valer 40 pontos."
      },
        {
          id: "5",
          number: "02",
          question: "Posso fazer a mesma ação mais de uma vez?",
          answer: "Sim. O Soul Move incentiva a recorrência de bons hábitos, mas pode aplicar limites por categoria para manter a pontuação justa e evitar abusos."
        },
        {
          id: "6",
          number: "03",
          question: "O que são missões semanais?",
          answer: "Missões semanais são desafios temporários que incentivam a repetição de ações sustentáveis, como reciclar durante a semana ou usar transporte público mais de uma vez."
        }
    ]
  },
    {
      id: 3,
      title: "Sobre comprovação",
      items: [
        {
          id: "7",
          number: "01",
          question: "Como comprovar uma ação sustentável?",
          answer: "O Soul Move usa comprovação leve. Dependendo da ação, o usuário pode enviar foto, print de aplicativo, registro por GPS, bilhete de transporte ou comparação de consumo de energia."
        },
        {
          id: "8",
          number: "02",
          question: "Como comprovar reciclagem?",    
          answer: "Para reciclagem, o usuário pode enviar uma foto do ponto de coleta, do material separado ou de um comprovante simples. Isso também vale para descarte correto de pilhas e baterias."
        },
        {
            id: "9",
            number: "03",
            question: "Como comprovar uso de transporte público?",
            answer: "O usuário pode usar foto ou print de bilhete, cartão, app de transporte ou comprovante de recarga."
        },
        {
            id: "10",
            number: "04",
            question: "Como comprovar uso de transporte público?",
            answer: "O usuário pode usar foto ou print de bilhete, cartão, app de transporte ou comprovante de recarga."
        },
        {
            id: "11",
            number: "05",
            question: "Qual é a distância mínima de bike?",  
            answer: "Trajetos de bike pontuam a partir de 3 km. A comprovação pode ser feita por GPS automático, print de app de rota ou foto no destino."
        },
        {
            id: "12",
            number: "06",
            question: "Qual é a distância mínima a pé?",
            answer: "Trajetos a pé pontuam a partir de 2 km. A comprovação pode ser feita por GPS automático, print de app de atividade ou foto no destino."
        },
        {
            id: "13",
            number: "07",
            question: "Como comprovar economia de energia?",
            answer: "Economia de energia pode ser comprovada pela comparação entre o consumo atual e o consumo anterior em kWh na conta de energia."
        }
      ]
    },
    {
      id: 4,
      title: "Sobre ranking e recompensas",
      items: [
        {
          id: "14",
          number: "01",
          question: "Como funciona o ranking?",
          answer: "O ranking organiza os usuários de acordo com a pontuação acumulada. Ele pode destacar tanto os melhores colocados em grupos quanto os melhores colocados no ranking geral."
        },
        {
            id: "15",
            number: "02",
            question: "Quais recompensas posso ganhar?",
            answer: "Os pontos podem gerar benefícios dentro do programa, como destaque no ranking, participação em missões, recompensas sustentáveis e possibilidade de subsídio ou desconto na conta de energia."
        },
        {
            id: "16",
            number: "03",
            question: "Como funciona o subsídio na conta ?",
            answer: "A proposta do Soul Move é premiar usuários com melhor desempenho sustentável. O destaque principal é a possibilidade de subsidiar total ou parcialmente a conta de energia dos melhores colocados."
        },
      ]
    },
    {
        id: 5,
        title: "Sobre participação",
        items: [
            {
                id: "17",
                number: "01",
                question: "Preciso criar uma conta para participar?",
                answer: "Sim. A conta permite registrar ações, acompanhar pontos, visualizar histórico, participar de missões e aparecer no ranking."
            },
            {
                id: "18",
                number: "02",
                question: "Como comeco a usar o Soul Move?",
                answer: "Para começar, o usuário cria uma conta, escolhe uma ação sustentável, envia uma comprovação leve e acompanha a pontuação no ranking."
            }
        ]
    }
];