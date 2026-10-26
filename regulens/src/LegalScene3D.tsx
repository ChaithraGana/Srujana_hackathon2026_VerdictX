import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type SceneMode = 'hero' | 'login' | 'mini' | 'vault' | 'profile';
type SceneProps = {
  mode?: SceneMode;
  onDocumentSelect?: (kind: 'original' | 'amended') => void;
  onDocumentHover?: (kind: 'original' | 'amended' | null) => void;
};

const gold = 0xc8a96e;
const ivory = 0xf3efe6;
const navy = 0x07111f;
const teal = 0x42b9a6;
const red = 0xba6b63;

function makeDocument(kind: 'original' | 'amended') {
  const group = new THREE.Group();
  group.userData.kind = kind;
  const original = kind === 'original';
  const board = new THREE.Mesh(new THREE.BoxGeometry(1.82, 2.36, 0.08), new THREE.MeshPhysicalMaterial({ color: original ? 0xc8d2d3 : 0xe8e3d3, metalness: 0.18, roughness: 0.34, transmission: 0.08, transparent: true, opacity: 0.92 }));
  board.userData.kind = kind;
  group.add(board);
  group.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.9, 2.44, 0.1)), new THREE.LineBasicMaterial({ color: original ? red : teal, transparent: true, opacity: 0.8 })));
  const textMaterial = new THREE.MeshBasicMaterial({ color: original ? 0x8d4944 : 0x247767, transparent: true, opacity: 0.95 });
  const inkMaterial = new THREE.MeshBasicMaterial({ color: 0x213040, transparent: true, opacity: 0.45 });
  for (let index = 0; index < 7; index += 1) {
    const width = index === 2 ? 0.9 : index === 5 ? 1.1 : 1.42 - (index % 2) * 0.2;
    const line = new THREE.Mesh(new THREE.BoxGeometry(width, 0.028, 0.014), index === 2 || index === 5 ? textMaterial : inkMaterial);
    line.position.set(-0.64 + width / 2, 0.78 - index * 0.25, 0.06);
    group.add(line);
  }
  const label = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.075, 0.018), new THREE.MeshBasicMaterial({ color: original ? red : teal }));
  label.position.set(-0.29, 0.98, 0.07);
  group.add(label);
  return group;
}

function addScale(scene: THREE.Scene, scale: number) {
  const group = new THREE.Group();
  group.name = 'balance-scale';
  const metal = new THREE.MeshStandardMaterial({ color: gold, metalness: 0.93, roughness: 0.22 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x73552d, metalness: 0.86, roughness: 0.27 });
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.07, 3.3, 16), metal); stem.position.y = -0.15; group.add(stem);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.72, 0.12, 32), darkMetal); base.position.y = -1.8; group.add(base);
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.38, 0.6, 24), metal); pedestal.position.y = -1.47; group.add(pedestal);
  const bar = new THREE.Mesh(new THREE.BoxGeometry(3.15, 0.09, 0.09), metal); bar.position.y = 1.08; group.add(bar);
  const crown = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.035, 10, 24), metal); crown.position.y = 1.78; group.add(crown);
  const crownStem = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.55, 8), metal); crownStem.position.y = 1.48; group.add(crownStem);
  [-1, 1].forEach((side) => {
    const chain = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.25, 8), darkMetal); chain.position.set(side * 1.22, 0.42, 0); chain.rotation.z = side * 0.08; group.add(chain);
    const pan = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.025, 10, 32, Math.PI), metal); pan.rotation.x = Math.PI; pan.position.set(side * 1.22, -0.2, 0); group.add(pan);
  });
  group.scale.setScalar(scale);
  scene.add(group);
  return group;
}

function addArchitecture(scene: THREE.Scene) {
  const stone = new THREE.MeshStandardMaterial({ color: 0x15283a, metalness: 0.18, roughness: 0.7, transparent: true, opacity: 0.78 });
  [-5.3, -3.65, 3.65, 5.3].forEach((x, index) => {
    const column = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.55, 7.4, 18), stone); column.position.set(x, 0, -2.5 + (index % 2) * 0.35); scene.add(column);
    const capital = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.22, 1.18), stone); capital.position.set(x, 3.6, column.position.z); scene.add(capital);
  });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 24), new THREE.MeshStandardMaterial({ color: navy, metalness: 0.62, roughness: 0.32 })); floor.rotation.x = -Math.PI / 2; floor.position.y = -1.86; scene.add(floor);
  const arch = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.06, 8, 64, Math.PI), new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0.3 })); arch.rotation.z = Math.PI; arch.position.set(0, -0.5, -3.4); scene.add(arch);
}

