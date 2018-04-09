import * as THREE from 'three';
//import { scene, camera, renderer, mesh } from './index.js';

var scene, camera, renderer, mesh;
var tx = 4.5;
var speed = 0.005;
var square;

function createSquare() {
  var geom = new THREE.Geometry();

  geom.vertices.push(new THREE.Vector3(0.5, 0.5, 0));
  geom.vertices.push(new THREE.Vector3(-0.5, 0.5, 0));
  geom.vertices.push(new THREE.Vector3(-0.5, -0.5, 0));
  geom.vertices.push(new THREE.Vector3(0.5, -0.5, 0));

  return geom;
}

export function init() {

  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, aspect, 1, 1, 1000);
  camera.position.z = 5;

  var material = new THREE.MeshBasicMaterial({color: 0xff0000});
  square = new THREE.Mesh(createSquare(), material);

  scene = new THREE.Scene();
  scene.add(square);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  //document.body.appendChild(renderer.domElement);
  //window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window,innerHeight);
}

export function animate() {
  requestAnimationFrame(animate);

  square.position.x = tx;
  tx += speed;
  renderer.render(scene, camera);
}

export function main() {
  requestAnimationFrame(main);
  renderer.render(scene, camera);
}
