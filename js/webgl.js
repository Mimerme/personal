export function webgl_support() {
    try {
        var canvas = document.createElement('canvas');
        return !!window.WebGLRenderingContext &&
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
        return false;
    }
}

export default class WebGL{
    constructor(canvas){
        this.ctx = canvas.getContext('webgl');
        this.last_frame = null;
    }

    start_anim(game_render){
        let draw_frame = function(timestamp){
            if (this.last_frame == null)
            {
                this.last_frame = timestamp;
            }

            let delta = timestamp - this.last_frame;
            game_render(this.ctx, delta / 1000);
            this.last_frame = timestamp;

            requestAnimationFrame(draw_frame);
        }.bind(this);

        requestAnimationFrame(draw_frame);
    }

}

export function static_webgl_buffer(gl, data, type){
    let buf = gl.createBuffer();
    gl.bindBuffer(type,buf);
    gl.bufferData(type, new Float32Array(data), gl.STATIC_DRAW);
    return buf;
}

export function dynamic_webgl_buffer(gl, data, type){
    let buf = gl.createBuffer();
    gl.bindBuffer(type,buf);
    gl.bufferData(type, new Float32Array(data), gl.DYNAMIC_DRAW);
    return buf;
}


export function hashCode(s) {
    for(var i = 0, h = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    return h;
}