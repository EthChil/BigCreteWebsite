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
let window_list = [];

const objectDistance = 9.85;
const cameraDepth = 14; // 9
const numProjects = 15;

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
    // renderer.outputEncoding = THREE.sRGBEncoding;
    // renderer.toneMapping = THREE.ReinhardToneMapping;

    point_light_l = new THREE.PointLight( 0xFFFFFF, 300, 30, 3);
    point_light_r = new THREE.PointLight( 0xFFFFFF, 300, 30, 3);
    scene.add( point_light_l );
    scene.add( point_light_r );

    // var ambientLight = new THREE.AmbientLight( 0x404040, 10);
    // ambientLight.position.set( 2, 2, 2 );
    // scene.add( ambientLight );

    envGen = new THREE.PMREMGenerator(renderer);
    envGen.compileEquirectangularShader();
    // scene.environment = envGen.fromScene(new ROOM.RoomEnvironment()).texture;

    let brick_texture_colour = new THREE.TextureLoader().load('Assets/Textures/TexturesCom_Wall_ConcreteBunker3_4x4_B_low_albedo.png');
    let brick_texture_ao = new THREE.TextureLoader().load('Assets/Textures/TexturesCom_Wall_ConcreteBunker3_4x4_B_low_ao.png');
    // let brick_texture_height = new THREE.TextureLoader().load('Assets/Textures/TexturesCom_Wall_ConcreteBunker3_4x4_B_2K_height.png');
    let brick_texture_normal = new THREE.TextureLoader().load('Assets/Textures/TexturesCom_Wall_ConcreteBunker3_4x4_B_low_normal.png');
    let brick_texture_roughness = new THREE.TextureLoader().load('Assets/Textures/TexturesCom_Wall_ConcreteBunker3_4x4_B_low_roughness.png');
    let brick_texture_alpha = new THREE.TextureLoader().load('Assets/Textures/TexturesCom_Wall_ConcreteBunker3_4x4_B_2K_alpha.png');

    // project 1
    // BIG CRETE CALCULATOR
    // click for more
    let BIG_CRETE_CALCULATOR = new THREE.TextureLoader().load('Assets/Textures/calculator_window.png');
    let SP_BIG_CRETE_CALCULATOR = new THREE.TextureLoader().load('Assets/Textures/text/calculator_text.png');

    // project 2
    let THROW_BOT = new THREE.TextureLoader().load('Assets/Textures/Throwbot_Window.png');
    let SP_THROW_BOT = new THREE.TextureLoader().load('Assets/Textures/text/throwbot_text.png');

    // project 3 (FPGA POWER SUPPLY)
    let FPGA_PSU = new THREE.TextureLoader().load('Assets/Textures/fpga_psu_window.png');
    let SP_FPGA_PSU = new THREE.TextureLoader().load('Assets/Textures/text/fpga_psu_text.png');

    // project 4 (bracket bot)
    let BRACKET_BOT = new THREE.TextureLoader().load('Assets/Textures/bracketbot_window.png');
    let SP_BRACKET_BOT = new THREE.TextureLoader().load('Assets/Textures/text/bracketbot_text.png');

    // project 5 (fpga pong)
    let PONG_FPGA = new THREE.TextureLoader().load('Assets/Textures/PONG_FPGA_albedo.png');
    let SP_PONG_FPGA = new THREE.TextureLoader().load('Assets/Textures/text/fpga_pong_text.png');

    // project 6 (lixie clock)
    let LIXIE_CLOCK = new THREE.TextureLoader().load('Assets/Textures/clock_window.png');
    let SP_LIXIE_CLOCK = new THREE.TextureLoader().load('Assets/Textures/text/lixie_clock_text.png');

    // project 7 (folding cube)
    let CUBE = new THREE.TextureLoader().load('Assets/Textures/cube_window.png');
    let SP_CUBE = new THREE.TextureLoader().load('Assets/Textures/text/cube_text.png');

    // Project 8 (ventillator)
    let VENTILATOR = new THREE.TextureLoader().load('Assets/Textures/ventilator_window.png');
    let SP_VENTILATOR = new THREE.TextureLoader().load('Assets/Textures/text/ventilator_text.png');

    // project 9 (mag-z follow focus)
    let MAGZ = new THREE.TextureLoader().load('Assets/Textures/magz_window.png');
    let SP_MAGZ = new THREE.TextureLoader().load('Assets/Textures/text/follow_focus_text.png');

    // project 10 (fold3r)
    let FOLD3R = new THREE.TextureLoader().load('Assets/Textures/fold3r_window.png');
    let SP_FOLD3R = new THREE.TextureLoader().load('Assets/Textures/text/fold3r_text.png');

    // project 11 (autonoprint)
    let AUTONOPRINT = new THREE.TextureLoader().load('Assets/Textures/autonoprint_window.png');
    let SP_AUTONOPRINT = new THREE.TextureLoader().load('Assets/Textures/text/autonoprint_text.png');

    // project 12 (Rebolt)
    let REBOLT = new THREE.TextureLoader().load('Assets/Textures/rebolt_window.png');
    let SP_REBOLT = new THREE.TextureLoader().load('Assets/Textures/text/rebolt_text.png');

    // project 13 (FRC Drivetrain)
    // let FRC = new THREE.TextureLoader().load('Assets/Textures/autonoprint_window.png');
    let SP_FRC = new THREE.TextureLoader().load('Assets/Textures/text/frc_dt_text.png');


    let brick_geometry = new THREE.BoxGeometry(4, 4, 8);
    let window_geometry = new THREE.BoxGeometry(3, 3, 3);
    let spray_paint_geometry = new THREE.PlaneGeometry(3,3);

    let project_window_materials = [
        new THREE.MeshBasicMaterial({ map: BIG_CRETE_CALCULATOR }), //1
        new THREE.MeshBasicMaterial({ map: THROW_BOT }),  //2
        new THREE.MeshBasicMaterial({ map: FPGA_PSU }), //3
        new THREE.MeshBasicMaterial({ map: BRACKET_BOT }), //4
        new THREE.MeshBasicMaterial({ map: PONG_FPGA }), //5
        new THREE.MeshBasicMaterial({ map: LIXIE_CLOCK }), //6
        new THREE.MeshBasicMaterial({ map: CUBE }), //7
        new THREE.MeshBasicMaterial({ map: VENTILATOR }), //8
        new THREE.MeshBasicMaterial({ map: FOLD3R }), //9
        new THREE.MeshBasicMaterial({ map: MAGZ }), //10
        new THREE.MeshBasicMaterial({ map: AUTONOPRINT }), //11
        new THREE.MeshBasicMaterial({ map: REBOLT }), //12
        // new THREE.MeshBasicMaterial({ map: FRC }), //13
        // new THREE.MeshBasicMaterial({ map: PONG_FPGA }), //13
        // new THREE.MeshBasicMaterial({ map: PONG_FPGA }), //13
        // new THREE.MeshBasicMaterial({ map: PONG_FPGA }), //13
    ];

    let spray_paint_materials = [
        new THREE.MeshStandardMaterial({ map: SP_BIG_CRETE_CALCULATOR, transparent: true}),
        new THREE.MeshStandardMaterial({ map: SP_THROW_BOT, transparent: true  }),
        new THREE.MeshStandardMaterial({ map: SP_FPGA_PSU, transparent: true  }),
        new THREE.MeshStandardMaterial({ map: SP_BRACKET_BOT, transparent: true  }),
        new THREE.MeshStandardMaterial({ map: SP_PONG_FPGA, transparent: true  }),
        new THREE.MeshStandardMaterial({ map: SP_LIXIE_CLOCK, transparent: true  }),
        new THREE.MeshStandardMaterial({ map: SP_CUBE, transparent: true  }),
        new THREE.MeshStandardMaterial({ map: SP_VENTILATOR, transparent: true  }),
        new THREE.MeshStandardMaterial({ map: SP_FOLD3R, transparent: true  }),
        new THREE.MeshStandardMaterial({ map: SP_MAGZ, transparent: true  }),
        new THREE.MeshStandardMaterial({ map: SP_AUTONOPRINT, transparent: true  }),
        new THREE.MeshStandardMaterial({ map: SP_REBOLT, transparent: true  }),
    ];

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
    
    // material stackup
    var brickMaterialStack = [
        brickMaterial,
        brickWindow,
        brickMaterial,
        brickMaterial,
        brickMaterial,
        brickMaterial,
    ];

    var divBy4 = 0;

    for( let i = 0; i < numProjects; i++ ) {
        let project_window = new THREE.Mesh(window_geometry, project_window_materials[i]);
        // project_window.position.set(-2, 0, 3);
        if(i%4 == 0)
            project_window.position.set(-2, -4*i, 2);
        if(i%4 == 1)
            project_window.position.set(2, -4*i, 2);
        if(i%4 == 2)
            project_window.position.set(2, -4*i, -2);
        if(i%4 == 3)
            project_window.position.set(-2, -4*i, -2);
        // window_list.push(project_window);
        scene.add(project_window);

        let project_spray_paint = new THREE.Mesh(spray_paint_geometry, spray_paint_materials[i]);
        project_spray_paint.name = "brickNum" + i;
        project_spray_paint.rotation.y = (i)/2 * Math.PI;
        if(i%4 == 0)
            project_spray_paint.position.set(1.75, -4*i, 3.95);
        if(i%4 == 1)
            project_spray_paint.position.set(3.95, -4*i, -1.75);
        if(i%4 == 2)
            project_spray_paint.position.set(-1.75, -4*i, -3.95);
        if(i%4 == 3)
            project_spray_paint.position.set(-3.95, -4*i, 1.75);
        scene.add(project_spray_paint);

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

    window.addEventListener('touchstart', () => 
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
                if (intersects[0].object.name === "brickNum0") {
                    window.location.href = "Projects/BCCalculator";
                } else if(intersects[0].object.name === "brickNum1") {
                    window.location.href = "Projects/Throwbot";
                } else if(intersects[0].object.name === "brickNum2") {
                    window.location.href = "Projects/FPGAPowerSupply";
                } else if(intersects[0].object.name === "brickNum3") {
                    window.location.href = "Projects/Bracketbot";
                } else if(intersects[0].object.name === "brickNum4") {
                    window.location.href = "Projects/FPGAPong";
                } else if(intersects[0].object.name === "brickNum5") {
                    window.location.href = "Projects/LixieClock";
                } else if(intersects[0].object.name === "brickNum6") {
                    window.location.href = "Projects/BCFidgetCube";
                } else if(intersects[0].object.name === "brickNum7") {
                    window.location.href = "Projects/Ventilator";
                } else if(intersects[0].object.name === "brickNum8") {
                    window.location.href = "Projects/Fold3r";
                } else if(intersects[0].object.name === "brickNum9") {
                    window.location.href = "Projects/Followfocus";
                } else if(intersects[0].object.name === "brickNum10") {
                    window.location.href = "Projects/Autonoprint";
                } else if(intersects[0].object.name === "brickNum11") {
                    window.location.href = "Projects/Rebolt";
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

        const parallaxX = cursor.x;
        const parallaxY = - cursor.y;

        const full_rotation_height = 0.501*objectDistance / sizes.height;

        // Animate camera
        camera.position.y = -0.805 * scrollY * full_rotation_height + parallaxY; //0.77
        camera.position.z = cameraDepth*Math.cos(scrollY * full_rotation_height / Math.PI);
        // camera.position.y += (parallaxY - camera.position.y) * 10 * deltaTime;
        camera.position.x = parallaxX + cameraDepth*Math.sin(scrollY * full_rotation_height / Math.PI);
        camera.rotation.y = (scrollY * full_rotation_height) / Math.PI;

        // light pos
        point_light_l.position.y = (-0.78 * scrollY * full_rotation_height);
        point_light_l.position.z = 0.6*cameraDepth*Math.cos((scrollY - 250) * full_rotation_height / Math.PI);
        point_light_l.position.x = 0.6*cameraDepth*Math.sin((scrollY - 250) * full_rotation_height / Math.PI);

        // console.log(scrollY);

        // light pos
        point_light_r.position.y = (-0.78 * scrollY * full_rotation_height);
        point_light_r.position.z = 0.6*cameraDepth*Math.cos((scrollY + 250) * full_rotation_height / Math.PI);
        point_light_r.position.x = 0.6*cameraDepth*Math.sin((scrollY + 250) * full_rotation_height / Math.PI);


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