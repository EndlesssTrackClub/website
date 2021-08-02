#line 1
//
// SHADER FRAMEWORK FOR OUROSPECT PROJECT
// 
//


#define _STEM_COUNT_I     (7)
#define _STEM_COUNT_F     (7.0)
#define _STEM_COUNT_HALF  (3.5)
#define _STEM_COUNT_RCP   (1.0 / _STEM_COUNT_F)

// =================================================================================================================


// =================================================================================================================
// entrypoint for the shader with our extra inputs
vec3 spectrum(float n, float xn) {
    return CosineGradient( n, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.33,0.6 + xn) );
}

float osc_triangle( float x )
{
    x = fract(x);
    float fRet;
    
    if(x <= 0.5)
        fRet = x * 2.0;
    else
        fRet = (1.0 - x) * 2.0;

    return fRet;
}

vec3 ourospectEntrypoint( 
    const vec4 _state,       // audio-live, load progress, load reveal, was-just-clicked
    const vec4 _beat,        // picked from 4 bands of FFT output
    const vec4 _beatSmooth,  // same as above, but smoothed over time
    const vec4 _beatFlow,    // summed values of _beat over time
    const float _loopTime,   //
    const vec2 _pixel,       // pixel coordinates (eg. 0 .. 512)
    const vec2 _uv,          // normalised pixel position (eg. 0 .. 1)
    const vec3 _touchAbs,    // last drag position, normalised XY; [0.5, 0.5] by default | in z, 1.0 if touch is happening now, 0 otherwise
    const vec2 _touchSum,    // summed drag offset, incremented with normalised values; [0, 0] by default, no limit 
    const float _variance
    )
{
    const vec3 bg_col = vec3(0.5, 0.5, 0.6);
    
    vec3 final = vec3( 0.0, 0.0, 0.1);

    vec2 uv = (_uv - 0.5) * ( 7.0 + (_state.w * 5.0) );

    float kick = _beatSmooth.w + _beat.z;
    
    float iVary = _variance * 0.4;
    float i0=1.0 - iVary;
    float i1=1.0 + iVary;
    float i2=1.0 - iVary;
    float i4=0.0 + iVary;

    float xTime = iTime + ( _beatFlow.z * 0.2 );

    pR(uv.xy, _variance + (_touchSum.x * 0.0025) );
    pR(uv.yx, iTime * 0.1 );

    for(int s=0;s<6;s++)
    {
        vec2 r;
        r  = vec2( cos( uv.y * i0 - i4 + ( _beatFlow.y * 0.005 ) / i1 ),
                   sin( uv.x * i0 - i4 + (       xTime * 0.5   ) / i1 ) ) / i2;

        r += vec2( -r.y, r.x ) * 0.1;
        uv.xy+=r;



        i0*=1.93;
        i1*=1.15;
        i2*=1.70;
        i4+=0.05 + 0.1 * ( _touchSum.y * -0.1 ) * i1;
    }


    float r=sin(uv.x-xTime)*0.5+0.5;
    float b=cos(uv.y+xTime)*0.5+0.5;
    uv *= 0.7;
    float g=sin((uv.x+uv.y+sin(iTime*0.5))*0.5)*0.5+0.5;

    float col_raw = (_touchSum.y * 0.001) + (_beatFlow.x * 0.01) + (r * g * b);
    float col_t = osc_triangle(col_raw);
    final =  mix( mpl_turbo( _variance + (col_t * 0.4) ), vec3(0), smoothstep(0.4 + (kick * kick * 0.2), 1.0, col_t) );



    final = mix( final, vec3(1.0), _state.w);
    float monochrome = length(final * vec3(0.2125, 0.7154, 0.0721) );
    final = mix( vec3(monochrome), final, _state.x );

    vec3 scene = sqrt( 
        (final) 
        );
        

    vec2 center = iResolution.xy * 0.5;

    float loadingBar = sdBox( _pixel - vec2(0, center.y), vec2(_state.y * iResolution.x, 8.0 + (_state.z * center.y) ) ); 
    vec3 loadingScreen = mix( vec3(1), vec3(smoothstep(0.0, 0.5, _state.z)), loadingBar );

    return mix( loadingScreen, scene, _state.z );

#ifdef DEBUG_VIZ
    {
        #define beatline(_out, _voff, _bflow, _bbeat)    { float bY = _voff + sin((_uv.x * 14.0) + (_bflow * 0.5)) * (0.25 + (_bbeat * 2.5)); _out += smoothstep(60./R.y, 0., abs(bY-U.y)) * 0.3;}

        if ( _uv.y > 0.95 )
        {
            vec3 o = texture(iChannel0, _uv).rgb;
            return o;
        }
        else
        {
            vec2 U = _pixel;
            vec2 R = iResolution.xy;
            vec2 UV = U.xy / R.xy;
            U = 10.* (2.*U-R)/R.y;

            vec3 o = vec3(0);

            beatline(o.rb, 7.5, _touchSum.x * 0.1, 0.15);
            beatline(o.rb, 7.5, _touchSum.y * 0.1, 0.1);

            beatline(o,    5.0, _beatFlow.x, _beat.x);
            beatline(o.g,  5.0, 0.0, _beatSmooth.x);

            beatline(o,    1.0, _beatFlow.y, _beat.y);
            beatline(o.g,  1.0, 0.0, _beatSmooth.y);

            beatline(o,   -3.0, _beatFlow.z, _beat.z);
            beatline(o.g, -3.0, 0.0, _beatSmooth.z);

            beatline(o,   -7.0, _beatFlow.w, _beat.w);
            beatline(o.g, -7.0, 0.0, _beatSmooth.w);

            o.rb += ( 1.0 - smoothstep( 0.0, 0.05, length( _uv - _touchAbs.xy ) ) ) * (0.25 + _touchAbs.z);

            return o;
        }
    }
#endif // DEBUG_VIZ
}
