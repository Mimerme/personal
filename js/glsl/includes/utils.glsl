// From https://hturan.com/writing/complex-numbers-glsl
// From https://github.com/julesb/glsl-util

#define PI 3.14159265

#define cx_mul(a, b) vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x)
#define cx_div(a, b) vec2(((a.x*b.x + a.y*b.y)/(b.x*b.x + b.y*b.y)),((a.y*b.x - a.x*b.y)/(b.x*b.x + b.y*b.y)))
#define cx_sin(a) vec2(sin(a.x) * cosh(a.y), cos(a.x) * sinh(a.y))
#define cx_cos(a) vec2(cos(a.x) * cosh(a.y), -sin(a.x) * sinh(a.y))

vec2 as_polar(vec2 z) {
    return vec2(
        length(z),
        atan(z.y, z.x)
    );
}

vec2 cx_tan(vec2 a) {return cx_div(cx_sin(a), cx_cos(a)); }
vec2 cx_log(vec2 a) {
    vec2 polar = as_polar(a);
    float rpart = polar.x;
    float ipart = polar.y;
    if (ipart > PI) ipart=ipart-(2.0*PI);
    return vec2(log(rpart),ipart);
}
vec2 cx_pow(vec2 v, float p) {
    vec2 z = as_polar(v);
    return pow(z.x, p) * vec2(cos(z.y * p), sin(z.y * p));
}

//https://github.com/alexozer/glsl-arb-prec
#ifdef GL_ES
precision highp int;
#endif

/* integers per arbitrary-precision number */
const int vals = {{vals}}; // ints per value

/* power of 10 one larger than maximum value per int
   A value of 10000 seems to work the best
   */
const int limit = {{limit}};

const float limitFlt = float(limit);

int result[vals];

#define zero(x, len) for(int i=0;i<len;i++){x[i]=0;}
#define assign(x, y) for(int i=0;i<vals;i++){x[i]=y[i];}
#define negate(x) for(int i = 0; i < vals; i++) { x[i] = -x[i]; }

bool signp(int[vals] a) {
	return (a[vals-1] >= 0);
}

int keepVal, carry;

void roundOff(int x) {
	carry = x / limit;
	keepVal = x - carry * limit;
}

void add(int[vals] a, int[vals] b) {
	bool s1 = signp(a), s2 = signp(b);

	carry = 0;

	for(int i = 0; i < vals-1; i++) {
		roundOff(a[i] + b[i] + carry);

		if(keepVal < 0) {
			keepVal += limit;
			carry--;
		}

		result[i] = keepVal;
	}
	roundOff(a[vals-1] + b[vals-1] + carry);
	result[vals-1] = keepVal;
	
	if(s1 != s2 && !signp(result)) {
		negate(result);

		carry = 0;

		for(int i = 0; i < vals; i++) {
			roundOff(result[i] + carry);

			if(keepVal < 0) {
				keepVal += limit;
				carry--;
			}

			result[i] = keepVal;
		}

		negate(result);
	}
}

void mul(int[vals] a, int[vals] b) {
	bool toNegate = false;

	if(!signp(a)) {
		negate(a);
		toNegate = !toNegate;
	}
	if(!signp(b)) {
		negate(b);
		toNegate = !toNegate;
	}

	const int lenProd = (vals-1)*2+1;
	int prod[lenProd];
	zero(prod, lenProd);

	for(int i = 0; i < vals; i++) {
		for(int j = 0; j < vals; j++) {
			prod[i+j] += a[i] * b[j];
		}
	}

	carry = 0;
	const int clip = lenProd - vals;
	for(int i = 0; i < clip; i++) {
		roundOff(prod[i] + carry);
		prod[i] = keepVal;
	}

	if(prod[clip-1] >= limit/2) {
		carry++;
	}

	for(int i = clip; i < lenProd; i++) {
		roundOff(prod[i] + carry);
		prod[i] = keepVal;
	}

	for(int i = 0; i < lenProd - clip; i++) {
		result[i] = prod[i+clip];
	}

	if(toNegate) {
		negate(result);
	}
}

void loadFloat(float f) {
	for(int i = vals - 1; i >= 0; i--) {
		int fCurr = int(f);
		result[i] = fCurr;
		f -= float(fCurr);
		f *= limitFlt;
	}
}