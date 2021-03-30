
export enum PShaderType {
    vertex  	= WebGLRenderingContext['VERTEX_SHADER'],
    fragment    = WebGLRenderingContext['FRAGMENT_SHADER'],
}

export default class PShader {

    public vertexSource: string;
    public fragmentSource: string;
    private program: WebGLProgram | null = null;

    constructor(vertexSource: string, fragmentSource: string) {
        this.vertexSource   = vertexSource;
        this.fragmentSource = fragmentSource;
    }

    /**
     * Called once when the scene initialize...
     * @param GL The context.
     */
    onNeedInitWithContext(GL: WebGLRenderingContext) {
        this.program = PShader.createProgram(GL, this.vertexSource, this.fragmentSource);
    }

    /**
     * Get the webgl shader program.
     * @returns The webgl shader program.
     */
    public getProgram() {
        return this.program;
    }

    /**
     * Create shader program.
     * @param gl The context.
     * @param vsSource Vertex shader source.
     * @param fsSource Fragment shader source.
     * @returns The shader program.
     */
     public static createProgram(GL: WebGLRenderingContext, vsSource: string, fsSource: string)
     {
        const vShader = PShader.compileShader(GL, vsSource, PShaderType.vertex);
        if(!vShader) return null;

        const fShader = PShader.compileShader(GL, fsSource, PShaderType.fragment);
        if(!fShader) return null;

        const program = GL.createProgram();

        if(!program) {
            console.error("Failed to create program !");
            return null;
        }

        GL.attachShader(program, vShader)
        GL.attachShader(program, fShader)
        GL.linkProgram(program)

        if(!GL.getProgramParameter(program, GL.LINK_STATUS))
        {
            alert('Unable to initialize the shader program: ' + GL.getProgramInfoLog(program));
            return null;
        }

        return program
     }

    /**
     * Create and compile shader.
     * @param GL The context.
     * @param src The shader source.
     * @param type The shader type.
     * @returns A webgl shader.
     */
    public static compileShader(GL: WebGLRenderingContext, src: string, type: PShaderType ) {
        // Create shader
        const shader = GL.createShader(type)

        if(!shader) {
            console.error("Failed to create shader...");
            return null;
        }

        // Send source to the shader
        GL.shaderSource(shader, src)

        // Compile the shader
        GL.compileShader(shader)

        // Check if shader is not compiled successfully
        if(!GL.getShaderParameter(shader, GL.COMPILE_STATUS))
        {
            alert('An error occurred compiling the shaders: ' + GL.getShaderInfoLog(shader))
            GL.deleteShader(shader)
            return null
        }

        return shader;
    }
}