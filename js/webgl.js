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