import { createGlobalTheme } from '@vanilla-extract/css';

export const colorVars = createGlobalTheme(':root', {
  color: {
    gray000: '#ffffff',
    gray100: '#f5f7fa',
    gray999: '#1f2933',
    accent: '#14b8a6',
    border: '#d1d9e0',
    highlight: '#22c55e',
  },
});
