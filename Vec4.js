
/**
 * 四维向量 向量的加、减、点积、长度、单位化
 * @param {*} x 
 * @param {*} y 
 * @param {*} z 
 * @param {*} w 
 */
var Vec4 = function(x, y, z, w) {
    if (x instanceof Array) {
        this.x = x[0] || 0;
        this.y = x[1] || 0;
        this.z = x[2] || 0;
        this.w = x[3] || 0;
    } else {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w || 0;
    }
}

Object.assign(Vec4.prototype, {
    copy: function(fromVec) {
        this.x = fromVec.x;
        this.y = fromVec.y;
        this.z = fromVec.z;
        this.w = fromVec.w;
        return this;
    },
    clone: function() {
        return new Vec4().copy(this);
    },
    add: function(rightVec) {
        this.x += rightVec.x;
        this.y += rightVec.y;
        this.z += rightVec.z;
        this.w += rightVec.w;
        return this;
    },
    add2: function(leftVec, rightVec) {
        this.x = leftVec.x + rightVec.x;
        this.y = leftVec.y + rightVec.y;
        this.z = leftVec.z + rightVec.z;
        this.w = leftVec.w + rightVec.w;
        return this;
    },
    sub: function(rightVec) {
        this.x -= rightVec.x;
        this.y -= rightVec.y;
        this.z -= rightVec.z;
        this.w -= rightVec.w;
        return this;
    },
    sub2: function(leftVec, rightVec) {
        this.x = leftVec.x - rightVec.x;
        this.y = leftVec.y - rightVec.y;
        this.z = leftVec.z - rightVec.z;
        this.w = leftVec.w - rightVec.w;
        return this;
    },
    dot: function(rightVec) {
        return this.x * rightVec.x + this.y * rightVec.y + this.z * rightVec.z + this.w * rightVec.w;
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    },
    lengthSq: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    },
    normalize: function () {
        var lengthSq = this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
        if (lengthSq > 0) {
            var invLength = 1 / Math.sqrt(lengthSq);
            this.x *= invLength;
            this.y *= invLength;
            this.z *= invLength;
            this.w *= invLength;
        }
        return this;
    },
    set: function(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    },
    equal: function(rightVec) {
        return this.x === rightVec.x && this.y === rightVec.y && this.z === rightVec.z && this.w === rightVec.w;
    },
    scale: function(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        this.w *= s;
        return this;
    }
});
Object.defineProperty(Vec4, "ONE", {
    get: (function() {
        var ret = new Vec4(1, 1, 1, 1);
        return function() {
            return ret;
        }
    }())
});
Object.defineProperty(Vec4, "ZERO", {
    get: (function() {
        var ret = new Vec4(0, 0, 0, 0);
        return function() {
            return ret;
        }
    }())
})