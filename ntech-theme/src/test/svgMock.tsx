import React from 'react';

export default function SvgMock(props: React.SVGProps<SVGSVGElement>) {
  return <svg data-testid="svg-icon" {...props} />;
}
