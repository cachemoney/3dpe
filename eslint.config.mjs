import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/prop-types': 'warn',
      'react/no-unknown-property': ['error', { ignore: ['attach', 'args', 'matcap', 'distance', 'intensity', 'position', 'rotation', 'scale', 'transparent', 'lineWidth', 'depthTest', 'dashArray', 'dashRatio'] }], // React Three Fiber props
      'react-hooks/purity': 'warn', // Allow intentional randomness in useMemo for visual effects
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  prettier,
  {
    ignores: [
      'node_modules/',
      'build/',
      'dist/',
      'coverage/',
      '*.config.js',
      'eslint.config.mjs',
    ],
  },
];
