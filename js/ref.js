import * as THREE from 'https://unpkg.com/three@0.171.0/build/three.module.min.js';

// 1. 장면(Scene), 카메라, 렌더러 설정
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. GLSL 셰이더 설정
const vertexShader = `
    varying vec2 vUv; // 텍스처 좌표 전달

    void main() {
        vUv = uv; // uv 좌표를 프래그먼트 셰이더로 전달
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    varying vec2 vUv;

    void main() {
        // 그라데이션 색상 설정
        vec3 color = vec3(vUv.x, vUv.y, 1.0 - vUv.x); 
        gl_FragColor = vec4(color, 1.0);
    }
`;

// 3. ShaderMaterial 생성
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader
});

// 4. 평면(Plane) 생성 및 셰이더 적용
const geometry = new THREE.PlaneGeometry(2, 2); // 너비 2, 높이 2
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// 5. 카메라 설정
camera.position.z = 2;

// 6. 렌더링 루프
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();

// 7. 창 크기 조정 이벤트 처리
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}