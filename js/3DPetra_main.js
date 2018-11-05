var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 10)

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 2, 0, 0 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
var cube2 = new THREE.Mesh( geometry, material );
var controls = new THREE.OrbitControls( camera );
var geo = new THREE.PlaneBufferGeometry(100, 100, 0, 0);


var texture = new THREE.TextureLoader().load( "" );
texture.repeat.set(1, 1);
texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;


var mat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
var plane = new THREE.Mesh(geo, mat);

scene.add( cube, cube2, plane );
plane.rotateX( - Math.PI / 2);
cube2.position.set(10, 0, 0)

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame( animate );

    

    renderer.render( scene, camera );
};

animate();