import * as THREE from 'three';
import '../node_modules/three/examples/js/controls/TrackballControls.js';

var scene, camera, renderer, mesh, controls;
var rot = 0;
export function init() {
  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);
  camera.position.z = 30;
  scene = new THREE.Scene();
  mesh = new THREE.Mesh(new THREE.TorusGeometry(10, 1, 16, 30),
    new THREE.MeshPhongMaterial());
    //new THREE.MeshLambertMaterial());
  scene.add(mesh);

  var light = new THREE.PointLight(0xffff00, 1, 500);
  light.position.set(10, 10, 50);
  scene.add(light);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.TrackballControls(camera);
  controls.rotateSpeed = 5;
  controls.zoomSpeed = 1;
  controls.panSpeed = 0.1;
  document.body.appendChild(renderer.domElement);
  //window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window,innerHeight);
  controls.handleResize();
  renderer.render(scene, camera);
}

export function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
