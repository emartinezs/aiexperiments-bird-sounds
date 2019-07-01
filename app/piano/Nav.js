require("../style/nav.scss");

var BoilerPlate = require("./BoilerPlate");
var Data = require("../core/Data");

var Nav = module.exports = function(){
  var scope = this;
  BoilerPlate.call(this);

  this.name = "Nav";
  this.isVisible = true;
  this.isTempoCollapsed = true;
  this.percentage = 0.0;
  this.count = 0;

  this.init = function(){
    this.controller = document.getElementById("controller");
    this.nav = document.getElementById("nav");

    this.controller.addEventListener('ontouchstart',function(e)){
      e.stopPropagation();
      e.preventDefault();
    },false);
    this.controller.addEventListener('ontouchmove',function(e)){
      e.stopPropagation();
      e.preventDefault();
    },false);

    this.player = document.getElementById("player");
    this.playerIcon = this.player.getElementsByClassName("icon")[0];
    this.player.addEventListener("click", function(){
      this.dispatchEvent("ON_PLAYER_CLICKED",null);
    }.bind(scope),false);

    this.sequencerWrapper = document.getElementById("sequencer");
    this.sequencer = this.sequencerWrapper.getElementsByClassName("container")[0];

    this.buttons = document.getElementById("buttonsControls");
    this.shuffleIcon = document.getElementById("previewIcon");
    this.tempoIcon = document.getElementById("tempoIcon");

    this.suffleIcon.addEventListener("click", function(){
      scope.dispatchEvent("ON_REFRESH",null);
    });

    var onTempoIconUp = function(event){
      if (scope.isTempoCollapsed){
        scope.slider.classList.add("show");
        sliderData.addEventListener("click",onSliderUp,false);
        sliderData.addEventListener("touchend",onSliderUp,false);
        document.body.addEventListener("click",onBGUp,false);
        document.body.addEventListener("touchend",onBGUp,false);
        scope.tempoIcon.removeEventListener("click",onTempoIconUp,false);
        scope.removeEventListener("touchend",onTempoIconUp,false);
        scope.isTempoCollapsed = false;
      }else{
        scope.slider.classList.remove("show");
        scope.isTempoCollapsed = true;
      }
      event.preventDefault();
      event.stopPropagation();
    };

    this.tempoIcon.addEventListener("click",onTempoIconUp,false);
    this.tempoIcon.addEventListener("touchend",onTempoIconUp,false);
  }
}

Nav.prototype = new BoilerPlate();
Nav.prototype.constructor = Nav;
