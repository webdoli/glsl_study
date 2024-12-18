import * as THREE from 'https://unpkg.com/three@0.171.0/build/three.module.min.js';

// 1. 장면(Scene), 카메라, 렌더러 설정
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0.1, 10 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// 2. GLSL 셰이더 설정
const geometry = new THREE.PlaneGeometry( 1, 1 );
const material = new THREE.ShaderMaterial();
const plane = new THREE.Mesh( geometry, material );

scene.add( plane );
camera.position.z = 1;

onWindowResize();
animate();

// 3. 렌더링 루프
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

// 7. 창 크기 조정 이벤트 처리
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}