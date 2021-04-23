const program = require('commander');
const packageInfo = require('../../package.json');


program
    .version(packageInfo.version)

program
    .command('init') // ls init
    .description('生成一个项目')
    .alias('i') // 简写
    .action(() => {
      require('../cmd/ls-init');
    });

program
    .command('add') // ls add
    .description('添加新模板')
    .alias('a') // 简写
    .action(() => {
      require('../cmd/ls-add');
    });

program
    .command('list') // ls list
    .description('查看模板列表')
    .alias('l') // 简写
    .action(() => {
      require('../cmd/ls-list');
    });

program
    .command('delete') // ls delete
    .description('删除模板')
    .alias('d') // 简写
    .action(() => {
      require('../cmd/ls-del');
    });

program.parse(process.argv);

if(!program.args.length){
  program.help()
}