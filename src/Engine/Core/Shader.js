
export default class Shader {

    constructor() {
        
    }

    /**
     * Init a shader program.
     * @param {WebGLRenderingContext} gl WebGL rendering context
     * @param {string} vsSource Vertex shader source
     * @param {string} fsSource Fragment shader source
     * @returns {WebGLProgram} Shader program
     */
    static InitShaderProgram(gl, vsSource, fsSource)
    {
        const vShader = Shader.LoadShader(gl, gl.VERTEX_SHADER, vsSource)
        const fShader = Shader.LoadShader(gl, gl.FRAGMENT_SHADER, fsSource)

        const program = gl.createProgram()

        // Attach & link shaders to the program...
        gl.attachShader(program, vShader)
        gl.attachShader(program, fShader)
        gl.linkProgram(program)

        if(!gl.getProgramParameter(program, gl.LINK_STATUS))
        {
            alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
            return null;
        }

        return program
    }

    /**
     * Create shader, upload source and compile it.
     * @param {WebGLRenderingContext} gl WebGL rendering context.
     * @param {number} type Shader type.
     * @param {string} source Shader source.
     * @returns {WebGLShader} Shader compiled
     */
    static LoadShader(gl, type, source)
    {
        // Create shader
        const shader = gl.createShader(type)

        // Send source to the shader
        gl.shaderSource(shader, source)

        // Compile the shader
        gl.compileShader(shader)

        // Check if shader is not compiled successfully
        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader))
            gl.deleteShader(shader)
            return null
        }

        return shader
    }
}