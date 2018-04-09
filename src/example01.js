import * as THREE from 'three';

var scene, camera, renderer, mesh, square;
var tx = 4.5;
var ty = 0;
var speed = 0.05;
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
  camera.position.x = 0;

  var material = new THREE.MeshBasicMaterial({color: 0xff0000});
  square = new THREE.Mesh(createSquare(), material);

  scene = new THREE.Scene();
  scene.add(square);

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
  requestAnimationFrame(animate);

  square.position.x = tx;
  square.position.y = ty;
//   console.log("x " + square.position.x + ", y " + square.position.y);
  tx += speed;
  renderer.render(scene, camera);
  if(square.position.y > window.innerHeight/275){
      up = false;
      right = true;
      square.material.color.setHex(0xff0000);
  }
  if(square.position.x > window.innerWidth/250){
      right = false;
      down = true;
      square.material.color.setHex( 0x00ff00 );
  }
  if(square.position.y < -2.5){
      left = true;
      down = false;
      square.material.color.setHex( 0x0000ff );
  }
  if(square.position.y < -2/5 && square.position.x < -6){
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

  square.rotation.z += 2 * Math.PI / 180
  renderer.render(scene, camera);
}

export function main() {
  requestAnimationFrame(main);
  renderer.render(scene, camera);
}
