import {React, useState, useEffect} from 'react'
import {MyGame} from './my_game.js'

// The Game component is the bridge between the React event loop and WebGL graphics layer
export function FractalAnimationComponent(props){
    return (
        <>
            <MyGame/>
        </>
    );
}