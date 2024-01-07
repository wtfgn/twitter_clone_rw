import antfu from '@antfu/eslint-config';

export default antfu({
  rules: {
    'style/semi': ['error', 'always'],
  },
  vue: {
    overrides: {
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
    },
  },
});
