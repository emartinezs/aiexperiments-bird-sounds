var BoilerPlate = require("../BoilerPlate");
var Data = require("../core/Data");
var Config = require("../core/Config");

var Icon = module.exports = function(container, trackIndex){
  var scope = this;
  BoilerPlate.call(this);

  this.container = container;
  this.trackIndex = trackIndex;

  this.width = 30;
  this.height = 30;
  this.url = "../img/bird_thumbnails.jpg";
  this.img = new Image();
  this.img.src = this.url;

  this.icon = document.createElement("div");
  this.icon.className = "bird_icon";
  this.container.appendChild(this.icon);

  this.canvas = document.createElement("canvas");
  this.canvas.id = "bird_image";
  this.context = this.canvas.getContext("2d");
  this.context.canvas.width = this.width;
  this.context.canvas.height = this.height;
  this.icon.appendChild(this.canvas);

  this.name = document.createElement("p");
  this.name.id = "bird_title";
  this.icon.appendChild(this.name);

  this.button = document.createElement("button");
  this.button.id = "bird_button";
  this.button.innerHTML = "CHANGE";
  this.icon.appendChild(this.button);

  this.button.addEventListener("click", function(e){
    Data.setSoundIndex(trackIndex);
    scope.update(Data.getSoundIndex(trackIndex));
  });

  this.icon.addEventListener("click", function(e){
    scope.onClick(event);
  });

  this.onClick = function(event){
    Data.playSound(trackIndex);
  };

  this.update = function(birdIndex){
			var imgSize = Config.spriteSheetSize;
			var index = Data.getImage(birdIndex);
			var row = Math.floor(index / Config.spriteSheetColumns);
			var column = index % Config.spriteSheetColumns;

			this.name.innerHTML = Data.getName(birdIndex);

			this.context.clearRect(0, 0, this.width, this.height);
			this.context.drawImage(this.img, column * imgSize, row * imgSize, imgSize, imgSize, 0, 0, this.width, this.height);
  	};
};

Icon.prototype = new BoilerPlate();
Icon.prototype.constructor = Icon;
