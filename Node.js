var Node = function() {
    this.localPosition = new Vec3();
    this.localScale = new Vec3(1, 1, 1);
    this.localRotation = new Quat();
    this.children = [];
    this.parent = null;
    this.worldMatrix = new Mat4();
    this.localMatrix = new Mat4();
    this.mesh = null;
}
Object.assign(Node.prototype, {
    addChild: function(n) {
        if (this.children.indexOf(n) === -1) {
            n.parent = this;
            this.children.push(n);
        }
    },
    removeChild: function(n) {
        var fndIndex = this.children.indexOf(n);
        if(fndIndex !== -1) {
            this.children.splice(fndIndex, 1);
            n.parent = null;
        }
    },
    tranverse: function(cb) {
        if(cb) {
            cb(this);
        }
        for (var n = 0, len = this.children.length; n < len; n++) {
            this.children[n].tranverse(cb);
        }
    },
    getWorldMatrix: function() {
        this.localMatrix.setTRS(this.localPosition, this.localRotation, this.localScale);
        if (this.parent) {
            this.parent.getWorldMatrix();
            this.worldMatrix.mul2(this.parent.worldMatrix, this.localMatrix);
        } else {
            this.worldMatrix.copy(this.localMatrix);
        }
        return this.worldMatrix;
    }
});