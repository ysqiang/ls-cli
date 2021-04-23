//【inquirer】交互式命令行工具，如：输入，选择，数字等
const inquirer = require('inquirer')

//【chalk】用来修改控制台输出内容样式. 如：背景色，字体，粗细等
const chalk = require('chalk')

const fs = require('fs')

const ptlPath = `${__dirname}/../../template.json`
const tplObj = require(ptlPath)

// 交互式命令及校验
let questions = [
    {
        name: 'name',
        type: 'input',
        message: 'please input template name',
        validate(val){
            if (val === '' || val.trim().length === 0){
                return 'Name is required!'
            }else if (tplObj[val.trim()]){
                return 'Template has already existed!'
            }else {
                return true
            }
        }
    },
    {
        name: 'url',
        type: 'input',
        message: 'please a template git url address',
        validate(val){
            if (val === '' || val.trim().length === 0) return 'URL is required!'
            return true
        }
    }
]

inquirer.prompt(questions)
        .then(answers => {
            // 解析输入的 name 、 url 
            let {name, url} = answers;
 
            // 过滤 unicode 字符
            tplObj[name] = url.replace(/[\u0000-\u0019]/g, '')

            // 保存模版到 template.json
            fs.writeFile(ptlPath, JSON.stringify(tplObj), 'utf-8', err =>{
                if (err) console.log(chalk.red(err))

                console.log('\n')
                console.log(chalk.green('Added successfully!\n'))
                console.log(chalk.grey('The latest template list is: '))
                console.log(tplObj)
                console.log('\n')

            })
        })