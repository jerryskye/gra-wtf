import * as THREE from 'three';
//import { scene, camera, renderer, mesh } from './index.js';

var scene, camera, renderer, mesh;

export function init() {

  camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
  camera.position.z = 5;
  var v1 = new THREE.Vector3(0.0, 0.5, 0);
  var v2 = new THREE.Vector3(-0.5, -0.5, 0);
  var v3 = new THREE.Vector3(0.5, -0.5, 0);

  var face = new THREE.Face3(0, 1, 2);

  var geom = new THREE.Geometry();
  geom.vertices.push(v1);
  geom.vertices.push(v2);
  geom.vertices.push(v3);
  geom.faces.push(face);

  geom.faces[0].vertexColors[0] = new THREE.Color(0xFF0000);
  geom.faces[0].vertexColors[1] = new THREE.Color(0xFF0000);
  geom.faces[0].vertexColors[2] = new THREE.Color(0xFF0000);

  var material = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors});
  var triangle = new THREE.Mesh(geom, material);

  scene = new THREE.Scene();
  scene.add(triangle);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window,innerHeight);
}

export function main() {
  requestAnimationFrame(main);
  renderer.render(scene, camera);
}
