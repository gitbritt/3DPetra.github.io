
//Creating the scene, Camera position
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
camera.position.set(0, 0, 10)
//Controls
var controls = new THREE.OrbitControls( camera );



//Creating the Visual objects of Petra, Jordan
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var base_column = new THREE.CircleGeometry(6, 5);

var treasury_base = new THREE.BoxGeometry(5, .5, 20);
var treasury_color = new THREE.MeshBasicMaterial( { color: 0x654321  } );
treasury_base = new THREE.Mesh(treasury_base, treasury_color);

var geo = new THREE.PlaneBufferGeometry(100, 100, 0, 0);

//Texture for the floor
var texture = new THREE.TextureLoader().load( "" );
texture.repeat.set(1, 1);
texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
////



////Adding Objects to the Visual world
var mat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
var plane = new THREE.Mesh(geo, mat);

scene.add( treasury_base );
plane.rotateX( - Math.PI / 2);

//camera.position.z = 5;

var animate = function () {
    requestAnimationFrame( animate );

    

    renderer.render( scene, camera );
};

animate();