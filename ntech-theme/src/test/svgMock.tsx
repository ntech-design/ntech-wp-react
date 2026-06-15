import JSXInternal from 'preact';

export default function SvgMock(props: JSXInternal.SVGAttributes<SVGSVGElement>) {
  return <svg data-testid="svg-icon" {...props} />;
}
