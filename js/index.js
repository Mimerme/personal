import("../pkg/index.js").catch(console.error);
import { createRoot } from 'react-dom/client';
import {WebGL, hashCode, GLUtils} from './lib/webgl.js';
import SeedRandom from './lib/seed_random.js';
import Game from './webgl_react.js'
import {React, useState, useEffect} from 'react'
import {init, render, clean, MyGame} from './toys/my_game.js'
import {FractalAnimationComponent} from './toys/fractal_animation.js'
import './konami.js';


import Debug from './components/debug.js'
import Projects from './components/projects.js'
import Profile from './components/profile.js'
import TopBar from './components/topbar.js'


// Psuedo-Randomly selects a background animation  
function AnimationComponent(props){
    // Put new background animations here whenever
    const animations = [];

    if (GLUtils.webgl_support()){
        console.log("WebGL supported :)");
        animations.push(<FractalAnimationComponent/>);
    }

    // Randomly select a random seed
    let seed = props.seed;
    let rng = new SeedRandom();
    let random = Math.floor(rng.randomWithSeed(seed) * animations.length);
    return animations[random];
}

// Init Code Here
function App(props) {
    let seed = SeedRandom.hashCode(props.seed);

    return (
    <>
        <TopBar/>
        <Debug debug={props.debug}/>
        <Profile random={new SeedRandom()} seed={seed} fullname="Andros Yang" title="IT Analyst @ Deloitte" subtitle="Full Stack Dev @ Night" desc="Maker of things, master of none. That computer 💻 thing seems pretty neat, I wonder what I can do with it."/>
        <AnimationComponent seed={seed}/>
    </>);
}

const div_root = document.createElement("div");
document.body.appendChild(div_root);
const root = createRoot(div_root);
root.render(<App debug="false" seed="69420"/>);
console.log("Wuzz Gud. Here's some console stuff to debug the animation and website\n");