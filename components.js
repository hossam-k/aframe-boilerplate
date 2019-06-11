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

//Register follow component

AFRAME.registerComponent('follow',{
  schema: {
    target: {type: 'selector'},
    speed: {type: 'number'}
  },

  init: function(){
    this.directionVec3 = new THREE.Vector3();
  },

  tick: function(time, timeDelta){
    var directionVec3 = this.directionVec3;
    
    //Grab position Vectors from entities
    var targetPosition = this.data.target.object3D.position;
    var currentPosition = this.el.object3D.position;

    //subtract vectors to get direction the entity should head in
    directionVec3.copy(targetPosition).sub(currentPosition);

    //calculate distance
    var distance = directionVec3.length();

    //Don't go any closer if a close proximity has been reached
    if (distance < 1) {return;}

    //Scale the direction vector's magnitude down to match the speed

    var factor = this.data.speed / distance;
    ['x', 'y', 'z'].forEach(function(axis){
      directionVec3[axis] *= factor * (timeDelta / 1000);
    });

    //Translate the entity in the direction towards the target
    this.el.setAttribute('position', {
      x: currentPosition.x + directionVec3.x,
      y: currentPosition.y + directionVec3.y,
      z: currentPosition.z + directionVec3.z
    });
  }
});