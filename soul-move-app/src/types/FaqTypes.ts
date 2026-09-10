export interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export interface FaqSection {
  id: number;
  title: string;
  items: FaqItem[];
}