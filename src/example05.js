import * as THREE from 'three';
import * as dat from 'dat.gui';
import '../node_modules/three/examples/js/controls/TrackballControls.js';
import '../node_modules/three/examples/js/loaders/OBJLoader.js';
import CarModel from './alfa147.obj';
import DodecahedronModel from './dodecahedron.obj';

var scene, camera, renderer, mesh, controls;
var rot = 0;

function buildGUI() {
  var gui = new dat.GUI({autoPlace: false});
  var objectsMenu = gui.addFolder('Objects:');
  var object = objectsMenu.addFolder('Car');
  object.add(mesh.children[0], 'visible').name('Visible:').onChange(
    function (value) {
      for (var i = 0; i < mesh.children.length; i++) {
        mesh.visible = value;
      }
    }
  );

  //Dodanie palety kolorów.
  var Config = function () {
      this.color = "#ffffff";
  }

  var conf = new Config();
  object.addColor(conf, 'color').name('Color').onChange(
    function (value) {
      value = value.replace('#','0x');
      for (var i = 0; i < mesh.children.length; i++) {
        mesh.children[i].material.color.setHex(value);
      }
    }
  );

  var CameraZ = function() { this.z = 30; }
  var cameraZ = new CameraZ();
  object.add(cameraZ, 'z')
    .name('Camera z:')
    .min(0)
    .max(100)
    .step(1)
    .onChange(function(value) {
      camera.position.z = value;
    });

  var Transparency = function() { this.transp = 1; }
  var transparency = new Transparency();
  object.add(transparency, 'transp')
    .name('Transparency')
    .min(0)
    .max(1)
    .step(0.01)
    .onChange(function(value) {
      for (var i = 0; i < mesh.children.length; i++) {
        mesh.children[i].material.opacity = value;
      }
    });

  var ObjectMaterial = function() { this.material = ""; }
  var objectMaterial = new ObjectMaterial();
  object.add(objectMaterial, 'material', ['Wireframe', 'Flat', 'Gourand', 'Phong'])
    .name('Material type')
    .onChange(function(value) {
      var color = conf.color;
      var newMaterial;
      switch(value) {
        case 'Wireframe':
          newMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: transparency.transp,
            wireframe: true});
          break;
        case 'Flat':
          newMaterial = new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: transparency.transp,
            wireframe: THREE.FlatShading});
          break;
        case 'Gourand':
          newMaterial = new THREE.MeshLambertMaterial({
            color: color,
            transparent: true,
            opacity: transparency.transp,
            wireframe: THREE.SmoothShading});
          break;
        default:
          newMaterial = new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: transparency.transp,
            wireframe: THREE.SmoothShading});
          break;
      }
      for (var i = 0; i < mesh.children.length; i++) {
        mesh.children[i].material = newMaterial;
      }
    });

  var Button = function() {
    this.buttonFunction = function() {
      alert("You pressed the button.");
    }
  }
  var button = new Button();
  object.add(button, 'buttonFunction').name('Button');

  objectsMenu.open();

  var customContainer = document.getElementById('gui');
  customContainer.appendChild(gui.domElement);
}

export function init() {
  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);
  camera.position.z = 30;
  scene = new THREE.Scene();

  var light = new THREE.DirectionalLight(0xffffff, 1, 500);
  light.position.set(10, 10, 50);
  scene.add(light);

  var material = new THREE.MeshPhongMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 1,
    wireframe: THREE.SmoothShading});

  var loader = new THREE.OBJLoader();
  loader.load(CarModel, function(object) {
    for (var i = 0; i < object.children.length; i++) {
      object.children[i].material = material;
    }
    mesh = object;
    scene.add(mesh);
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
  });

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
