// Scene options
var sceneOptions = {
    shapeCreationPerSecond: 2,
    shapeCreationInterval: 0,
    gravity: 30,
    viewWidth: 900,
    viewHeight: 500,
    viewBgColor: 0xEEEEEE,
    shapesSizes: 40
}
sceneOptions.shapeCreationInterval = 1000 / sceneOptions.shapeCreationPerSecond;

// Shape class
class FallingShape {
    constructor(x, y, speed, type, color, size, angle) {
        this.type = type;
        this.speed = speed;
        this.angle = angle;
        this.surfacearea = 0;
        this.renderObject = this.CreateShape(type, color, size);
        this.renderObject.x = x;
        this.renderObject.y = y;
        this.renderObject.obj = this;
        
        this.renderObject.interactive = true;
        this.renderObject.on('pointerdown', function() {
            shapeClicked(this);
        });
    }
    
    CreateShape(type, color, size) {
        var graphics = new PIXI.Graphics();
        
        // create 3 sides
        if (type == 0) {
            graphics.lineStyle(0);
            graphics.beginFill(color, 1);
            graphics.drawPolygon(this.GetPolygonVertices(3, size));
            graphics.endFill();
            this.surfacearea = 3 / 2 * size * size * Math.sin( (2 * Math.PI) / 3);
        }
        
        // create 4 sides
        if (type == 1) {
            graphics.lineStyle(0);
            graphics.beginFill(color, 1);
            graphics.drawPolygon(this.GetPolygonVertices(4, size));
            graphics.endFill();
            this.surfacearea = 4 / 2 * size * size * Math.sin( (2 * Math.PI) / 4);
        }
        
        // create 5 sides
        if (type == 2) {
            graphics.lineStyle(0);
            graphics.beginFill(color, 1);
            graphics.drawPolygon(this.GetPolygonVertices(5, size));
            graphics.endFill();
            this.surfacearea = 5 / 2 * size * size * Math.sin( (2 * Math.PI) / 5);
        }
        
        // create 6 sides
        if (type == 3) {
            graphics.lineStyle(0);
            graphics.beginFill(color, 1);
            graphics.drawPolygon(this.GetPolygonVertices(6, size));
            graphics.endFill();
            this.surfacearea = 6 / 2 * size * size * Math.sin( (2 * Math.PI) / 6);
        }
        
        // create circle
        if (type == 4) {
            graphics.lineStyle(0);
            graphics.beginFill(color, 1);
            graphics.drawCircle(0, 0, size);
            graphics.endFill();
            this.surfacearea = Math.PI * size * size;
        }
        
        // create ellipse
        if (type == 5) {
            graphics.lineStyle(0);
            graphics.beginFill(color, 1);
            graphics.drawEllipse(0, 0, size, size * 0.6);
            graphics.endFill();
            this.surfacearea = Math.PI * size * size * 0.6;
        }
        
        // create randomized shape
        if (type >= 6) {
            graphics.lineStyle(0);
            graphics.beginFill(color, 1);
            
            var r1 = 0, r2 = 0;
            
            r1 = size; r2 = size * (Math.random() * 0.3 + 0.5);
            graphics.drawEllipse(0, 0, r1, r2);
            this.surfacearea += Math.PI * r1 * r2;
            
            r1 = size / (Math.random() + 1.5); r2 = size / (Math.random() * 0.3 + 1.5);
            graphics.drawEllipse(size / (Math.random() + 2), size / (Math.random() * 2 + 2), r1, r2);
            this.surfacearea += Math.PI * r1 * r2;
            
            r1 = size / (Math.random() + 1.5); r2 = size / (Math.random() + 1.7);
            graphics.drawEllipse(-size / (Math.random() + 2), size / (Math.random() + 3), r1, r2);
            this.surfacearea += Math.PI * r1 * r2;
            
            r1 = size / (Math.random() + 1.5); r2 = size / (Math.random() + 1.7);
            graphics.drawEllipse(-size / (Math.random() + 2), -size / (Math.random() + 2.2), r1, r2);
            this.surfacearea += Math.PI * r1 * r2;
            
            r1 = size / (Math.random() + 1.5); r2 = size / (Math.random() + 1.7);
            graphics.drawEllipse(size / (Math.random() + 2), -size / (Math.random() + 3.1), r1, r2);
            this.surfacearea += Math.PI * r1 * r2;

            graphics.endFill();
        }
        
        // rotate shape
        graphics.rotation = this.angle;
        
        // return shape
        return graphics;
    }
    
    GetPolygonVertices(sides, size) {
        var centerAng = 2*Math.PI / sides;
        var vertices = new Array();
        for (var i=0 ; i<sides ; i++) {
            var ang = i*centerAng;
            var vx = Math.round(size*Math.cos(ang));
            var vy = Math.round(size*Math.sin(ang)); 
            vertices.push(vx, vy);
        }
        return vertices;
    }
}

