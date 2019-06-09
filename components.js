// register first component
AFRAME.registerComponent('log', {
    schema: {
        message: {type: 'string', default: 'hello, world!'}
    },
    init: function () {
        console.log(this.data.message);   
    }
});

