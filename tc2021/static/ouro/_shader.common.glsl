// Contains knowledge and code from
//  - https://www.shadertoy.com/view/4dS3Wd [ Morgan McGuire; noise functions ]
//  - https://www.shadertoy.com/view/XsX3zB [ Nikita Miropolskiy; noise & randoms ]
//  - https://www.shadertoy.com/view/Xd23Dh [ Inigo Quilez; voronoise ]
//  - https://www.shadertoy.com/view/4djSRW [ David Hoskins; Hash without Sine ]
//  - https://www.shadertoy.com/view/MtG3Wh [ Fabrice Neyret; gamma ]
//  - https://www.shadertoy.com/view/4lVBW1 [ WAHa_06x36; HSV ]

// use any, ensure you take the licence with you!


// =================================================================================================================
// Hashing

//----------------------------------------------------------------------------------------
//  1 out, 1 in...
float Hash11(float p)
{
    p = fract(p * .1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}

//----------------------------------------------------------------------------------------
//  1 out, 2 in...
float Hash12(vec2 p)
{
    vec3 p3  = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

//----------------------------------------------------------------------------------------
//  1 out, 3 in...
float Hash13(vec3 p3)
{
    p3  = fract(p3 * .1031);
    p3 += dot(p3, p3.zyx + 31.32);
    return fract((p3.x + p3.y) * p3.z);
}

//----------------------------------------------------------------------------------------
//  2 out, 1 in...
vec2 Hash21(float p)
{
    vec3 p3 = fract(vec3(p) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xx+p3.yz)*p3.zy);

}

//----------------------------------------------------------------------------------------
///  2 out, 2 in...
vec2 Hash22(vec2 p)
{
    vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx+33.33);
    return fract((p3.xx+p3.yz)*p3.zy);

}

//----------------------------------------------------------------------------------------
///  2 out, 3 in...
vec2 Hash23(vec3 p3)
{
    p3 = fract(p3 * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx+33.33);
    return fract((p3.xx+p3.yz)*p3.zy);
}

//----------------------------------------------------------------------------------------
//  3 out, 1 in...
vec3 Hash31(float p)
{
   vec3 p3 = fract(vec3(p) * vec3(.1031, .1030, .0973));
   p3 += dot(p3, p3.yzx+33.33);
   return fract((p3.xxy+p3.yzz)*p3.zyx); 
}


//----------------------------------------------------------------------------------------
///  3 out, 2 in...
vec3 Hash32(vec2 p)
{
    vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yxz+33.33);
    return fract((p3.xxy+p3.yzz)*p3.zyx);
}

//----------------------------------------------------------------------------------------
///  3 out, 3 in...
vec3 Hash33(vec3 p3)
{
    p3 = fract(p3 * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yxz+33.33);
    return fract((p3.xxy + p3.yxx)*p3.zyx);

}

//----------------------------------------------------------------------------------------
// 4 out, 1 in...
vec4 Hash41(float p)
{
    vec4 p4 = fract(vec4(p) * vec4(.1031, .1030, .0973, .1099));
    p4 += dot(p4, p4.wzxy+33.33);
    return fract((p4.xxyz+p4.yzzw)*p4.zywx);
    
}

//----------------------------------------------------------------------------------------
// 4 out, 2 in...
vec4 Hash42(vec2 p)
{
    vec4 p4 = fract(vec4(p.xyxy) * vec4(.1031, .1030, .0973, .1099));
    p4 += dot(p4, p4.wzxy+33.33);
    return fract((p4.xxyz+p4.yzzw)*p4.zywx);

}

//----------------------------------------------------------------------------------------
// 4 out, 3 in...
vec4 Hash43(vec3 p)
{
    vec4 p4 = fract(vec4(p.xyzx)  * vec4(.1031, .1030, .0973, .1099));
    p4 += dot(p4, p4.wzxy+33.33);
    return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}

//----------------------------------------------------------------------------------------
// 4 out, 4 in...
vec4 Hash44(vec4 p4)
{
    p4 = fract(p4  * vec4(.1031, .1030, .0973, .1099));
    p4 += dot(p4, p4.wzxy+33.33);
    return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}



// =================================================================================================================
// Dithering

// https://www.shadertoy.com/view/MslGR8

// lestyn's RGB dither (7 asm instructions) from Portal 2
//
vec3 ScreenSpaceDither( in vec2 vScreenPos, in float colorDepth)
{
    float vD        = dot( vec2(131.0, 312.0), vScreenPos.xy );
    vec3 vDither    = vec3(vD, vD, vD);

    vDither.rgb     = fract( vDither.rgb / vec3(103.0, 71.0, 97.0) ) - vec3(0.5, 0.5, 0.5);

    return (vDither.rgb / colorDepth) * 0.375;
}

// returns [-intensity;intensity[, magnitude of 2x intensity
// "NEXT GENERATION POST PROCESSING IN CALL OF DUTY: ADVANCED WARFARE"
//      http://advances.realtimerendering.com/s2014/index.html
//
float InterleavedGradientNoise( in vec2 uv )
{
    const vec3 magic = vec3( 0.06711056, 0.00583715, 52.9829189 );
    return fract( magic.z * fract( dot( uv, magic.xy ) ) );
}



