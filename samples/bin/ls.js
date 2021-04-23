//【commander】用来编写指令和处理命令行的
const commander = require('commander')

commander.version(require('../package.json').version)
        //  .usage('<command> [options]')
         .command('add', 'add a template')
         .command('del', 'delete a template')
         .command('list', 'list all the templates')
         .command('init', 'create a new project with the template')
        //  .action(()=>{

        //  })


// console.log(process.argv)
commander.parse(process.argv)
// commander.parse(process.argv)
