module.exports = {
  isInstalled: false, // 确保只安装一次
  use : function (program) {
    if (this.isInstalled) return;
    this.isInstalled = true;
    
    // 错误提出建议
    program.showSuggestionAfterError();

  }
}