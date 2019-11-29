var Texture = function() {
    this.data = new Float32Array(4);
    this.width = 1;
    this.height = 1;
    this.data[0] = 1.0;
    this.data[1] = 0;
    this.data[2] = 1;
    this.data[3] = 1.0;
}

Texture.prototype.load = function(url) {
    var newCanvas =  document.createElement('canvas');
    var newImage = new Image();
    newImage.src = url;
    newImage.onload = () => {
        this.width = newCanvas.width = newImage.width;
        this.height = newCanvas.height = newImage.height;
        var context = newCanvas.getContext("2d");
        context.drawImage(newImage, 0, 0);
        var textureImageData = context.getImageData(0, 0, newImage.width, newImage.height);
        this.data = new Float32Array(textureImageData.data.length);
        for(var i = 0; i < textureImageData.data.length; ++i)
            this.data[i] = textureImageData.data[i] / 255;
    }
}