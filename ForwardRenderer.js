var lhs = new Vec4();
var rhs  = new Vec4();

var ForwardRenderer = function(canvas) {
    this.pixelRatio = window.devicePixelRatio;
    this.canvas = canvas;
    this.width = canvas.clientWidth * this.pixelRatio || 1;
    this.height = canvas.clientHeight * this.pixelRatio || 1;
    canvas.width = this.width;
    canvas.height = this.height;
    this.framebuffer = new Float32Array(this.width * this.height * 4);
    this.depthbuffer = new Float32Array(this.width * this.height);
    this.clearColor(0, 0, 0, 1);
    this.clearDepth(1.0);

    this.curShader = null;
    this.curTexture = null;
    this.setShader(DiffuseColorShader);

    this.canvasContext = canvas.getContext("2d");
    this.frontImageData = this.canvasContext.createImageData(this.width, this.height);

    this.viewportMatrix = new Mat4();
    this.viewportMatrix.setViewPort(this.width, this.height, 0, 1);
}

Object.assign(ForwardRenderer.prototype, {
    resize: function(w, h) {
        this.width = w * this.pixelRatio  || 1;
        this.height = h * this.pixelRatio || 1;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.width = w + "px";
        this.canvas.style.height = h + "px";
        this.framebuffer = new Float32Array(this.width * this.height * 4);
        this.depthbuffer = new Float32Array(this.width * this.height);
        this.frontImageData = this.canvasContext.createImageData(this.width, this.height);
        this.viewportMatrix.setViewPort(this.width, this.height, 0, 1);
    },
    clearColor: function(r, g, b, a) {
        for (var n = 0, len = this.framebuffer.length; n < len; n += 4) {
            this.framebuffer[n] = r;
            this.framebuffer[n + 1] = g;
            this.framebuffer[n + 2] = b;
            this.framebuffer[n + 3] = a;
        }
    },
    clearDepth: function(d) {
        for (var n = 0, len = this.depthbuffer.length; n < len; n++) {
            this.depthbuffer[n] = d;
        }
    },
    drawPixel: function(x, y, z, r, g, b) {
        var height = this.height;
        var width = this.width;
        var depthbuffer = this.depthbuffer;
        var framebuffer = this.framebuffer;
        var i = Math.floor(height - y - 0.5);
        if (i >= 0 && i < height) {
            var j = Math.floor(x + 0.5);
            if (j >= 0 && j < width) {
                var depthPixelIndex = i * width + j;
                // 深度测试
                if (z < depthbuffer[depthPixelIndex]) {
                    depthbuffer[depthPixelIndex] = z;
                    var pixelStartIndex = i * width * 4 + j * 4;
                    framebuffer[pixelStartIndex] = r;
                    framebuffer[pixelStartIndex + 1] = g;
                    framebuffer[pixelStartIndex + 2] = b;
                }
            }
        }
    },
    isBackFace: function(v1, v2, v3) {
        lhs.sub2(v2, v1);
        rhs.sub2(v3, v1);
        // 向量做叉积后的Z方向
        var lx = lhs.x;
        var ly = lhs.y;
        var rx = rhs.x;
        var ry = rhs.y;
        var z = lx * ry - rx * ly;
        return z < 0;
    },
    drawLine: function(from, to) {
        var a = new Vec2(from.x / from.w, from.y/ from.w);
        var b = new Vec2(to.x / to.w, to.y / to.w);
        var dir = new Vec2();
        dir.sub2(b, a);
        var len = dir.length();
        dir.normalize();
        var step = len/20;
        var dA = from.z / from.w;
        var dB = to.z / to.w;
        for(var n = 0; n < 20; n++) {
            var s = (n / 20);
            var depth = dA * (1 - s)+ dB * s;
            this.drawPixel(a.x + dir.x * n * step, a.y + dir.y * n * step, depth, 1, 0,0);
        }

    },
    drawTriangle: function(vertex1, vertex2, vertex3, wireframe) {
        var v1NDCPos = vertex1.position.clone().scale(1.0 / vertex1.position.w);
        var v2NDCPos = vertex2.position.clone().scale(1.0 / vertex2.position.w);
        var v3NDCPos = vertex3.position.clone().scale(1.0 / vertex3.position.w);
        var w1 = vertex1.position.w;
        var w2 = vertex2.position.w;
        var w3 = vertex3.position.w;
        if (this.isBackFace(v1NDCPos, v2NDCPos, v3NDCPos))
            return;
        if (wireframe) {
            this.drawLine(vertex1.position, vertex2.position);
            this.drawLine(vertex2.position, vertex3.position);
            this.drawLine(vertex1.position, vertex3.position);
            return;
        }
        var minX = Math.min(v1NDCPos.x, v2NDCPos.x, v3NDCPos.x);
        var maxX = Math.max(v1NDCPos.x, v2NDCPos.x, v3NDCPos.x);
        var minY = Math.min(v1NDCPos.y, v2NDCPos.y, v3NDCPos.y);
        var maxY = Math.max(v1NDCPos.y, v2NDCPos.y, v3NDCPos.y);

        function f12(x, y) {
            return (v1NDCPos.y - v2NDCPos.y) * x
                + (v2NDCPos.x - v1NDCPos.x) * y
                + v1NDCPos.x * v2NDCPos.y - v2NDCPos.x * v1NDCPos.y;
        }

        function f23(x, y) {
            return (v2NDCPos.y - v3NDCPos.y) * x
                + (v3NDCPos.x - v2NDCPos.x) * y
                + v2NDCPos.x * v3NDCPos.y - v3NDCPos.x * v2NDCPos.y;
        }

        function f31(x, y) {
            return (v3NDCPos.y - v1NDCPos.y) * x
                + (v1NDCPos.x - v3NDCPos.x) * y
                + v3NDCPos.x * v1NDCPos.y - v1NDCPos.x * v3NDCPos.y;
        }
        
        var startY = Math.floor(minY), startX = Math.floor(minX);
        var endY = Math.ceil(maxY), endX = Math.ceil(maxX);
        var pixNum = 0;
        for(var y = startY; y <= endY; ++y)
            for(var x = startX; x <= endX; ++x) {
                var alpha = f23(x, y) / f23(v1NDCPos.x, v1NDCPos.y);
                var beta = f31(x, y) / f31(v2NDCPos.x, v2NDCPos.y);
                var gamma = f12(x, y) / f12(v3NDCPos.x, v3NDCPos.y);

                if(alpha > 0 && beta > 0 && gamma > 0) {
                    // Interpolate attributes
                    var oneOverW = alpha / w1 + beta / w2 + gamma / w3;
                    var varyings = {};
                    if (vertex1.position) {
                        var v1 = vertex1.position.clone().scale(alpha / w1);
                        var v2 = vertex2.position.clone().scale(beta / w2);
                        var v3 = vertex3.position.clone().scale(gamma / w3);
                        varyings.position = new Vec4();
                        varyings.position.add(v1).add(v2).add(v3).scale(1 / oneOverW);
                    }
                    if (vertex1.color) {
                        var v1 = vertex1.color.clone().scale(alpha / w1);
                        var v2 = vertex2.color.clone().scale(beta / w2);
                        var v3 = vertex3.color.clone().scale(gamma / w3);
                        varyings.color = new Vec4();
                        varyings.color.add(v1).add(v2).add(v3).scale(1 / oneOverW);
                    }
                    if (vertex1.uv) {
                        var v1 = vertex1.uv.clone().scale(alpha / w1);
                        var v2 = vertex2.uv.clone().scale(beta / w2);
                        var v3 = vertex3.uv.clone().scale(gamma / w3);
                        varyings.uv = new Vec2();
                        varyings.uv.add(v1).add(v2).add(v3).scale(1 / oneOverW);
                    }

                    var color = this.curShader.ps(varyings);
                    this.drawPixel(x, y, varyings.position.z / varyings.position.w, color.x, color.y, color.z);
                    pixNum++;
                }
            }
    },
    draw: function(node, camera, wireframe) {
        if (this.curShader) {
            node.tranverse( (curNode)=> {
                var mesh = curNode.mesh;
                if (!mesh) return;
                this.curShader.worldMatrix = curNode.getWorldMatrix();
                this.curShader.viewportMatrix = this.viewportMatrix;
                this.curShader.projMatrix = camera.projMatrix;
                this.curShader.viewMatrix = camera.viewMatrix;
                this.curShader.diffuseTexture = this.curTexture;
                var outVertexAttributes = [];
                for (var n = 0; n < mesh.vertexCount; n++) {
                    var vAttribute = {
                        position: new Vec4(mesh.position[n * 3], mesh.position[n * 3 + 1], mesh.position[n * 3 + 2], 1.0)
                    }
                    if (mesh.color)
                        vAttribute.color =  new Vec4(mesh.color[n * 3],mesh.color[n * 3 + 1],mesh.color[n * 3 + 2], 1.0);
                    if (mesh.uv)
                        vAttribute.uv = new Vec2(mesh.uv[n * 2],mesh.uv[n * 2 + 1]);
                    if (mesh.normal)
                        vAttribute.normal = new Vec3(mesh.normal[n * 3],mesh.normal[n * 3 + 1],mesh.normal[n * 3 + 2]);
                    outVertexAttributes.push(this.curShader.vs(vAttribute));
                }
                var triangleCount = mesh.vertexCount / 3;
    
                for(var triangleIndex = 0; triangleIndex < triangleCount; ++triangleIndex) {
                    var v1 = outVertexAttributes[3 * triangleIndex];
                    var v2 = outVertexAttributes[3 * triangleIndex + 1];
                    var v3 = outVertexAttributes[3 * triangleIndex + 2];
            
                    this.drawTriangle(v1, v2, v3, wireframe);
                }
            });
        }
    },
    swapBuffer: function() {
        var data = this.frontImageData.data;

        for (var pixelIndex = 0; pixelIndex < data.length;) {
            data[pixelIndex] = 255 * this.framebuffer[pixelIndex];;
            ++pixelIndex;
            data[pixelIndex] = 255 * this.framebuffer[pixelIndex];
            ++pixelIndex;
            data[pixelIndex] = 255 * this.framebuffer[pixelIndex];
            ++pixelIndex;
            data[pixelIndex] = 255;
            ++pixelIndex;
        }
        this.canvasContext.putImageData(this.frontImageData, 0, 0);
    },
    setShader: function(s) {
        this.curShader = s;
    },
    setTexture: function(t) {
        this.curTexture = t;
    }
});