// =================================================================================================================
// Colour 

// https://www.iquilezles.org/www/articles/palettes/palettes.htm
vec3 CosineGradient( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b * cos( 6.28318530718 * (c * t + d) );
}


vec3 HSV(float h, float s, float v) 
{
    vec3 p = clamp(abs(fract(vec3(h) + vec3(3.0, 2.0, 1.0) / 3.0) * 6.0 - vec3(3.0)) - vec3(1.0), 0.0, 1.0);
    return v * mix(vec3(1.0), p, s);
}

// Smoothstep-HSV
vec3 HSVs(float h, float s, float v) 
{
    vec3 p = clamp(abs(fract(vec3(h) + vec3(3.0, 2.0, 1.0) / 3.0) * 6.0 - vec3(3.0)) - vec3(1.0), 0.0, 1.0);
    p = p * p * (3.0 - 2.0 * p);
    return v * mix(vec3(1.0), p, s);
}

// Distorted-Smoothstep-HSV
vec3 HSVds(float h, float s, float v) 
{
    vec3 p = clamp(abs(fract(vec3(h) + vec3(3.0, 2.0, 1.0) / 3.0) * 6.0 - vec3(3.0)) - vec3(1.0), 0.0, 1.0);
    p -= sin(p * 3.141592) * 0.02 * 6.0;
    p = p * p * (3.0 - 2.0 * p);
    return v * mix(vec3(1.0), p, s);
}

// https://www.shadertoy.com/view/WlfXRN

vec3 mpl_viridis(float t) 
{
    const vec3 c0 = vec3(0.2777273272234177, 0.005407344544966578, 0.3340998053353061);
    const vec3 c1 = vec3(0.1050930431085774, 1.404613529898575, 1.384590162594685);
    const vec3 c2 = vec3(-0.3308618287255563, 0.214847559468213, 0.09509516302823659);
    const vec3 c3 = vec3(-4.634230498983486, -5.799100973351585, -19.33244095627987);
    const vec3 c4 = vec3(6.228269936347081, 14.17993336680509, 56.69055260068105);
    const vec3 c5 = vec3(4.776384997670288, -13.74514537774601, -65.35303263337234);
    const vec3 c6 = vec3(-5.435455855934631, 4.645852612178535, 26.3124352495832);

    return c0+t*(c1+t*(c2+t*(c3+t*(c4+t*(c5+t*c6)))));
}

vec3 mpl_plasma(float t) 
{
    const vec3 c0 = vec3(0.05873234392399702, 0.02333670892565664, 0.5433401826748754);
    const vec3 c1 = vec3(2.176514634195958, 0.2383834171260182, 0.7539604599784036);
    const vec3 c2 = vec3(-2.689460476458034, -7.455851135738909, 3.110799939717086);
    const vec3 c3 = vec3(6.130348345893603, 42.3461881477227, -28.51885465332158);
    const vec3 c4 = vec3(-11.10743619062271, -82.66631109428045, 60.13984767418263);
    const vec3 c5 = vec3(10.02306557647065, 71.41361770095349, -54.07218655560067);
    const vec3 c6 = vec3(-3.658713842777788, -22.93153465461149, 18.19190778539828);

    return c0+t*(c1+t*(c2+t*(c3+t*(c4+t*(c5+t*c6)))));
}

vec3 mpl_magma(float t)
{
    const vec3 c0 = vec3(-0.002136485053939582, -0.000749655052795221, -0.005386127855323933);
    const vec3 c1 = vec3(0.2516605407371642, 0.6775232436837668, 2.494026599312351);
    const vec3 c2 = vec3(8.353717279216625, -3.577719514958484, 0.3144679030132573);
    const vec3 c3 = vec3(-27.66873308576866, 14.26473078096533, -13.64921318813922);
    const vec3 c4 = vec3(52.17613981234068, -27.94360607168351, 12.94416944238394);
    const vec3 c5 = vec3(-50.76852536473588, 29.04658282127291, 4.23415299384598);
    const vec3 c6 = vec3(18.65570506591883, -11.48977351997711, -5.601961508734096);

    return c0+t*(c1+t*(c2+t*(c3+t*(c4+t*(c5+t*c6)))));
}

vec3 mpl_inferno(float t)
{
    const vec3 c0 = vec3(0.0002189403691192265, 0.001651004631001012, -0.01948089843709184);
    const vec3 c1 = vec3(0.1065134194856116, 0.5639564367884091, 3.932712388889277);
    const vec3 c2 = vec3(11.60249308247187, -3.972853965665698, -15.9423941062914);
    const vec3 c3 = vec3(-41.70399613139459, 17.43639888205313, 44.35414519872813);
    const vec3 c4 = vec3(77.162935699427, -33.40235894210092, -81.80730925738993);
    const vec3 c5 = vec3(-71.31942824499214, 32.62606426397723, 73.20951985803202);
    const vec3 c6 = vec3(25.13112622477341, -12.24266895238567, -23.07032500287172);

    return c0+t*(c1+t*(c2+t*(c3+t*(c4+t*(c5+t*c6)))));
}

