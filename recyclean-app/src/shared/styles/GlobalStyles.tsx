import { Global, css } from "@emotion/react";

export function GlobalStyles() {
  return (
    <Global
      styles={(theme) =>
        css`
          *, *::before, *::after {
            box-sizing: border-box;
          }

          html, body, #root {
            margin: 0;
            padding: 0;
            min-height: 100%;
          }

          body {
            font-family: ${theme.typography.family};
            background-color: ${theme.colors.background};
            color: ${theme.colors.text};
            -webkit-font-smoothing: antialiased;
            line-height: 1.5;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          button {
            font-family: inherit;
          }

          ::selection {
            background: ${theme.colors.highlight};
            color: ${theme.colors.primaryContrast};
          }
        `
      }
    />
  );
}
