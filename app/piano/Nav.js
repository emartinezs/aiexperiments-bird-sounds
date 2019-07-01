require("../../style/nav.scss");

var BoilerPlate = require("../BoilerPlate");
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

    this.controller.addEventListener('ontouchstart',function(e){
      e.stopPropagation();
      e.preventDefault();
    },false);
    this.controller.addEventListener('ontouchmove',function(e){
      e.stopPropagation();
      e.preventDefault();
    },false);

    this.player = document.getElementById("player");
    this.playerIcon = this.player.getElementsByClassName("icon")[0];
    this.player.addEventListener("click", function(){
      this.dispatchEvent("ON_PLAYER_CLICKED",null);
    }.bind(scope),false);

    this.pianoWrapper = document.getElementById("piano");
    this.piano = this.pianoWrapper.getElementsByClassName("container")[0];

    this.buttons = document.getElementById("buttonsControls");
    this.shuffleIcon = document.getElementById("shuffleIcon");
    this.tempoIcon = document.getElementById("tempoIcon");
    this.slider = this.buttons.getElementsByClassName("slider")[0];
    var sliderData = document.getElementById("sliderData");

    this.shuffleIcon.addEventListener("click", function(){
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

    var onBGUp = function(event){
      document.body.removeEventListener("click",onBGUp,false);
      document.body.removeEventListener("touchend",onBGUp,false);
      sliderData.removeEventListener("click",onSliderUp,false);
      sliderData.removeEventListener("touchend",onSliderUp,false);
      scope.slider.classList.remove("show");
      scope.isTempoCollapsed = true;
      scope.tempoIcon.addEventListener("click",onTempoIconUp,false);
      scope.tempoIcon.addEventListener("touchend",onTempoIconUp,false);
      event.preventDefault();
      event.stopPropagation();
    };

    var onSliderUp = function(event){
      event.preventDefault();
      event.stopPropagation();
    };

    this.tempoIcon.addEventListener("click",onTempoIconUp,false);
    this.tempoIcon.addEventListener("touchend",onTempoIconUp,false);

    var setTempoSlider = function(value){
      var thumb = document.getElementById("sliderThumb");
      var normal = value/(sliderData.max-sliderData.min);
      var loc = (1-normal)*(180-20);
      thumb.style.top = (loc+10)+"px";
      scope.dispatchEvent("ON_TEMPO_UPDATED",[normal]);
    };

    var setValue = function(val){
      sliderData.value = val;
      setTempoSlider(val);
    };

    sliderData.addEventListener("input",function(value){
      setTempoSlider(sliderData.value);
    });
    setValue(50);

    this.pendulum = document.getElementById("pendulum");
    this.pendulumWrapper = document.getElementById("pendulumWrapper");
    this.pendulumWrapper.setAttribute("transform","translate(25,28)");
    this.animate();
  };

  this.animate = function(){
    /*var normal = scope.pianoData.getProgress();
    var degrees = normal*180-45;
    if (normal > 0.5){
      degrees = (1-normal)*180-45;
    }
    this.pendulum.setAttribute("transform","rotate("+degrees+")");
    requestAnimationFrame(function(){
      scope.animate();
    });*/
  };

  this.showPause = function(){
    scope.playerIcon.classList.add("pause");
  };

  this.showPlay = function(){
    scope.playerIcon.classList.remove("pause");
  };

  this.hide = function(){
    this.controller.classList.remove("show");
    scope.isVisible = false;
  };

  this.show = function(){
    this.controller.classList.add("show");
    scope.isVisible = true;
  };

  this.setPiano = function(piano){
    this.pianoData = piano;
  };
};

Nav.prototype = new BoilerPlate();
Nav.prototype.constructor = Nav;
