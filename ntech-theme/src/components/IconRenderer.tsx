import JSXInternal, { FunctionComponent, ComponentChildren } from 'preact';

import LinkedinIcon from '@/assets/icons/linkedin.svg';
import XingIcon from '@/assets/icons/xing.svg';
import GithubIcon from '@/assets/icons/github.svg';
import SearchIcon from '@/assets/icons/search.svg';
import ReactIcon from '@/assets/icons/react.svg';

export type IconKey = (
  'linkedin' |
  'xing' |
  'github' |
  'search' |
  'react'
  );

type IconType = {
  component: FunctionComponent<JSXInternal.SVGAttributes<SVGSVGElement>>;
  viewBox?: string;
  defaultSize?: number | string;
};

type GetIconProps = {
  size?: number | string;
  className?: string;
} & Omit<JSXInternal.SVGAttributes<SVGSVGElement>, 'key' | 'size' | 'className'>;

const iconMap: Record<IconKey, IconType> = {
  'linkedin': { component: LinkedinIcon, viewBox: '0 0 48 48' },
  'xing': { component: XingIcon, viewBox: '0 0 48 48' },
  'github': { component: GithubIcon, viewBox: '0 0 48 48' },
  'search': { component: SearchIcon },
  'react': { component: ReactIcon }
};

export const getIcon = (key?: string, { size = '1em', className = '', ...props }: GetIconProps = {}): ComponentChildren => {
  if (!key) return null;

  const Icon = iconMap[key as IconKey];
  if (!Icon?.component) {
    console.warn(`Unknown icon: ${key}`);
    return null;
  }

  return (
    <Icon.component
      className={`icon ${className}`.trim()}
      width={ size }
      height={ size }
      viewBox={ Icon.viewBox || '0 0 24 24' }
      preserveAspectRatio="xMidYMid meet"
      { ...props }
    />
  );
};