vec3 mpl_turbo(float t)
{
    const vec3 c0 = vec3(0.1140890109226559, 0.06288340699912215, 0.2248337216805064);
    const vec3 c1 = vec3(6.716419496985708, 3.182286745507602, 7.571581586103393);
    const vec3 c2 = vec3(-66.09402360453038, -4.9279827041226, -10.09439367561635);
    const vec3 c3 = vec3(228.7660791526501, 25.04986699771073, -91.54105330182436);
    const vec3 c4 = vec3(-334.8351565777451, -69.31749712757485, 288.5858850615712);
    const vec3 c5 = vec3(218.7637218434795, 67.52150567819112, -305.2045772184957);
    const vec3 c6 = vec3(-52.88903478218835, -21.54527364654712, 110.5174647748972);

    return c0+t*(c1+t*(c2+t*(c3+t*(c4+t*(c5+t*c6)))));
}

vec3 GammaCorrect( in vec3 lin )
{
    return pow( max(lin, 0.0), vec3(1.0 / 2.2) );
}


vec3 GammaCorrectApprox( in vec3 lin )
{
    return sqrt( max(lin, 0.0) );
}


// =================================================================================================================


float Voronoise( in vec2 p, float u, float v )
{
    float k = 1.0+63.0*pow(1.0-v,6.0);

    vec2 i = floor(p);
    vec2 f = fract(p);
    
    vec2 a = vec2(0.0,0.0);
    for( int y=-2; y<=2; y++ )
    for( int x=-2; x<=2; x++ )
    {
        vec2  g = vec2( x, y );
        vec3  o = Hash32( i + g )*vec3(u,u,1.0);
        vec2  d = g - f + o.xy;
        float w = pow( 1.0-smoothstep(0.0,1.414,length(d)), k );
        a += vec2(o.z*w,w);
    }
    
    return a.x/a.y;
}



// =================================================================================================================
// raytracing utilities

vec2 NormalizeScreenCoords( in vec2 screenCoord, in vec2 resolution )
{
    vec2 result    = 2.0 * ( screenCoord / resolution - 0.5 );
         result.x *= resolution.x/resolution.y; // Correct for aspect ratio
         
    return result;
}

vec3 GetCameraRayDir( vec2 uv, vec3 camPos, vec3 camTarget )
{
    vec3 camForward = normalize( camTarget - camPos );
    vec3 camRight   = normalize( cross( vec3(0.0, 1.0, 0.0), camForward ) );
    vec3 camUp      = normalize( cross( camForward, camRight ) );
     
    float fPersp = 2.0;
    vec3 vDir = normalize( uv.x * camRight + uv.y * camUp + camForward * fPersp );
    
    return vDir;
}



// =================================================================================================================

float DistanceToSegment( in vec2 p, in vec2 a, in vec2 b )
{
    p -= a, b -= a;
    float h = clamp( dot(p, b) / dot(b, b), 0.0, 1.0 );   // proj coord on line
    return length(p - b * h);                             // dist to segment
}


#define DistAA( __distance, __rad ) smoothstep( __rad * 2.0 / R.y, 0.0, __distance )



float TripStep( in float edge0, in float edge1, in float t )
{
    t = clamp((t - edge0) / (edge1 - edge0), 0.0, 1.0);
    
    return dot(clamp(
            vec3(-1.362,2.418,0.468) + 
            vec3(7.0,7.0,7.0) * cos( 6.28318 * (vec3(0.500,0.500,0.500) * t + vec3(0.680,-0.557,0.337)) ),
              0.0, 1.0 ), 
                vec3(0.333333334) );
}




// =================================================================================================================

////////////////////////////////////////////////////////////////
//
//                           HG_SDF
//
//     GLSL LIBRARY FOR BUILDING SIGNED DISTANCE BOUNDS
//
//     version 2015-12-15 (initial release)
//
//     Check http://mercury.sexy/hg_sdf for updates
//     and usage examples. Send feedback to spheretracing@mercury.sexy.
//
//     Brought to you by MERCURY http://mercury.sexy
//
//
//
// Released as Creative Commons Attribution-NonCommercial (CC BY-NC)
//
////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////
//
//             HELPER FUNCTIONS/MACROS
//
////////////////////////////////////////////////////////////////

#define PI 3.14159265
#define TAU (2*PI)
#define PHI (1.618033988749895)
     // PHI (sqrt(5)*0.5 + 0.5)

// Clamp to [0,1] - this operation is free under certain circumstances.
// For further information see
// http://www.humus.name/Articles/Persson_LowLevelThinking.pdf and
// http://www.humus.name/Articles/Persson_LowlevelShaderOptimization.pdf
#define saturate(x) clamp(x, 0., 1.)

// Sign function that doesn't return 0
float sgn(float x) {
    return (x<0.)?-1.:1.;
}

float square (float x) {
    return x*x;
}

vec2 square (vec2 x) {
    return x*x;
}

vec3 square (vec3 x) {
    return x*x;
}

float lengthSqr(vec3 x) {
    return dot(x, x);
}


// Maximum/minumum elements of a vector
float vmax(vec2 v) {
    return max(v.x, v.y);
}

float vmax(vec3 v) {
    return max(max(v.x, v.y), v.z);
}

float vmax(vec4 v) {
    return max(max(v.x, v.y), max(v.z, v.w));
}

