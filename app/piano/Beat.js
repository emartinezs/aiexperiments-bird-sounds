define(function(){
  var Beat = {
    _pattern:[
      [0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1],
      [0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0],
      [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
      [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0],
    ],

    get: function(track, index){
      return this._pattern[track][index] ? true:false;
    },

    set: function(track, index, value){
      this._pattern[track][index] = value ? 1:0;
    }
  };

  return Beat;
});
