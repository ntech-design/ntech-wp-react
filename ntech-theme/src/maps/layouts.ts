import React from 'react';
import { LayoutType } from '@/types/wordpress';
import LayoutHome from '@/layouts/Home';
import LayoutStatic from '@/layouts/Static';
import LayoutDefault from '@/layouts/Default';

const layoutMap: Record<string, React.ComponentType<LayoutType>> = {
  'layout-home': LayoutHome,
  'layout-static': LayoutStatic,
  'layout-error': LayoutStatic,
  'front-page': LayoutHome,
  'default': LayoutDefault,
};

export default layoutMap;
