module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './lib',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  collectCoverageFrom: [
    './**/*.ts',
    '!./**/*.module.ts',
    '!./**/index.ts',
    '!main.ts',
    '!./**/sdk-e2e-test.ts',
  ],
  testEnvironment: 'node',
};
