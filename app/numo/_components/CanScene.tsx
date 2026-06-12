"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

type Flavor = {
  bg: string;
  fruit: string;
  name: string;
  rotate: number;
  x: number;
};

const flavors: Flavor[] = [
  {
    bg: "#f7ec98",
    fruit: "LEMON",
    name: "lemon sparkling",
    rotate: -0.18,
    x: -1.8,
  },
  {
    bg: "#f6bb9d",
    fruit: "PEACH",
    name: "peach sparkling",
    rotate: 0.08,
    x: 0,
  },
  {
    bg: "#f4bdd2",
    fruit: "BERRY",
    name: "raspberry sparkling",
    rotate: 0.2,
    x: 1.8,
  },
];

function makeLabelTexture(flavor: Flavor) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 768;

  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = flavor.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#17110f";
  ctx.font = "900 176px Arial Black, Impact, sans-serif";
  ctx.letterSpacing = "-6px";
  ctx.fillText("NUMO", 250, 190);

  ctx.fillStyle = flavor.bg;
  ctx.strokeStyle = "#17110f";
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.roundRect(350, 180, 360, 72, 36);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#17110f";
  ctx.font = "500 38px Arial Rounded MT Bold, Arial, sans-serif";
  ctx.fillText(flavor.name, 388, 228);

  ctx.strokeStyle = "#17110f";
  ctx.lineWidth = 10;
  ctx.fillStyle =
    flavor.fruit === "LEMON"
      ? "#f5dd4d"
      : flavor.fruit === "PEACH"
        ? "#ef9365"
        : "#de4762";
  ctx.beginPath();
  if (flavor.fruit === "BERRY") {
    for (let i = 0; i < 9; i += 1) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      ctx.moveTo(430 + col * 62, 370 + row * 55);
      ctx.arc(430 + col * 62, 370 + row * 55, 42, 0, Math.PI * 2);
    }
  } else {
    ctx.ellipse(
      500,
      430,
      135,
      165,
      flavor.fruit === "LEMON" ? 0.25 : -0.25,
      0,
      Math.PI * 2,
    );
  }
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#fff7d2";
  ctx.beginPath();
  ctx.arc(460, 385, 17, 0, Math.PI * 2);
  ctx.arc(542, 385, 17, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#17110f";
  ctx.beginPath();
  ctx.arc(464, 390, 8, 0, Math.PI * 2);
  ctx.arc(546, 390, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(505, 455, 52, 0.15, Math.PI - 0.15);
  ctx.stroke();

  ctx.fillStyle = "#72b658";
  ctx.strokeStyle = "#17110f";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.ellipse(570, 270, 58, 24, -0.55, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#17110f";
  ctx.font = "700 28px Arial, sans-serif";
  ["scan", "play", "win"].forEach((label, index) => {
    ctx.strokeStyle = "#17110f";
    ctx.fillStyle = flavor.bg;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.roundRect(92, 146 + index * 62, 112, 42, 21);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#17110f";
    ctx.fillText(label, 122, 175 + index * 62);
  });

  ctx.font = "600 22px Arial, sans-serif";
  ctx.fillText("330 ml", 145, 690);
  ctx.fillText("11.2 fl oz", 725, 690);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function CanScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0.2, 7.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearAlpha(0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const hemi = new THREE.HemisphereLight("#fff8cf", "#317d99", 2.4);
    scene.add(hemi);

    const key = new THREE.DirectionalLight("#ffffff", 3.5);
    key.position.set(3.2, 4.5, 5);
    scene.add(key);

    const fill = new THREE.DirectionalLight("#f6b8c9", 1.4);
    fill.position.set(-4, 1.5, 3);
    scene.add(fill);

    const canMeshes: THREE.Group[] = [];

    flavors.forEach((flavor) => {
      const can = new THREE.Group();
      can.position.x = flavor.x;
      can.rotation.z = flavor.rotate;

      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.68, 0.68, 2.35, 96, 1, false),
        new THREE.MeshPhysicalMaterial({
          map: makeLabelTexture(flavor),
          roughness: 0.42,
          metalness: 0.08,
          clearcoat: 0.6,
          clearcoatRoughness: 0.28,
        }),
      );

      const metal = new THREE.MeshPhysicalMaterial({
        color: "#c8c4b9",
        roughness: 0.24,
        metalness: 0.72,
      });

      const top = new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 0.68, 0.13, 96),
        metal,
      );
      top.position.y = 1.24;

      const bottom = new THREE.Mesh(
        new THREE.CylinderGeometry(0.68, 0.7, 0.12, 96),
        metal,
      );
      bottom.position.y = -1.24;

      const tab = new THREE.Mesh(
        new THREE.TorusGeometry(0.16, 0.035, 10, 32),
        metal,
      );
      tab.position.set(0, 1.33, 0.12);
      tab.rotation.x = Math.PI / 2;

      can.add(body, top, bottom, tab);
      group.add(can);
      canMeshes.push(can);
    });

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    mount.addEventListener("pointermove", onPointerMove);

    gsap.from(
      canMeshes.map((can) => can.position),
      {
        y: -2.8,
        duration: 1.35,
        stagger: 0.12,
        ease: "back.out(1.35)",
        delay: 1.05,
      },
    );

    gsap.from(
      canMeshes.map((can) => can.scale),
      {
        x: 0.65,
        y: 0.65,
        z: 0.65,
        duration: 1.35,
        stagger: 0.12,
        ease: "back.out(1.35)",
        delay: 1.05,
      },
    );

    const scrollTween = gsap.to(group.rotation, {
      y: Math.PI * 0.32,
      x: -0.16,
      ease: "none",
      scrollTrigger: {
        trigger: mount,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    let frame = 0;

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      group.scale.setScalar(width < 720 ? 0.7 : 1);
    };

    const render = () => {
      frame = requestAnimationFrame(render);
      const time = performance.now() * 0.001;
      group.rotation.y += (pointer.x * 0.18 - group.rotation.y) * 0.035;
      group.rotation.x += (-pointer.y * 0.08 - group.rotation.x) * 0.035;

      canMeshes.forEach((can, index) => {
        can.position.y = Math.sin(time * 1.25 + index * 1.2) * 0.08;
        can.rotation.y += 0.006 + index * 0.0015;
      });

      renderer.render(scene, camera);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      scrollTween.kill();
      mount.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      renderer.domElement.remove();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => {
            if ("map" in material && material.map) {
              material.map.dispose();
            }
            material.dispose();
          });
        }
      });
    };
  }, []);

  return <div ref={mountRef} className="h-full min-h-[28rem] w-full" />;
}
