window.onload = () => {
    document.getElementById("go").onclick = () => {
      startGame();
    };
    function startGame() {
      Game.init();

      let btn = document.getElementById("go");
      let mqn = document.getElementById("machine");
      if (btn.parentNode) {
        btn.parentNode.removeChild(btn);
        mqn.parentNode.removeChild(mqn);
    }

    } 
}



