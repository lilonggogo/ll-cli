// lib/create.js
const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
module.exports = async function (name, options) {
  // 验证是否正常取到值
  console.log('>>> create.js', name, options)
  // 执行创建任务

  // 当前命令选择的目录结构
  const cwd = process.cwd();
  // 需要创建的目录地址
  const targetAir = path.join(cwd, name)
  // 目标是否已经存在？
  if (fs.existsSync(targetAir)) {
    //是否强制创建
    if (options.force) {
      await fs.remove(targetAir)
    } else {
      // TODO: 询问用户是否确定要覆盖
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            },
            {
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])
      
      if (!action) {
        return;
      } else if (action === 'overwrite') {
        // 删除已存在的目录
        console.log(`\r\nRemoving...`)
        await fs.remove(targetAir)
      }
    }
  }
}