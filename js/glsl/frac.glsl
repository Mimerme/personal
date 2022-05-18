//https://gpfault.net/posts/mandelbrot-webgl.txt.html

/* Fragment shader that renders Mandelbrot set */
precision mediump float;

/* Width and height of screen in pixels */ 
uniform vec2 u_resolution;

/* Point on the complex plane that will be mapped to the center of the screen */
uniform vec2 u_zoomCenter;

/* Distance between left and right edges of the screen. This essentially specifies
which points on the plane are mapped to left and right edges of the screen.
Together, u_zoomCenter and u_zoomSize determine which piece of the complex
plane is displayed. */
uniform float u_zoomSize;

/* How many iterations to do before deciding that a point is in the set. */
uniform int u_maxIterations;

// vec2 f(vec2 z, vec2 c) {
// 	return mat2(z,-z.y,z.z)*z + c;
// }

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    /* Decide which point on the complex plane this fragment corresponds to.*/
    vec2 c = u_zoomCenter + (uv * 4.0 - vec2(2.0)) * (u_zoomSize / 4.0);
    gl_FragColor = vec4(1.0,0.0,1.0,1.0);
}