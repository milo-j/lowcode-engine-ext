module.exports = {
  extends: [
    'eslint-config-ali/typescript/react',
    'prettier',  // 保留基本的 prettier 配置
  ],
  rules: {
    'react/no-multi-comp': 0,
    '@typescript-eslint/member-ordering': 0,
  },
};
