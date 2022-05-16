import("../pkg/index.js").catch(console.error);
import { createRoot } from 'react-dom/client';
import {webgl_support, hashCode} from './webgl.js';
import SeedRandom from './seed_random.js';
import Game from './webgl_react.js'
import {React, useState} from 'react'
import {init, render, clean} from './my_game.js'
import Debug from './components/debug.js'
import Profile from './components/profile.js'

function HalfLifeAnimation(props){
    return (
        <>
        </>
    )
}

function ProcGenAnimation(props){
    return (
        <>
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

    return (
    <>
        <Debug debug={props.debug}/>
        <Profile random={new SeedRandom()} seed={hashCode(props.seed)}/>
        <Animation/>
    </>);
}

// Init Code Here
const div_root = document.createElement("div");
document.body.appendChild(div_root);
const root = createRoot(div_root);
root.render(<App debug="false" seed="69420"/>);