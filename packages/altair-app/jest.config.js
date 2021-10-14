module.exports = {
  preset: 'jest-preset-angular',
  collectCoverage: true,
  roots: [ 'src' ],
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular'
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/setup-jest.ts'
  ],
  moduleNameMapper: {
    '@app/(.*)':'<rootDir>/src/app/$1',
    '@assets/(.*)':'<rootDir>/src/assets/$1',
    '@core/(.*)':'<rootDir>/src/app/core/$1',
    '@env':'<rootDir>/src/environments/environment',
    '@src/(.*)':'<rootDir>/src/src/$1',
    '@state/(.*)':'<rootDir>/src/app/state/$1'
  },
  modulePaths: [
    '<rootDir>/src/',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!lodash-es)'
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/src/tsconfig.spec.json',
      // stringifyContentPathRegex: '\\.html$',
      // astTransformers: [
      //   'jest-preset-angular/build/InlineFilesTransformer',
      //   'jest-preset-angular/build/StripStylesTransformer'
      // ]
    }
  }
};
