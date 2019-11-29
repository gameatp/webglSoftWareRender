var outColor = new Vec4();
function texture2D(textureData, u, v) {
    var i = Math.floor(textureData.height * v) % textureData.height;
    var j = Math.floor(textureData.width * u) % textureData.width;
    var pixelIndex = i * textureData.width * 4 + j * 4;
    outColor.x = textureData.data[pixelIndex];
    outColor.y = textureData.data[pixelIndex + 1];
    outColor.z = textureData.data[pixelIndex + 2];
    return outColor;
}
var DiffuseColorShader = {
    // uniform
    worldMatrix: new Mat4,
    viewMatrix: new Mat4,
    projMatrix: new Mat4,
    viewportMatrix: new Mat4,

    diffuseTexture: null,
    vs: function(attribute) {
        var position = attribute.position;

        var wpos = this.worldMatrix.transformVec4(position);
        var wvpos = this.viewMatrix.transformVec4(wpos);
        var wvppos = this.projMatrix.transformVec4(wvpos);
        var screenpos = this.viewportMatrix.transformVec4(wvppos);
        return {
            position: screenpos,
            color: attribute.color,
            uv: attribute.uv,
            normal: attribute.normal
        }
    },
    ps: function(_varyings) {
        var uv = _varyings.uv;
        var color = _varyings.color;
        var diffuse = this.diffuseTexture ? texture2D(this.diffuseTexture, uv.x, uv.y) : color;
        return diffuse;
       // return color;
    }
}