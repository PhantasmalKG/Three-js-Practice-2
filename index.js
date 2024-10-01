import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 1000;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.05;

const sunGroup = new THREE.Group();
sunGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(sunGroup);
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 8);
const material = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    flatShading: true,
    map: loader.load("./suntextmap.jpg"),
});

const sunMesh = new THREE.Mesh(geometry, material);
scene.add(sunMesh);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xaa44cc);
scene.add(hemiLight);


function animate(){
    requestAnimationFrame(animate);
    sunMesh.rotation.y += 0.003;
    renderer.render(scene, camera);
    orbitControls.update();
}

animate();