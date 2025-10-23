import { createGlobalTheme } from '@vanilla-extract/css';

export const fontVars = createGlobalTheme(':root', {
  family: {
    pretendard: "'Inter', 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
});