// make element sizes to match options
document.getElementById('main-game-container').style.width = sceneOptions.viewWidth + 'px';
document.getElementById('main-game-container').style.width = sceneOptions.viewWidth + 'px';
document.getElementById('render-zone').style.width = sceneOptions.viewWidth + 'px';
document.getElementById('render-zone').style.height = sceneOptions.viewHeight + 'px';

// show gravity and creation interval values
document.getElementById('creation-interval-val').innerHTML = sceneOptions.shapeCreationPerSecond;
document.getElementById('gravity-val').innerHTML = sceneOptions.gravity;

// add buttons events
document.getElementById('creation-interval-plus').addEventListener('click', function(e){
    e.preventDefault();
    sceneOptions.shapeCreationPerSecond += 1;
    if (sceneOptions.shapeCreationPerSecond > 60) sceneOptions.shapeCreationPerSecond = 60;
    sceneOptions.shapeCreationInterval = 1000 / sceneOptions.shapeCreationPerSecond;
    document.getElementById('creation-interval-val').innerHTML = sceneOptions.shapeCreationPerSecond;
});
document.getElementById('creation-interval-minus').addEventListener('click', function(e){
    e.preventDefault();
    sceneOptions.shapeCreationPerSecond -= 1;
    if (sceneOptions.shapeCreationPerSecond < 1) sceneOptions.shapeCreationPerSecond = 0;
    sceneOptions.shapeCreationInterval = 1000 / sceneOptions.shapeCreationPerSecond;
    document.getElementById('creation-interval-val').innerHTML = sceneOptions.shapeCreationPerSecond;
});
document.getElementById('gravity-plus').addEventListener('click', function(e){
    e.preventDefault();
    sceneOptions.gravity += 5;
    document.getElementById('gravity-val').innerHTML = sceneOptions.gravity;
});
document.getElementById('gravity-minus').addEventListener('click', function(e){
    e.preventDefault();
    sceneOptions.gravity -= 5;
    if (sceneOptions.gravity < 5) sceneOptions.gravity = 5;
    document.getElementById('gravity-val').innerHTML = sceneOptions.gravity;
});

// create main scene for rendering
var mainContainer = document.getElementById('render-zone');
const app = new PIXI.Application({
    width: sceneOptions.viewWidth,
    height: sceneOptions.viewHeight,
    backgroundColor: sceneOptions.viewBgColor
});
mainContainer.appendChild(app.view);

// store time from last shape auto-created
var timeFromLastShapeCreation = 0;

// make calculations every frame
app.ticker.add(function(delta) {
    // create new shape if needed
    timeFromLastShapeCreation += app.ticker.elapsedMS;
    if (timeFromLastShapeCreation > sceneOptions.shapeCreationInterval) {
        timeFromLastShapeCreation = 0;
        createNewShape();
    }
    
    // surface area summ
    var surfaceSumm = 0;
    
    // calculate shapes movements and surface area
    for (childId in app.stage.children) {
        var thisChild = app.stage.children[childId];
        thisChild.obj.speed += sceneOptions.gravity * 0.001;
        thisChild.position.y += delta * thisChild.obj.speed;
        
        // remove child if fallen to low or add its surface area to summ
        if (thisChild.position.y > sceneOptions.viewHeight + sceneOptions.shapesSizes) {
            app.stage.removeChild(thisChild);
        } else {
            surfaceSumm += thisChild.obj.surfacearea;
        }
    }
    
    // update counters
    document.getElementById('shapes-counter').innerHTML = 'Shapes: ' + app.stage.children.length;
    document.getElementById('surface-area-counter').innerHTML = 'Surface: ' + Math.round(surfaceSumm) + ' sq. px';
});

// add stage click interaction
app.renderer.plugins.interaction.on('pointerdown', function(e) {
    if (e.target === null) {
        createNewShape({ x: e.data.global.x, y: e.data.global.y });
    }
});

// call on shape click
function shapeClicked(shape) {
    // remove shape
    app.stage.removeChild(shape);
    
    // change colors of same shapes
    for (childId in app.stage.children) {
        var thisChild = app.stage.children[childId];
        if (thisChild.obj.type === shape.obj.type) {
            thisChild.tint = '0x'+Math.random().toString(16).slice(2,8);
        }
    }
}

// add new shape so stage
function createNewShape(options) {
    options = Object.assign({
        x: Math.random() * (sceneOptions.viewWidth - 2 * sceneOptions.shapesSizes) + sceneOptions.shapesSizes,
        y: -sceneOptions.shapesSizes
    }, options);
    var newShape = new FallingShape(options.x, options.y, 0, Math.floor(Math.random()*7), '0x'+Math.random().toString(16).slice(2,8), sceneOptions.shapesSizes, Math.random()*Math.PI*2);
    app.stage.addChild(newShape.renderObject);
}