/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['./tests/', './src/'],
    collectCoverage: true,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/../src/$1',
    },
}