function addParticles(scene: THREE.Scene, count: number) {
  const positions = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) { positions[index * 3] = (Math.random() - 0.5) * 14; positions[index * 3 + 1] = (Math.random() - 0.5) * 8; positions[index * 3 + 2] = (Math.random() - 0.5) * 8 - 1; }
  const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  scene.add(new THREE.Points(geometry, new THREE.PointsMaterial({ color: gold, size: 0.025, transparent: true, opacity: 0.65, sizeAttenuation: true })));
}

function addBusinessSilhouettes(scene: THREE.Scene) {
  const group = new THREE.Group(); group.name = 'business-sector-silhouettes';
  const material = new THREE.MeshStandardMaterial({ color: 0x2a4658, metalness: 0.34, roughness: 0.48, transparent: true, opacity: 0.82 });
  [
    { x: -1.7, width: 0.85, height: 1.15, depth: 0.7 },
    { x: -0.55, width: 0.65, height: 1.75, depth: 0.62 },
    { x: 0.45, width: 0.95, height: 1.35, depth: 0.76 },
    { x: 1.65, width: 0.55, height: 2.1, depth: 0.55 },
  ].forEach(({ x, width, height, depth }) => {
    const building = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    building.position.set(x, height / 2 - 1.05, -0.1); group.add(building);
    for (let row = 0; row < 3; row += 1) {
      const window = new THREE.Mesh(new THREE.BoxGeometry(width * 0.16, 0.07, 0.018), new THREE.MeshBasicMaterial({ color: row === 1 ? teal : gold, transparent: true, opacity: 0.7 }));
      window.position.set(x, height / 2 - 0.62 + row * 0.23, depth / 2 + 0.02); group.add(window);
    }
  });
  scene.add(group); return group;
}

function addStateGlobe(scene: THREE.Scene) {
  const group = new THREE.Group(); group.name = 'india-state-globe';
  const globe = new THREE.Mesh(new THREE.SphereGeometry(1.02, 24, 16), new THREE.MeshPhysicalMaterial({ color: 0x244b5a, metalness: 0.35, roughness: 0.22, transmission: 0.45, transparent: true, opacity: 0.5 })); group.add(globe);
  group.add(new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(1.06, 12, 8)), new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.48 })));
  const stateDots: THREE.Mesh[] = [];
  [[0.58, 0.38, 0.7], [-0.18, 0.62, 0.78], [-0.55, -0.12, 0.82]].forEach(([x, y, z]) => {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.075, 10, 10), new THREE.MeshBasicMaterial({ color: teal, transparent: true, opacity: 0.95 }));
    dot.position.set(x, y, z).normalize().multiplyScalar(1.1); group.add(dot); stateDots.push(dot);
  });
  const arcMaterial = new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.58 });
  [[0, 1], [1, 2], [2, 0]].forEach(([a, b]) => {
    const start = stateDots[a].position.clone(); const end = stateDots[b].position.clone(); const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(1.34);
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([start, mid, end]), arcMaterial));
  });
  scene.add(group); return group;
}

function addProfileCard(scene: THREE.Scene) {
  const group = new THREE.Group(); group.name = 'business-profile';
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x7d9ba4, metalness: 0.16, roughness: 0.18, transmission: 0.7, transparent: true, opacity: 0.6 });
  const frame = new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0.8 });
  group.add(new THREE.Mesh(new THREE.BoxGeometry(3.5, 2.2, 0.12), glass));
  group.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(3.56, 2.26, 0.16)), new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.7 })));
  [0.48, 0.05, -0.38].forEach((y, index) => { const node = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), new THREE.MeshBasicMaterial({ color: index === 1 ? teal : gold })); node.position.set(-1.22, y, 0.13); group.add(node); const line = new THREE.Mesh(new THREE.BoxGeometry(1.75 - index * 0.22, 0.035, 0.02), frame); line.position.set(-0.1, y, 0.13); group.add(line); });
  const profileTag = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.08, 0.02), new THREE.MeshBasicMaterial({ color: teal })); profileTag.position.set(0.92, 0.48, 0.13); group.add(profileTag);
  scene.add(group); return group;
}

