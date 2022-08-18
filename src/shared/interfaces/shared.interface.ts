export interface Translation {
  [key: string]: {
    name: string;
  };
}

export interface TranslationPage {
  [key: string]: {
    title: string;
    content: string;
  };
}

export interface ParamsId {
  id: string;
}
