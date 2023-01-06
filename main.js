import * as THREE from 'three';
import "./style.css";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Mesh } from 'three';

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry( 3, 64, 64 );
const material = new THREE.MeshStandardMaterial( {color: 0xffff83} );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight, 
}

const camera = new THREE.PerspectiveCamera( 45,sizes.width / sizes.height , 0.1, 100 );
camera.position.z = 20;
scene.add( camera );

const light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 0, 10, 10 );
scene.add( light );

const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( sizes.width, sizes.height );
renderer.setPixelRatio(2);
renderer.render( scene, camera ); 

const controls = new OrbitControls( camera, canvas );
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize( sizes.width, sizes.height );
})

const loop = () => {
    controls.update();
    sphere.rotation.y += 0.01;
    renderer.render( scene, camera );
    window.requestAnimationFrame( loop );
}

loop();