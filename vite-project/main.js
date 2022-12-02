import './style.css'

/*imports the Three Js library*/
import * as THREE from '../node_modules/three/src/Three';

/*import orbiting controls for interaction*/
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

/*Scene defines like a stage with all the components*/
const scene = new THREE.Scene();

/*Camera that shows a certain amount of area*/
const camera = new THREE.PerspectiveCamera (75, window.innerWidth / window.innerHeight, 0.1, 1000); /*range of amount of object that can be seen */

/*to render the scene*/
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#background'),/*connects it to the id in the index*/
});

renderer.setPixelRatio(window.devicePixelRatio);/*set the pixel ratio to the same amount of the device pixel ratio*/
renderer.setSize(window.innerWidth, window.innerHeight);/*make it a fullscreen size*/
camera.position.setZ(30); /* gives better perspective when shapes are added*/

renderer.render(scene,camera);

//created and added spacetexture to the scene
const spaceTexture = new THREE.TextureLoader().load('images/spaceg.jpg');
scene.background = spaceTexture;
//texture for the moon
const moonTexture = new THREE.TextureLoader().load('images/moon.png');
const normalTexture = new THREE.TextureLoader().load('images/normal.jpg');
/*create sphere geometry*/
const geometry= new THREE.SphereGeometry(15, 32, 16);

/*create material color and wireframe*/
const material = new THREE.MeshStandardMaterial( {
  color: 0xffffff, wireframe:false, map: moonTexture,normalMap: normalTexture
});

/*add geometry and material to combine into a sphere*/
const sphere = new THREE.Mesh (geometry, material);

/*add sphere to the scene*/
scene.add(sphere);

/*adding light to scene to be able to see object*/
const pointLight = new THREE.PointLight(0xffffff); /*hexidecimal*/

/*adding lights position to the scene to make geometry visible*/
pointLight.position.set(20,20,20);

/*add pointlight to the scene*/
scene.add(pointLight);

/*add ambientlight, to illuminate object more*/
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

/*creating controls*/
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame( animate);

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  sphere.rotation.z += 0.01;

  /*update controls based oon movement*/
  controls.update();

  renderer.render( scene, camera );
}

/*makes it possible to animate the sphere by rotating it */
animate();

/*adding stars to the scene function*/
function addStar(){
  /*creates starlike shapes*/
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff
  })
  const star = new THREE.Mesh( geometry, material);
/*spreads the stars over the scene*/
  const [x, y , z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

/*populates the scene with 150 star objects*/
Array(200).fill().forEach(addStar);
