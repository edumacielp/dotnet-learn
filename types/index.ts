export interface Topic {
  slug: string;
  title: string;
  description: string;
  icon: string;
  status: 'available' | 'coming-soon';
  color: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  content: ContentBlock[];
}

export type ContentBlock =
  | { type: 'text'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; language: string; code: string; label?: string }
  | { type: 'callout'; variant: 'info' | 'warning' | 'tip' | 'danger'; text: string }
  | { type: 'interactive'; component: string }
  | { type: 'concept-grid'; items: ConceptItem[] };

export interface ConceptItem {
  icon: string;
  title: string;
  description: string;
  color?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface I18nContent {
  nav: {
    home: string;
    topics: string;
  };
  home: {
    tagline: string;
    subtitle: string;
    explore: string;
    comingSoon: string;
  };
  topic: {
    tableOfContents: string;
    quiz: string;
    quizTitle: string;
    quizSubtitle: string;
    checkAnswer: string;
    correct: string;
    incorrect: string;
    nextQuestion: string;
    score: string;
    retake: string;
  };
  interactive: {
    portMapper: {
      title: string;
      subtitle: string;
      host: string;
      container: string;
      run: string;
      result: string;
    };
    imageContainer: {
      title: string;
      subtitle: string;
    };
  };
}
