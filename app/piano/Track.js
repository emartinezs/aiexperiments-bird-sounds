var BoilerPlate = require("../BoilerPlate");
var Data = require("../core/Data");
var Cell = require("./Cell");
var Beat = require("./Beat");

var Track = module.exports = function(container, id){
  var scope = this;
  BoilerPlate.call(this);

  this.name = "Track";
  this.container = container;

  this.cells = [];
  this.trackIndex = id;
  this.previewTrack = null;
  this.sampleSoundIndex = Math.random()*Data.getTotalPoints()|0;

  var track;
  track = document.createElement("div");
  track.className = "Track";
  this.container.appendChild(track);

  var cell;
  for (var i=0; i<16; i++){
    cell = new Cell(this.name, track, this.trackIndex, i);
    this.cells.push(cell);
    cell.set(Beat.get(this.trackIndex, i));
  }

  this.setBeat = function(pattern){
    var i;
    var total = this.cells.length;
    for (i=0; i<total; i++){
      this.cells[i].set(pattern[i]);
    }
  };

  this.trigger = function(index){
    var cell = this.cells[index];
    cell.trigger();
  }
};

Track.prototype = new BoilerPlate();
Track.prototype.constructor = Track;
