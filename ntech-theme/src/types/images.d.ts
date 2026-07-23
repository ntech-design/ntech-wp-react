declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  import { FunctionComponent, JSXInternal } from 'preact';

  const SVG: FunctionComponent<JSXInternal.SVGAttributes<SVGSVGElement> & { title?: string }>;
  export default SVG;
}

declare module '*.svg?url' {
  const src: string;
  export default src;
}