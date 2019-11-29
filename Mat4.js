
/**
 * 矩阵 矩阵加、减、乘、求逆
 */
var Mat4 = function() {
    var data = new Float32Array(16);
    data[0] = data[5] = data[10] = data[15] = 1;
    this.data = data;
}
var DEG_TO_RAD = Math.PI / 180.0;
Object.assign(Mat4.prototype, {
    copy: function(rightMat) {
        for (var i = 0; i < 16; i++) {
            this.data[i] = rightMat.data[i];
        }
        return this;
    },
    clone: function() {
        return new Mat4().copy(this);
    },
    add: function(rightMat) {
        for (var i = 0; i < 16; i++) {
            this.data[i] += rightMat.data[i];
        }
        return this;
    },
    add2: function(leftMat, rightMat) {
        for (var i = 0; i < 16; i++) {
            this.data[i] = leftMat.data[i] + rightMat.data[i];
        }
        return this;
    },
    sub: function(rightMat) {
        for (var i = 0; i < 16; i++) {
            this.data[i] -= rightMat.data[i];
        }
        return this;
    },
    sub2: function(leftMat, rightMat) {
        for (var i = 0; i < 16; i++) {
            this.data[i] = leftMat.data[i] - rightMat.data[i];
        }
        return this;
    },
    mul: function(rightMat) {
        var destData = this.data;
        var data = this.data;
        var rdata = rightMat.data;
        var a00 = data[0];
        var a01 = data[1];
        var a02 = data[2];
        var a03 = data[3];
        var a10 = data[4];
        var a11 = data[5];
        var a12 = data[6];
        var a13 = data[7];
        var a20 = data[8];
        var a21 = data[9];
        var a22 = data[10];
        var a23 = data[11];
        var a30 = data[12];
        var a31 = data[13];
        var a32 = data[14];
        var a33 = data[15];

        var c0 = rdata[0];
        var c1=  rdata[1];
        var c2 = rdata[2];
        var c3 = rdata[3];
        // 左行 x 右第一列
        destData[0] = a00 * c0 + a10 * c1 + a20 * c2 + a30 * c3;
        destData[1] = a01 * c0 + a11 * c1 + a21 * c2 + a31 * c3;
        destData[2] = a02 * c0 + a12 * c1 + a22 * c2 + a32 * c3;
        destData[3] = a03 * c0 + a13 * c1 + a23 * c2 + a33 * c3;
        // 左行 x 右第二列
        c0 = rdata[4];
        c1=  rdata[5];
        c2 = rdata[6];
        c3 = rdata[7];
        destData[4] = a00 * c0 + a10 * c1 + a20 * c2 + a30 * c3;
        destData[5] = a01 * c0 + a11 * c1 + a21 * c2 + a31 * c3;
        destData[6] = a02 * c0 + a12 * c1 + a22 * c2 + a32 * c3;
        destData[7] = a03 * c0 + a13 * c1 + a23 * c2 + a33 * c3;
        // 左行 x 右第三列
        c0 = rdata[8];
        c1=  rdata[9];
        c2 = rdata[10];
        c3 = rdata[11];
        destData[8] = a00 * c0 + a10 * c1 + a20 * c2 + a30 * c3;
        destData[9] = a01 * c0 + a11 * c1 + a21 * c2 + a31 * c3;
        destData[10] = a02 * c0 + a12 * c1 + a22 * c2 + a32 * c3;
        destData[11] = a03 * c0 + a13 * c1 + a23 * c2 + a33 * c3;
        c0 = rdata[12];
        c1=  rdata[13];
        c2 = rdata[14];
        c3 = rdata[15];
        destData[12] = a00 * c0 + a10 * c1 + a20 * c2 + a30 * c3;
        destData[13] = a01 * c0 + a11 * c1 + a21 * c2 + a31 * c3;
        destData[14] = a02 * c0 + a12 * c1 + a22 * c2 + a32 * c3;
        destData[15] = a03 * c0 + a13 * c1 + a23 * c2 + a33 * c3;
        return this;
    },
    mul2: function(leftMat, rightMat) {
        var destData = this.data;
        var data = leftMat.data;
        var rdata = rightMat.data;
        var a00 = data[0];
        var a01 = data[1];
        var a02 = data[2];
        var a03 = data[3];
        var a10 = data[4];
        var a11 = data[5];
        var a12 = data[6];
        var a13 = data[7];
        var a20 = data[8];
        var a21 = data[9];
        var a22 = data[10];
        var a23 = data[11];
        var a30 = data[12];
        var a31 = data[13];
        var a32 = data[14];
        var a33 = data[15];

        var c0 = rdata[0];
        var c1=  rdata[1];
        var c2 = rdata[2];
        var c3 = rdata[3];
        // 左行 x 右第一列
        destData[0] = a00 * c0 + a10 * c1 + a20 * c2 + a30 * c3;
        destData[1] = a01 * c0 + a11 * c1 + a21 * c2 + a31 * c3;
        destData[2] = a02 * c0 + a12 * c1 + a22 * c2 + a32 * c3;
        destData[3] = a03 * c0 + a13 * c1 + a23 * c2 + a33 * c3;
        // 左行 x 右第二列
        c0 = rdata[4];
        c1=  rdata[5];
        c2 = rdata[6];
        c3 = rdata[7];
        destData[4] = a00 * c0 + a10 * c1 + a20 * c2 + a30 * c3;
        destData[5] = a01 * c0 + a11 * c1 + a21 * c2 + a31 * c3;
        destData[6] = a02 * c0 + a12 * c1 + a22 * c2 + a32 * c3;
        destData[7] = a03 * c0 + a13 * c1 + a23 * c2 + a33 * c3;
        // 左行 x 右第三列
        c0 = rdata[8];
        c1=  rdata[9];
        c2 = rdata[10];
        c3 = rdata[11];
        destData[8] = a00 * c0 + a10 * c1 + a20 * c2 + a30 * c3;
        destData[9] = a01 * c0 + a11 * c1 + a21 * c2 + a31 * c3;
        destData[10] = a02 * c0 + a12 * c1 + a22 * c2 + a32 * c3;
        destData[11] = a03 * c0 + a13 * c1 + a23 * c2 + a33 * c3;
        // 左行 x 右边第四列
        c0 = rdata[12];
        c1=  rdata[13];
        c2 = rdata[14];
        c3 = rdata[15];
        destData[12] = a00 * c0 + a10 * c1 + a20 * c2 + a30 * c3;
        destData[13] = a01 * c0 + a11 * c1 + a21 * c2 + a31 * c3;
        destData[14] = a02 * c0 + a12 * c1 + a22 * c2 + a32 * c3;
        destData[15] = a03 * c0 + a13 * c1 + a23 * c2 + a33 * c3;
        return this;
    },
    transformVec4: function(v, res) {
        var x, y, z, w;
        var data = this.data;
        
        x = v.x;
        y = v.y;
        z = v.z;
        w = v.w;

        res = (res === undefined) ? new Vec4() : res;

        res.x = data[0] * x + data[4] * y + data[8] * z + data[12] * w;
        res.y = data[1] * x + data[5] * y + data[9] * z + data[13] * w;
        res.z = data[2] * x + data[6] * y + data[10] * z + data[14] * w;
        res.w = data[3] * x + data[7] * y + data[11] * z + data[15] * w;

        return res;
    },
    setIdentity: function() {
        var m = this.data;
        m[0] = 1;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = 1;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = 1;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;

        return this;
    },
    setTranslate: function(x, y, z) {
        var m = this.data;

        m[0] = 1;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = 1;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = 1;
        m[11] = 0;
        m[12] = x;
        m[13] = y;
        m[14] = z;
        m[15] = 1;

        return this;
    },
    setScale: function(x, y, z) {
        var m = this.data;

        m[0] = x;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = y;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = z;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;

        return this;
    },
    scale: function(s) {
        for (var i = 0; i < 16; i++) {
            this.data[i] *= s;
        }
        return this;
    },
    set: function (src) {
        var dst = this.data;
        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        dst[4] = src[4];
        dst[5] = src[5];
        dst[6] = src[6];
        dst[7] = src[7];
        dst[8] = src[8];
        dst[9] = src[9];
        dst[10] = src[10];
        dst[11] = src[11];
        dst[12] = src[12];
        dst[13] = src[13];
        dst[14] = src[14];
        dst[15] = src[15];

        return this;
    },
    setFrustum: function (left, right, bottom, top, znear, zfar) {
        var temp1, temp2, temp3, temp4, r;

        temp1 = 2 * znear;
        temp2 = right - left;
        temp3 = top - bottom;
        temp4 = zfar - znear;

        r = this.data;
        r[0] = temp1 / temp2;
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = 0;
        r[5] = temp1 / temp3;
        r[6] = 0;
        r[7] = 0;
        r[8] = (right + left) / temp2;
        r[9] = (top + bottom) / temp3;
        r[10] = (-zfar - znear) / temp4;
        r[11] = -1;
        r[12] = 0;
        r[13] = 0;
        r[14] = (-temp1 * zfar) / temp4;
        r[15] = 0;

        return this;
    },
    setPerspective: function(fov, aspect, znear, zfar) {
        ymax = znear * Math.tan(fov * Math.PI / 360);
        xmax = ymax * aspect;
        return this.setFrustum(-xmax, xmax, -ymax, ymax, znear, zfar);
    },
    setTRS: function (t, r, s) {
        var tx, ty, tz, qx, qy, qz, qw, sx, sy, sz,
            x2, y2, z2, xx, xy, xz, yy, yz, zz, wx, wy, wz, m;

        tx = t.x;
        ty = t.y;
        tz = t.z;

        qx = r.x;
        qy = r.y;
        qz = r.z;
        qw = r.w;

        sx = s.x;
        sy = s.y;
        sz = s.z;

        x2 = qx + qx;
        y2 = qy + qy;
        z2 = qz + qz;
        xx = qx * x2;
        xy = qx * y2;
        xz = qx * z2;
        yy = qy * y2;
        yz = qy * z2;
        zz = qz * z2;
        wx = qw * x2;
        wy = qw * y2;
        wz = qw * z2;

        m = this.data;

        m[0] = (1 - (yy + zz)) * sx;
        m[1] = (xy + wz) * sx;
        m[2] = (xz - wy) * sx;
        m[3] = 0;

        m[4] = (xy - wz) * sy;
        m[5] = (1 - (xx + zz)) * sy;
        m[6] = (yz + wx) * sy;
        m[7] = 0;

        m[8] = (xz + wy) * sz;
        m[9] = (yz - wx) * sz;
        m[10] = (1 - (xx + yy)) * sz;
        m[11] = 0;

        m[12] = tx;
        m[13] = ty;
        m[14] = tz;
        m[15] = 1;

        return this;
    },
    setFromEulerAngles: function (ex, ey, ez) {
        var s1, c1, s2, c2, s3, c3, m;

        ex *= DEG_TO_RAD;
        ey *= DEG_TO_RAD;
        ez *= DEG_TO_RAD;

        s1 = Math.sin(-ex);
        c1 = Math.cos(-ex);
        s2 = Math.sin(-ey);
        c2 = Math.cos(-ey);
        s3 = Math.sin(-ez);
        c3 = Math.cos(-ez);

        m = this.data;

        // Set rotation elements
        m[0] = c2 * c3;
        m[1] = -c2 * s3;
        m[2] = s2;
        m[3] = 0;

        m[4] = c1 * s3 + c3 * s1 * s2;
        m[5] = c1 * c3 - s1 * s2 * s3;
        m[6] = -c2 * s1;
        m[7] = 0;

        m[8] = s1 * s3 - c1 * c3 * s2;
        m[9] = c3 * s1 + c1 * s2 * s3;
        m[10] = c1 * c2;
        m[11] = 0;

        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;

        return this;
    },

    setViewPort: function(w, h, near, far) {
        this.data[0] = w / 2;
        this.data[12]  = (w - 1) / 2;
         
        this.data[5] = h / 2;
        this.data[13] = (h - 1) / 2;
        this.data[10] = (far - near) / 2;
        this.data[14] = (far + near) / 2;
        this.data[15] = 1;
        return this;
    },
    /**
     * 求矩阵的代数余子式=除了m行和n列组成的矩阵的行列式
     * @param {*} m 行
     * @param {*} n 列
     */
    cofactor: function(m, n) {
        var sign = (m + n) % 2 === 0 ? 1 : -1;
        var lastMat = new Float32Array(9); // 3 x 3矩阵
        for (var i = 0, srcRow = 0; i < 3; srcRow++) {
            if (m === srcRow)
                continue;
            for (var j = 0, srcCol = 0; j < 3; srcCol++) {
                if (srcCol === n) continue;
                lastMat[j * 3 + i] = this.data[srcCol * 4 + srcRow];
                ++j;
            }
            ++i;
        }
        /*
        0 3 6
        1 4 7
        2 5 8
        */
        var lastMatDet = lastMat[0] * (lastMat[4] * lastMat[8] - lastMat[5] * lastMat[7]) +
        lastMat[3] * (lastMat[2] * lastMat[7] - lastMat[1] * lastMat[8]) +
        lastMat[6] * (lastMat[1] * lastMat[5] - lastMat[2] * lastMat[4]);
        return sign * lastMatDet;
    },
    /**
     * 求矩阵的行列式
     */
    det: function() {
        var ret = 0;
        for (var i = 0; i < 4; i++) {
            ret += (this.get(i, 0) * this.cofactor(i, 0));
        }
        return ret;
    },

    get: function(row, col) {
        return this.data[col * 4 + row];
    },
    /**
     * 求矩阵的伴随矩阵=每个数的余子式构造矩阵的转置
     */
    adjMat: function() {
        var cofactorMatrix = new Mat4();
        for(var i = 0; i < 4; ++i)
            for(var j = 0; j < 4; ++j)
                cofactorMatrix.data[j * 4 + i] = this.cofactor(i, j);
        cofactorMatrix.transpose();
        return cofactorMatrix;
    },
    transpose: function () {
        var tmp, m = this.data;

        tmp = m[1];
        m[1] = m[4];
        m[4] = tmp;

        tmp = m[2];
        m[2] = m[8];
        m[8] = tmp;

        tmp = m[3];
        m[3] = m[12];
        m[12] = tmp;

        tmp = m[6];
        m[6] = m[9];
        m[9] = tmp;

        tmp = m[7];
        m[7] = m[13];
        m[13] = tmp;

        tmp = m[11];
        m[11] = m[14];
        m[14] = tmp;

        return this;
    },
    /**
     * 求矩阵的逆矩阵
     */
    invert: function () {
        var a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23,
            a30, a31, a32, a33,
            b00, b01, b02, b03,
            b04, b05, b06, b07,
            b08, b09, b10, b11,
            det, invDet, m;

        m = this.data;
        a00 = m[0];
        a01 = m[1];
        a02 = m[2];
        a03 = m[3];
        a10 = m[4];
        a11 = m[5];
        a12 = m[6];
        a13 = m[7];
        a20 = m[8];
        a21 = m[9];
        a22 = m[10];
        a23 = m[11];
        a30 = m[12];
        a31 = m[13];
        a32 = m[14];
        a33 = m[15];

        b00 = a00 * a11 - a01 * a10;
        b01 = a00 * a12 - a02 * a10;
        b02 = a00 * a13 - a03 * a10;
        b03 = a01 * a12 - a02 * a11;
        b04 = a01 * a13 - a03 * a11;
        b05 = a02 * a13 - a03 * a12;
        b06 = a20 * a31 - a21 * a30;
        b07 = a20 * a32 - a22 * a30;
        b08 = a20 * a33 - a23 * a30;
        b09 = a21 * a32 - a22 * a31;
        b10 = a21 * a33 - a23 * a31;
        b11 = a22 * a33 - a23 * a32;

        det = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);
        if (det === 0) {
            this.setIdentity();
        } else {
            invDet = 1 / det;

            m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
            m[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
            m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
            m[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
            m[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
            m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
            m[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
            m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
            m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
            m[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
            m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
            m[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
            m[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
            m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
            m[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
            m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
        }


        return this;
    },
});