float vmin(vec2 v) {
    return min(v.x, v.y);
}

float vmin(vec3 v) {
    return min(min(v.x, v.y), v.z);
}

float vmin(vec4 v) {
    return min(min(v.x, v.y), min(v.z, v.w));
}




////////////////////////////////////////////////////////////////
//
//             PRIMITIVE DISTANCE FUNCTIONS
//
////////////////////////////////////////////////////////////////
//
// Conventions:
//
// Everything that is a distance function is called fSomething.
// The first argument is always a point 2 or 3-space called <p>.
// Unless otherwise noted, (if the object has an intrinsic "up"
// side or direction) the y axis is "up" and the object is
// centered at the origin.
//
////////////////////////////////////////////////////////////////

float fSphere(vec3 p, float r) {
    return length(p) - r;
}

// Plane with normal n (n is normalized) at some distance from the origin
float fPlane(vec3 p, vec3 n, float distanceFromOrigin) {
    return dot(p, n) + distanceFromOrigin;
}

// Cheap Box: distance to corners is overestimated
float fBoxCheap(vec3 p, vec3 b) { //cheap box
    return vmax(abs(p) - b);
}

// Box: correct distance to corners
float fBox(vec3 p, vec3 b) {
    vec3 d = abs(p) - b;
    return length(max(d, vec3(0))) + vmax(min(d, vec3(0)));
}

// Same as above, but two dimensions (an endless box)
float fBox2Cheap(vec2 p, vec2 b) {
    return vmax(abs(p)-b);
}

float fBox2(vec2 p, vec2 b) {
    vec2 d = abs(p) - b;
    return length(max(d, vec2(0))) + vmax(min(d, vec2(0)));
}


// Endless "corner"
float fCorner (vec2 p) {
    return length(max(p, vec2(0))) + vmax(min(p, vec2(0)));
}

// Blobby ball object. You've probably seen it somewhere. This is not a correct distance bound, beware.
float fBlob(vec3 p) {
    p = abs(p);
    if (p.x < max(p.y, p.z)) p = p.yzx;
    if (p.x < max(p.y, p.z)) p = p.yzx;
    float b = max(max(max(
        dot(p, normalize(vec3(1, 1, 1))),
        dot(p.xz, normalize(vec2(PHI+1., 1)))),
        dot(p.yx, normalize(vec2(1, PHI)))),
        dot(p.xz, normalize(vec2(1, PHI))));
    float l = length(p);
    return l - 1.5 - 0.2 * (1.5 / 2.)* cos(min(sqrt(1.01 - b / l)*(PI / 0.25), PI));
}

// Cylinder standing upright on the xz plane
float fCylinder(vec3 p, float r, float height) {
    float d = length(p.xz) - r;
    d = max(d, abs(p.y) - height);
    return d;
}

// Capsule: A Cylinder with round caps on both sides
float fCapsule(vec3 p, float r, float c) {
    return mix(length(p.xz) - r, length(vec3(p.x, abs(p.y) - c, p.z)) - r, step(c, abs(p.y)));
}

// Distance to line segment between <a> and <b>, used for fCapsule() version 2below
float fLineSegment(vec3 p, vec3 a, vec3 b) {
    vec3 ab = b - a;
    float t = saturate(dot(p - a, ab) / dot(ab, ab));
    return length((ab*t + a) - p);
}

// Capsule version 2: between two end points <a> and <b> with radius r 
float fCapsule(vec3 p, vec3 a, vec3 b, float r) {
    return fLineSegment(p, a, b) - r;
}

// Torus the XZ-plane
float fTorus(vec3 p, float smallRadius, float largeRadius) {
    return length(vec2(length(p.xz) - largeRadius, p.y)) - smallRadius;
}

// A circle line. Can also be used to make a torus by subtracting the smaller radius of the torus.
float fCircle(vec3 p, float r) {
    float l = length(p.xz) - r;
    return length(vec2(p.y, l));
}

// A circular disc with no thickness (i.e. a cylinder with no height).
// Subtract some value to make a flat disc with rounded edge.
float fDisc(vec3 p, float r) {
 float l = length(p.xz) - r;
    return l < 0. ? abs(p.y) : length(vec2(p.y, l));
}

// Hexagonal prism, circumcircle variant
float fHexagonCircumcircle(vec3 p, vec2 h) {
    vec3 q = abs(p);
    return max(q.y - h.y, max(q.x*sqrt(3.)*0.5 + q.z*0.5, q.z) - h.x);
    //this is mathematically equivalent to this line, but less efficient:
    //return max(q.y - h.y, max(dot(vec2(cos(PI/3), sin(PI/3)), q.zx), q.z) - h.x);
}

// Hexagonal prism, incircle variant
float fHexagonIncircle(vec3 p, vec2 h) {
    return fHexagonCircumcircle(p, vec2(h.x*sqrt(3.)*0.5, h.y));
}

