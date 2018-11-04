var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 4, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
var cube2 = new THREE.Mesh( geometry, material );
var controls = new THREE.OrbitControls( camera );
scene.add( cube, cube2 );
cube2.position.set(0, 10, 0)

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame( animate );

    

    renderer.render( scene, camera );
};

animate();