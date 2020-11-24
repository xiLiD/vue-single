import webpackInfo from '@/utils/webpack'
(function rewriteConsole() {
    // 清除控制台输出列表
    const removeItem = ['log', 'info', 'dir']
    const removeLen = removeItem.length
    const _console = webpackInfo.utilsConfig.console
    var num = 0
    for (var prop in console) {
        // console.log(prop)
        if (removeItem.includes(prop)) {
            console[prop] = (function (prop) {
                return _console ? prop : function () { }
            }(console[prop]))
            num++
        }
        // 寻找完毕之后,终止循环
        if (num == removeLen) break
    }
})()