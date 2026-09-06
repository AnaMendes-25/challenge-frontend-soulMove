import fotoAlexandre from '../assets/integrantes/alexandre-teixeira-profissional.png';
import fotoAna from '../assets/integrantes/ana-mendes-profissional.png';
//import fotoEnzo from '#';
import fotoGustavo from '../assets/integrantes/gustavo-borba-profissional.png';
import fotoOto from '../assets/integrantes/oto-mendes-profissional.png';
import fotoEnzo from '../assets/integrantes/enzo-negrao-profissional.png';


export type IntegranteCardProps = {
  nome: string;
  rm: string;
  skills: string;
  fotoUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
};

export const listaIntegrantes: IntegranteCardProps[] = [
  {
    nome: 'Alexandre Teixeira',
    rm: 'RM572658',
    skills: 'Python · AI & Chatbot',
    fotoUrl: fotoAlexandre,
    githubUrl: 'https://github.com/AlexandreTeixeiraS',
    linkedinUrl: 'https://www.linkedin.com/in/alexandre-teixeira-dos-santos-35a579403/',
  },
  {
    nome: 'Ana Mendes',
    rm: 'RM571692',
    skills: 'Front-End · Python',
    fotoUrl: fotoAna,
    githubUrl: 'https://github.com/AnaMendes-25',
    linkedinUrl: 'https://www.linkedin.com/in/ana-mendes-65b95839a',
  },
  {
    nome: 'Enzo Negrão Freitas',
    rm: 'RM568857',
    skills: 'Banco de Dados · Java',
    fotoUrl: fotoEnzo,
    githubUrl: 'https://github.com/Enzo-N-Freitas',
    linkedinUrl: 'https://www.linkedin.com/in/enzo-negrão-freitas-1b24a3348?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  {
    nome: 'Gustavo Borba',
    rm: 'RM559202',
    skills: 'Java · Front-End',
    fotoUrl:fotoGustavo,
    githubUrl: 'https://github.com/BorbaGustavo',
    linkedinUrl: 'https://www.linkedin.com/in/borbagustavo/',
  },
  {
    nome: 'Oto Mendes',
    rm: 'RM571625',
    skills: 'Business · AI & Chatbot',
    fotoUrl:fotoOto,
    githubUrl: 'https://github.com/otomendes',
    linkedinUrl: 'https://www.linkedin.com/in/otomendes/',
  },
];