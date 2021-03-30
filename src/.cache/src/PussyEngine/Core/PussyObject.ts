import { IPussy } from './IPussy';
import PGeometryBuffer from './PussyGeometryBuffer';

export default class PussyObject {

    /**
     * Indicate if this 🍑 buffer was initialized (`true`) or not (`false`)
     */
    private isInitialized: boolean = false;

    /**
     * Raw webgl buffers.
     */
    private rawBuffers: { [name: string] : WebGLBuffer } = {};

    /**
     * 🍑 buffers.
     */
    private buffers: { [name: string] : PGeometryBuffer } = {};

    /**
     * Add 🍑 geometry buffer.
     * @param name The buffer name.
     * @param buffer The buffer to add.
     * @returns `true` if 🍑 geometry buffer was successfully added otherwise `false`
     */
    protected addBuffer(name: string, buffer: PGeometryBuffer) {
        if(name in this.buffers) {
            console.warn(`Can't add 🍑 buffer "${name}": A 🍑 buffer with the same name already exist!`);
            return false;
        }

        this.buffers[name] = buffer;
        return true;
    }

    /**
     * Remove 🍑 geometry buffer.
     * @param name The 🍑 geometry buffer name.
     * @returns `true` if 🍑 geometry buffer was successfully removed otherwise `false`
     */
    protected removeBuffer(name: string) {
        if(name in this.buffers) {
            delete this.buffers[name];
            return true;
        }

        return false;
    }

    public bindBuffer(GL: WebGLRenderingContext, name: string) {
        if(name in this.rawBuffers && name in this.buffers) {
            GL.bindBuffer(this.buffers[name].target, this.rawBuffers[name]);
            return true;
        }

        return false;
    }

    public getBuffer(name: string) {
        if(name in this.buffers)
            return this.buffers[name];
            
        return null;
    }

    /**
     * Called when we need to initialize the object.
     * @param GL The context.
     */
     onNeedInitWithContext(GL: WebGLRenderingContext) {

        if(this.isInitialized) {
            console.warn("This 🍑 object was already initialized, skip the initialization of this 🍑 object...");
            return;
        }

        for(const key in this.buffers) {

            if(key in this.rawBuffers) {
                // Update buffer...
                PGeometryBuffer.updateBuffer(GL, this.buffers[key], this.rawBuffers[key]);
            } else {
                // Create buffer...
                const buffer = this.buffers[key].createRawBufferFromThis(GL);

                if(buffer)
                    this.rawBuffers[key] = buffer
            }
            
            // We no longer need this 🍑 buffer.
            // delete this.buffers[key];
        }

        this.isInitialized = true;
    }

    /**
     * Called once per frame.
     * @param GL The context.
     */
     onNeedUpdateWithContext(GL: WebGLRenderingContext) {
        for(const key in this.buffers) {

            if(key in this.rawBuffers) {
                // Update buffer...
                PGeometryBuffer.updateBuffer(GL, this.buffers[key], this.rawBuffers[key]);
            } else {
                // Create buffer...
                const buffer = this.buffers[key].createRawBufferFromThis(GL);
                
                if(buffer)
                    this.rawBuffers[key] = buffer
            }
            
            // We no longer need this 🍑 buffer.
            // delete this.buffers[key];
        }
    }

    /**
     * Called before the "destruction" of the object.
     * @param GL The context.
     */
     onNeedDestroyWithContext(GL: WebGLRenderingContext) {
        for(const key in this.rawBuffers)
            PGeometryBuffer.deleteBufferSafe(GL, this.rawBuffers[key]);
    }
}