function addVault(scene: THREE.Scene) {
  const group = new THREE.Group(); group.name = 'evidence-vault';
  const frame = new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0.7 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x3d7180, metalness: 0.2, roughness: 0.15, transmission: 0.8, transparent: true, opacity: 0.22 });
  const shell = new THREE.Mesh(new THREE.BoxGeometry(4.4, 3.1, 1.7), glass); group.add(shell);
  group.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(4.48, 3.18, 1.78)), new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.75 })));
  [-1.55, 0, 1.55].forEach((x) => { const panel = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.7, 0.04), new THREE.MeshBasicMaterial({ color: ivory, transparent: true, opacity: 0.42 })); panel.position.set(x, 0.05, 0.9); group.add(panel); });
  const leftDoor = new THREE.Mesh(new THREE.BoxGeometry(1.9, 2.55, 0.08), new THREE.MeshPhysicalMaterial({ color: 0x6a8790, metalness: 0.28, roughness: 0.15, transmission: 0.62, transparent: true, opacity: 0.36 }));
  const rightDoor = leftDoor.clone(); leftDoor.position.set(-0.96, 0, 0.93); rightDoor.position.set(0.96, 0, 0.93); group.add(leftDoor, rightDoor); group.userData.doors = [leftDoor, rightDoor];
  scene.add(group); return group;
}

function addShield(scene: THREE.Scene) {
  const shape = new THREE.Shape(); shape.moveTo(0, 0.95); shape.lineTo(0.72, 0.62); shape.lineTo(0.56, -0.42); shape.quadraticCurveTo(0, -1.15, -0.56, -0.42); shape.lineTo(-0.72, 0.62); shape.closePath();
  const group = new THREE.Group(); group.name = 'verified-shield';
  const shield = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.14, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.05 }), new THREE.MeshStandardMaterial({ color: gold, metalness: 0.9, roughness: 0.2, emissive: 0x2d2410, emissiveIntensity: 0.3 }));
  group.add(shield);
  const particles: THREE.Mesh[] = [];
  for (let index = 0; index < 18; index += 1) { const angle = (index / 18) * Math.PI * 2; const target = new THREE.Vector3(Math.cos(angle) * (0.56 + (index % 3) * 0.05), Math.sin(angle) * (0.72 + (index % 2) * 0.08), 0.18); const particle = new THREE.Mesh(new THREE.SphereGeometry(0.028, 7, 7), new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0.9 })); particle.position.copy(target).multiplyScalar(2.6); particle.userData.target = target; group.add(particle); particles.push(particle); }
  group.userData.particles = particles; scene.add(group); return group;
}

function setGroupOpacity(group: THREE.Group, opacity: number) {
  group.traverse((object) => {
    if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Line) {
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => { material.transparent = true; material.opacity = opacity; });
    }
  });
}

