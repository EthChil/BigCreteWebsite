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
let point_light_l, point_light_r;

let board1;
let board2;
let board3;

let boards;

let brickMaterial;
let brick_list = [];

const objectDistance = 9.85;
const cameraDepth = 14; // 9
const numProjects = 3;

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
    camera.position.set( 0, 4, cameraDepth );//x is left right, y is up down, z is in out
    cameraGroup.add(camera);

    renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true, canvas: canvas } );
    renderer.physicallyCorrectLights = true
    renderer.setPixelRatio( (window.innerWidth) / window.innerHeight );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ReinhardToneMapping;

    point_light_l = new THREE.PointLight( 0xFFFFFF, 200, 30, 4);
    point_light_r = new THREE.PointLight( 0xFFFFFF, 200, 30, 4);
    scene.add( point_light_l );
    scene.add( point_light_r );

    // var ambientLight = new THREE.AmbientLight( 0x404040, 10);
    // ambientLight.position.set( 2, 2, 2 );
    // scene.add( ambientLight );

    envGen = new THREE.PMREMGenerator(renderer);
    envGen.compileEquirectangularShader();
    // scene.environment = envGen.fromScene(new ROOM.RoomEnvironment()).texture;

    let brick_texture_colour = new THREE.TextureLoader().load('Assets/Textures/TexturesCom_Wall_ConcreteBunker3_4x4_B_2K_albedo.png');
    let brick_texture_ao = new THREE.TextureLoader().load('Assets/Textures/TexturesCom_Wall_ConcreteBunker3_4x4_B_2K_ao.png');
    // let brick_texture_height = new THREE.TextureLoader().load('Assets/Textures/TexturesCom_Wall_ConcreteBunker3_4x4_B_2K_height.png');
    let brick_texture_normal = new THREE.TextureLoader().load('Assets/Textures/TexturesCom_Wall_ConcreteBunker3_4x4_B_2K_normal.png');
    let brick_texture_roughness = new THREE.TextureLoader().load('Assets/Textures/TexturesCom_Wall_ConcreteBunker3_4x4_B_2K_roughness.png');
    let brick_texture_alpha = new THREE.TextureLoader().load('Assets/Textures/TexturesCom_Wall_ConcreteBunker3_4x4_B_2K_alpha.png');

    let window_normal = new THREE.TextureLoader().load('Assets/Textures/NormalMapWindow.png');

    // brick_texture_colour.repeat.set(0.5, 0.25);
    // brick_texture_ao.repeat.set(0.5, 0.25);
    // brick_texture_height.repeat.set(0.25, 0.5);
    // brick_texture_normal.repeat.set(0.5, 0.25);
    // brick_texture_roughness.repeat.set(0.5, 0.25);
    // brick_texture_alpha.repeat.set(1, 1);

    let brick_geometry = new THREE.BoxGeometry(4, 4, 8);
    // let window_geometry = new THREE.BoxGeometry(3, 3, 1);
    //
    // let windowMaterial = new THREE.MeshStandardMaterial({
    //     normalMap: window_normal,
    // });
    //
    // let project_window = new THREE.Mesh(window_geometry, windowMaterial);
    // project_window.position.set(-2, 0, 3.45);
    // scene.add(project_window);

    brickMaterial = new THREE.MeshStandardMaterial({
        map: brick_texture_colour,
        aoMap: brick_texture_ao,
        aoMapIntensity: 1,
        normalMap: brick_texture_normal,
        roughnessMap: brick_texture_roughness,
        color: 0x6c6f70,
    });

    let brickWindow = new THREE.MeshStandardMaterial({
        map: brick_texture_colour,
        aoMap: brick_texture_ao,
        aoMapIntensity: 1,
        normalMap: brick_texture_normal,
        roughnessMap: brick_texture_roughness,
        color: 0x6c6f70,
        alphaMap: brick_texture_alpha,
        transparent: true,
    });
    
    var brickMaterialStack = [
        brickMaterial,
        brickWindow,
        brickMaterial,
        brickMaterial,
        brickMaterial,
        brickMaterial,
    ];

    for( let i = 0; i < numProjects+2; i++ ) {
        let brick_temp = new THREE.Mesh(brick_geometry, brickMaterialStack);

        brick_temp.position.set(1.9*Math.sin(0.5 * i * Math.PI), -4*i, 1.9*Math.cos(0.5 * i * Math.PI));
        brick_temp.rotation.x = 0;
        brick_temp.rotation.y = (i+1)/2 * Math.PI;
        brick_temp.name = "brickNum" + i;

        brick_list.push(brick_temp);
        scene.add(brick_temp);
    }

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
    const cursor_scale = {}
    cursor.x = 0
    cursor.y = 0
    cursor_scale.x = 0
    cursor_scale.y = 0


    window.addEventListener('mousemove', (event) =>
    {
        // cursor.x = event.clientX / sizes.width - 0.5
        // cursor.y = event.clientY / sizes.height - 0.5
        cursor.x = (event.clientX / sizes.width - 0.5);
        cursor.y = (-event.clientY / sizes.height + 0.5);

        // cursor.x = (event.clientX / sizes.width);
        // cursor.y = (event.clientY / sizes.height);

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

        cursor_scale.x = cursor.x*2;
        cursor_scale.y = cursor.y*2;
        raycaster.setFromCamera( cursor_scale, camera );

        // // Create a geometry that will be used for the line
        // let geometry = new THREE.BufferGeometry().setFromPoints([
        //     raycaster.ray.origin,
        //     raycaster.ray.origin.clone().add(raycaster.ray.direction.multiplyScalar(100))
        // ]);
        //
        // // Create a material for the line
        // let material = new THREE.LineBasicMaterial({color: 0xff0000}); // red color
        //
        // // Create a line using the geometry and material, then add it to the scene
        // let line = new THREE.Line(geometry, material);
        // scene.add(line);

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

        // // Animate meshes
        // for(const mesh of boards)
        // {
        //     mesh.rotation.x += deltaTime * 0.1
        //     mesh.rotation.y += deltaTime * 0.12
        // }

        const parallaxX = cursor.x * 0.5;
        const parallaxY = - cursor.y * 0.5;

        const full_rotation_height = 0.5*objectDistance / sizes.height;

        // Animate camera
        camera.position.y = -0.78* scrollY * full_rotation_height + parallaxY;
        camera.position.z = cameraDepth*Math.cos(scrollY * full_rotation_height / Math.PI);
        // camera.position.y += (parallaxY - camera.position.y) * 10 * deltaTime;
        camera.position.x = parallaxX + cameraDepth*Math.sin(scrollY * full_rotation_height / Math.PI);
        camera.rotation.y = (scrollY * full_rotation_height) / Math.PI;

        // light pos
        point_light_l.position.y = (-0.78 * scrollY * full_rotation_height);
        point_light_l.position.z = 0.5*cameraDepth*Math.cos((scrollY - 250) * full_rotation_height / Math.PI);
        point_light_l.position.x = 0.5*cameraDepth*Math.sin((scrollY - 250) * full_rotation_height / Math.PI);

        // console.log(scrollY);

        // light pos
        point_light_r.position.y = (-0.78 * scrollY * full_rotation_height);
        point_light_r.position.z = 0.5*cameraDepth*Math.cos((scrollY + 250) * full_rotation_height / Math.PI);
        point_light_r.position.x = 0.5*cameraDepth*Math.sin((scrollY + 250) * full_rotation_height / Math.PI);


        //boards[currentSection].rotation.x += (scrollY * 0.1);


        //
        // cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 10 * deltaTime;
        // cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 10 * deltaTime;
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