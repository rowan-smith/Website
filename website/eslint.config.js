import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

import { oneExportPerFile } from './eslint/one-export-per-file.js';

const paddingBetweenStatements = [
  'error',
  { blankLine: 'always', prev: 'directive', next: '*' },
  { blankLine: 'any', prev: 'directive', next: 'directive' },
  { blankLine: 'always', prev: 'import', next: '*' },
  { blankLine: 'any', prev: 'import', next: 'import' },
  { blankLine: 'always', prev: '*', next: 'export' },
  { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
  { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
  { blankLine: 'always', prev: '*', next: 'return' },
  { blankLine: 'always', prev: 'block-like', next: '*' },
  { blankLine: 'always', prev: '*', next: 'block-like' },
];

export default defineConfig([
  globalIgnores(['dist']),

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    plugins: {
      react,
      'jsx-a11y': jsxA11y,
      '@stylistic': stylistic,
      'simple-import-sort': simpleImportSort,
      'react-refresh': reactRefresh,
      local: {
        rules: {
          'one-export-per-file': oneExportPerFile,
        },
      },
    },
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...jsxA11y.configs.recommended.rules,

      // React / JSX
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/self-closing-comp': 'error',
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/no-multi-comp': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'error',
        { allowConstantExport: true, allowExportNames: ['useSiteData', 'useTheme'] },
      ],

      // TypeScript
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      // Imports
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Spacing & formatting
      '@stylistic/padding-line-between-statements': paddingBetweenStatements,
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      'curly': ['error', 'all'],

      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'max-classes-per-file': ['error', 1],
      'local/one-export-per-file': [
        'error',
        {
          ignorePatterns: [
            '/index\\.tsx?$',
            '/components/ui/',
            '/context/',
          ],
        },
      ],

      // Relax noisy a11y rules for this portfolio site
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/anchor-has-content': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },

  {
    files: ['**/index.ts'],
    rules: {
      '@stylistic/padding-line-between-statements': 'off',
    },
  },
  {
    files: ['src/components/ui/**'],
    rules: {
      'react-refresh/only-export-components': 'off',
      'react/no-multi-comp': 'off',
    },
  },
]);
