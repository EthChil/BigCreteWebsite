//TODO: when you click on a board it should flip

    import * as THREE from 'three';
    import * as GLTF from 'gltf';
    import * as ROOM from 'room';


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

let camera, cameraGroup, scene, renderer, controls, canvas, envGen;
let gui;

let board1;
let board2;
let board3;

let boards;

let brickMaterial, brick;

const objectDistance = 10;

const raycaster = new THREE.Raycaster();

init();
render();


function init() {
    var clicked = false;

    canvas = document.querySelector('canvas.webgl')

    scene = new THREE.Scene();



    /**
     * Camera
     */
    // Group
    cameraGroup = new THREE.Group();
    scene.add(cameraGroup);

    // Base camera
    camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.25, 50);
    camera.position.set( 0, 4, 9 );//x is left right, y is up down, z is in out
    cameraGroup.add(camera);

    renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true, canvas: canvas } );
    renderer.physicallyCorrectLights = true
    renderer.setPixelRatio( (window.innerWidth) / window.innerHeight );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ReinhardToneMapping;

    var ambientLight = new THREE.AmbientLight( 0x404040, 10);
    ambientLight.position.set( 2, 2, 2 );
    scene.add( ambientLight );

    envGen = new THREE.PMREMGenerator(renderer);
    envGen.compileEquirectangularShader();
    scene.environment = envGen.fromScene(new ROOM.RoomEnvironment()).texture;


    var brick_geometry = new THREE.BoxGeometry(2, 2, 4);
    brickMaterial = new THREE.MeshStandardMaterial(brick);
    brick = new THREE.Mesh(brick_geometry, brickMaterial);

    brick.position.set(-0.25, 0, -2);

    brick.name = "tony";
    scene.add(brick);

    // const loader = new GLTF.GLTFLoader();


    /*
    // Load a glTF resource
    loader.load(
        // resource URL
        'Assets/Website-GLB/FPGA-PONG-Proper.glb',
        // called when the resource is loaded
        function ( gltf ) {
            board1 = gltf.scene;

            board1.scale.set(0.5,0.5,0.5) // scale here
            board1.position.set(-0.25, -objectDistance*0, -2);
            board1.rotateX(-Math.PI / 5);

            scene.add( board1 );

            render();
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        }
    );

    // Load a glTF resource
    loader.load(
        // resource URL
        'Assets/Website-GLB/BigCreteClock.glb',
        // called when the resource is loaded
        function ( gltf ) {

            board2 = gltf.scene;
            board2.scale.set(1.5,1.5,1.5) // scale here
            board2.position.set(0, -(objectDistance + 2), 0);
            board2.rotateY(Math.PI);
            //board2.rotateX(Math.PI / 4);

            scene.add( board2 );

            render();
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        }
    );

    // Load a glTF resource
    loader.load(
        // resource URL
        'Assets/Website-GLB/Calculator-Voltage-Board.glb',
        // called when the resource is loaded
        function ( gltf ) {

            board3 = gltf.scene;
            board3.scale.set(0.5,0.5,0.5) // scale here
            board3.position.set(-0.25, -objectDistance*2, 2);
            board3.rotateX(Math.PI / 4);

            scene.add( board3 );

            render();
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        }
    );

    boards = [board1, board2, board3];
    */

    /**
     * object ray cast selection
     */
    window.addEventListener( 'click', () =>
    {
        clicked = true;
    })

    /**
     * Sizes
     */
    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    /**
     * Scroll
     */
    let scrollY = window.scrollY
    let currentSection = 0

    window.addEventListener('scroll', () =>
    {
        scrollY = window.scrollY
        const newSection = Math.round(scrollY / sizes.height)

        if(newSection != currentSection)
        {
            currentSection = newSection
        }
    })

    /**
     * Cursor
     */
    const cursor = {}
    cursor.x = 0
    cursor.y = 0

    window.addEventListener('mousemove', (event) =>
    {
        // cursor.x = event.clientX / sizes.width - 0.5
        // cursor.y = event.clientY / sizes.height - 0.5
        cursor.x = event.clientX / sizes.width - 0.5
        cursor.y = event.clientY / sizes.height - 0.5
    })

    /**
     * Animate
     */
    const clock = new THREE.Clock()
    let previousTime = 0

    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()
        const deltaTime = elapsedTime - previousTime
        previousTime = elapsedTime

        raycaster.setFromCamera( cursor, camera );

        const intersects = raycaster.intersectObjects(scene.children);

        if(intersects.length > 0) {
            document.body.style.cursor = "pointer";
            if(clicked) {
                if (intersects[0].object.name === "tony") {
                    window.location.href = "circuit.html";
                }
                clicked = false;
            }
        } else {
            document.body.style.cursor = "default";
        }

        for( let i = 0; i < intersects.length; i++ ) {
            console.log(intersects[i].object.name)
        }

        // // Animate meshes
        // for(const mesh of boards)
        // {
        //     mesh.rotation.x += deltaTime * 0.1
        //     mesh.rotation.y += deltaTime * 0.12
        // }
        brick.rotation.x += deltaTime * 0.1;
        brick.rotation.y += deltaTime * 0.12;


        // Animate camera
        camera.position.y = - scrollY / sizes.height * (objectDistance);

        //boards[currentSection].rotation.x += (scrollY * 0.1);

        const parallaxX = cursor.x * 0.5;
        const parallaxY = - cursor.y * 0.5;

        cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 10 * deltaTime;
        cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 10 * deltaTime;
        // console.log(camera.position.y)

        // Render
        render();

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
}

function render() {
    renderer.render( scene, camera );
}



/**/