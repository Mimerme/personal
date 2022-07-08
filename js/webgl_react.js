import React from 'react'
import WebGL from './lib/webgl.js';

// Hooks into a bunch of browser JS and React stuff
export class Game extends React.Component{
    constructor(props){
        super(props);

        this.canvas = React.createRef();
        // Create a state for the Game Component
        this.state = {
            width:window.innerWidth,
            height:window.innerHeight,
        };

        // gl context is set after added to the DOM
        this.gl = null;

        // Register callback functions here

        // Window Event Handlers
        window.onresize = function(){
            console.log("yo");
            let w = window.innerWidth;
            let h = window.innerHeight;
            this.setState((prev) => ({...prev,width:w,height:h}));

            this.gl = new WebGL(this.canvas.current);
            this.glInit(this.gl.ctx);
            this.gl.start_anim(this.glRender.bind(this));
            this.onLoad();

        }.bind(this);
    }


    render(){
        window.onresize.bind(this);
        return (<canvas ref={this.canvas} 
            width={this.state.width} height={this.state.height} 
            onWheel={this.onWheel.bind(this)}></canvas>);
    }

    // The canvas Ref will be created by this point in the lifecycle
    componentDidMount(){
        this.gl = new WebGL(this.canvas.current);
        this.glInit(this.gl.ctx);
        this.gl.start_anim(this.glRender.bind(this));
        this.onLoad();
    }

    onWheel(){
        throw "Needs implementation";
    }

    onLoad(){
        throw "Needs implementation";
    }

    glInit(gl){
        throw "Needs implementation";
    }

    glRender(gl, delta){
        throw "Needs implementation";
    }

    glClean(){
        throw "Needs implementation";
    }

}


// Reimplementation of the above with hooks
// export function GameFunctional(props){
//     return (<canvas ref={this.canvas_ref} 
//         width={this.state.width} height={this.state.height}></canvas>);
// }