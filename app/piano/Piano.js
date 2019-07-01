require("../../style/piano.scss");

var BoilerPlate = require("../BoilerPlate");
var Data = require("../core/Data");
var Track = require("./Track");
var Pattern = require("Tone/event/Pattern");
var Transport = require("Tone/core/Transport");
var Beat = require("./Beat");

var Piano = module.exports = function(){
  var scope = this;
  BoilerPlate.call(this);

  this.timing = null;

  this.hat = null;
  this.tom = null;
  this.snare = null;
  this.kick = null;

  this.name = "Piano";
  this.piano = null;
  this.line = null;
  this.cycleCount = 4;
  this.tracks = null;
  this._ontriggerCallback = null;

  this.init = function(){
    this.pianoContainer = document.getElementById("piano");
    this.piano = this.pianoContainer.getElementsByClassName("container")[0];

    this.tracks = [];
    var i;
    var total = Data.getTotalTracks();
    var track;
    for (i=0; i<total; i++){
      track = new Track(this.piano, i);
      this.tracks.push(track);
    }

    this.totalCells = 16;
    this.tickIncrement = 200;
    this.tick = this.totalCells-1;
    this._seq = new Pattern(this._ontrigger.bind(this),[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]).start(0);
    this._seq.interval = "16n";
    Transport.setLoopPoints("0","1m");
    Transport.loop = true;
  };

  this.setTempo = function(tempo){
    Transport.bpm.value = tempo;
  };

  this.getProgress = function(){
    return Transport.progress;
  };

  this.start = function(){
    Transport.start();
  };

  this.pause = function(){
    Transport.pause();
  };

  this.ontrigger = function(callback){
    this._ontriggerCallback = callback;
  };

  this._triggerVisuals = function(track, index){
    this.tracks[track].trigger(index);
  };

  this._triggerVisualsAfterDelay = function(track,index,time){
    var delay = (time-Transport.now())*1000;
    if (delay < 15){
      this._triggerVisuals(track,index);
    }else{
      setTimeout(this._triggerVisuals.bind(this,track,index),delay);
    }
  };

  this._ontrigger = function(time, index){
    for (var i=0; i<this.tracks.length; i++){
      if (Beat.get(i,index)){
        //Data.playTrackSound(i,time,Math.random()*0.5+0.5);
        this.dispatchEvent("PLAY_SOUND",[Data.getSoundIndex(i)]);
        console.log(Data.getSoundIndex(i));
        this._triggerVisualsAfterDelay(i,index,time);
      }
    }
  };
};

Piano.prototype = new BoilerPlate();
Piano.prototype.constructor = Piano;
