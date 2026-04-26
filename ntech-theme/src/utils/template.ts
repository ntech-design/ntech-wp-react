import React from 'react';
import { LayoutType } from '@/types/wordpress';
import LayoutDefault from '@/layouts/Default';
import layoutMap from '@/maps/layouts';
import DOMPurify from 'dompurify';
import type { Config } from 'dompurify';

export function normalizeTemplate(template?: string) {
  if (!template) return 'default';
  return template.replace('.php', '').replace('.html', '').toLowerCase();
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

export const safeHtml = (
  html?: { rendered?: string } | string,
  options: Config & {
    ADD_ATTR?: string[];
    ADD_TAGS?: string[];
    usePersistentImages?: boolean;
  } = {}
) => {
  const rawHtml = wpText(html);
  if (!rawHtml) return { __html: '' };

  let sanitized = DOMPurify.sanitize(rawHtml, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ['target', 'rel', ...(options.ADD_ATTR ?? [])],
    ADD_TAGS: options.ADD_TAGS ?? [],
    ...(options.ALLOWED_TAGS !== undefined && { ALLOWED_TAGS: options.ALLOWED_TAGS }),
    ...(options.ALLOWED_ATTR !== undefined && { ALLOWED_ATTR: options.ALLOWED_ATTR }),
    ...(options.FORBID_ATTR !== undefined && { FORBID_ATTR: options.FORBID_ATTR }),
    ...(options.FORBID_TAGS !== undefined && { FORBID_TAGS: options.FORBID_TAGS }),
    ...options,
  });

  return { __html: sanitized };
};

export const parseAspectRatioValue = (value?: string | null) => {
  if (!value) return undefined;

  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return undefined;

  const normalized = trimmed.replace(/\s+/g, '');
  if (/^\d+(\.\d+)?$/.test(normalized)) return normalized;

  const directMatch = normalized.match(/^(\d+(?:\.\d+)?)[/:](\d+(?:\.\d+)?)$/);
  if (directMatch) return `${directMatch[1]} / ${directMatch[2]}`;

  const classMatch = trimmed.match(/(?:^|\s)(?:is-)?aspect(?:-ratio)?-(\d+)-(\d+)(?:\s|$)/);
  if (classMatch) return `${classMatch[1]} / ${classMatch[2]}`;

  return undefined;
}
