precision highp float;
attribute vec2 a_position;
attribute vec3 a_color;

varying vec4 fragColor;

void main() {
    gl_Position = vec4(a_position,0.0,1.0);
    fragColor = vec4(0.0,0.0,0.0,0.0);
}