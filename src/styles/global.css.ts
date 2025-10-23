import { createGlobalTheme, globalStyle } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokens/color.css';
import { fontVars } from '@styles/tokens/font.css';

import '@styles/reset.css.ts';
import '@styles/fontFace.css.ts';

export const layoutVars = createGlobalTheme(':root', {
  minWidth: '360px',
  maxWidth: '440px',
  height: '100dvh',
});

globalStyle('#root', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

globalStyle('html', {
  height: '100%',
  scrollbarWidth: 'none',
  backgroundColor: colorVars.color.gray100,
});

globalStyle('html::-webkit-scrollbar', {
  display: 'none',
});

globalStyle('body', {
  fontFamily: fontVars.family.pretendard,
  color: colorVars.color.gray999,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  overflowWrap: 'break-word',
  minHeight: layoutVars.height,
  minWidth: layoutVars.minWidth,
  maxWidth: layoutVars.maxWidth,
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: colorVars.color.gray000,
  boxShadow: 'none',
  scrollBehavior: 'smooth',
  scrollbarWidth: 'none',
  transition: 'box-shadow 0.3s ease',
  touchAction: 'manipulation',
  '@media': {
    '(min-width: 440px)': {
      boxShadow: '0px 32px 84px rgba(16, 18, 24, 0.22)',
    },
  },
});

globalStyle('body::-webkit-scrollbar', {
  display: 'none',
});

globalStyle('img', {
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  WebkitTouchCallout: 'none',
  WebkitTapHighlightColor: 'transparent',
});

globalStyle('a, button, input, textarea, select, div[onclick], div[role="button"], [tabindex]', {
  WebkitTapHighlightColor: 'transparent',
});

globalStyle('*', {
  touchAction: 'manipulation',
});
