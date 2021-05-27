#! /usr/bin/env node
const program = require('commander')
program
  // 定义命令和参数
  .command('create <app-name>')
  // 命令描述
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exit')
  .action((name, options) => {
    // 打印执行结果
    require('../lib/create.js')(name, options)
  })
program
  // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')

// 解析用户执行命令传入参数

program.parse(process.argv)