import * as THREE from 'three';

var scene, camera, renderer, mesh1, mesh2, mesh3;
var rot = 0;
export function init() {
  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(70, aspect, 1, 10000);
  camera.position.z = 400;
  scene = new THREE.Scene();
  var geometry1 = new THREE.SphereGeometry(120, 40, 40);
  geometry1.translate(0, 0, 0);
  mesh1 = new THREE.Mesh(geometry1, new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true}));
  var geometry2 = new THREE.SphereGeometry(50, 10, 10);
  geometry2.translate(200, 0, 0);
  mesh2 = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true}));
  var geometry3 = new THREE.SphereGeometry(60, 10, 10);
  geometry3.translate(0, 200, 0);
  mesh3 = new THREE.Mesh(geometry3, new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true}));

  scene.add(mesh1);
  scene.add(mesh2);
  scene.add(mesh3);

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
  mesh1.rotation.y += 0.01;
  mesh2.rotation.y -= 0.01;
  mesh3.rotation.x += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
