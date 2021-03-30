import PShader from "./PussyShader";

export interface PMaterialAttributeProperty {
    /**
     * The name of the associated buffer.
     */
    bufferName: string;

    /**
     * The vertex attribute location.
     */
    location: number;
}

export interface PMaterialUniformProperty {
    /**
     * The uniform type.
     */
    type: any;

    /**
     * The uniform value.
     */
    value: any;

    /**
     * The uniform location.
     */
    location: WebGLUniformLocation | null;
}

export type PMaterialProperties = {
    attibutes: { [name: string]: PMaterialAttributeProperty };
    uniforms: { [name: string]: PMaterialUniformProperty };
}

export default class PMaterial {
    private shader: PShader;
    private properties: PMaterialProperties;

    constructor(shader: PShader, props: PMaterialProperties) {
        this.shader = shader;
        this.properties = props;
    }

    public onNeedInitWithContext(GL: WebGLRenderingContext) {
        this.shader.onNeedInitWithContext(GL);

        const program = this.shader.getProgram();
        if(!program) return;

        // Fill the attributes location.
        for(const key in this.properties.attibutes) {
            this.properties.attibutes[key].location = GL.getAttribLocation(program, key);
        }

        // Fill the uniforms location.
        for(const key in this.properties.uniforms) {
            this.properties.uniforms[key].location = GL.getUniformLocation(program, key);
        }
    }

    public onNeedUpdateWithContext(GL: WebGLRenderingContext) {

    }

    public use(GL: WebGLRenderingContext) {
        GL.useProgram(this.shader.getProgram());
    }

    public getShader() {
        return this.shader;
    }

    public getProperties() {
        return this.properties;
    }

    public getAttributes() {
        return this.properties.attibutes;
    }

    public getUniforms() {
        return this.properties.uniforms;
    }

    public getAttribute(name: string) {
        if(name in this.properties.attibutes)
            return this.properties.attibutes[name];
        return null;
    }

    public getUniform(name: string) {
        if(name in this.properties.uniforms)
            return this.properties.uniforms[name];
        return null;
    }
}