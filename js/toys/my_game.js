import { BufferUtils, ShaderUtils, UniformUtils } from '../lib/webgl';
import { Game } from "../webgl_react.js";
import { tween } from 'shifty';
const TWEEN = require('@tweenjs/tween.js')


// Example of a React-WebGL game
export class MyGame extends Game {
    constructor(props) {
        super(props, {});
        // this.state.frameCount = 0;
        // this.state.runTime = 0.0;
        // this.state.zoom = [
        //     1.0,
        //     1.0
        // ];
        // this.state.customShader = "";
        this.frameCount = 0;
        this.runTime = 0.0;
        //  TODO: Only the first paremter is used since the mandelbrot set is normally visualized in such a viewport
        this.zoom = [1000.0, 1.0];
    }

    onLoad(){
        console.log("Test Game Loaded in Document");

        let iter = {var: this.zoom[0]};
        new TWEEN.Tween(iter)
            .to({var: -10001.0}, 10000 )
            .onUpdate(function(o){
                this.zoom[0] = o.var;
            }.bind(this))
            .easing(TWEEN.Easing.Exponential.InOut)
            .start()


    }

    onWheel(e){
        if(e.deltaY > 0) {
            // console.log('down');
            this.zoom[0] += 1;
            // this.setState((prev) => ({...prev, 
            //     zoom: [this.state.zoom[0] + 1,0.0]}));
        }else {
            // console.log('up');
            this.zoom[0] -= 1;
            // this.setState((prev) => ({...prev, 
            //     zoom: [this.state.zoom[0] - 1,0.0]}));
            // this.setState({...this.state, 
            //     zoom: [this.state.zoom[0] - 1,0.0]}
            // );
        }
        console.log(this.zoom);
    }

    glInit(gl) {
        // Initialize React.Component State and flag that Vanilla is initialized
        // STATE LAYOUT

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

        const vertShader = require('../glsl/vert.glsl');
        const fragShader = require('../glsl/frag.glsl');
        const fracShader = require('../glsl/frac.glsl');


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

    glRender(gl, delta) {
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Begin running the render pipeline here
        gl.useProgram(this.program);
        UniformUtils.setUniform(gl, this.program, "u_resolution", new Float32Array([this.state.width, this.state.height]), gl.uniform2fv);
        UniformUtils.setUniform(gl, this.program, "u_time", Math.fround(this.runTime), gl.uniform1f);
        UniformUtils.setUniform(gl, this.program, "u_timeDelta", Math.fround(0.0), gl.uniform1f);
        UniformUtils.setUniform(gl, this.program, "u_frame", Math.fround(this.frameCount), gl.uniform1i);
        //console.log(this.state)
        UniformUtils.setUniform(gl, this.program, "u_zoom", new Float32Array(this.zoom), gl.uniform2fv);

        // Virst vert
        gl.bindBuffer(gl.ARRAY_BUFFER, this.lineVertBuf);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        this.frameCount += 1;
        this.runTime += delta;
        // this.setState({...this.state, 
        //     frameCount: this.state.frameCount + 1,
        //     runTime: this.state.runTime + delta,
        // });
        console.log("hello");
        TWEEN.update();
    }
}