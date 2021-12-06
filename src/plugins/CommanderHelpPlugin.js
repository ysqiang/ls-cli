const chalk = require('chalk')

//【figlet 库效果及可用字体】https://patorjk.com/software/taag/
const figlet = require('figlet')



module.exports = {
  isInstalled: false, // 确保只安装一次
  use : function (program, langs={}) {
    if (this.isInstalled) return;
    this.isInstalled = true;

    // 1. 重新定义 help 指令
    let helpDesc = 'Read more information'
    if (langs.HelpCli && langs.HelpCli.Description) {
      helpDesc = langs.HelpCli.Description;
    }
    program.addHelpCommand('help [command]', `${helpDesc}`);


    // 2. help 指令相关描述信息
    program.on('--help', ()=>{
      // 绘制CLI Logo
      console.log('\r\n' + figlet.textSync('LS CLI', {
        font: 'Standard',//'Ghost', 'Standard',
        horizontalLayout: 'controlled smushing', // default", "full", "fitted", "controlled smushing", "universal smushing"
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
      }));

      console.log(`\r\n  Run ${chalk.cyan('ls-cli <command> --help')} for detailed usage of given command. \r`)
    })

    // 3. help 指令之后描述信息
    program.addHelpText('after', `\nExample :
      $ ls-cli create --help`);


    // 重新定义help信息
    let cliHelpText = 'Read more information'
    if (langs.Cli && langs.Cli.Help) {
      cliHelpText = langs.Cli.Help;
    }
    program
      .helpOption('-h, --help', cliHelpText);

    // program.help('===== AAA ===== ')
    // console.log('******* == ', program.help())

    // 指令输入错误,需要处理与 指令错误提示 的关系
    // program.showHelpAfterError('(add --help for additional information ===== )');
  }
}