export interface InfoType {
  generalSettings: {
    title: string;
    description: string;
    url: string;
  };
}

export interface PostType {
  id: string;
  databaseId: number;
  date: string;
  slug: string;
  uri: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };

  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  editorBlocks?: [];

  postLayout?: { placement?: 'header' | 'content' | 'sidebar' };
}

export interface PageType {
  id: number;
  date: string;
  slug: string;

  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  wpTemplate?: string;
}

export interface LayoutType {
  page: PageType;
  headerPosts: PostType[];
  contentPosts: PostType[];
  sidebarPosts: PostType[];
  loading: boolean;
}

export interface PageWithPostsDataType {
  page: PageType | null;
  posts: {
    nodes: PostType[];
  };
}
