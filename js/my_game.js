import { static_webgl_buffer, dynamic_webgl_buffer } from './webgl';
const vertShader = require('./glsl/vert.glsl');
const fragShader = require('./glsl/frag.glsl');

export function init(gl, delta){
    // this function is called from React.Component.render() so this needs to be done
    this.setState(prev => ({...prev, init:true}));

    // Initialize OpenGL features here
    gl.clearColor(0.5,0.5, 0.5, 1);
    gl.disable(gl.BLEND);
    gl.stencilMask(gl.FALSE);
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(gl.TRUE);

    console.log("Uploading Shaders...");
    let vert = gl.createShader(gl.VERTEX_SHADER);
    let frag = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vert, vertShader);
    gl.shaderSource(frag, fragShader);

    console.log("Compiling Shaders...");
    gl.compileShader(vert);
    gl.compileShader(frag);

    // Check if the shaders compile
    let vertMsg = gl.getShaderInfoLog(vert);
    let fragMsg = gl.getShaderInfoLog(frag);

    if (vertMsg.length > 0) {
        throw vertMsg;
    }
    if (fragMsg.length > 0) {
        throw fragMsg;
    }


    this.program = gl.createProgram();
    gl.attachShader(this.program, vert);
    gl.attachShader(this.program, frag);
    gl.linkProgram(this.program);

    // Check if the program links properly
    let programMsg = gl.getProgramInfoLog(this.program);
    if (programMsg.length > 0) {
        throw programMsg;
    }

    gl.deleteShader(vert);
    gl.deleteShader(frag);

    console.log("Setting up render pipeline...");

    let verts = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0];
    this.lineVertBuf = static_webgl_buffer(gl, verts, gl.ARRAY_BUFFER);
    let posAttr = gl.getAttribLocation(this.program, "position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, gl.FALSE, 0, 0);

    this.fbos = [];
    //this.fbos[0] = gl.createFramebuffer();

    console.log("WebGL Game initialized");
}

export function render(gl, delta){
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Begin running the render pipeline here
    gl.useProgram(this.program);
    // Virst vert
    gl.bindBuffer(gl.ARRAY_BUFFER, this.lineVertBuf);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

export function clean(gl){
    gl.deleteBuffer(this.lineVertBuf);
    for (let f in gl.fbos){
        gl.deleteFramebuffer(f);
    }
}