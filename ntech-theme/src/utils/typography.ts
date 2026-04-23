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

  const minViewport = breakpoints[minBreakpoint];
  const maxViewport = breakpoints[maxBreakpoint];

  if (minViewport === undefined || maxViewport === undefined) {
    throw new Error(
      `Invalid breakpoint(s): ${minBreakpoint} or ${maxBreakpoint}`
    );
  }

  if (minViewport >= maxViewport) {
    throw new Error(
      `minBreakpoint (${minBreakpoint}) must be smaller than maxBreakpoint (${maxBreakpoint})`
    );
  }

  const slope = (maxSizePx - minSizePx) / (maxViewport - minViewport);
  const yAxisIntersection = minSizePx - slope * minViewport;

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