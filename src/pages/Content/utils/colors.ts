import { RGBColor } from 'react-color';

// eslint-disable-next-line import/prefer-default-export
export function rgbToString(c: RGBColor) {
  return `rgba(${c.r},${c.g},${c.b},${c.a})`;
}
