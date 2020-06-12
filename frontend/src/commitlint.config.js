module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [2, 'always', 50],
    'scope-enum': [2, 'always', ['backend', 'frontend', 'mobile']],
  },
};
