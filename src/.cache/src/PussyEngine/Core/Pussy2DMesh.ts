import PBuffer from "./PussyGeometryBuffer";
import PussyObject from "./PussyObject";

export default class P2DMesh extends PussyObject {

    /**
     * Create new 🍑 2D Mesh.
     * @param vertices Buffer that contains vertices.
     * @param indices Buffer that contains indices.
     * @param uvs Buffer that contains uvs coordinates.
     */
    constructor(vertices: PBuffer, indices: PBuffer, uvs: PBuffer) {
        super();

        this.addBuffer( 'vertex' , vertices  );
        this.addBuffer( 'indices', indices   );
        this.addBuffer( 'uv'     , uvs       );
    }
}