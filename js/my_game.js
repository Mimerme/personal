import { BufferUtils, ShaderUtils, UniformUtils } from './lib/webgl';


export function init(gl, delta) {
    // Initialize React.Component State and flag that Vanilla is initialized
    // STATE LAYOUT
    /*{
        width:...,
        height:...,
        init:...,
    }*/
    this.setState(prev => ({ ...prev, init: true }));
    //this.setState(prev => ({...prev, width}));

    // Initialize OpenGL features here
    gl.clearColor(0.5, 0.5, 0.5, 1);
    gl.disable(gl.BLEND);
    gl.stencilMask(gl.FALSE);
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(gl.TRUE);

    console.log("Uploading Shaders...");
    let vert = gl.createShader(gl.VERTEX_SHADER);
    let frag = gl.createShader(gl.FRAGMENT_SHADER);
    let frac_frag = gl.createShader(gl.FRAGMENT_SHADER);

    const vertShader = require('./glsl/vert.glsl');
    const fragShader = require('./glsl/frag.glsl');
    const fracShader = require('./glsl/frac.glsl');


    gl.shaderSource(vert, vertShader);
    gl.shaderSource(frag, fragShader);
    gl.shaderSource(frac_frag, fracShader);

    console.log("Compiling Shaders...");
    gl.compileShader(vert);
    gl.compileShader(frag);
    gl.compileShader(frac_frag);

    ShaderUtils.checkShaderErrors(gl, [vert, frag, frac_frag]);

    // // Check if the shaders compile
    // let vertMsg = gl.getShaderInfoLog(vert);
    // let fragMsg = gl.getShaderInfoLog(frag);

    // if (vertMsg.length > 0) {
    //     throw vertMsg;
    // }
    // if (fragMsg.length > 0) {
    //     throw fragMsg;
    // }


    this.program = gl.createProgram();
    gl.attachShader(this.program, vert);
    gl.attachShader(this.program, frac_frag);
    gl.linkProgram(this.program);

    // Check if the program links properly
    let programMsg = gl.getProgramInfoLog(this.program);
    if (programMsg.length > 0) {
        throw programMsg;
    }

    ShaderUtils.deleteShaders(gl, [vert, frag, frac_frag]);
    // gl.deleteShader(vert);
    // gl.deleteShader(frag);

    console.log("Setting up render pipeline...");

    // let verts = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 
    //             1.0, -1.0, 1.0, 1.0, 1.0, -1.0];
    let verts = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
                -1.0, 1.0, 1.0, 1.0, 1.0, -1.0];
    this.lineVertBuf = BufferUtils.static_webgl_buffer(gl, verts, gl.ARRAY_BUFFER);
    let posAttr = gl.getAttribLocation(this.program, "position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, gl.FALSE, 0, 0);

    this.fbos = [];
    //this.fbos[0] = gl.createFramebuffer();

    console.log("WebGL Game initialized");
}

let frameCount = 0;
let runTime = 0.0;

export function render(gl, delta) {
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Begin running the render pipeline here
    gl.useProgram(this.program);
    UniformUtils.setUniform(gl, this.program, "u_resolution", new Float32Array([this.state.width, this.state.height]), gl.uniform2fv);
    UniformUtils.setUniform(gl, this.program, "u_time", Math.fround(runTime), gl.uniform1f);
    UniformUtils.setUniform(gl, this.program, "u_timeDelta", Math.fround(0.0), gl.uniform1f);
    UniformUtils.setUniform(gl, this.program, "u_frame", Math.fround(frameCount), gl.uniform1i);
    UniformUtils.setUniform(gl, this.program, "u_zoom", new Float32Array([0.5, 0.5]), gl.uniform2fv);

    // Virst vert
    gl.bindBuffer(gl.ARRAY_BUFFER, this.lineVertBuf);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    frameCount += 1;
    runTime += delta;
}

export function clean(gl) {
    gl.deleteBuffer(this.lineVertBuf);
    for (let f in gl.fbos) {
        gl.deleteFramebuffer(f);
    }
}