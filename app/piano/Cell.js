var BoilerPlate = require("../BoilerPlate");
var Beat = require("./Beat");
var Tone = require("Tone/core/Tone");
var Data = require("../core/Data");
var Transport = require("Tone/core/Transport");

var Cell = module.exports = function(name, container, trackIndex, beatIndex){
  var scope = this;
  BoilerPlate.call(this);

  this.name = name;
  this.container = container;
  this.trackIndex = trackIndex;
  this.beatIndex = beatIndex;

  this.cell = document.createElement("div");
  this.cell.className = "Cell";
  this.container.appendChild(this.cell);

  this.fill = document.createElement("div");
  this.fill.id = "Fill";
  this.cell.appendChild(this.fill);

  this.cell.addEventListener("click", function(e){
    scope.onClick(event);
  });

  this.set = function(active){
    if (active){
      this.cell.classList.add("Active");
    }else{
      this.cell.classList.remove("Active");
    }
  };

  this.trigger = function(){
    this.cell.classList.add("Trigger");
    setTimeout(function(){
      scope.cell.classList.remove("Trigger");
    },100);
  };

  this.onClick = function(event){
    var value = !Beat.get(this.trackIndex, this.beatIndex);
    Beat.set(this.trackIndex, this.beatIndex, value);
    this.set(value);
    if (value && Transport.state == "stopped"){
      var time = Tone.now();
      //Data.playTrackSound(this.trackIndex, time, 1);
    }
  };
};

Cell.prototype = new BoilerPlate();
Cell.prototype.constructor = Cell;
