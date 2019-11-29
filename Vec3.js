
/**
 * 三维向量 向量的加、减、点积、叉积、长度、单位化
 * @param {*} x 
 * @param {*} y 
 * @param {*} z 
 */
var Vec3 = function(x, y, z) {
    if (x instanceof Array) {
        this.x = x[0] || 0;
        this.y = x[1] || 0;
        this.z = x[2] || 0;
    } else {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
}

Object.assign(Vec3.prototype, {
    copy: function(fromVec) {
        this.x = fromVec.x;
        this.y = fromVec.y;
        this.z = fromVec.z;
        return this;
    },
    clone: function() {
        return new Vec3().copy(this);
    },
    add: function(rightVec) {
        this.x += rightVec.x;
        this.y += rightVec.y;
        this.z += rightVec.z;
        return this;
    },
    add2: function(leftVec, rightVec) {
        this.x = leftVec.x + rightVec.x;
        this.y = leftVec.y + rightVec.y;
        this.z = leftVec.z + rightVec.z;
        return this;
    },
    sub: function(rightVec) {
        this.x -= rightVec.x;
        this.y -= rightVec.y;
        this.z -= rightVec.z;
        return this;
    },
    sub2: function(leftVec, rightVec) {
        this.x = leftVec.x - rightVec.x;
        this.y = leftVec.y - rightVec.y;
        this.z = leftVec.z - rightVec.z;
        return this;
    },
    dot: function(rightVec) {
        return this.x * rightVec.x + this.y * rightVec.y + this.z * rightVec.z;
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    },
    lengthSq: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    },
    normalize: function () {
        var lengthSq = this.x * this.x + this.y * this.y + this.z * this.z;
        if (lengthSq > 0) {
            var invLength = 1 / Math.sqrt(lengthSq);
            this.x *= invLength;
            this.y *= invLength;
            this.z *= invLength;
        }
        return this;
    },
    cross: function(v1, v2) {
        this.x = v1.y * v2.z - v1.z * v2.y;
        this.y = v1.z * v2.x - v1.x * v2.z;
        this.z = v1.x * v2.y - v1.y * v2.x;
	    return this;
    },
    set: function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    },
    equal: function(rightVec) {
        return this.x === rightVec.x && this.y === rightVec.y && this.z === rightVec.z;
    },
    scale: function(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    }
});
Object.defineProperty(Vec3, "ONE", {
    get: (function() {
        var ret = new Vec3(1, 1, 1);
        return function() {
            return ret;
        }
    }())
});
Object.defineProperty(Vec3, "ZERO", {
    get: (function() {
        var ret = new Vec3(0, 0, 0);
        return function() {
            return ret;
        }
    }())
})