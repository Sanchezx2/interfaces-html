import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.getElementById('motor-canvas');
const rpmSlider = document.getElementById('rpmSlider');

if (container) {
  // Quita el texto provisional cuando cargue el lienzo 3D
  container.innerHTML = '';

  const scene = new THREE.Scene();

  const width = container.clientWidth || 500;
  const height = container.clientHeight || 360;

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
  camera.position.set(5.2, 3.4, 5.8);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 3.2;
  controls.maxDistance = 11;

  // Iluminación
  const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.9);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
  keyLight.position.set(5, 8, 6);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xe59a6c, 1.1);
  rimLight.position.set(-6, 3, -5);
  scene.add(rimLight);

  // Grupo principal del motor bóxer
  const engineGroup = new THREE.Group();
  scene.add(engineGroup);

  // Materiales
  const blockMat = new THREE.MeshStandardMaterial({
    color: 0x262d38,
    metalness: 0.75,
    roughness: 0.32
  });

  const cylinderMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.6,
    roughness: 0.4,
    transparent: true,
    opacity: 0.45
  });

  const pistonMat = new THREE.MeshStandardMaterial({
    color: 0x67c3d8,
    metalness: 0.45,
    roughness: 0.25
  });

  const crankMat = new THREE.MeshStandardMaterial({
    color: 0xe59a6c,
    metalness: 0.65,
    roughness: 0.3
  });

  // Cárter / bloque central y cigüeñal
  const crankcase = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.1, 1.1), blockMat);
  engineGroup.add(crankcase);

  const crankshaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.14, 3.8, 20),
    crankMat
  );
  crankshaft.rotation.z = Math.PI / 2;
  engineGroup.add(crankshaft);

  // 6 cilindros opuestos (3 izquierda, 3 derecha en X)
  const xPositions = [-1.1, 0, 1.1];
  const pistons = []; // { mesh, side, phase }

  xPositions.forEach((xPos, idx) => {
    const phase = idx * ((Math.PI * 2) / 3);

    // Banda +Z (lado derecho en vista frontal)
    const cylFront = new THREE.Mesh(
      new THREE.CylinderGeometry(0.36, 0.36, 1.35, 24, 1, true),
      cylinderMat
    );
    cylFront.rotation.x = Math.PI / 2;
    cylFront.position.set(xPos, 0.1, 1.15);
    engineGroup.add(cylFront);

    const pistonFront = new THREE.Mesh(
      new THREE.CylinderGeometry(0.31, 0.31, 0.28, 24),
      pistonMat
    );
    pistonFront.rotation.x = Math.PI / 2;
    pistonFront.position.set(xPos, 0.1, 1.15);
    engineGroup.add(pistonFront);
    pistons.push({ mesh: pistonFront, side: 1, phase });

    // Banda -Z (lado izquierdo en vista frontal)
    const cylBack = new THREE.Mesh(
      new THREE.CylinderGeometry(0.36, 0.36, 1.35, 24, 1, true),
      cylinderMat
    );
    cylBack.rotation.x = Math.PI / 2;
    cylBack.position.set(xPos, 0.1, -1.15);
    engineGroup.add(cylBack);

    const pistonBack = new THREE.Mesh(
      new THREE.CylinderGeometry(0.31, 0.31, 0.28, 24),
      pistonMat
    );
    pistonBack.rotation.x = Math.PI / 2;
    pistonBack.position.set(xPos, 0.1, -1.15);
    engineGroup.add(pistonBack);
    pistons.push({ mesh: pistonBack, side: -1, phase });
  });

  // Ajuste al redimensionar la ventana
  window.addEventListener('resize', () => {
    const w = container.clientWidth || 500;
    const h = container.clientHeight || 360;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  let crankAngle = 0;
  let lastTime = performance.now();

  function animate(now) {
    const dt = (now - lastTime) / 1000;
    lastTime = now;

    const rpmValue = rpmSlider ? Number(rpmSlider.value) : 35;
    const angularSpeed = (rpmValue / 100) * 14; // radianes por segundo
    crankAngle += angularSpeed * dt;

    crankshaft.rotation.x = crankAngle;

    // Movimiento alternativo de los pistones opuestos
    pistons.forEach(({ mesh, side, phase }) => {
      const stroke = Math.sin(crankAngle + phase) * 0.34;
      mesh.position.z = side * (1.15 + stroke);
    });

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}