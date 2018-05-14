import * as THREE from 'three';
import * as dat from 'dat.gui';
import '../node_modules/three/examples/js/controls/TrackballControls.js';

var scene, camera, renderer, mesh, controls;
var rot = 0;

function buildGUI() {
  var gui = new dat.GUI({autoPlace: false});
  var objectsMenu = gui.addFolder('Objects:');
  var object = objectsMenu.addFolder('Torus');
  object.add(mesh, 'visible').name('Visible:').onChange(
      function (value) {
          mesh.visibility = value;
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
          mesh.material.color.setHex(value);
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
      mesh.material.opacity = value;
    });

  var ObjectMaterial = function() { this.material = ""; }
  var objectMaterial = new ObjectMaterial();
  object.add(objectMaterial, 'material', ['Wireframe', 'Flat', 'Gourand', 'Phong'])
    .name('Material type')
    .onChange(function(value) {
      var color = mesh.material.color;
      var transp = mesh.material.transp;
      var newMaterial;
      switch(value) {
        case 'Wireframe':
          newMaterial = new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: transp,
            wireframe: true});
          break;
        case 'Flat':
          newMaterial = new THREE.MeshPhongMaterial({
            color,
            transparent: true,
            opacity: transp,
            wireframe: THREE.FlatShading});
          break;
        case 'Gourand':
          newMaterial = new THREE.MeshLambertMaterial({
            color,
            transparent: true,
            opacity: transp,
            wireframe: THREE.SmoothShading});
          break;
        default:
          newMaterial = new THREE.MeshPhongMaterial({
            color,
            transparent: true,
            opacity: transp,
            wireframe: THREE.SmoothShading});
          break;
      }
      mesh.material = newMaterial;
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
  mesh = new THREE.Mesh(new THREE.TorusGeometry(10, 1, 16, 30),
    new THREE.MeshPhongMaterial({transparent: true}));
    //new THREE.MeshLambertMaterial());
  scene.add(mesh);

  var light = new THREE.PointLight(0xffffff, 1, 500);
  light.position.set(10, 10, 50);
  scene.add(light);

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
