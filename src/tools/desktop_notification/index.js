const notifier = require('node-notifier');
const path = require('path');
let notifuPath = path.resolve('./dist/notifu/notifu.exe');
if(process.arch == 'x64') notifuPath = path.resolve('./dist/notifu/notifu64.exe');
const winBalloon = new notifier.WindowsBalloon({
  withFallback: false,
  customPath: notifuPath
});
class DesktopNotification{
  constructor(){
  }

  show(title, message){
    if(!title) return;
    if(!this.is_enable) return;
    // 音とか追加するためにクラス作っとく
    if(process.platform == 'win32') {
      const option = {
        appId: 'com.tencha',
        message: message,
        title: title,
        sound: false,
        wait: true
      }
      winBalloon.notify(
        option,
        function(err, response) {
          //フォールバック(ちゃんとしてくれるかは知らない)
          const winToast = new notifier.WindowsToaster({
            withFallback: false,
            customPath: path.resolve('./dist/snoreToast/snoretoast-x86.exe')
          });
          winToast.notify(option);
        });
    } else {
      notifier.notify({
        title: title,
        message: message
      });
    }
  }

  set_is_enable(is_enable){
    this.is_enable = is_enable;
  }
}

module.exports = DesktopNotification;
