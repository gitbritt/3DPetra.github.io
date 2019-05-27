
//Creating the scene, Camera position
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
camera.position.set(10, 10, 20)



//Controls
//var controls = new THREE.OrbitControls( camera );

var controls = new THREE.PointerLockControls( camera );

var blocker = document.getElementById( 'blocker' );
				var instructions = document.getElementById( 'instructions' );

				instructions.addEventListener( 'click', function () {

					controls.lock();

				}, false );

				controls.addEventListener( 'lock', function () {

					instructions.style.display = 'none';
					blocker.style.display = 'none';

				} );

				controls.addEventListener( 'unlock', function () {

					blocker.style.display = 'block';
					instructions.style.display = '';

				} );

scene.add( controls.getObject() );


var onKeyDown = function ( event ) {
    switch ( event.keyCode ) {
        case 38: // up
        case 87: // w
            moveForward = true;
            break;
        case 37: // left
        case 65: // a
            moveLeft = true;
            break;
        case 40: // down
        case 83: // s
            moveBackward = true;
            break;
        case 39: // right
        case 68: // d
            moveRight = true;
            break;
        case 32: // space
            if ( canJump === true ) velocity.y += 350;
            canJump = false;
            break;
    }
};


//Creating the Visual objects of Petra, Jordan
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var treasury_color = new THREE.MeshBasicMaterial( { color: 0x654321  } );
var base_column = new THREE.CylinderGeometry( 1, 1, 14, 1000);
var base_column_1 = new THREE.Mesh(base_column, treasury_color);
var base_column_2 = new THREE.Mesh(base_column, treasury_color);
var base_column_3 = new THREE.Mesh(base_column, treasury_color);
var base_column_4 = new THREE.Mesh(base_column, treasury_color);
var base_column_5 = new THREE.Mesh(base_column, treasury_color);
var base_column_6 = new THREE.Mesh(base_column, treasury_color);





var treasury_base = new THREE.BoxGeometry(5, .5, 30);
treasury_base = new THREE.Mesh(treasury_base, treasury_color);
var treasury_column_roof = new THREE.BoxGeometry(5, .5, 30);
treasury_column_roof = new THREE.Mesh(treasury_column_roof, treasury_color);
var geo = new THREE.PlaneBufferGeometry(100, 100, 0, 0);

//Plane of existance
var geometry = new THREE.PlaneGeometry( 100, 100, 10, 10 );
geometry.rotateX( - Math.PI / 2 );
var floorTexture = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/gitbritt/3DPetra.github.io/master/images/textures/ground_sand.jpg' );
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(20, 20);
var material = new THREE.MeshBasicMaterial({map: floorTexture}),
mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

//Base Column roof 1
var test = new THREE.Shape();

////Adding Objects to the Visual world
treasury_column_roof.position.set(0, 14, 0);
base_column_1.position.set(0, 7, 14);
base_column_2.position.set(0, 7, 8.5);
base_column_3.position.set(0, 7, 4);
base_column_4.position.set(0, 7, -4);
base_column_5.position.set(0, 7, -8.5);
base_column_6.position.set(0, 7, -14);

scene.add(treasury_base, treasury_column_roof , base_column_1, base_column_2, base_column_3, base_column_4, base_column_5, base_column_6 );


////Allow movement
var animate = function () {
    requestAnimationFrame( animate );

    renderer.render( scene, camera );
};

animate();





//////Testing code. Delete whendo