// Cone with correct distances to tip and base circle. Y is up, 0 is the middle of the base.
float fCone(vec3 p, float radius, float height) {
    vec2 q = vec2(length(p.xz), p.y);
    vec2 tip = q - vec2(0, height);
    vec2 mantleDir = normalize(vec2(height, radius));
    float mantle = dot(tip, mantleDir);
    float d = max(mantle, -q.y);
    float projected = dot(tip, vec2(mantleDir.y, -mantleDir.x));
    
    // distance to tip
    if ((q.y > height) && (projected < 0.)) {
        d = max(d, length(tip));
    }
    
    // distance to base ring
    if ((q.x > radius) && (projected > length(vec2(height, radius)))) {
        d = max(d, length(q - vec2(radius, 0)));
    }
    return d;
}

//
// "Generalized Distance Functions" by Akleman and Chen.
// see the Paper at https://www.viz.tamu.edu/faculty/ergun/research/implicitmodeling/papers/sm99.pdf
//
// This set of constants is used to construct a large variety of geometric primitives.
// Indices are shifted by 1 compared to the paper because we start counting at Zero.
// Some of those are slow whenever a driver decides to not unroll the loop,
// which seems to happen for fIcosahedron und fTruncatedIcosahedron on nvidia 350.12 at least.
// Specialized implementations can well be faster all cases.
//

// Macro based version for GLSL 1.2 / ES 2.0 by Tom

#define GDFVector0 vec3(1, 0, 0)
#define GDFVector1 vec3(0, 1, 0)
#define GDFVector2 vec3(0, 0, 1)

#define GDFVector3 normalize(vec3(1, 1, 1 ))
#define GDFVector4 normalize(vec3(-1, 1, 1))
#define GDFVector5 normalize(vec3(1, -1, 1))
#define GDFVector6 normalize(vec3(1, 1, -1))

#define GDFVector7 normalize(vec3(0, 1, PHI+1.))
#define GDFVector8 normalize(vec3(0, -1, PHI+1.))
#define GDFVector9 normalize(vec3(PHI+1., 0, 1))
#define GDFVector10 normalize(vec3(-PHI-1., 0, 1))
#define GDFVector11 normalize(vec3(1, PHI+1., 0))
#define GDFVector12 normalize(vec3(-1, PHI+1., 0))

#define GDFVector13 normalize(vec3(0, PHI, 1))
#define GDFVector14 normalize(vec3(0, -PHI, 1))
#define GDFVector15 normalize(vec3(1, 0, PHI))
#define GDFVector16 normalize(vec3(-1, 0, PHI))
#define GDFVector17 normalize(vec3(PHI, 1, 0))
#define GDFVector18 normalize(vec3(-PHI, 1, 0))

#define fGDFBegin float d = 0.;

// Version with variable exponent.
// This is slow and does not produce correct distances, but allows for bulging of objects.
#define fGDFExp(v) d += pow(abs(dot(p, v)), e);

// Version with without exponent, creates objects with sharp edges and flat faces
#define fGDF(v) d = max(d, abs(dot(p, v)));

#define fGDFExpEnd return pow(d, 1./e) - r;
#define fGDFEnd return d - r;

// Primitives follow:

float fOctahedron(vec3 p, float r, float e) {
    fGDFBegin
    fGDFExp(GDFVector3) fGDFExp(GDFVector4) fGDFExp(GDFVector5) fGDFExp(GDFVector6)
    fGDFExpEnd
}

float fDodecahedron(vec3 p, float r, float e) {
    fGDFBegin
    fGDFExp(GDFVector13) fGDFExp(GDFVector14) fGDFExp(GDFVector15) fGDFExp(GDFVector16)
    fGDFExp(GDFVector17) fGDFExp(GDFVector18)
    fGDFExpEnd
}

float fIcosahedron(vec3 p, float r, float e) {
    fGDFBegin
    fGDFExp(GDFVector3) fGDFExp(GDFVector4) fGDFExp(GDFVector5) fGDFExp(GDFVector6)
    fGDFExp(GDFVector7) fGDFExp(GDFVector8) fGDFExp(GDFVector9) fGDFExp(GDFVector10)
    fGDFExp(GDFVector11) fGDFExp(GDFVector12)
    fGDFExpEnd
}

float fTruncatedOctahedron(vec3 p, float r, float e) {
    fGDFBegin
    fGDFExp(GDFVector0) fGDFExp(GDFVector1) fGDFExp(GDFVector2) fGDFExp(GDFVector3)
    fGDFExp(GDFVector4) fGDFExp(GDFVector5) fGDFExp(GDFVector6)
    fGDFExpEnd
}

float fTruncatedIcosahedron(vec3 p, float r, float e) {
    fGDFBegin
    fGDFExp(GDFVector3) fGDFExp(GDFVector4) fGDFExp(GDFVector5) fGDFExp(GDFVector6)
    fGDFExp(GDFVector7) fGDFExp(GDFVector8) fGDFExp(GDFVector9) fGDFExp(GDFVector10)
    fGDFExp(GDFVector11) fGDFExp(GDFVector12) fGDFExp(GDFVector13) fGDFExp(GDFVector14)
    fGDFExp(GDFVector15) fGDFExp(GDFVector16) fGDFExp(GDFVector17) fGDFExp(GDFVector18)
    fGDFExpEnd
}

float fOctahedron(vec3 p, float r) {
    fGDFBegin
    fGDF(GDFVector3) fGDF(GDFVector4) fGDF(GDFVector5) fGDF(GDFVector6)
    fGDFEnd
}

