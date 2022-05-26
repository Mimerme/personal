import("../pkg/index.js").catch(console.error);
import { createRoot } from 'react-dom/client';
import {WebGL, hashCode, GLUtils} from './lib/webgl.js';
import SeedRandom from './lib/seed_random.js';
import Game from './webgl_react.js'
import {React, useState, useEffect} from 'react'
import {init, render, clean} from './my_game.js'
import Debug from './components/debug.js'
import Profile from './components/profile.js'

function Particle(props){
    let cssTransform = [];

    return(
        <svg viewbox="0 0 50.5 0.5" class="gameobject" style={cssTransform}>
            <path d="M 0 0 L 50 0" stroke="#000" stroke-width="0.5"/>
        </svg>
    );
}

function HalfLifeAnimation(props){
    // Randomly start the partical loops
    let random = Math.random();

    // Based on the performance of the machine adjust the number of rendered particles
    let particleCount = props.count;
    let x = props.startX;
    let y = props.startY;
    let z = props.startZ;

    let [particles, setParticles] = useState([]);
    for (x in Array(particleCount).keys()) {
        particles.append(<Particle x={x} y={y} z={z}/>);
    }
    setParticles(particles);

    return ({
            particles 
    });
}

// The Game component is the bridge between the React event loop and WebGL graphics layer
function FractalAnimation(props){
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
    // NOTE: Wrapping these promises within a functional React.Component will create new ones every render()
    //navigator.getBattery().then((battery) => {
    //})
    // useEffect is the best option to avoid this
    // A general rule of thumb is that async functions in React go into useEffect becuz React is asyncronisly designed
    let [batLevel, setBatLevel] = useState(1.0);
    useEffect(() => {
        async function getBatLevel(){
            let battery = await navigator.getBattery();
            setBatLevel(battery.level);
        }
        getBatLevel();
    },[]);
    
    if (GLUtils.webgl_support()){
        console.log("WebGL supported :)");

        console.log(batLevel);
        if (batLevel <= 0.25){
            console.log("Battery too low. Running SVG animation");
            return (<HalfLifeAnimation/>)
        }
        return (<FractalAnimation/>)
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
        <Profile random={new SeedRandom()} seed={SeedRandom.hashCode(props.seed)}/>
        <Animation/>
    </>);
}

// Init Code Here
const div_root = document.createElement("div");
document.body.appendChild(div_root);
const root = createRoot(div_root);
root.render(<App debug="false" seed="69420"/>);

console.log("Wuzz Gud. Here's some console stuff to debug the animation and website\n");