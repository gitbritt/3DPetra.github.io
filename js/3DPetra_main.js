//Based off of three.js Example from https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_pointerlock.html

var camera, scene, renderer, controls;

var objects = [];

var raycaster;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var vertex = new THREE.Vector3();
var color = new THREE.Color();

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(100, 100, 100);
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xffffff );
	scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

	var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
	light.position.set( 0.5, 1, 0.75 );
	scene.add( light );

	controls = new THREE.PointerLockControls( camera );

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

	var onKeyUp = function ( event ) {

		switch ( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = false;
				break;

			case 37: // left
			case 65: // a
				moveLeft = false;
				break;

			case 40: // down
			case 83: // s
				moveBackward = false;
				break;

			case 39: // right
			case 68: // d
				moveRight = false;
				break;

		}

	};

	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );

	raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

	// floor

	//Plane of existance
var geometry = new THREE.PlaneGeometry( 2000, 2000, 10, 10 );
geometry.rotateX( - Math.PI / 2 );
var floorTexture = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/gitbritt/3DPetra.github.io/master/images/textures/ground_sand.jpg' );
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(20, 20);
var material = new THREE.MeshBasicMaterial({map: floorTexture}),
mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
	// objects
	var treasury_color = new THREE.MeshBasicMaterial( { color: 0x654321  } );
	var base_column = new THREE.CylinderGeometry( 10, 10, 200, 1000);
	var base_column_1 = new THREE.Mesh(base_column, treasury_color);
	var base_column_2 = new THREE.Mesh(base_column, treasury_color);
	var base_column_3 = new THREE.Mesh(base_column, treasury_color);
	var base_column_4 = new THREE.Mesh(base_column, treasury_color);
	var base_column_5 = new THREE.Mesh(base_column, treasury_color);
	var base_column_6 = new THREE.Mesh(base_column, treasury_color);
	
	var treasury_base = new THREE.BoxGeometry(10, 5, 200);
	treasury_base = new THREE.Mesh(treasury_base, treasury_color);
	var treasury_column_roof = new THREE.BoxGeometry(5, 5, 200);
	treasury_column_roof = new THREE.Mesh(treasury_column_roof, treasury_color);
	var geo = new THREE.PlaneBufferGeometry(100, 100, 0, 0);
	
	treasury_column_roof.position.set(0, 100, 0);
	base_column_1.position.set(0, 7, 100);
	base_column_2.position.set(0, 7, 60);
	base_column_3.position.set(0, 7, 30);
	base_column_4.position.set(0, 7, -30);
	base_column_5.position.set(0, 7, -60);
	base_column_6.position.set(0, 7, -100);
	scene.add(treasury_base, treasury_column_roof , base_column_1, base_column_2, base_column_3, base_column_4, base_column_5, base_column_6 );
	

	//

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	if ( controls.isLocked === true ) {

		raycaster.ray.origin.copy( controls.getObject().position );
		raycaster.ray.origin.y -= 10;

		var intersections = raycaster.intersectObjects( objects );

		var onObject = intersections.length > 0;

		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;

		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;

		velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

		direction.z = Number( moveForward ) - Number( moveBackward );
		direction.x = Number( moveLeft ) - Number( moveRight );
		direction.normalize(); // this ensures consistent movements in all directions

		if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
		if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

		if ( onObject === true ) {

			velocity.y = Math.max( 0, velocity.y );
			canJump = true;

		}
		controls.getObject().translateX( velocity.x * delta );
		controls.getObject().position.y += ( velocity.y * delta ); // new behavior
		controls.getObject().translateZ( velocity.z * delta );

		if ( controls.getObject().position.y < 10 ) {

			velocity.y = 0;
			controls.getObject().position.y = 10;

			canJump = true;

		}

		prevTime = time;

	}

	renderer.render( scene, camera );

}