export default function LegalScene3D({ mode = 'hero', onDocumentSelect, onDocumentHover }: SceneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const callbackRef = useRef({ onDocumentSelect, onDocumentHover });
  callbackRef.current = { onDocumentSelect, onDocumentHover };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' }); } catch { mount.dataset.webgl = 'unsupported'; return undefined; }
    mount.dataset.webgl = 'ready';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = mode === 'mini';
    const storyMode = mode === 'hero';
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(compact ? 34 : 42, 1, 0.1, 100);
    camera.position.set(0, 0.15, compact ? 8.4 : 8.6);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.25 : 1.45)); renderer.setClearColor(0x000000, 0); renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap; mount.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0x91aabb, compact ? 1.15 : 1.4));
    const key = new THREE.DirectionalLight(0xf2d59d, compact ? 2.7 : 3.8); key.position.set(-3, 7, 5); key.castShadow = true; key.shadow.mapSize.set(768, 768); scene.add(key);
    const rim = new THREE.PointLight(teal, compact ? 2 : 3, 12); rim.position.set(4, 2, 2); scene.add(rim);
    const warm = new THREE.PointLight(gold, compact ? 2 : 3, 16); warm.position.set(-3, 1, 1); scene.add(warm);
    if (mode !== 'mini' && mode !== 'profile' && mode !== 'vault') addArchitecture(scene);
    addParticles(scene, compact ? 40 : 105);

    const scale = addScale(scene, compact ? 0.72 : mode === 'vault' ? 0.52 : mode === 'profile' ? 0.66 : 1.02);
    scale.position.set(compact ? 0 : mode === 'profile' ? -2.3 : 0.18, compact ? -0.1 : mode === 'profile' ? 0 : -0.08, compact ? -0.4 : 0);
    const original = makeDocument('original'); const amended = makeDocument('amended');
    original.position.set(compact ? -1.5 : -2.55, compact ? 0.15 : 0.72, compact ? -0.3 : 0.1);
    amended.position.set(compact ? 1.5 : 2.55, compact ? 0.15 : 0.72, compact ? -0.3 : 0.1);
    original.rotation.set(-0.05, 0.28, -0.08); amended.rotation.set(0.05, -0.28, 0.08);
    original.scale.setScalar(compact ? 0.44 : 0.78); amended.scale.setScalar(compact ? 0.44 : 0.78); scene.add(original, amended);
    const trail = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1.8, 0.9, -0.1), new THREE.Vector3(0, 1.14, 0), new THREE.Vector3(1.8, 0.9, -0.1)]), new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.48 })); scene.add(trail);
    original.visible = false; amended.visible = false; trail.visible = false;
    setGroupOpacity(original, 0); setGroupOpacity(amended, 0); (trail.material as THREE.LineBasicMaterial).opacity = 0;

    const profileCard = addProfileCard(scene); profileCard.position.set(0, 0, -1.5); profileCard.scale.setScalar(0.72);
    const silhouettes = addBusinessSilhouettes(scene); silhouettes.position.set(0, -0.16, -1.1); silhouettes.scale.setScalar(0.72);
    const globe = addStateGlobe(scene); globe.position.set(2.3, 0.25, -1.1); globe.scale.setScalar(0.78);
    const vault = addVault(scene); vault.position.set(0, 0, -2.2); vault.scale.setScalar(0.78);
    const shield = addShield(scene); shield.position.set(0, 0, -0.9); shield.scale.setScalar(0.66);
    if (!storyMode) { setGroupOpacity(profileCard, mode === 'profile' ? 1 : 0); setGroupOpacity(silhouettes, mode === 'profile' ? 1 : 0); setGroupOpacity(globe, mode === 'profile' ? 1 : 0); setGroupOpacity(vault, mode === 'vault' ? 1 : 0); setGroupOpacity(shield, mode === 'vault' ? 1 : 0); }
    scene.traverse((object) => { if (object instanceof THREE.Mesh) { object.castShadow = true; object.receiveShadow = true; } });

    const networkDots = [0, 1, 2].map((index) => { const dot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0.8 })); dot.position.set(-1.6 + index * 1.6, 0.95, 0.05); scene.add(dot); return dot; });
    const raycaster = new THREE.Raycaster(); const pointer = new THREE.Vector2(99, 99);
    let hovered: 'original' | 'amended' | null = null; let raf = 0; let scrollInfluence = 0; let targetX = 0; let targetY = 0; let currentX = 0; let currentY = 0; let renderReduced: (() => void) | null = null; const startTime = performance.now();
    const resize = () => { const width = mount.clientWidth || 1; const height = mount.clientHeight || 1; camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height, false); };
    const onPointerMove = (event: PointerEvent) => { const bounds = mount.getBoundingClientRect(); pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1; pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1; targetX = pointer.x * 0.26; targetY = pointer.y * 0.12; renderReduced?.(); };
    const onPointerLeave = () => { pointer.set(99, 99); targetX = 0; targetY = 0; renderReduced?.(); };
    const onClick = () => { if (hovered) callbackRef.current.onDocumentSelect?.(hovered); };
    const onScroll = () => { scrollInfluence = Math.min(window.scrollY / Math.max(window.innerHeight * 1.3, 1), 1); if (reducedMotion) renderReduced?.(); };
    mount.addEventListener('pointermove', onPointerMove); mount.addEventListener('pointerleave', onPointerLeave); mount.addEventListener('click', onClick); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', resize); resize(); onScroll();

    const tick = (time: number) => {
      const sceneTime = reducedMotion ? 0 : time; const elapsed = (time - startTime) / 1000; const entrance = reducedMotion ? 1 : Math.min(elapsed / 2.9, 1); const eased = entrance * entrance * (3 - 2 * entrance);
      currentX += (targetX - currentX) * 0.035; currentY += (targetY - currentY) * 0.035;
      const hoverOriginal = hovered === 'original'; const hoverAmended = hovered === 'amended';
      scale.rotation.z = Math.sin(sceneTime / 4200) * 0.015; scale.rotation.y = currentX * 0.5 + Math.sin(sceneTime / 5200) * 0.05;
      original.rotation.y = 0.28 + currentX * 0.2; amended.rotation.y = -0.28 + currentX * 0.2;
      original.position.z = (compact ? -0.3 : 0.1) + (hoverOriginal ? 0.42 : 0); amended.position.z = (compact ? -0.3 : 0.1) + (hoverAmended ? 0.42 : 0);
      original.position.y = (compact ? 0.15 : 0.72) + (reducedMotion ? 0 : Math.sin(sceneTime / 2400) * 0.08) - (storyMode && !reducedMotion ? scrollInfluence * 0.5 : 0);
      amended.position.y = (compact ? 0.15 : 0.72) + (reducedMotion ? 0 : Math.cos(sceneTime / 2600) * 0.08) - (storyMode && !reducedMotion ? scrollInfluence * 0.5 : 0);
      scale.position.y = (compact ? -0.1 : -0.08) - (storyMode && !reducedMotion ? scrollInfluence * 0.4 : 0);
      if (!compact) { original.position.x = -2.55 * eased; amended.position.x = 2.55 * eased; original.scale.setScalar(0.78 * (0.55 + eased * 0.45 + (hoverOriginal ? 0.12 : 0))); amended.scale.setScalar(0.78 * (0.55 + eased * 0.45 + (hoverAmended ? 0.12 : 0))); }
      if (mode === 'login') { const orbit = sceneTime / 2600; original.position.x = Math.cos(orbit) * 2.35; original.position.y = 0.62 + Math.sin(orbit) * 0.38; amended.position.x = Math.cos(orbit + Math.PI) * 2.35; amended.position.y = 0.62 + Math.sin(orbit + Math.PI) * 0.38; }
      camera.position.x += ((currentX * 1.1) - camera.position.x) * 0.025; camera.position.y += ((currentY * 0.7 - (storyMode && !reducedMotion ? scrollInfluence * 0.25 : 0)) - camera.position.y) * 0.025; camera.position.z += (((compact ? 8.4 : 8.6) - (storyMode && !reducedMotion ? scrollInfluence * 1.8 : 0)) - camera.position.z) * 0.03; camera.lookAt(0, 0, 0);

      if (storyMode) {
        const profileOpacity = Math.max(0, Math.min(1, (scrollInfluence - 0.2) / 0.32)); const vaultOpacity = Math.max(0, Math.min(1, (scrollInfluence - 0.5) / 0.28)); const shieldOpacity = Math.max(0, Math.min(1, (scrollInfluence - 0.76) / 0.22));
        setGroupOpacity(profileCard, profileOpacity); setGroupOpacity(silhouettes, profileOpacity); setGroupOpacity(globe, profileOpacity); setGroupOpacity(vault, vaultOpacity); setGroupOpacity(shield, shieldOpacity);
        profileCard.position.y = -0.1 + Math.sin(sceneTime / 3000) * 0.04; silhouettes.rotation.y = sceneTime / 5200; globe.rotation.y = sceneTime / 4200; vault.position.y = -0.05; shield.rotation.y = sceneTime / 3600; shield.position.y = 0.2;
      } else if (mode === 'vault') { const vaultOpen = Math.min(elapsed / 1.6, 1); vault.rotation.y = sceneTime / 5000; shield.rotation.y = sceneTime / 3600; const doors = (vault.userData.doors || []) as THREE.Object3D[]; if (doors.length === 2) { doors[0].position.x = -0.96 - vaultOpen * 0.72; doors[1].position.x = 0.96 + vaultOpen * 0.72; } } else if (mode === 'profile') { profileCard.rotation.y = sceneTime / 5000; silhouettes.rotation.y = sceneTime / 5200; globe.rotation.y = sceneTime / 4200; }
      const shieldParticles = (shield.userData.particles || []) as THREE.Mesh[]; const shieldProgress = storyMode ? Math.max(0, Math.min(1, (scrollInfluence - 0.76) / 0.24)) : mode === 'vault' ? Math.min(elapsed / 1.6, 1) : 0; shieldParticles.forEach((particle) => { const target = particle.userData.target as THREE.Vector3; particle.position.lerp(target, reducedMotion ? 1 : 0.08); particle.scale.setScalar(0.65 + shieldProgress); });
      networkDots.forEach((dot, index) => { const progress = ((sceneTime / 3600) + index / 3) % 1; dot.position.set(-1.7 + progress * 3.4, 0.92 + Math.sin(progress * Math.PI) * 0.2, 0.1); });
      const nextHover = null;
      if (nextHover !== hovered) { hovered = nextHover; callbackRef.current.onDocumentHover?.(hovered); mount.style.cursor = 'default'; }
      renderer.render(scene, camera); if (!reducedMotion) raf = requestAnimationFrame(tick);
    };
    renderReduced = () => tick(0);
    if (reducedMotion) tick(0); else raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); mount.removeEventListener('pointermove', onPointerMove); mount.removeEventListener('pointerleave', onPointerLeave); mount.removeEventListener('click', onClick); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', resize); scene.traverse((object) => { if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Line || object instanceof THREE.Points) { object.geometry.dispose(); const materials = Array.isArray(object.material) ? object.material : [object.material]; materials.forEach((material) => material.dispose()); } }); renderer.dispose(); if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement); };
  }, [mode]);

  return <div ref={mountRef} className={`three-scene-shell three-scene-${mode}`} aria-hidden="true" />;
}
