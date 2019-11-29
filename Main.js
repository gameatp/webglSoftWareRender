
window.onload = function() {
    var canvasContainer = this.document.getElementById('canvasContainer');
    var MainCanvas = document.getElementById("MainCanvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    MainCanvas.style.width = windowWidth + "px";
    MainCanvas.style.height = windowHeight + "px";

    var render = new ForwardRenderer(MainCanvas);
    var camera = new Camera();
    camera.setLookAt(new Vec3(0, 0, 5), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
    camera.setPerspective(90, windowWidth / windowHeight, 0.1, 1000);
    window.addEventListener("resize", function() {
        camera.setPerspective(90, canvasContainer.clientWidth / canvasContainer.clientHeight, 1, 100);
        render.resize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    });
    var texture = new Texture();
    texture.load("diffuseImage.png");
    render.setTexture(texture);
    var rootNode = new Node();
    var boxNode = new Node();
    boxNode.localPosition.y = 2;
    rootNode.addChild(boxNode);
    boxNode.mesh = Mesh.createBox();

    var triangleMesh = new Mesh([-1.0, -1, -1,
        1, -1, -1,
        -1, 1, -1], null, [1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 1, 1, 1]);

    var rotAngle = 0;
    function mainLoop() {
        render.clearColor(0.3, 0.3, 0.3, 1);
        render.clearDepth(1.0);
        rotAngle += 1;
        rootNode.localRotation.setFromEulerAngles(rotAngle, rotAngle, 0);
        render.draw(rootNode, camera, false);
        render.swapBuffer();
        requestAnimationFrame(mainLoop);
    }
    
    mainLoop();
 
}
