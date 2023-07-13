module.exports = {
  '!(*.lintstagedrc).{js,jsx,ts,tsx}': [
    'eslint',
    'eslint --fix',
    'prettier --write',
  ],
};
