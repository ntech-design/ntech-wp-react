/**
 * Add icons to access them via WP
 * Rescource: https://react-icons.github.io/react-icons/
 */

import React from 'react';
import { IconType } from 'react-icons';

import {
  FaCheck,
  FaTimes,
  FaWikipediaW,
  FaSteam,
  FaRegFrown,
  FaRegSmile,
  FaRegTrashAlt,
  FaSyncAlt
} from 'react-icons/fa';

export type IconKey = (
  'check' |
  'times' |
  'wiki' |
  'steam' |
  'frown' |
  'smile' |
  'trash' |
  'sync'
);

export const iconMap: Record<IconKey, IconType> = {
  'check': FaCheck,
  'times': FaTimes,
  'wiki': FaWikipediaW,
  'steam': FaSteam,
  'frown': FaRegFrown,
  'smile': FaRegSmile,
  'trash': FaRegTrashAlt,
  'sync': FaSyncAlt
};

export const getIcon = (key?: string): React.ReactNode | null => {
  if (!key) return null;

  const Icon = iconMap[key as IconKey];

  if (!Icon) {
    console.warn(`Unknown icon: ${key}`);
    return null;
  }

  return <Icon />;
};
