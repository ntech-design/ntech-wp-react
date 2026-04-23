import React from 'react';
import { LayoutType } from '@/types/wordpress';
import LayoutDefault from '@/layouts/Default';
import layoutMap from '@/maps/layouts';
import DOMPurify from 'dompurify';

export function normalizeTemplate(template?: string) {
  if (!template) return 'default';

  return template
    .replace('.php', '')
    .replace('.html', '')
    .toLowerCase();
}

export function resolveLayout(template?: string): React.ComponentType<LayoutType> {
  const templateKey = normalizeTemplate(template);
  return layoutMap[templateKey] || LayoutDefault;
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, '');
}

export const wpText = (field?: { rendered?: string } | string) => {
  if (!field) return '';
  return typeof field === 'string' ? field : field.rendered || '';
};

export const safeHtml = (html?: { rendered?: string } | string) => ({
  __html: DOMPurify.sanitize(wpText(html) || '')
});
