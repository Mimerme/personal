import("../pkg/index.js").catch(console.error);
import { createRoot } from 'react-dom/client';
import {webgl_support} from './webgl.js';
import Game from './webgl_react.js'
import {React, useState} from 'react'
import {init, render, clean} from './my_game.js'

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
                            init.bind(this)(gl, delta);
                        }

                        // if(delta >= 0.017){
                        //     console.warn("WebGL animation slow down :'(");
                        // }
                        render.bind(this)(gl, delta);
                    }
                }
            </Game>
        </>
    );
}

function SplashMsg(props){
    // Returns either 0, 1, or 2
    let type = Math.floor(Math.random() * 3);
    const splashes = ["Do-oer of things"];

    switch(type){
        // Interface with GitHub
        case 0:
            // Check cookies for cache
            return (<h2>
                GitHub
            </h2>);
        // Latest tweet
        case 1:
            // Check cookies for cache
            return (<h2>
                Tweet
            </h2>);
        // Random text msg
        case 2:
            let r = Math.floor(Math.random() * splashes.length);
            return (<h2>
                {splashes[r]}
            </h2>);
    }
}

function Profile(props){
    return (
    <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%'
    }}>
        <h1>Andros Yang</h1>
        <SplashMsg/>
    </div>
    );
}

function Debug(props){
    return (<div style={{position:'absolute'}}>

    </div>);
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