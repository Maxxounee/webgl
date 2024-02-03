uniform sampler2D uSampler;
uniform sampler2D uTextureOne;
uniform sampler2D uTextureTwo;
varying vec2 vTextureCoord;
uniform mat3 mappedMatrix;

void main() {
    vec3 map = vec3(vTextureCoord.xy, 1.) * mappedMatrix;

    vec2 uv = map.xy;

/** Типа аутпут */
    gl_FragColor = texture2D(uTextureOne, uv);
    gl_FragColor = vec4(uv, 0., 1.);
}
