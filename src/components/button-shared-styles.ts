// style-sheet 모듈
import { css } from 'lit-element';

export const ButtonSharedStyles = css`
  button {
    font-size: inherit;
    vertical-align: middle;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  button:hover svg {
    fill: var(--app-primary-color);
  }
`;
