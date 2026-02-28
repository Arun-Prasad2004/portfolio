import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const NeuralNetwork3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // ===== Neural Network Layers =====
    const layers = [
      { count: 4, x: -5.5 },
      { count: 6, x: -2 },
      { count: 8, x: 1 },
      { count: 6, x: 4 },
      { count: 3, x: 7 },
    ];

    const nodeMeshes = [];
    const allNodes = [];

    // Node material
    const nodeGeometry = new THREE.SphereGeometry(0.22, 16, 16);

    layers.forEach((layer) => {
      const layerNodes = [];
      const spacing = 1.2;
      const startY = -((layer.count - 1) * spacing) / 2;

      for (let i = 0; i < layer.count; i++) {
        const hue = 0.53 + (layer.x + 5.5) * 0.03;
        const color = new THREE.Color().setHSL(hue, 0.9, 0.6);

        const nodeMat = new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.8,
          roughness: 0.3,
          metalness: 0.7,
        });

        const node = new THREE.Mesh(nodeGeometry, nodeMat);
        const z = (Math.random() - 0.5) * 2;
        node.position.set(layer.x, startY + i * spacing, z);
        group.add(node);
        nodeMeshes.push(node);

        // Outer glow ring
        const ringGeo = new THREE.RingGeometry(0.32, 0.42, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.15,
          side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(node.position);
        group.add(ring);

        layerNodes.push({
          mesh: node,
          ring,
          baseY: node.position.y,
          baseZ: z,
          phase: Math.random() * Math.PI * 2,
        });
      }
      allNodes.push(layerNodes);
    });

    // ===== Connections between layers =====
    const connections = [];
    const pulseParticles = [];
    const pulseGeometry = new THREE.SphereGeometry(0.08, 8, 8);

    for (let l = 0; l < allNodes.length - 1; l++) {
      const currentLayer = allNodes[l];
      const nextLayer = allNodes[l + 1];

      currentLayer.forEach((fromNode) => {
        // Connect to a subset of next layer nodes
        const connectCount = Math.min(3, nextLayer.length);
        const indices = [];
        while (indices.length < connectCount) {
          const idx = Math.floor(Math.random() * nextLayer.length);
          if (!indices.includes(idx)) indices.push(idx);
        }

        indices.forEach((idx) => {
          const toNode = nextLayer[idx];
          const points = [fromNode.mesh.position, toNode.mesh.position];
          const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

          const hue = 0.53 + (l * 0.06);
          const lineColor = new THREE.Color().setHSL(hue, 0.8, 0.5);

          const lineMat = new THREE.LineBasicMaterial({
            color: lineColor,
            transparent: true,
            opacity: 0.12,
          });

          const line = new THREE.Line(lineGeo, lineMat);
          group.add(line);
          connections.push({ line, from: fromNode, to: toNode });

          // Pulse particle traveling along connection
          if (Math.random() < 0.35) {
            const pulseMat = new THREE.MeshBasicMaterial({
              color: lineColor,
              transparent: true,
              opacity: 0.9,
            });
            const pulse = new THREE.Mesh(pulseGeometry, pulseMat);
            pulse.position.copy(fromNode.mesh.position);
            group.add(pulse);
            pulseParticles.push({
              mesh: pulse,
              from: fromNode,
              to: toNode,
              progress: Math.random(),
              speed: 0.15 + Math.random() * 0.25,
              color: lineColor,
            });
          }
        });
      });
    }

    // ===== Central core glow =====
    const coreGeo = new THREE.SphereGeometry(0.6, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.08,
      roughness: 0,
      metalness: 1,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.set(1, 0, 0);
    group.add(core);

    // Outer wireframe sphere
    const wireGeo = new THREE.IcosahedronGeometry(6.5, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.03,
    });
    const wireSphere = new THREE.Mesh(wireGeo, wireMat);
    group.add(wireSphere);

    // ===== Lights =====
    const light1 = new THREE.PointLight(0x00d4ff, 2, 30);
    light1.position.set(5, 5, 8);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x7c3aed, 1.5, 30);
    light2.position.set(-5, -3, 8);
    scene.add(light2);

    const light3 = new THREE.PointLight(0xf97316, 0.6, 20);
    light3.position.set(0, 6, 5);
    scene.add(light3);

    scene.add(new THREE.AmbientLight(0x222244, 0.4));

    // ===== Mouse tracking =====
    let mouseX = 0, mouseY = 0;
    let targetMX = 0, targetMY = 0;

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      targetMX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ===== Animation =====
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      mouseX += (targetMX - mouseX) * 0.04;
      mouseY += (targetMY - mouseY) * 0.04;

      // Slow auto-rotation + mouse influence
      group.rotation.y = t * 0.15 + mouseX * 0.4;
      group.rotation.x = Math.sin(t * 0.1) * 0.1 + mouseY * 0.2;

      // Wire sphere rotation
      wireSphere.rotation.y = t * 0.05;
      wireSphere.rotation.x = t * 0.03;

      // Floating nodes
      allNodes.forEach((layer) => {
        layer.forEach((nodeData) => {
          const offset = Math.sin(t * 0.8 + nodeData.phase) * 0.15;
          nodeData.mesh.position.y = nodeData.baseY + offset;
          nodeData.ring.position.y = nodeData.baseY + offset;
          nodeData.ring.lookAt(camera.position);

          // Pulse glow on nodes
          const pulse = 0.6 + Math.sin(t * 2 + nodeData.phase) * 0.4;
          nodeData.mesh.material.emissiveIntensity = pulse;
          nodeData.ring.material.opacity = 0.08 + pulse * 0.08;
        });
      });

      // Update connections
      connections.forEach(({ line, from, to }) => {
        const positions = line.geometry.attributes.position.array;
        positions[0] = from.mesh.position.x;
        positions[1] = from.mesh.position.y;
        positions[2] = from.mesh.position.z;
        positions[3] = to.mesh.position.x;
        positions[4] = to.mesh.position.y;
        positions[5] = to.mesh.position.z;
        line.geometry.attributes.position.needsUpdate = true;

        // Subtle pulse on connection opacity
        line.material.opacity = 0.06 + Math.sin(t * 1.5) * 0.04;
      });

      // Animate pulse particles
      pulseParticles.forEach((p) => {
        p.progress += p.speed * 0.016;
        if (p.progress > 1) p.progress = 0;

        const fromPos = p.from.mesh.position;
        const toPos = p.to.mesh.position;
        p.mesh.position.lerpVectors(fromPos, toPos, p.progress);

        // Glow brightness based on position
        const glow = Math.sin(p.progress * Math.PI);
        p.mesh.material.opacity = glow * 0.9;
        p.mesh.scale.setScalar(0.6 + glow * 0.6);
      });

      // Core pulse
      core.material.opacity = 0.04 + Math.sin(t * 0.5) * 0.03;
      core.scale.setScalar(1 + Math.sin(t * 0.8) * 0.15);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="neural-network-3d" />;
};
