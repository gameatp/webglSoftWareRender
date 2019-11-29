var DEG_TO_RAD =  Math.PI / 180;
var Quat = function(x, y, z, w) {
    this.x = (x === undefined) ? 0 : x;
    this.y = (y === undefined) ? 0 : x;
    this.z = (z === undefined) ? 0 : x;
    this.w = (w === undefined) ? 1 : x;
}
Object.assign(Quat.prototype, {
    setFromEulerAngles: function(ex, ey, ez) {
        var sx, cx, sy, cy, sz, cz, halfToRad;

        halfToRad = 0.5 * DEG_TO_RAD;
        ex *= halfToRad;
        ey *= halfToRad;
        ez *= halfToRad;

        sx = Math.sin(ex);
        cx = Math.cos(ex);
        sy = Math.sin(ey);
        cy = Math.cos(ey);
        sz = Math.sin(ez);
        cz = Math.cos(ez);

        this.x = sx * cy * cz - cx * sy * sz;
        this.y = cx * sy * cz + sx * cy * sz;
        this.z = cx * cy * sz - sx * sy * cz;
        this.w = cx * cy * cz + sx * sy * sz;

        return this;
    }
})
