export interface BlockAttributes {
  content?: string;
  ordered?: boolean;
  className?: string;
  textAlign?: string;
  [key: string]: unknown;
}

export interface WordPressBlock {
  __typename?: string;
  clientId: string;
  name: string;
  attributes: BlockAttributes;
  innerBlocks: WordPressBlock[];
  renderedHtml?: string;
  parentClientId?: string;
}

export interface BlockImage {
  attributes: {
    id: number;
    url: string;
    alt?: string;
    caption?: string;
    width?: number;
    height?: number;
  };
}

export interface CoreImageBlock extends WordPressBlock {
  __typename: 'CoreImage';
  attributes: {
    id: number;
    url: string;
    alt?: string;
    caption?: string;
    width?: number;
    height?: number;
  };
}

export interface CoreGalleryBlock extends WordPressBlock {
  __typename: 'CoreGallery';
  attributes: {
    columns?: number;
    align?: string;
    sizeSlug?: string;
    linkTo?: string;
  };
  innerBlocks: CoreImageBlock[];
}
