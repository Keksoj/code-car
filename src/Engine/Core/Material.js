import Shader from "./Shader";

/**
 * @typedef {'1f' | '2f' | '3f' | '4f' | '1fv' | '2fv' | '3fv' | '4fv'} VertexAttribute Cest
 */

/**
 * @typedef {{location: string, type: VertexAttribute}} Attribute Vertex attribute.
 */

export default class Material {
    /**
     * Shader attributes.
     * @type {{[name: string] : Attribute}}
     */
    attributes = {};

    /**
     * Shader uniforms.
     * @type {{[name: string] : Attribute}}
     */
    uniforms = {};

    /**
     * The material shader.
     * @type {Shader}
     */
    shader;

    /**
     * Create new material !
     * @param {Shader} shader The shader.
     */
    constructor(shader) {
        this.attributes = {};
        this.uniforms   = {};

        this.shader = shader;
    }

    /**
     * Update shader uniforms.
     * @param {WebGLRenderingContext} ctx The context.
     */
    updateUniforms(ctx) {
        
        for(const uniform in this.uniforms) {
            switch(this.uniforms[uniform].type) {
                case '1f':
                    ctx.vertexAttrib1f(ctx.getUniformLocation(this.shader.))
                    break;
            }
            ctx.vertexAttribPointer()
            this.uniforms[uniform].location
            this.uniforms[uniform];
        }
    }
}