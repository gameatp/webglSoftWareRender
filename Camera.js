var Camera = function() {
    this.projMatrix = new Mat4();
    this.viewMatrix = new Mat4();
}

Object.assign(Camera.prototype, {
    /**
     * 设置相机View矩阵
     * @param {*} pos 
     * @param {*} target 
     * @param {*} up 
     */
    setLookAt: function(pos, target, up) {
        var x = new Vec3();
        var z = new Vec3();
        var y = new Vec3();
        y.copy(up).normalize();

        z.sub2(pos, target).normalize();
        x.cross(y, z).normalize();
        y.cross(z, x).normalize();

        var r = this.viewMatrix.data;
        r[0] = x.x;
        r[1] = y.x;
        r[2] = z.x;
        r[3] = 0;
        r[4] = x.y;
        r[5] = y.y;
        r[6] = z.y;
        r[7] = 0;
        r[8] = x.z;
        r[9] = y.z;
        r[10] = z.z;
        r[11] = 0;
        r[12] = -pos.dot(x);
        r[13] = -pos.dot(y);
        r[14] = -pos.dot(z);
        r[15] = 1.0;
        return this;
    },
    setPerspective: function(fov, aspect, znear, zfar) {
        var ymax = znear * Math.tan(fov * Math.PI / 360);
        var xmax = ymax * aspect;
        return this.projMatrix.setFrustum(-xmax, xmax, -ymax, ymax, znear, zfar);
    }
});