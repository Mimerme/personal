import React from 'react'
import WebGL from './webgl.js';

// Hooks into a bunch of browser JS and React stuff
export default class Game extends React.Component{
    constructor(props){
        super(props);
        this.canvas_ref = React.createRef();
        this.state = {width:window.innerWidth,height:window.innerHeight};
        this.gl = null;


        this.render_function = props.children;

        // Window Event Handlers
        window.onresize = function(){
            let w = window.innerWidth;
            let h = window.innerHeight;
            this.setState({width:w,height:h});
        }.bind(this);
    }

    render(){
        return (<canvas ref={this.canvas_ref} 
            width={this.state.width} height={this.state.height}></canvas>);
    }

    componentDidMount(){
        console.log(this.canvas_ref);
        this.gl = new WebGL(this.canvas_ref.current);
        this.gl.start_anim(this.render_function);
    }
}
