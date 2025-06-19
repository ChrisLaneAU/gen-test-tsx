import path from 'path';
import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';
import _import from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

const compat = new FlatCompat({
  baseDirectory: path.resolve(),
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const OFF = 0;
const WARN = 1;
const ERROR = 2;

export default defineConfig([
  globalIgnores(['.next/']),
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
    },
    extends: compat.extends('plugin:jest/recommended', 'prettier'),
    plugins: {
      react,
      'react-hooks': fixupPluginRules(reactHooks),
      '@typescript-eslint': typescriptEslint,
      import: fixupPluginRules(_import),
      jest,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      curly: [ERROR, 'multi-line'],
      'import/first': ERROR,
      'import/newline-after-import': ERROR,
      'import/no-duplicates': ERROR,
      'jsx-quotes': ERROR,
      'no-trailing-spaces': ERROR,
      'no-undef': ERROR,
      'no-unused-expressions': ERROR,
      'object-curly-spacing': [ERROR, 'always'],
      'react-hooks/exhaustive-deps': ERROR,
      'react-hooks/rules-of-hooks': ERROR,
      'react/jsx-boolean-value': WARN,
      'react/jsx-no-undef': ERROR,
      'react/jsx-uses-react': ERROR,
      'react/jsx-uses-vars': ERROR,
      'react/jsx-wrap-multilines': WARN,
      'react/no-did-mount-set-state': WARN,
      'react/no-did-update-set-state': WARN,
      'react/no-unescaped-entities': OFF,
      'react/no-unknown-property': WARN,
      'react/react-in-jsx-scope': OFF,
      'react/self-closing-comp': WARN,
      'react/sort-prop-types': WARN,
      semi: ERROR,
      strict: OFF,
      'no-restricted-syntax': ERROR,
      'react/no-unknown-property': OFF,
      'import/order': [
        ERROR,
        {
          pathGroups: [
            {
              pattern: '@/**',
              group: 'external',
              position: 'after',
            },
          ],
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        ERROR,
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          vars: 'all',
        },
      ],
      quotes: [
        ERROR,
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'import/no-unresolved': OFF,
      'no-undef': OFF,
    },
  },
  {
    files: [
      '**/__tests__/**/*',
      '**/*stories.*',
      '**/*test.*',
      '**/build/**/*',
      '**/test-fixtures.*',
      '**/tests/**/*',
    ],
    rules: {
      'import/no-extraneous-dependencies': OFF,
    },
  },
]);
