import { normalizeTemplate, parseAspectRatioValue, stripHtml, wpText } from '@/utils/template';

describe('template utilities', () => {
  it('normalizes WordPress template file names', () => {
    expect(normalizeTemplate('layout-home.php')).toBe('layout-home');
    expect(normalizeTemplate('layout-static.html')).toBe('layout-static');
    expect(normalizeTemplate()).toBe('default');
  });

  it('reads plain strings and WordPress rendered fields', () => {
    expect(wpText('Plain content')).toBe('Plain content');
    expect(wpText({ rendered: '<p>Rendered content</p>' })).toBe('<p>Rendered content</p>');
    expect(wpText({})).toBe('');
  });

  it('strips simple HTML tags', () => {
    expect(stripHtml('<p>Hello <strong>World</strong></p>')).toBe('Hello World');
  });

  it('parses supported aspect ratio formats', () => {
    expect(parseAspectRatioValue('16/9')).toBe('16 / 9');
    expect(parseAspectRatioValue('4:3')).toBe('4 / 3');
    expect(parseAspectRatioValue('is-aspect-ratio-3-2')).toBe('3 / 2');
    expect(parseAspectRatioValue('1.5')).toBe('1.5');
    expect(parseAspectRatioValue('not-a-ratio')).toBeUndefined();
  });
});
