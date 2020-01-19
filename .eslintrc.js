module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'no-nested-ternary': 0,
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 0,
    'arrow-parens': 0,
    semi: 0,
    'jsx-a11y/label-has-for': 0,
    'react/jsx-one-expression-per-line': 0,
  },
}
