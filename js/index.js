import("../pkg/index.js").catch(console.error);
import { createRoot } from 'react-dom/client';
import {webgl_support} from './webgl.js';
import Game from './webgl_react.js'
import React from 'react'

function HalfLifeAnimation(props){
    return (
        <>
        </>
    )
}

function ProcGenAnimation(props){
    return (
        <Game>
            {
                function(gl, delta){
                    gl.clearColor(0.0, 0.0, 0.0, 1.0);
                    gl.clear(gl.COLOR_BUFFER_BIT);
                }
            }
        </Game>
    );
}

function App() {
    if (webgl_support()){
        console.log("WebGL supported :)");
        return (<ProcGenAnimation/>)
    }
    else {
        console.log("WebGL not supported :(");
        return (<HalfLifeAnimation/>);
    }
}

// Init Code Here
const div_root = document.createElement("div");
document.body.appendChild(div_root);
const root = createRoot(div_root);
root.render(<App />);