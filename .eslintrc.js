module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'react-native', 'react-hooks'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb-base'],
  rules: {
    'arrow-body-style': 'warn',
    'arrow-parens': 'warn',
    'prefer-const': 'warn',
    'object-curly-spacing': 'never',
  },
};
