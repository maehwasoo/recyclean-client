import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

globalStyle('body, h1, h2, h3, h4, h5, h6, p', {
  margin: 0,
  fontWeight: 'inherit',
});

globalStyle('ul, ol', {
  listStyle: 'none',
  padding: 0,
});

globalStyle('button, input, textarea, select', {
  font: 'inherit',
  background: 'none',
  border: 'none',
});

globalStyle('img, picture, video, canvas, svg', {
  display: 'block',
  maxWidth: '100%',
});
