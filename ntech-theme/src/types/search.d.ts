type SearchItem = {
  id: string;
  title: string;
  uri: string;
  url: string;
  type: 'post' | 'page';
  excerpt?: string;
  content?: string;
  category?: string;
  date?: string;
};

export type SearchQueryResult = {
  posts?: {
    nodes: SearchResultItem[];
  };
  pages?: {
    nodes: SearchResultItem[];
  };
};

export type CategoryNode = {
  name: string;
  slug?: string;
};