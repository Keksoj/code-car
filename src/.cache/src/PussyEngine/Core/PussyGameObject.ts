import P2DMesh from './Pussy2DMesh';
import PMaterial from './PussyMaterial';

export default class PGameObject {
    private mesh: P2DMesh;
    private material: PMaterial;

    constructor(mesh: P2DMesh, material: PMaterial) {
        this.mesh = mesh;
        this.material = material;
    }

    onNeedInitWithContext(GL: WebGLRenderingContext) {
        this.material.onNeedInitWithContext(GL);
        this.mesh.onNeedInitWithContext(GL);
    }

    onNeedUpdateWithContext(GL: WebGLRenderingContext) {
        this.mesh.onNeedUpdateWithContext(GL);

        // Bindings...
        const attrs = this.material.getAttributes();
        for(const key in attrs) {
            const attribute = attrs[key];

            const buffer = this.mesh.getBuffer(attribute.bufferName);
            if(!buffer) continue;

            // Bind the buffer to operate on it...
            if(this.mesh.bindBuffer(GL, attribute.bufferName)) {
                GL.vertexAttribPointer(attribute.location, buffer.stride, GL.FLOAT, false, 0, 0);
                GL.enableVertexAttribArray(attribute.location);
            }
        }

        this.material.use(GL);

        const uniforms = this.material.getUniforms();
        for(const key in uniforms) {
            const uniform = uniforms[key];
            // bind uniforms here...
        }
        
        const indexBuffer = this.mesh.getBuffer('indices');
        if(!indexBuffer) return;

        if(this.mesh.bindBuffer(GL, 'indices')) {
            GL.drawElements(GL.TRIANGLES, indexBuffer.data.length, GL.UNSIGNED_SHORT, 0);
        }
    }
}