float fDodecahedron(vec3 p, float r) {
    fGDFBegin
    fGDF(GDFVector13) fGDF(GDFVector14) fGDF(GDFVector15) fGDF(GDFVector16)
    fGDF(GDFVector17) fGDF(GDFVector18)
    fGDFEnd
}

float fIcosahedron(vec3 p, float r) {
    fGDFBegin
    fGDF(GDFVector3) fGDF(GDFVector4) fGDF(GDFVector5) fGDF(GDFVector6)
    fGDF(GDFVector7) fGDF(GDFVector8) fGDF(GDFVector9) fGDF(GDFVector10)
    fGDF(GDFVector11) fGDF(GDFVector12)
    fGDFEnd
}

float fTruncatedOctahedron(vec3 p, float r) {
    fGDFBegin
    fGDF(GDFVector0) fGDF(GDFVector1) fGDF(GDFVector2) fGDF(GDFVector3)
    fGDF(GDFVector4) fGDF(GDFVector5) fGDF(GDFVector6)
    fGDFEnd
}

float fTruncatedIcosahedron(vec3 p, float r) {
    fGDFBegin
    fGDF(GDFVector3) fGDF(GDFVector4) fGDF(GDFVector5) fGDF(GDFVector6)
    fGDF(GDFVector7) fGDF(GDFVector8) fGDF(GDFVector9) fGDF(GDFVector10)
    fGDF(GDFVector11) fGDF(GDFVector12) fGDF(GDFVector13) fGDF(GDFVector14)
    fGDF(GDFVector15) fGDF(GDFVector16) fGDF(GDFVector17) fGDF(GDFVector18)
    fGDFEnd
}


////////////////////////////////////////////////////////////////
//
//                DOMAIN MANIPULATION OPERATORS
//
////////////////////////////////////////////////////////////////
//
// Conventions:
//
// Everything that modifies the domain is named pSomething.
//
// Many operate only on a subset of the three dimensions. For those,
// you must choose the dimensions that you want manipulated
// by supplying e.g. <p.x> or <p.zx>
//
// <inout p> is always the first argument and modified place.
//
// Many of the operators partition space into cells. An identifier
// or cell index is returned, if possible. This return value is
// intended to be optionally used e.g. as a random seed to change
// parameters of the distance functions inside the cells.
//
// Unless stated otherwise, for cell index 0, <p> is unchanged and cells
// are centered on the origin so objects don't have to be moved to fit.
//
//
////////////////////////////////////////////////////////////////



// Rotate around a coordinate axis (i.e. a plane perpendicular to that axis) by angle <a>.
// Read like this: R(p.xz, a) rotates "x towards z".
// This is fast if <a> is a compile-time constant and slower (but still practical) if not.
void pR(inout vec2 p, float a) {
    p = cos(a)*p + sin(a)*vec2(p.y, -p.x);
}

// Shortcut for 45-degrees rotation
void pR45(inout vec2 p) {
    p = (p + vec2(p.y, -p.x))*sqrt(0.5);
}

// Repeat space along one axis. Use like this to repeat along the x axis:
// <float cell = pMod1(p.x,5);> - using the return value is optional.
float pMod1(inout float p, float size) {
    float halfsize = size*0.5;
    float c = floor((p + halfsize)/size);
    p = mod(p + halfsize, size) - halfsize;
    return c;
}

// Same, but mirror every second cell so they match at the boundaries
float pModMirror1(inout float p, float size) {
    float halfsize = size*0.5;
    float c = floor((p + halfsize)/size);
    p = mod(p + halfsize,size) - halfsize;
    p *= mod(c, 2.0)*2. - 1.;
    return c;
}

// Repeat the domain only positive direction. Everything the negative half-space is unchanged.
float pModSingle1(inout float p, float size) {
    float halfsize = size*0.5;
    float c = floor((p + halfsize)/size);
    if (p >= 0.)
        p = mod(p + halfsize, size) - halfsize;
    return c;
}

// Repeat only a few times: from indices <start> to <stop> (similar to above, but more flexible)
float pModInterval1(inout float p, float size, float start, float stop) {
    float halfsize = size*0.5;
    float c = floor((p + halfsize)/size);
    p = mod(p+halfsize, size) - halfsize;
    if (c > stop) { //yes, this might not be the best thing numerically.
        p += size*(c - stop);
        c = stop;
    }
    if (c <start) {
        p += size*(c - start);
        c = start;
    }
    return c;
}


// Repeat around the origin by a fixed angle.
// For easier use, num of repetitions is use to specify the angle.
float pModPolar(inout vec2 p, float repetitions) {
    float angle = 2.*PI/repetitions;
    float a = atan(p.y, p.x) + angle/2.;
    float r = length(p);
    float c = floor(a/angle);
    a = mod(a,angle) - angle/2.;
    p = vec2(cos(a), sin(a))*r;
    // For an odd number of repetitions, fix cell index of the cell -x direction
    // (cell index would be e.g. -5 and 5 the two halves of the cell):
    if (abs(c) >= (repetitions/2.)) c = abs(c);
    return c;
}

// Repeat two dimensions
vec2 pMod2(inout vec2 p, vec2 size) {
    vec2 c = floor((p + size*0.5)/size);
    p = mod(p + size*0.5,size) - size*0.5;
    return c;
}

