
export const BufferTarget = {
    ARRAY_BUFFER         : WebGLRenderingContext['ARRAY_BUFFER'],
    ELEMENT_ARRAY_BUFFER : WebGLRenderingContext['ELEMENT_ARRAY_BUFFER']
}

export const BufferUsage = {
    STATIC_DRAW  : WebGLRenderingContext['STATIC_DRAW'],
    DYNAMIC_DRAW : WebGLRenderingContext['DYNAMIC_DRAW']
}

export class CCBuffer {
    /** @type {WebGLBuffer} */
    buffer;
    
    /** @type {number} */
    length;

    /** @type {number} */
    stride;

    /** @type {BufferTarget} */
    target;

    /** @type {BufferUsage} */
    usage;

    /**
     * Create new CCBuffer.
     * @param {WebGLBuffer} buffer The raw webgl buffer
     * @param {number} length The buffer length.
     * @param {number} stride The amount of components per elements.
     * @param {BufferTarget} target The buffer target.
     * @param {BufferUsage} usage The buffer usage.
     */
    constructor(buffer, length, stride, target, usage) {
        this.buffer = buffer;
        this.length = length;
        this.stride = stride;
        this.target = target;
        this.usage  = usage;
    }
}

export default class CCContext {

    /** @type {WebGLRenderingContext} */
    gl;

    /**
     * Create new CCContext.
     * @param {HTMLCanvasElement} canvas The canvas.
     */
    constructor(canvas) {
        this.gl = canvas.getContext('webgl');
        this.gl.viewport(0, 0, canvas.width, canvas.height);

        // this.createBuffer([])
    }

    /**
     *  Create buffer.
     *  @param {ArrayLike} data The buffer data.
     *  @param {number} stride The amount of components.
     *  @param {BufferTarget} target The buffer target.
     *  @param {BufferUsage} usage The buffer usage.
     */
    createBuffer(data, stride, target, usage) {
        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(target, buffer);
        this.gl.bufferData(target, data.length, usage);

        return new CCBuffer(buffer, data.length, stride, target, usage);
    }

    /**
     * Update a buffer.
     * @param {CCBuffer} buffer The buffer to update.
     * @param {ArrayLike} data The data to put into the buffer.
     * @param {number} offset Where the data need to be put.
     */
    updateBuffer(buffer, data, offset) {
        this.gl.bindBuffer(target, buffer);
        this.gl.bufferSubData(buffer.target, offset, data);
    }

    /**
     * Delete a buffer.
     * @param {CCBuffer} buffer The buffer to be deleted.
     */
    deleteBuffer(buffer) {
        this.gl.bindBuffer(buffer.buffer);
        this.gl.deleteBuffer(buffer.buffer);
    }

    /**
     * Get the wengl context.
     * @returns The webgl context.
     */
    getRawContext() {
        return this.gl;
    }
}