const nextJest = require('next/jest')
require('@next/env').loadEnvConfig(process.cwd())

const creatJestConfig = nextJest()

const jestConfig = creatJestConfig({
  moduleDirectories: ['node_modules', '<rootDir>'],

})






module.exports = jestConfig;
