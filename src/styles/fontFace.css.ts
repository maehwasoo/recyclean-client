import { globalFontFace } from '@vanilla-extract/css';

const pretendardBaseUrl =
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static';

globalFontFace('Pretendard', {
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `url('${pretendardBaseUrl}/Pretendard-Regular.woff2') format('woff2')`,
});

globalFontFace('Pretendard', {
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `url('${pretendardBaseUrl}/Pretendard-Medium.woff2') format('woff2')`,
});

globalFontFace('Pretendard', {
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 600,
  src: `url('${pretendardBaseUrl}/Pretendard-SemiBold.woff2') format('woff2')`,
});

globalFontFace('Pretendard', {
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 700,
  src: `url('${pretendardBaseUrl}/Pretendard-Bold.woff2') format('woff2')`,
});
