import P2DMesh      from "./Pussy2DMesh";
import PGameObject  from "./PussyGameObject";
import PMaterial    from "./PussyMaterial";
import PShader      from "./PussyShader";
import PGeometryBuffer, { PBufferTarget, PBufferUsage } from "./PussyGeometryBuffer";

export default class Scene {
    GL: WebGLRenderingContext;
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.GL = canvas.getContext("webgl")!;
    }

    loop(time = 0) {
        this.GL.viewport(0, 0, this.canvas.width, this.canvas.height);

        this.GL.clear(this.GL.COLOR_BUFFER_BIT);
        this.GL.enable(this.GL.BLEND);
        this.GL.blendFunc(this.GL.SRC_ALPHA, this.GL.ONE_MINUS_SRC_ALPHA);

        this.GL.clearColor(0.1, 0.1, 0.1, 1);

        this.render();

        requestAnimationFrame((time) => this.loop(time));
    }

    render() {
        const vshader = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;

        varying vec2 v_texCoord;

        void main() {
            gl_Position = vec4(a_position, 1, 1);
            v_texCoord = a_texCoord;
        }
        `;

        const fshader = `
        precision mediump float;
        varying vec2 v_texCoord;

        void main() {
            gl_FragColor = vec4(v_texCoord, 1, 1);
        }
        `;
        
        const shader = new PShader(vshader, fshader);
        const mat = new PMaterial(shader, {
            attibutes: {
                a_position: { bufferName: 'vertex', location: 0 },
                a_texCoord: { bufferName: 'uv', location: 0 },
            },

            uniforms: { }
        });

        const vBuff = new PGeometryBuffer(new Float32Array([-0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5]), 2, PBufferUsage.static, PBufferTarget.array, 0);
        const iBuff = new PGeometryBuffer(new Uint16Array([0, 1, 2, 0, 2, 3]), 1, PBufferUsage.static, PBufferTarget.elementArray, 0);
        const uBuff = new PGeometryBuffer(new Float32Array([0, 0, 0, 1, 1, 1, 1, 0]), 2, PBufferUsage.static, PBufferTarget.array, 0);

        const mesh = new P2DMesh(vBuff, iBuff, uBuff);
        const gameObject = new PGameObject(mesh, mat);

        gameObject.onNeedInitWithContext(this.GL);
        gameObject.onNeedUpdateWithContext(this.GL);
    }
}