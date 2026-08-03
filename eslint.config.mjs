import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import betterTailwindcss from 'eslint-plugin-better-tailwindcss';

const eslintConfig = defineConfig([
  js.configs.recommended,
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      'no-useless-escape': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    files: ['app/**/*.tsx'],
    extends: [betterTailwindcss.configs.recommended],
    settings: {
      'better-tailwindcss': {
        // v4 has no JS config file; the theme lives in the CSS entry point.
        entryPoint: 'app/global.css',
        // Local class-merging helper, in addition to the presets the plugin knows.
        callees: ['cx'],
      },
    },
    rules: {
      // Would rewrap every className onto multiple lines. Class order is enough.
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      'better-tailwindcss/enforce-shorthand-classes': 'warn',
      // Plain CSS hooks defined in global.css, not Tailwind utilities.
      'better-tailwindcss/no-unknown-classes': [
        'error',
        { ignore: ['^(title|prose-quoteless|callout|tweet)$'] },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    '.vercel/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
