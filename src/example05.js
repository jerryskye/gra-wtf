import * as THREE from 'three';
import * as dat from 'dat.gui';
import '../node_modules/three/examples/js/controls/TrackballControls.js';
import '../node_modules/three/examples/js/loaders/OBJLoader.js';
import AlfaModel from './alfa147.obj';
import MiniModel from './minicooper.obj';

var scene, camera, renderer, alfa_mesh, mini_mesh, controls;
var locks = [true, true];
var rot = 0;

function getNewMaterial(type, color, transparency) {
  switch(type) {
    case 'Wireframe':
      return new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: transparency,
        wireframe: true});
    case 'Flat':
      return new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: transparency,
        wireframe: THREE.FlatShading});
    case 'Gourand':
      return new THREE.MeshLambertMaterial({
        color: color,
        transparent: true,
        opacity: transparency,
        wireframe: THREE.SmoothShading});
    default:
      return new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: transparency,
        wireframe: THREE.SmoothShading});
  }
}

function buildGUI() {
  var gui = new dat.GUI({autoPlace: false});
  var objectsMenu = gui.addFolder('Objects:');
  var alfa = objectsMenu.addFolder('Alfa');
  var mini = objectsMenu.addFolder('Mini');
  alfa.add(alfa_mesh.children[0], 'visible').name('Visible:').onChange(
    function (value) {
      for (var i = 0; i < alfa_mesh.children.length; i++) {
        alfa_mesh.visible = value;
      }
    }
  );
  mini.add(mini_mesh.children[0], 'visible').name('Visible:').onChange(
    function (value) {
      for (var i = 0; i < mini_mesh.children.length; i++) {
        mini_mesh.visible = value;
      }
    }
  );

  //Dodanie palety kolorów.
  var Config = function () {
      this.color = "#ffffff";
  }

  var alfa_conf = new Config();
  var mini_conf = new Config();
  alfa.addColor(alfa_conf, 'color').name('Color').onChange(
    function (value) {
      value = value.replace('#','0x');
      for (var i = 0; i < alfa_mesh.children.length; i++) {
        alfa_mesh.children[i].material.color.setHex(value);
      }
    }
  );

  mini.addColor(mini_conf, 'color').name('Color').onChange(
    function (value) {
      value = value.replace('#','0x');
      for (var i = 0; i < mini_mesh.children.length; i++) {
        mini_mesh.children[i].material.color.setHex(value);
      }
    }
  );

  objectsMenu.add(camera.position, 'z')
    .name('Camera z:')
    .min(0)
    .max(1000)
    .step(1)
    .onChange(function(value) {
      camera.position.z = value;
    }).listen();

  var Transparency = function() { this.transp = 1; }
  var alfa_transparency = new Transparency();
  alfa.add(alfa_transparency, 'transp')
    .name('Transparency')
    .min(0)
    .max(1)
    .step(0.01)
    .onChange(function(value) {
      for (var i = 0; i < alfa_mesh.children.length; i++) {
        alfa_mesh.children[i].material.opacity = value;
      }
    });

  var mini_transparency = new Transparency();
  mini.add(mini_transparency, 'transp')
    .name('Transparency')
    .min(0)
    .max(1)
    .step(0.01)
    .onChange(function(value) {
      for (var i = 0; i < mini_mesh.children.length; i++) {
        mini_mesh.children[i].material.opacity = value;
      }
    });

  var ObjectMaterial = function() { this.material = ""; }
  var alfa_objectMaterial = new ObjectMaterial();
  alfa.add(alfa_objectMaterial, 'material', ['Wireframe', 'Flat', 'Gourand', 'Phong'])
    .name('Material type')
    .onChange(function(value) {
      var newMaterial = getNewMaterial(value, alfa_conf.color, alfa_transparency.transp);
      for (var i = 0; i < alfa_mesh.children.length; i++) {
        alfa_mesh.children[i].material = newMaterial;
      }
    });

  var mini_objectMaterial = new ObjectMaterial();
  mini.add(mini_objectMaterial, 'material', ['Wireframe', 'Flat', 'Gourand', 'Phong'])
    .name('Material type')
    .onChange(function(value) {
      var newMaterial = getNewMaterial(value, mini_conf.color, mini_transparency.transp);
      for (var i = 0; i < mini_mesh.children.length; i++) {
        mini_mesh.children[i].material = newMaterial;
      }
    });

  var Button = function() {
    this.buttonFunction = function() {
      alert("You pressed the button.");
    }
  }

  var button = new Button();
  objectsMenu.add(button, 'buttonFunction').name('Button');

  objectsMenu.open();

  var customContainer = document.getElementById('gui');

  objectsMenu.open();

  var customContainer = document.getElementById('gui');
  customContainer.appendChild(gui.domElement);
}

function go() {
  if(locks[0] || locks[1]) {
    setTimeout(go, 30);
    return;
  }
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xd7d7d7, 1);

  buildGUI();
  document.body.appendChild(renderer.domElement);
  controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.rotateSpeed = 5;
  controls.zoomSpeed = 1;
  controls.panSpeed = 0.1;
  animate();
}

export function init() {
  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);
  camera.position.z = 300;
  scene = new THREE.Scene();

  var light = new THREE.DirectionalLight(0xffffff, 1, 500);
  light.position.set(10, 10, 50);
  scene.add(light);

  var loader = new THREE.OBJLoader();
  loader.load(AlfaModel, function(object) {
    for (var i = 0; i < object.children.length; i++) {
      object.children[i].material = new THREE.MeshPhongMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 1,
        wireframe: THREE.SmoothShading
      });
    }
    alfa_mesh = object;
    scene.add(alfa_mesh);
    alfa_mesh.position.set(-100, 0, 0);
    locks[0] = false;
  });

  loader.load(MiniModel, function(object) {
    for (var i = 0; i < object.children.length; i++) {
      object.children[i].material = new THREE.MeshPhongMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 1,
        wireframe: THREE.SmoothShading
      });
    }
    mini_mesh = object;
    scene.add(mini_mesh);
    mini_mesh.position.set(100, 0, 0);
    locks[1] = false;
  });

  go();

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
  alfa_mesh.rotation.x += 0.02;
  alfa_mesh.rotation.y -= 0.005;
  mini_mesh.rotation.x -= 0.02;
  mini_mesh.rotation.y -= 0.005;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
