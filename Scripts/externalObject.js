// import * as THREE from 'https://cdn.skypack.dev/three@v0.138.3/build/three.module.js';
// import { GLTFLoader } from 'https://unpkg.com/three@0.126.0/examples/js/loaders/GLTFLoader.js';
/*
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xfffff0 );
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
camera.position.set( 2.5, 1.5, 3.0 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild( renderer.domElement );


var ambientLight = new THREE.AmbientLight( 0x404040, 5);
ambientLight.position.set( 0, 0, 0 );

const loader = new THREE.GLTFLoader();

// Load a glTF resource
loader.load(
    // resource URL
    '../Assets/BoardScene.glb',
    // called when the resource is loaded
    function ( gltf ) {
        scene.add( gltf.scene );
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

scene.add( ambientLight );
renderer.render( scene, camera );

// var animate = function () {
//     requestAnimationFrame( animate );
//
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
//
//     cube2.rotation.x += 0.01;
//     cube2.rotation.y += 0.02;
//
//
// };
//
// animate();
/**/

import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer, controls, canvas;
let gui;

init();
render();


function init() {
    canvas = document.querySelector('canvas.webgl')
    // const container = document.createElement( 'div' );
    // document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, (window.innerWidth) / window.innerHeight, 0.25, 20 );
    camera.position.set( 2.5, 1.5, 3.0 );


    scene = new THREE.Scene();

    const loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        '../Assets/JustBoard.glb',
        // called when the resource is loaded
        function ( gltf ) {

            gltf.scene.scale.set(0.5,0.5,0.5) // scale here

            scene.add( gltf.scene );

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


    renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true, canvas: canvas } );
    renderer.setPixelRatio( (window.innerWidth) / window.innerHeight );
    renderer.setSize( window.innerWidth, window.innerHeight );
    // renderer.toneMapping = THREE.ACESFilmicToneMapping; //QWE
    // renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    // container.appendChild( renderer.domElement );

    var ambientLight = new THREE.AmbientLight( 0x404040, 5);
    ambientLight.position.set( 2, 2, 2 );
    scene.add( ambientLight );

    controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render ); // use if there is no animation loop
    controls.enableZoom = false;
    controls.minDistance = 10;
    controls.maxDistance = 10;
    controls.target.set( 0, 0, 0);
    // controls.autoRotate = true;
    // controls.autoRotateSpeed = 4;
    controls.update();

    window.addEventListener( 'resize', onWindowResize );
}

// var animate = function () {
//     requestAnimationFrame( animate );
//
//     controls.update();
//
//     renderer.render( scene, camera );
// };

function onWindowResize() {
    camera.aspect = (window.innerWidth) / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();
}

function render() {
    renderer.render( scene, camera );
}

/**/