// Same, but mirror every second cell so all boundaries match
vec2 pModMirror2(inout vec2 p, vec2 size) {
    vec2 halfsize = size*0.5;
    vec2 c = floor((p + halfsize)/size);
    p = mod(p + halfsize, size) - halfsize;
    p *= mod(c,vec2(2))*2. - vec2(1);
    return c;
}

// Same, but mirror every second cell at the diagonal as well
vec2 pModGrid2(inout vec2 p, vec2 size) {
    vec2 c = floor((p + size*0.5)/size);
    p = mod(p + size*0.5, size) - size*0.5;
    p *= mod(c,vec2(2))*2. - vec2(1);
    p -= size/2.;
    if (p.x > p.y) p.xy = p.yx;
    return floor(c/2.);
}

// Repeat three dimensions
vec3 pMod3(inout vec3 p, vec3 size) {
    vec3 c = floor((p + size*0.5)/size);
    p = mod(p + size*0.5, size) - size*0.5;
    return c;
}

// Mirror at an axis-aligned plane which is at a specified distance <dist> from the origin.
float pMirror (inout float p, float dist) {
    float s = sign(p);
    p = abs(p)-dist;
    return s;
}

// Mirror both dimensions and at the diagonal, yielding one eighth of the space.
// translate by dist before mirroring.
vec2 pMirrorOctant (inout vec2 p, vec2 dist) {
    vec2 s = sign(p);
    pMirror(p.x, dist.x);
    pMirror(p.y, dist.y);
    if (p.y > p.x)
        p.xy = p.yx;
    return s;
}

// Reflect space at a plane
float pReflect(inout vec3 p, vec3 planeNormal, float offset) {
    float t = dot(p, planeNormal)+offset;
    if (t < 0.) {
        p = p - (2.*t)*planeNormal;
    }
    return sign(t);
}


////////////////////////////////////////////////////////////////
//
//             OBJECT COMBINATION OPERATORS
//
////////////////////////////////////////////////////////////////
//
// We usually need the following boolean operators to combine two objects:
// Union: OR(a,b)
// Intersection: AND(a,b)
// Difference: AND(a,!b)
// (a and b being the distances to the objects).
//
// The trivial implementations are min(a,b) for union, max(a,b) for intersection
// and max(a,-b) for difference. To combine objects more interesting ways to
// produce rounded edges, chamfers, stairs, etc. instead of plain sharp edges we
// can use combination operators. It is common to use some kind of "smooth minimum"
// instead of min(), but we don't like that because it does not preserve Lipschitz
// continuity many cases.
//
// Naming convention: since they return a distance, they are called fOpSomething.
// The different flavours usually implement all the boolean operators above
// and are called fOpUnionRound, fOpIntersectionRound, etc.
//
// The basic idea: Assume the object surfaces intersect at a right angle. The two
// distances <a> and <b> constitute a new local two-dimensional coordinate system
// with the actual intersection as the origin. this coordinate system, we can
// evaluate any 2D distance function we want order to shape the edge.
//
// The operators below are just those that we found useful or interesting and should
// be seen as examples. There are infinitely more possible operators.
//
// They are designed to actually produce correct distances or distance bounds, unlike
// popular "smooth minimum" operators, on the condition that the gradients of the two
// SDFs are at right angles. When they are off by more than 30 degrees or so, the
// Lipschitz condition will no longer hold (i.e. you might get artifacts). The worst
// case is parallel surfaces that are close to each other.
//
// Most have a float argument <r> to specify the radius of the feature they represent.
// This should be much smaller than the object size.
//
// Some of them have checks like "if ((-a < r) && (-b < r))" that restrict
// their influence (and computation cost) to a certain area. You might
// want to lift that restriction or enforce it. We have left it as comments
// some cases.
//
// usage example:
//
// float fTwoBoxes(vec3 p) {
//   float box0 = fBox(p, vec3(1));
//   float box1 = fBox(p-vec3(1), vec3(1));
//   return fOpUnionChamfer(box0, box1, 0.2);
// }
//
////////////////////////////////////////////////////////////////


// The "Chamfer" flavour makes a 45-degree chamfered edge (the diagonal of a square of size <r>):
float fOpUnionChamfer(float a, float b, float r) {
    float m = min(a, b);
    //if ((a < r) && (b < r)) {
        return min(m, (a - r + b)*sqrt(0.5));
    //} else {
        return m;
    //}
}

// Intersection has to deal with what is normally the inside of the resulting object
// when using union, which we normally don't care about too much. Thus, intersection
// implementations sometimes differ from union implementations.
float fOpIntersectionChamfer(float a, float b, float r) {
    float m = max(a, b);
    if (r <= 0.) return m;
    if (((-a < r) && (-b < r)) || (m < 0.)) {
        return max(m, (a + r + b)*sqrt(0.5));
    } else {
        return m;
    }
}

// Difference can be built from Intersection or Union:
float fOpDifferenceChamfer (float a, float b, float r) {
    return fOpIntersectionChamfer(a, -b, r);
}

