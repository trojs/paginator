import globals from 'globals';
import pluginJs from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import stylisticJs from '@stylistic/eslint-plugin-js'
import sonarjs from 'eslint-plugin-sonarjs';

export default [
  sonarjs.configs.recommended,
  {

    files: ['**/*.js'],
    languageOptions: { globals: globals.node },

    plugins: {
      '@stylistic/js': stylisticJs,
      jsdoc: jsdoc
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      'consistent-return': [
        'error'
      ],
      'no-param-reassign': [
        'error',
        {
          'props': true,
          'ignorePropertyModificationsFor': [
            'acc',
            'accumulator',
            'e',
            'req',
            'request',
            'res',
            'response'
          ]
        }
      ],
      'quotes': [
        'error',
        'single',
        {
          'avoidEscape': true,
          'allowTemplateLiterals': true
        }
      ],
    }
  },
  pluginJs.configs.recommended,
];
