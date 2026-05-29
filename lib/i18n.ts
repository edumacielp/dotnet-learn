import type { I18nContent } from '@/types';

export const translations: Record<string, I18nContent> = {
  en: {
    nav: {
      home: 'Home',
      topics: 'Topics',
    },
    home: {
      tagline: 'The .NET Developer\'s Field Guide',
      subtitle: 'No fluff. No filler. Just sharp, practical knowledge for developers who mean business.',
      explore: 'Explore topic',
      comingSoon: 'Coming soon',
      linkedin: {
        label: 'Latest update',
        title: 'LinkedIn Post',
        description: 'Read the post where I shared this .NET learning project! Please, feel free to contribute or share your feedback.',
        quote: 'Hi LinkedIn! During my career as a developer, I\'ve often needed to revisit topics to refresh my memory...',
        cta: 'See the post',
      },
    },
    topic: {
      tableOfContents: 'On this page',
      quiz: 'Test yourself',
      quizTitle: 'Knowledge Check',
      quizSubtitle: 'Reinforce what you\'ve learned with a quick quiz.',
      checkAnswer: 'Check answer',
      correct: 'Correct!',
      incorrect: 'Not quite.',
      nextQuestion: 'Next question',
      score: 'Score',
      retake: 'Retake quiz',
    },
    interactive: {
      portMapper: {
        title: 'Port Mapping Simulator',
        subtitle: 'Understand how host ↔ container ports connect',
        host: 'Host Port',
        container: 'Container Port',
        run: 'Run container',
        result: 'Result',
      },
      imageContainer: {
        title: 'Image vs Container',
        subtitle: 'Click the image to spawn containers from it',
      },
    },
  },
  'pt-br': {
    nav: {
      home: 'Início',
      topics: 'Tópicos',
    },
    home: {
      tagline: 'O Guia de Campo do Desenvolvedor .NET',
      subtitle: 'Sem enrolação. Só conhecimento prático e afiado para devs que levam a sério.',
      explore: 'Explorar tópico',
      comingSoon: 'Em breve',
      linkedin: {
        label: 'Latest update',
        title: 'Post no LinkedIn',
        description: 'Veja o post onde compartilhei este projeto .NET! Por favor, sinta-se à vontade para contribuir ou compartilhar seu feedback.',
        quote: 'Olá LinkedIn! Durante minha carreira como desenvolvedor, muitas vezes precisei voltar a estudar tópicos para refrescar a memória...',
        cta: 'Ver o post',
      },
    },
    topic: {
      tableOfContents: 'Nesta página',
      quiz: 'Teste-se',
      quizTitle: 'Verificação de Conhecimento',
      quizSubtitle: 'Reforce o que aprendeu com um quiz rápido.',
      checkAnswer: 'Verificar resposta',
      correct: 'Correto!',
      incorrect: 'Não exatamente.',
      nextQuestion: 'Próxima pergunta',
      score: 'Pontuação',
      retake: 'Refazer quiz',
    },
    interactive: {
      portMapper: {
        title: 'Simulador de Mapeamento de Portas',
        subtitle: 'Entenda como as portas host ↔ container se conectam',
        host: 'Porta do Host',
        container: 'Porta do Container',
        run: 'Executar container',
        result: 'Resultado',
      },
      imageContainer: {
        title: 'Imagem vs Container',
        subtitle: 'Clique na imagem para criar containers a partir dela',
      },
    },
  },
};

export function getTranslation(lang: string): I18nContent {
  return translations[lang] ?? translations.en;
}
