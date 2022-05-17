import React from 'react'
import WebGL from './webgl.js';

// Hooks into a bunch of browser JS and React stuff
export default class Game extends React.Component{
    constructor(props){
        super(props);
        this.canvas_ref = React.createRef();
        this.state = {
            width:window.innerWidth,
            height:window.innerHeight,
            init: false
        };
        this.gl = null;

        // Register callback functions here
        this.render_function = props.children.bind(this);

        // Window Event Handlers
        window.onresize = function(){
            let w = window.innerWidth;
            let h = window.innerHeight;
            this.setState((prev) => ({...prev,width:w,height:h}));
        }.bind(this);
    }


    render(){
        return (<canvas ref={this.canvas_ref} 
            width={this.state.width} height={this.state.height}></canvas>);
    }

    componentDidMount(){
        this.gl = new WebGL(this.canvas_ref.current);
        this.gl.start_anim(this.render_function);
    }
}


// Reimplementation of the above with hooks
export function GameFunctional(props){
    return (<canvas ref={this.canvas_ref} 
        width={this.state.width} height={this.state.height}></canvas>);
}