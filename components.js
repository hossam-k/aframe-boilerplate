//register box component
AFRAME.registerComponent('box', {
    schema: {
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        depth: {type: 'number', default: 1},
        color: {type: 'color', default: '#AAA'}
    },

    //Initial creation and setting of mesh
    init: function () {
        var data = this.data;
        var el = this.el;

        //create Geometry
        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);

        //create Material
        this.material = new THREE.MeshStandardMaterial({color: data.color});

        //create Mesh
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        //set Mesh on entity
        el.setObject3D('mesh', this.mesh);
    },
    // Update the mesh in response to property updates
    update: function (oldData) {
        var data = this.data;
        var el = this.el;
        
        // If 'oldData' is empty, then this means we're in the initialization process
        if (Object.keys(oldData).length === 0) {return;}

        //Geometry-related properties changed, update the geometry
        if (data.width !== oldData.width || 
            data.height !== oldData.height||
            data.depth !== oldData.depth) {
            el.getObject3D('mesh').geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        }

        //Material-related properties changed, update the material
        if (data.color !== oldData.color) {
            el.getObject3D('mesh').material.color = new THREE.Color(data.color)
        }
    },
    remove: function () {
        this.el.removeObject3D('mesh');
    }
});


