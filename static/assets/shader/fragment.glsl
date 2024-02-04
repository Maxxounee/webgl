uniform sampler2D uTextureOne;
uniform sampler2D uTextureTwo;

uniform mat3 mappedMatrix;
uniform vec2 uvAspect;
uniform float uTime;
uniform float uProgress;

varying vec2 vTextureCoord;

mat2 rotate(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
}
void main() {
    vec3 map = vec3(vTextureCoord.xy, 1.) * mappedMatrix;

/** uv - Texture coordinates */
    vec2 uv = (map.xy - 0.5) * uvAspect + 0.5;

    vec2 uvDivided = fract(uv * vec2(30., 1.));

    float time = abs(sin(uTime));

    vec2 uvDisplaced1 = uv + rotate(3.145926 / 4.) * uvDivided * uProgress * 0.1;
    vec2 uvDisplaced2 = uv + rotate(3.145926 / 4.) * uvDivided * (1. - uProgress) * 0.1;

    vec4 im1 = texture2D(uTextureOne, uvDisplaced1);
    vec4 im2 = texture2D(uTextureTwo, uvDisplaced2);


/** Типа аутпут */
    gl_FragColor = mix(im1, im2, uProgress);
}
