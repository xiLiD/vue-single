import Vconsole from 'vconsole'
import webpackInfo from '@/utils/webpack'
let vConsole
// if (window.location.query('vconsole') === 'true') {
//   window.beegrid.task.config.vconsole = true
// } else if (window.location.query('vconsole') === 'false') {
//   window.beegrid.task.config.vconsole = false
// }
console.log(webpackInfo.utilsConfig.vconsole)
const _vconsole = webpackInfo.utilsConfig.vconsole
if (_vconsole) {
  vConsole = new Vconsole()

}
window.onload = function () {
  if (_vconsole) {
    let str = _vconsole ? 'block' : 'none'
    console.log(str)
    vConsole.$dom.style.display = str
  }
}
export default vConsole
