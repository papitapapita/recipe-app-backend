export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  setupFilesAfterEnv: ['./tests/jest.setup.ts'],
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }]
  }
  /*globals: {
    'ts-jest': {
      useESM: true
    }
  }*/
};
