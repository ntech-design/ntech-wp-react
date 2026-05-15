import { Theme } from '@mui/material/styles';

type BreakpointKey = keyof Theme['breakpoints']['values'];

/**
 * Creates a clamp() font-size that scales fluidly from `minSize` to `maxSize`
 * between the smallest breakpoint (xs) and a chosen breakpoint (e.g. 'lg').
 *
 * @param theme MUI theme
 * @param minSizePx minimum font size in px
 * @param maxSizePx maximum font size in px
 * @param maxBreakpoint breakpoint where scaling should stop (e.g. 'lg')
 * @param minBreakpoint optional start breakpoint (default: 'xs')
 */
export const fluidFont = (
  theme: Theme,
  minSizePx: number,
  maxSizePx: number,
  maxBreakpoint: BreakpointKey,
  minBreakpoint: BreakpointKey = 'xs'
): string => {
  const breakpoints = theme.breakpoints.values;

  const minViewportRaw = breakpoints[minBreakpoint];
  const maxViewportRaw = breakpoints[maxBreakpoint];
  const breakpointUnit = theme.breakpoints.unit ?? 'px';
  const rootFontSize = theme.typography.htmlFontSize ?? 16;

  if (minViewportRaw === undefined || maxViewportRaw === undefined) {
    throw new Error(`Invalid breakpoint(s): ${minBreakpoint} or ${maxBreakpoint}`);
  }

  if (minViewportRaw >= maxViewportRaw) {
    throw new Error(`minBreakpoint (${minBreakpoint}) must be smaller than maxBreakpoint (${maxBreakpoint})`);
  }

  const toPx = (value: number) => {
    if (breakpointUnit === 'rem') return value * rootFontSize;
    return value; // px
  };
  const minViewportPx = toPx(minViewportRaw);
  const maxViewportPx = toPx(maxViewportRaw);

  const slope = (maxSizePx - minSizePx) / (maxViewportPx - minViewportPx);
  const yAxisIntersection = minSizePx - slope * minViewportPx;

  const minRem = minSizePx / 16;
  const maxRem = maxSizePx / 16;
  const yAxisRem = yAxisIntersection / 16;

  return `clamp(${minRem}rem, ${yAxisRem}rem + ${
    slope * 100
  }vw, ${maxRem}rem)`;
};

export const humanize = (s?: string) =>
  s ? s
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
  : '';