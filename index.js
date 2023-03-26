window.onload = () => {
    document.getElementById("go").onclick = () => {
      startGame();
    };
    function startGame() {
      Game.init();

      let btn = document.getElementById("go");
      if (btn.parentNode) {
        btn.parentNode.removeChild(btn);
      }

    } 
}



