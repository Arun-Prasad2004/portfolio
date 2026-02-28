import { useEffect, useRef } from "react";
import * as THREE from "three";

export const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030014, 0.012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 40;
    camera.position.y = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x030014, 1);
    mount.appendChild(renderer.domElement);

    // ===== Particles =====
    const createParticles = (count, color, size, spread) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * spread;
      }
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        size,
        color,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      });
      return new THREE.Points(geometry, material);
    };

    const stars = createParticles(1500, 0x00d4ff, 0.06, 120);
    const starsSecondary = createParticles(800, 0x7c3aed, 0.04, 100);
    const starsAccent = createParticles(300, 0xf97316, 0.08, 80);
    scene.add(stars, starsSecondary, starsAccent);

    // ===== Floating Geometric Shapes =====
    const shapes = [];

    const createShape = (geometry, color, emissiveColor, position, wireframe = true) => {
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: emissiveColor,
        emissiveIntensity: 0.4,
        wireframe,
        transparent: true,
        opacity: wireframe ? 0.5 : 0.3,
        roughness: 0.5,
        metalness: 0.8,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      scene.add(mesh);
      shapes.push({
        mesh,
        floatSpeed: 0.5 + Math.random() * 1.5,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.015,
          z: (Math.random() - 0.5) * 0.008,
        },
        initialY: position[1],
      });
      return mesh;
    };

    createShape(
      new THREE.TorusKnotGeometry(3, 0.8, 100, 16),
      0x7c3aed, 0x7c3aed,
      [-20, 8, -25]
    );

    createShape(
      new THREE.IcosahedronGeometry(2.5, 0),
      0x00d4ff, 0x00d4ff,
      [22, -5, -20]
    );

    createShape(
      new THREE.OctahedronGeometry(2, 0),
      0xf97316, 0xf97316,
      [15, 15, -18]
    );

    createShape(
      new THREE.TorusGeometry(4, 0.3, 16, 100),
      0x00d4ff, 0x0088ff,
      [-15, -10, -22]
    );

    createShape(
      new THREE.DodecahedronGeometry(1.5, 0),
      0x7c3aed, 0x7c3aed,
      [-8, 18, -15]
    );

    createShape(
      new THREE.IcosahedronGeometry(1, 1),
      0x00d4ff, 0x0088ff,
      [25, 12, -30],
      false
    );

    // ===== Lights =====
    const pointLight1 = new THREE.PointLight(0x00d4ff, 2, 80);
    pointLight1.position.set(15, 15, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7c3aed, 1.5, 80);
    pointLight2.position.set(-15, -10, 15);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xf97316, 0.8, 60);
    pointLight3.position.set(0, 20, 10);
    scene.add(pointLight3);

    scene.add(new THREE.AmbientLight(0x111133, 0.5));

    // ===== Mouse Tracking =====
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ===== Scroll Tracking =====
    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("scroll", onScroll);

    // ===== Animation Loop =====
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      stars.rotation.y = elapsed * 0.03 + mouseX * 0.1;
      stars.rotation.x = elapsed * 0.02 + mouseY * 0.05;
      starsSecondary.rotation.y = elapsed * 0.02 - mouseX * 0.05;
      starsSecondary.rotation.x = elapsed * 0.015;
      starsAccent.rotation.y = elapsed * 0.04;

      shapes.forEach(({ mesh, floatSpeed, rotSpeed, initialY }) => {
        mesh.rotation.x += rotSpeed.x;
        mesh.rotation.y += rotSpeed.y;
        mesh.rotation.z += rotSpeed.z;
        mesh.position.y = initialY + Math.sin(elapsed * floatSpeed) * 2;
      });

      camera.position.x += (mouseX * 4 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 3 + 5 - scrollY * 0.003 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, -10);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
      if (mount.firstChild) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="three-background" />;
};
