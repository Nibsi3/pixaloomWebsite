'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function StellarBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let points: THREE.Points | null = null;
    let starPoints: THREE.Points | null = null;

    let raf = 0;

    const mouse = new THREE.Vector3(0, 0, 0);
    const targetMouse = new THREE.Vector3(0.5, 0.2, 0);

    const vertexShader = `
      varying vec3 vPosition;
      varying float vDistance;
      uniform vec3 uMouse;
      uniform float uTime;

      void main() {
          vPosition = position;

          vec3 pos = position;
          pos.x += sin(uTime * 0.3 + position.z * 0.05) * 3.0;
          pos.y += cos(uTime * 0.3 + position.x * 0.05) * 3.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

          vDistance = distance(pos, uMouse * 350.0);

          float size = (2.0 + (sin(uTime * 2.0 + pos.x) * 0.8));
          gl_PointSize = size * (450.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vPosition;
      varying float vDistance;
      uniform float uTime;

      float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          if (d > 0.5) discard;

          float light = 1.0 / (vDistance * 0.012 + 0.4);
          light = pow(light, 3.0) * 2.5;

          float ambient = 0.08;

          vec3 color = vec3(0.85, 0.92, 1.0) * (light + ambient);

          float flicker = random(vec2(uTime * 0.01, vPosition.x)) * 0.2 + 0.9;

          float alpha = (0.5 - d) * 2.0;
          gl_FragColor = vec4(color * flicker, (light + 0.1) * alpha);
      }
    `;

    const init = () => {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
      camera.position.z = 450;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 1);

      container.appendChild(renderer.domElement);

      const particleCount = 100000;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 170 + Math.random() * 70;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = (Math.random() - 0.5) * (Math.random() * 40);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector3(0, 0, 0) },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      points = new THREE.Points(geometry, material);
      points.rotation.x = Math.PI / 2.8;
      scene.add(points);

      const starGeo = new THREE.BufferGeometry();
      const starPos = new Float32Array(3000 * 3);
      for (let i = 0; i < 9000; i++) starPos[i] = (Math.random() - 0.5) * 1800;
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
      const starMat = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 1.25,
        transparent: true,
        opacity: 0.6,
      });
      starPoints = new THREE.Points(starGeo, starMat);
      scene.add(starPoints);
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const animate = () => {
      raf = window.requestAnimationFrame(animate);
      if (!camera || !renderer || !scene || !material || !points) return;

      const time = performance.now() * 0.001;

      const autoX = Math.sin(time * 0.5) * 0.2;
      const autoY = Math.cos(time * 0.3) * 0.2;

      mouse.x += (targetMouse.x + autoX - mouse.x) * 0.03;
      mouse.y += (targetMouse.y + autoY - mouse.y) * 0.03;

      material.uniforms.uTime.value = time;
      material.uniforms.uMouse.value.set(mouse.x, mouse.y, 0.5);

      camera.position.x += (mouse.x * 60 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 60 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      points.rotation.z += 0.0003;

      renderer.render(scene, camera);
    };

    init();

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (raf) window.cancelAnimationFrame(raf);

      if (renderer?.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }

      if (points) {
        (points.geometry as THREE.BufferGeometry).dispose();
      }
      if (starPoints) {
        (starPoints.geometry as THREE.BufferGeometry).dispose();
        ((starPoints.material as unknown) as THREE.Material).dispose();
      }

      material?.dispose();
      renderer?.dispose();

      scene = null;
      camera = null;
      renderer = null;
      material = null;
      points = null;
      starPoints = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
      aria-hidden="true"
    />
  );
}
