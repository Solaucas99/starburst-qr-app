/* eslint @typescript-eslint/no-empty-interface: 'off' */

import 'styled-components';

import { darkTheme } from './theme';

export type Theme = typeof darkTheme.theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
