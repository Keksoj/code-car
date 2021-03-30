
/**
 * 🍑 Array Buffer.
 * Just wrap all typed array...
 */
export type PArrayBuffer = Float32Array | Float64Array | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array;

/**
 * 🍑 buffer usage.
 */
export enum PBufferUsage {
    static = WebGLRenderingContext['STATIC_DRAW'],
    dymamic = WebGLRenderingContext['DYNAMIC_DRAW'],
}

/**
 * 🍑 buffer target.
 */
export enum PBufferTarget {
    array = WebGLRenderingContext['ARRAY_BUFFER'],
    elementArray = WebGLRenderingContext['ELEMENT_ARRAY_BUFFER'],
}

/**
 * 🍑 Geometry buffer.
 */
export default class PGeometryBuffer {
    public data     : PArrayBuffer;
    public stride   : number;
    public usage    : PBufferUsage;
    public target   : PBufferTarget;
    public offset   : number;

    /**
     * Create new instance of 🍑 Geometry buffer.
     * @param data The buffer data.
     * @param stride The amount of components per elements.
     * @param usage The buffer usage.
     * @param target The buffer target.
     * @param offset Where the data start to be filled in the buffer.
     */
    constructor(data: PArrayBuffer, stride: number, usage: PBufferUsage, target: PBufferTarget, offset = 0) {
        this.data   = data;
        this.stride = stride;
        this.usage  = usage;
        this.target = target;
        this.offset = offset;
    }

    /**
     * Create webgl buffer object from this 🍑 geometry buffer.
     * This method fill the buffer with 🍑 geometry buffer data.
     * @param GL The context.
     * @returns A fresh webgl buffer.
     */
    public createRawBufferFromThis(GL: WebGLRenderingContext) {
        const buffer = GL.createBuffer();
        GL.bindBuffer(this.target, buffer);
        GL.bufferData(this.target, this.data, this.usage);

        return buffer;
    }

    /**
     * Update webgl buffer data from 🍑 geometry buffer data.
     * @param GL The context.
     * @param buffer The 🍑 geometry buffer where the data was.
     * @param rawBuffer The webgl buffer to update.
     */
    public static updateBuffer(GL: WebGLRenderingContext, buffer: PGeometryBuffer, rawBuffer: WebGLBuffer) {
        GL.bindBuffer(buffer.target, rawBuffer);
        GL.bufferSubData(buffer.target, buffer.offset, buffer.data);
    }

    /**
     * Delete a webgl buffer with buffer check.
     * @param GL The context.
     * @param buffer The buffer to delete.
     */
    public static deleteBufferSafe(GL: WebGLRenderingContext, buffer: WebGLBuffer) {
        if(GL.isBuffer(buffer))
            GL.deleteBuffer(buffer);
    }

    /**
     * Delete a webgl buffer without check the buffer.
     * @param GL The context.
     * @param buffer The buffer to delete.
     */
    public static deleteBuffer(GL: WebGLRenderingContext, buffer: WebGLBuffer) {
        GL.deleteBuffer(buffer);
    }
    
}