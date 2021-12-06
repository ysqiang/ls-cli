module.exports = {
  isInstalled: false, // 确保只安装一次
  use : function (program) { 
    if (this.isInstalled) return;
    this.isInstalled = true;

    // 配置脚本默认配置
    // program
    // .option('-c, --config <path>', 'set config path', './deploy.conf')

    // 配置
    // program.command('config [value]')
    //           .description('set config')
    //           .option('-g --get <key>', 'get value from config')
    //           .option('-s --set <key> <value>', 'setting the  config')
    //           .option('-d --delete <key>', 'delete option from config')
    //           .action((value, options) => {
    //             console.log('********* config : ', vlaue, options)
    //           })
  }
}