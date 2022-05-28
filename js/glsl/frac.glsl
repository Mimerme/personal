/* Fragment shader that renders Mandelbrot set */
precision mediump float;

// From https://hturan.com/writing/complex-numbers-glsl
// From https://github.com/julesb/glsl-util

#define PI 3.14159265

#define cx_mul(a, b) vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x)
// #define cx_div(a, b) vec2(((a.x*b.x + a.y*b.y)/(b.x*b.x + b.y*b.y)),((a.y*b.x - a.x*b.y)/(b.x*b.x + b.y*b.y)))
// #define cx_sin(a) vec2(sin(a.x) * cosh(a.y), cos(a.x) * sinh(a.y))
// #define cx_cos(a) vec2(cos(a.x) * cosh(a.y), -sin(a.x) * sinh(a.y))

// vec2 as_polar(vec2 z) {
//     return vec2(
//         length(z),
//         atan(z.y, z.x)
//     );
// }

// vec2 cx_tan(vec2 a) {return cx_div(cx_sin(a), cx_cos(a)); }
// vec2 cx_log(vec2 a) {
//     vec2 polar = as_polar(a);
//     float rpart = polar.x;
//     float ipart = polar.y;
//     if (ipart > PI) ipart=ipart-(2.0*PI);
//     return vec2(log(rpart),ipart);
// }
// vec2 cx_pow(vec2 v, float p) {
//     vec2 z = as_polar(v);
//     return pow(z.x, p) * vec2(cos(z.y * p), sin(z.y * p));
// }


/* Width and height of screen in pixels */ 
uniform vec2      u_resolution;
uniform float     u_time;                 // shader playback time (in seconds)
uniform float     u_timeDelta;            // render time (in seconds)
uniform int       u_frame;                // shader playback frame

uniform vec2 u_zoom;



/* Point on the complex plane that will be mapped to the center of the screen */
//uniform vec2 u_zoomCenter;

/* Distance between left and right edges of the screen. This essentially specifies
which points on the plane are mapped to left and right edges of the screen.
Together, u_zoomCenter and u_zoomSize determine which piece of the complex
plane is displayed. */
//uniform float u_zoomSize;

const int threshold = 100;
const vec2 realX = vec2(-0.22, -0.219);
const vec2 imagY = vec2(-0.70,-0.699);

// This is the meat that creates the visualization 
int iterTillDiverge(vec2 c){
    vec2 z = vec2(0,0);

    int j;
    for(int i=0;i<threshold;i++){
        z = cx_mul(z, z) + c;

        //  Magnitude of the complex number
        if(length(z) > 4.0){
            return i;
        }
        j++;
    }
    return j;
}

// Given a bounded axis and the ratio of the distance from the start
// Get the position
float axisRatio(vec2 axis, float ratio){
    float length = axis.y - axis.x;
    return axis.x + length * ratio;
}

// PREDEFINED FIELDS
//mediump vec4 gl_FragCoord;
//bool gl_FrontFacing;
//mediump vec2 gl_PointCoord;
//out vec4 gl_FragColor;
//mediump vec4 gl_FragData[n]

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    int res = iterTillDiverge(gl_FragCoord.xy);


    // vec2 zoomX = realX + vec2(-u_zoom.x,+u_zoom.x);
    // vec2 zoomY = imagY + vec2(-u_zoom.y,+u_zoom.y);

    // vec2 zoomX = realX - vec2((-0.01 * float(u_frame)),(0.01*float(u_frame)));
    // vec2 zoomY = imagY - vec2(-0.01 * float(u_frame),+0.01*float(u_frame));
    vec2 zoomX = realX * (float(u_frame) / 1000.0);
    vec2 zoomY = imagY * (float(u_frame) / 1000.0);

    vec2  pt = vec2(axisRatio(zoomX, uv.x), axisRatio(zoomY, uv.y));
    float ret = (float(iterTillDiverge(pt)) / float(threshold));

    gl_FragColor = vec4(ret,ret,ret,1.0-ret);
}