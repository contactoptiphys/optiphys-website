// Design tokens extracted from Stitch design

// WhatsApp configuration
export const whatsappNumber = '917842363232'
export const whatsappMessage = 'Hello OptiPhys, I would like to know more about your automation services.'

export const colors = {
  // Core colors
  background: '#111318',
  surface: '#111318',
  surfaceVariant: '#33353a',
  surfaceContainerLow: '#1a1b21',
  surfaceContainer: '#1e2025',
  surfaceContainerHigh: '#282a2f',
  surfaceContainerHighest: '#33353a',
  surfaceDim: '#111318',
  surfaceBright: '#37393f',
  surfaceTint: '#adc6ff',
  'on-background': '#e2e2e9',
  'on-surface': '#e2e2e9',
  'on-surface-variant': '#c2c6d6',
  'on-secondary': '#263143',
  'on-primary': '#002e6a',

  // Accent colors
  'accent-blue': '#3B82F6',
  primary: '#adc6ff',
  'primary-container': '#4d8eff',
  'primary-fixed': '#d8e2ff',
  'primary-fixed-dim': '#adc6ff',
  'primary-fixed-variant': '#004395',
  'on-primary-fixed': '#001a42',
  'on-primary-fixed-variant': '#004395',

  // Tertiary
  tertiary: '#a4c9ff',
  'tertiary-container': '#4c93e7',
  'tertiary-fixed': '#d4e3ff',
  'tertiary-fixed-dim': '#a4c9ff',
  'on-tertiary': '#00315d',
  'on-tertiary-container': '#002a51',
  'on-tertiary-fixed': '#001c39',
  'on-tertiary-fixed-variant': '#004883',

  // Secondary
  secondary: '#bcc7de',
  'secondary-container': '#3e495d',
  'secondary-fixed': '#d8e3fb',
  'secondary-fixed-dim': '#bcc7de',
  'on-secondary-container': '#aeb9d0',

  // Semantic
  error: '#ffb4ab',
  'error-container': '#93000a',
  'on-error': '#690005',
  'on-error-container': '#ffdad6',

  // Others
  outline: '#8c909f',
  'outline-variant': '#424754',
  'inverse-surface': '#e2e2e9',
  'inverse-on-surface': '#2e3036',
  'inverse-primary': '#005ac2',

  // Surface variants
  'surface-container-lowest': '#0c0e13',
};

export const fontFamilies = {
  headline: 'Sora, sans-serif',
  body: 'Inter, sans-serif',
  label: 'Inter, sans-serif',
  code: 'Inter, sans-serif',
};

export const fontSizes = {
  'headline-xl': ['48px', '1.2', '-0.02em', '700'],
  'headline-lg': ['32px', '1.3', '-0.01em', '600'],
  'headline-md': ['24px', '1.4', '600'],
  'body-lg': ['18px', '1.6', '400'],
  'body-md': ['16px', '1.6', '400'],
  'label-sm': ['14px', '1.2', '0.05em', '500'],
  'code-sm': ['13px', '1.5', '400'],
};

export const spacing = {
  gutter: '24px',
  'stack-sm': '8px',
  'stack-md': '16px',
  'stack-lg': '32px',
  'margin-mobile': '20px',
  'margin-desktop': '48px',
  containerMax: '1280px',
  unit: '8px',
};

export const borderRadius = {
  DEFAULT: '0.25rem',
  lg: '0.5rem',
  xl: '0.75rem',
  full: '9999px',
};

export const animations = {
  spin: 'spin 10s linear infinite',
  'spin-slow': 'spin 20s linear infinite',
  float: 'float 3s ease-in-out infinite',
};

export const zIndices = {
  'dropdown': '1000',
  sticky: '1020',
 fixed: '1030',
 modal: '1040',
 popover: '1050',
 tooltip: '1060',
};