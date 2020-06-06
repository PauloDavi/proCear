module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  plugins: [
    'prettier',
    'plugin:prettier/recommended',
    'eslint-plugin-import-helpers',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: ['module', ['parent', 'sibling', 'index']],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
    'prettier/prettier': ['error'],
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'implicit-arrow-linebreak': 'off',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
