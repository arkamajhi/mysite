function toggleFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
     !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods

        document.getElementById("fullscreenbtncontent").innerHTML = '<img src="./2989876.png" alt="">';

      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
        document.getElementById("fullscreenbtncontent").innerHTML = '<img src="./2989868.png" alt="">';
       if (document.cancelFullScreen) {
          document.cancelFullScreen();
       } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
       } else if (document.webkitCancelFullScreen) {
         document.webkitCancelFullScreen();
       }
    }
  }