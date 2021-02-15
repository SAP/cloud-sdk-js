module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: {
      extends: 'tsconfig.json',
      include: ['**/*.ts'],
      exclude: ['**/*.d.ts', '**/dist/**/*', '**/node_modules/**/*']
    },
    sourceType: 'module'
  },
  ignorePatterns: ['dist', 'node_modules'],
  plugins: ['@typescript-eslint', 'import', 'unused-imports'],
  overrides: [
    {
      files: ['**/test/**/*', '**/*.spec.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'import/no-internal-modules': 'off',
        'no-unused-expressions': 'off'
      }
    }
  ],
  rules: {
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'off',
      {
        accessibility: 'explicit'
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowArgumentsExplicitlyTypedAsAny: true
      }
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          // Index signature
          'signature',

          // Static
          'public-static-field',
          'protected-static-field',
          'private-static-field',
          'public-static-method',
          'protected-static-method',
          'private-static-method',

          // Fields
          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          'public-abstract-field',
          'protected-abstract-field',
          'private-abstract-field',

          // Constructors
          'public-constructor',
          'protected-constructor',
          'private-constructor',

          // Methods
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
          'public-abstract-method',
          'protected-abstract-method',
          'private-abstract-method'
        ]
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    '@typescript-eslint/no-shadow': [
      'error',
      {
        ignoreFunctionTypeParameterNameValueShadow: true,
        hoist: 'all'
      }
    ],
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true
      }
    ],
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error',
    'import/no-absolute-path': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-internal-modules': 'error',
    'import/no-self-import': 'error',
    'import/no-cycle': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-relative-parent-imports': 'error',
    'import/export': 'error',
    'import/order': 'error',
    'import/no-duplicates': 'error',
    'unused-imports/no-unused-imports-ts': 'error',
    'arrow-body-style': 'error',
    'brace-style': 'error',
    curly: 'error',
    'eol-last': 'error',
    eqeqeq: ['error', 'smart'],
    'max-classes-per-file': ['error', 1],
    'new-parens': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-console': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-eval': 'error',
    'no-extra-bind': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-prototype-builtins': 'off',
    'no-restricted-imports': [
      'error',
      {
        paths: ['../', '../../', './'],
        patterns: ['*/index']
      }
    ],
    'no-return-await': 'error',
    'no-sequences': 'error',
    'no-template-curly-in-string': 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-unused-expressions': 'error',
    'no-var': 'error',
    'object-curly-spacing': ['error', 'always'],
    'object-shorthand': 'error',
    'one-var': ['error', 'never'],
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'block' },
      { blankLine: 'never', prev: 'import', next: 'import' }
    ],
    'prefer-const': 'error',
    'prefer-object-spread': 'error',
    'space-in-parens': ['error', 'never'],
    'spaced-comment': 'error',
    'valid-jsdoc': [
      'error',
      {
        requireReturn: false,
        requireReturnType: false,
        requireParamType: false,
        prefer: {
          return: 'returns'
        }
      }
    ]
  }
};
