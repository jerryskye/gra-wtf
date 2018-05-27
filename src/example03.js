import * as THREE from 'three';
import textureURL from './texture.jpg';

var scene, camera, renderer, mesh;

export function init() {
  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(70, aspect, 1, 10000);
  camera.position.z = 400;
  scene = new THREE.Scene();
  var texture = new THREE.TextureLoader().load(textureURL);
  var geometry = new THREE.BoxBufferGeometry(200, 200, 200);
  var material = new THREE.MeshBasicMaterial({map: texture});
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  //window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window,innerHeight);
}

export function animate() {
  mesh.rotation.x += 0.02
  mesh.rotation.y -= 0.02
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