// The "Round" variant uses a quarter-circle to join the two objects smoothly:
float fOpUnionRound(float a, float b, float r) {
    float m = min(a, b);
    if ((a < r) && (b < r) ) {
        return min(m, r - sqrt((r-a)*(r-a) + (r-b)*(r-b)));
    } else {
     return m;
    }
}

float fOpIntersectionRound(float a, float b, float r) {
    float m = max(a, b);
    if ((-a < r) && (-b < r)) {
        return max(m, -(r - sqrt((r+a)*(r+a) + (r+b)*(r+b))));
    } else {
        return m;
    }
}

float fOpDifferenceRound (float a, float b, float r) {
    return fOpIntersectionRound(a, -b, r);
}


// The "Columns" flavour makes n-1 circular columns at a 45 degree angle:
float fOpUnionColumns(float a, float b, float r, float n) {
    if ((a < r) && (b < r)) {
        vec2 p = vec2(a, b);
        float columnradius = r*sqrt(2.)/((n-1.)*2.+sqrt(2.));
        pR45(p);
        p.x -= sqrt(2.)/2.*r;
        p.x += columnradius*sqrt(2.);
        if (mod(n,2.) == 1.) {
            p.y += columnradius;
        }
        // At this point, we have turned 45 degrees and moved at a point on the
        // diagonal that we want to place the columns on.
        // Now, repeat the domain along this direction and place a circle.
        pMod1(p.y, columnradius*2.);
        float result = length(p) - columnradius;
        result = min(result, p.x);
        result = min(result, a);
        return min(result, b);
    } else {
        return min(a, b);
    }
}

float fOpDifferenceColumns(float a, float b, float r, float n) {
    a = -a;
    float m = min(a, b);
    //avoid the expensive computation where not needed (produces discontinuity though)
    if ((a < r) && (b < r)) {
        vec2 p = vec2(a, b);
        float columnradius = r*sqrt(2.)/n/2.0;
        columnradius = r*sqrt(2.)/((n-1.)*2.+sqrt(2.));

        pR45(p);
        p.y += columnradius;
        p.x -= sqrt(2.)/2.*r;
        p.x += -columnradius*sqrt(2.)/2.;

        if (mod(n,2.) == 1.) {
            p.y += columnradius;
        }
        pMod1(p.y,columnradius*2.);

        float result = -length(p) + columnradius;
        result = max(result, p.x);
        result = min(result, a);
        return -min(result, b);
    } else {
        return -m;
    }
}

float fOpIntersectionColumns(float a, float b, float r, float n) {
    return fOpDifferenceColumns(a,-b,r, n);
}

// The "Stairs" flavour produces n-1 steps of a staircase:
float fOpUnionStairs(float a, float b, float r, float n) {
    float d = min(a, b);
    vec2 p = vec2(a, b);
    pR45(p);
    p = p.yx - vec2((r-r/n)*0.5*sqrt(2.));
    p.x += 0.5*sqrt(2.)*r/n;
    float x = r*sqrt(2.)/n;
    pMod1(p.x, x);
    d = min(d, p.y);
    pR45(p);
    return min(d, vmax(p -vec2(0.5*r/n)));
}

// We can just call Union since stairs are symmetric.
float fOpIntersectionStairs(float a, float b, float r, float n) {
    return -fOpUnionStairs(-a, -b, r, n);
}

float fOpDifferenceStairs(float a, float b, float r, float n) {
    return -fOpUnionStairs(-a, b, r, n);
}

// This produces a cylindical pipe that runs along the intersection.
// No objects remain, only the pipe. This is not a boolean operator.
float fOpPipe(float a, float b, float r) {
    return length(vec2(a, b)) - r;
}


// =================================================================================================================
// iq SDF
// https://iquilezles.untergrund.net/www/articles/distfunctions/distfunctions.htm

float opUnion( float d1, float d2 ) { return min(d1,d2); }

float opSubtraction( float d1, float d2 ) { return max(-d1,d2); }

float opIntersection( float d1, float d2 ) { return max(d1,d2); }

float opSmoothUnion( float d1, float d2, float k ) 
{
    float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k*h*(1.0-h); 
}

float opSmoothSubtraction( float d1, float d2, float k ) 
{
    float h = clamp( 0.5 - 0.5*(d2+d1)/k, 0.0, 1.0 );
    return mix( d2, -d1, h ) + k*h*(1.0-h); 
}
  
float opSmoothIntersection( float d1, float d2, float k ) 
{
    float h = clamp( 0.5 - 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) + k*h*(1.0-h); 
}

float sdBoundingBox( vec3 p, vec3 b, float e )
{
       p = abs(p  )-b;
  vec3 q = abs(p+e)-e;
  return min(min(
      length(max(vec3(p.x,q.y,q.z),0.0))+min(max(p.x,max(q.y,q.z)),0.0),
      length(max(vec3(q.x,p.y,q.z),0.0))+min(max(q.x,max(p.y,q.z)),0.0)),
      length(max(vec3(q.x,q.y,p.z),0.0))+min(max(q.x,max(q.y,p.z)),0.0));
}

float sdRoundedCylinder( vec3 p, float ra, float rb, float h )
{
  vec2 d = vec2( length(p.xz)-2.0*ra+rb, abs(p.y) - h );
  return min(max(d.x,d.y),0.0) + length(max(d,0.0)) - rb;
}

float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}
