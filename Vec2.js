
/**
 * 二维向量 向量的加、减、长度、单位化
 * @param {*} x 
 * @param {*} y 
 */
var Vec2 = function(x, y) {
    if (x instanceof Array) {
        this.x = x[0] || 0;
        this.y = x[1] || 0;
    } else {
        this.x = x || 0;
        this.y = y || 0;
    }
}

Object.assign(Vec2.prototype, {
    copy: function(fromVec) {
        this.x = fromVec.x;
        this.y = fromVec.y;
        return this;
    },
    clone: function() {
        return new Vec2().copy(this);
    },
    add: function(rightVec) {
        this.x += rightVec.x;
        this.y += rightVec.y;
        return this;
    },
    add2: function(leftVec, rightVec) {
        this.x = leftVec.x + rightVec.x;
        this.y = leftVec.y + rightVec.y;
        return this;
    },
    sub: function(rightVec) {
        this.x -= rightVec.x;
        this.y -= rightVec.y;
        return this;
    },
    sub2: function(leftVec, rightVec) {
        this.x = leftVec.x - rightVec.x;
        this.y = leftVec.y - rightVec.y;
        return this;
    },
    dot: function(rightVec) {
        return this.x * rightVec.x + this.y * rightVec.y;
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    lengthSq: function () {
        return this.x * this.x + this.y * this.y;
    },
    normalize: function () {
        var lengthSq = this.x * this.x + this.y * this.y ;
        if (lengthSq > 0) {
            var invLength = 1 / Math.sqrt(lengthSq);
            this.x *= invLength;
            this.y *= invLength;
        }
        return this;
    },
    set: function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    },
    equal: function(rightVec) {
        return this.x === rightVec.x && this.y === rightVec.y;
    },
    scale: function(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }
});
Object.defineProperty(Vec2, "ONE", {
    get: (function() {
        var ret = new Vec2(1, 1);
        return function() {
            return ret;
        }
    }())
});
Object.defineProperty(Vec2, "ZERO", {
    get: (function() {
        var ret = new Vec2(0, 0);
        return function() {
            return ret;
        }
    }())
})