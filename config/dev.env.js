'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// 开发环境
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"http://sit.scm.x-chain.net.cn"'
  // BASE_API: '"http://47.100.119.227:8101"'
})
