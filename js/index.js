import("../pkg/index.js").catch(console.error);
import { createRoot } from 'react-dom/client';
import {webgl_support} from './webgl.js';
import Game from './webgl_react.js'
import {React, useState} from 'react'
const vertShader = require('./glsl/vert.glsl');
const fragShader = require('./glsl/frag.glsl');


function static_webgl_buffer(gl, data, type){
    let buf = gl.createBuffer();
    gl.bindBuffer(type,buf);
    gl.bufferData(type, data, gl.STATIC_DRAW, 0);
    return buf;
}

function dynamic_webgl_buffer(gl, data, type){
    let buf = gl.createBuffer();
    gl.bindBuffer(type,buf);
    gl.bufferData(type, data, gl.DYNAMIC_DRAW, 0);
    return buf;
}

function HalfLifeAnimation(props){
    return (
        <>
        </>
    )
}

function ProcGenAnimation(props){
    return (
        <>
            <Profile/>
            <Game>
                {
                    // This function has the 'Game' React.Component ref bound as 'this'
                    // Thus, if the game needs to interact with React it uses .setState (debugging UI)
                    // Otherwise it can just use vanilla JS fields (OpenGL buffer bindings)
                    function(gl, delta){
                        let width = this.state.width;
                        let height = this.state.height;


                        if(!this.state.init){
                            this.setState(prev => ({...prev, init:true}));
                            console.log("Uploading Shaders...");
                            let vert = gl.createShader(gl.VERTEX_SHADER);
                            let frag = gl.createShader(gl.FRAGMENT_SHADER);

                            gl.shaderSource(vert, vertShader);
                            gl.shaderSource(frag, fragShader);

                            console.log("Compiling Shaders...");
                            gl.compileShader(vert);
                            gl.compileShader(frag);

                            this.program = gl.createProgram();
                            gl.attachShader(this.program, vert);
                            gl.attachShader(this.program, frag);
                            gl.linkProgram(this.program);

                            console.log("Setting up render pipeline...");

                            this.lineVertBuf = static_webgl_buffer(gl, [0,0,1,0], gl.ARRAY_BUFFER);

                            console.log("WebGL Game initialized");
                        }

                        // if(delta >= 0.017){
                        //     console.warn("WebGL animation slow down :'(");
                        // }

                        gl.clearColor(0.0, 0.0, 0.0, 1.0);
                        gl.clear(gl.COLOR_BUFFER_BIT);

                        gl.useProgram(this.program);
                        gl.bindBuffer(gl.ARRAY_BUFFER, this.lineVertBuf);
                        gl.drawArrays(gl.LINES, 0, 2);
                    }
                }
            </Game>
        </>
    );
}

function Profile(props){
}

function Debug(props){
}

function Animation(props){
    if (webgl_support()){
        console.log("WebGL supported :)");
        return (<ProcGenAnimation/>)
    }
    else {
        console.log("WebGL not supported :(");
        return (<HalfLifeAnimation/>);
    }
}

function App(props) {
    return (<>
        <Debug debug={props.debug}/>
        <Profile/>
        <Animation/>
    </>);
}

// Init Code Here
const div_root = document.createElement("div");
document.body.appendChild(div_root);
const root = createRoot(div_root);
root.render(<App debug="false"/>);