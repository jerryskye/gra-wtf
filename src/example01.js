import * as THREE from 'three';

var scene, camera, renderer, mesh, square;
var tx = -3.5;
var ty = 2;
var speed = 0.1;
var up = true;
var down = false;
var left = false;
var right = false;

function createSquare() {
  var geom = new THREE.Geometry();

  geom.vertices.push(new THREE.Vector3(0.5, 0.5, 0));
  geom.vertices.push(new THREE.Vector3(-0.5, 0.5, 0));
  geom.vertices.push(new THREE.Vector3(-0.5, -0.5, 0));
  geom.vertices.push(new THREE.Vector3(0.5, -0.5, 0));

  geom.faces.push(new THREE.Face3(0, 1, 2));
  geom.faces.push(new THREE.Face3(0, 2, 3));

  return geom;
}

export function init() {
  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
  camera.position.z = 5;

  var material = new THREE.MeshBasicMaterial({color: 0xff0000});
  square = new THREE.Mesh(createSquare(), material);

  scene = new THREE.Scene();
  scene.add(square);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  //window.addEventListener('resize', onWindowResize, false); //this doesn't work
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window,innerHeight);
}

export function animate() {
  requestAnimationFrame(animate);

  square.position.x = tx;
  square.position.y = ty;

  renderer.render(scene, camera);
  if(square.position.y > 2){
      up = false;
      right = true;
      square.material.color.setHex(0xff0000);
  }
  if(square.position.x > 3.5){
      right = false;
      down = true;
      square.material.color.setHex( 0x00ff00 );
  }
  if(square.position.y < -2){
      left = true;
      down = false;
      square.material.color.setHex( 0x0000ff );
  }
  if(square.position.y < -2 && square.position.x < -3.5){
      left = false;
      up = true;
      square.material.color.setHex( 0xff00ff );
  }
  if(up)
      ty += speed;
  if(down)
      ty -= speed;
  if(right)
      tx += speed;
  if(left)
      tx -= speed;

  square.rotation.z += Math.PI / 90
  renderer.render(scene, camera);
}

export function main() {
  requestAnimationFrame(main);
  renderer.render(scene, camera);
}
