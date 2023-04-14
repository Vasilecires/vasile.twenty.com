const commonTheme = {
  fontSizeSmall: '0.92rem',
  fontSizeMedium: '1rem',
  fontSizeLarge: '1.08rem',

  iconSizeSmall: '0.92rem',
  iconSizeMedium: '1.08rem',
  iconSizeLarge: '1.23rem',

  spacing: (multiplicator: number) => `${multiplicator * 4}px`,
};

const lightThemeSpecific = {
  noisyBackground:
    '#fcfcfc url(data:image/png;base64,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);',
  primaryBackground: '#fff',
  secondaryBackground: '#fcfcfc',
  tertiaryBackground: '#f5f5f5',
  pinkBackground: '#ffe5f4',
  greenBackground: '#e6fff2',
  purpleBackground: '#e0e0ff',
  yellowBackground: '#fff2e7',

  primaryBorder: 'rgba(0, 0, 0, 0.08)',

  text100: '#000',
  text80: '#333',
  text60: '#666',
  text40: '#999',
  text30: '#b3b3b3',
  text20: '#ccc',
  text0: '#fff',

  blue: '#1961ed',
  pink: '#cc0078',
  green: '#1e7e50',
  purple: '#1111b7',
  yellow: '#cc660a',
};

const darkThemeSpecific = {
  noisyBackground:
    '#191919 url(data:image/png;base64,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);',
  primaryBackground: '#141414',
  secondaryBackground: '#171717',
  tertiaryBackground: '#333333',
  pinkBackground: '#cc0078',
  greenBackground: '#1e7e50',
  purpleBackground: '#1111b7',
  yellowBackground: '#cc660a',

  text100: '#ffffff',
  text80: '#ccc',
  text60: '#999',
  text40: '#666',
  text30: '#4c4c4c',
  text20: '#333',
  text0: '#000',

  blue: '#6895ec',
  pink: '#ffe5f4',
  green: '#e6fff2',
  purple: '#e0e0ff',
  yellow: '#fff2e7',
};

export const lightTheme = { ...commonTheme, ...lightThemeSpecific };
export const darkTheme = { ...commonTheme, ...darkThemeSpecific };

export type ThemeType = typeof lightTheme;
