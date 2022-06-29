export class GLUtils{
    static webgl_support() {
        try {
            var canvas = document.createElement('canvas');
            return !!window.WebGLRenderingContext &&
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        } catch (e) {
            return false;
        }
    }

    // TODO; idk. I don't nthink this works
    // static webgl2_support() {
    //     try {
    //         var canvas = document.createElement('canvas');
    //         return !!window.WebGLRenderingContext &&
    //             (canvas.getContext('webgl2'));
    //     } catch (e) {
    //         return false;
    //     }
    // }
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

export class ShaderUtils{
    static deleteShaders(gl, shaders){
        for (const s of shaders){
            gl.deleteShader(s);
        }
    }


    static checkShaderErrors(gl,shaders){
        for (const s of shaders){
            let msg = gl.getShaderInfoLog(s);
            if (msg.length > 0) {
                throw msg;
            }
        }
    }
}

export class BufferUtils{
    static static_webgl_buffer(gl, data, type){
        let buf = gl.createBuffer();
        gl.bindBuffer(type,buf);
        gl.bufferData(type, new Float32Array(data), gl.STATIC_DRAW);
        return buf;
    }

    static dynamic_webgl_buffer(gl, data, type){
        let buf = gl.createBuffer();
        gl.bindBuffer(type,buf);
        gl.bufferData(type, new Float32Array(data), gl.DYNAMIC_DRAW);
        return buf;
    }
}

//https://stackoverflow.com/questions/31049910/setting-uniforms-in-webgl
export class UniformUtils{
    static setUniform(gl, program, name, data, type_function){
        let loc =gl.getUniformLocation(program, name);
        type_function.bind(gl)(loc, data);
    }
}

