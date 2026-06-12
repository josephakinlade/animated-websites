"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

type Flavor = {
  bg: string;
  dark: string;
  fruit: "lemon" | "peach" | "raspberry";
  label: string;
  rotate: number;
  x: number;
};

const flavors: Flavor[] = [
  {
    bg: "#f7ec98",
    dark: "#e7ca22",
    fruit: "lemon",
    label: "lemon sparkling",
    rotate: -0.16,
    x: -1.82,
  },
  {
    bg: "#f7c7a9",
    dark: "#ef9365",
    fruit: "peach",
    label: "peach sparkling",
    rotate: 0.06,
    x: 0,
  },
  {
    bg: "#f4c0d2",
    dark: "#df4962",
    fruit: "raspberry",
    label: "raspberry sparkling",
    rotate: 0.18,
    x: 1.82,
  },
];

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
}

function drawSparkle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#fff7c4";
  ctx.strokeStyle = "#17110f";
  ctx.lineWidth = size * 0.08;
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.22, -size * 0.22);
  ctx.lineTo(size, 0);
  ctx.lineTo(size * 0.22, size * 0.22);
  ctx.lineTo(0, size);
  ctx.lineTo(-size * 0.22, size * 0.22);
  ctx.lineTo(-size, 0);
  ctx.lineTo(-size * 0.22, -size * 0.22);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawBarcode(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = "#17110f";
  const bars = [6, 2, 4, 8, 3, 5, 2, 9, 4, 3, 7, 2, 5, 8, 3, 6, 2, 5, 9, 3];
  let cursor = x;
  bars.forEach((width, index) => {
    if (index % 2 === 0) {
      ctx.fillRect(cursor, y, width, 118);
    }
    cursor += width + 4;
  });
  ctx.font = "700 18px Arial, sans-serif";
  ctx.fillText("7584 95 6 86 9504", x + 8, y - 12);
}

function drawQr(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#f4d62c";
  ctx.strokeStyle = "#17110f";
  ctx.lineWidth = 8;
  roundedRect(ctx, 0, 0, 165, 165, 24);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#17110f";
  for (let row = 0; row < 12; row += 1) {
    for (let col = 0; col < 12; col += 1) {
      const on = (row * 7 + col * 11 + row * col) % 5 < 2;
      if (on) {
        ctx.fillRect(22 + col * 10, 22 + row * 10, 8, 8);
      }
    }
  }

  [0, 96].forEach((offsetX) => {
    [0, 96].forEach((offsetY) => {
      if (offsetX === 96 && offsetY === 96) return;
      ctx.strokeStyle = "#17110f";
      ctx.lineWidth = 7;
      ctx.strokeRect(22 + offsetX, 22 + offsetY, 42, 42);
      ctx.fillRect(35 + offsetX, 35 + offsetY, 16, 16);
    });
  });
  ctx.restore();
}

function drawFruitMascot(ctx: CanvasRenderingContext2D, flavor: Flavor) {
  const cx = 835;
  const cy = 520;
  const fruitColor =
    flavor.fruit === "lemon"
      ? "#f4d92f"
      : flavor.fruit === "peach"
        ? "#ef9469"
        : "#db4860";

  ctx.save();
  ctx.strokeStyle = "#17110f";
  ctx.lineWidth = 11;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(cx - 105, cy + 120);
  ctx.lineTo(cx - 160, cy + 210);
  ctx.moveTo(cx + 95, cy + 120);
  ctx.lineTo(cx + 160, cy + 210);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx - 115, cy + 30);
  ctx.lineTo(cx - 220, cy - 50);
  ctx.moveTo(cx + 115, cy + 30);
  ctx.lineTo(cx + 220, cy - 40);
  ctx.stroke();

  ctx.fillStyle = fruitColor;
  ctx.beginPath();
  if (flavor.fruit === "raspberry") {
    for (let i = 0; i < 13; i += 1) {
      const angle = (i / 13) * Math.PI * 2;
      const radius = i < 7 ? 82 : 45;
      ctx.moveTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      ctx.arc(
        cx + Math.cos(angle) * radius,
        cy + Math.sin(angle) * radius,
        48,
        0,
        Math.PI * 2,
      );
    }
  } else {
    ctx.ellipse(
      cx,
      cy,
      135,
      158,
      flavor.fruit === "lemon" ? 0.12 : -0.16,
      0,
      Math.PI * 2,
    );
  }
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#6fb653";
  ctx.beginPath();
  ctx.ellipse(cx + 82, cy - 175, 74, 29, -0.55, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#fff9dc";
  ctx.beginPath();
  ctx.arc(cx - 42, cy - 34, 28, 0, Math.PI * 2);
  ctx.arc(cx + 42, cy - 34, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#17110f";
  ctx.beginPath();
  ctx.arc(cx - 34, cy - 30, 11, 0, Math.PI * 2);
  ctx.arc(cx + 50, cy - 30, 11, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy + 32, 58, 0.15, Math.PI - 0.15);
  ctx.stroke();

  ctx.fillStyle = "#f06f78";
  ctx.beginPath();
  ctx.arc(cx - 80, cy + 34, 20, 0, Math.PI * 2);
  ctx.arc(cx + 82, cy + 34, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#17110f";
  ctx.lineWidth = 9;
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    ctx.arc(cx - 180 + i * 35, cy + 15, 72, -0.3, 0.3);
    ctx.stroke();
  }

  drawSparkle(ctx, cx - 230, cy - 155, 24);
  drawSparkle(ctx, cx + 220, cy - 145, 22);
  drawSparkle(ctx, cx - 175, cy + 165, 20);

  ctx.restore();
}

function drawNutrition(ctx: CanvasRenderingContext2D, flavor: Flavor) {
  ctx.save();
  ctx.translate(1110, 300);
  ctx.strokeStyle = "#17110f";
  ctx.fillStyle = "#f9ecd7";
  ctx.lineWidth = 8;
  roundedRect(ctx, 0, 0, 330, 260, 34);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = flavor.dark;
  roundedRect(ctx, 0, 0, 330, 64, 30);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#17110f";
  ctx.font = "700 30px Arial Rounded MT Bold, Arial, sans-serif";
  ctx.fillText("nutrition facts (per 330 ml)", 28, 42);
  ctx.font = "500 28px Arial Rounded MT Bold, Arial, sans-serif";
  const rows = [
    [
      "calories:",
      flavor.fruit === "peach"
        ? "34"
        : flavor.fruit === "raspberry"
          ? "32"
          : "28",
    ],
    ["total carbohydrates:", flavor.fruit === "lemon" ? "7 g" : "8 g"],
    ["sugars:", flavor.fruit === "lemon" ? "6 g" : "7 g"],
    ["sodium:", "5 mg"],
  ];
  rows.forEach(([label, value], index) => {
    ctx.fillText(label, 30, 108 + index * 36);
    ctx.fillText(value, 260, 108 + index * 36);
  });
  ctx.restore();
}

function makeLabelTexture(flavor: Flavor) {
  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 960;

  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = flavor.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#17110f";
  ctx.font = "900 250px Arial Black, Impact, sans-serif";
  ctx.fillText("NUMO", 610, 225);

  ctx.fillStyle = flavor.dark;
  ctx.strokeStyle = "#17110f";
  ctx.lineWidth = 10;
  roundedRect(ctx, 770, 210, 370, 76, 38);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#17110f";
  ctx.font = "500 42px Arial Rounded MT Bold, Arial, sans-serif";
  ctx.fillText(flavor.label, 825, 260);

  ctx.font = "600 32px Arial Rounded MT Bold, Arial, sans-serif";
  ["scan", "play", "win"].forEach((label, index) => {
    ctx.fillStyle = flavor.dark;
    ctx.strokeStyle = "#17110f";
    ctx.lineWidth = 8;
    roundedRect(ctx, 300, 88 + index * 70, 120, 48, 24);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#17110f";
    ctx.fillText(label, 333, 122 + index * 70);
  });

  ctx.fillStyle = "#17110f";
  ctx.font = "600 34px Arial Rounded MT Bold, Arial, sans-serif";
  ctx.fillText("scan the QR code to:", 168, 345);
  drawQr(ctx, 120, 395);

  ctx.font = "500 27px Arial Rounded MT Bold, Arial, sans-serif";
  [
    "play mini games",
    "unlock hidden flavors",
    "collect sparkle points",
    "win NUMO merch",
  ].forEach((line, index) => {
    drawSparkle(ctx, 350, 415 + index * 55, 13);
    ctx.fillStyle = "#17110f";
    ctx.fillText(line, 385, 425 + index * 55);
  });

  ctx.font = "500 28px Arial Rounded MT Bold, Arial, sans-serif";
  ctx.fillText("Step into the world of NUMO Play", 108, 90);
  ctx.fillText("a space inspired by sparkling flavor,", 108, 128);
  ctx.fillText("bold color, and vibrant energy.", 108, 166);

  drawFruitMascot(ctx, flavor);
  drawNutrition(ctx, flavor);
  drawBarcode(ctx, 1140, 688);

  ctx.fillStyle = "#17110f";
  ctx.font = "700 26px Arial Rounded MT Bold, Arial, sans-serif";
  ctx.fillText("330 ml", 690, 845);
  ctx.fillText("11.2 fl oz", 1010, 845);
  ctx.fillText("@numo.drink", 125, 835);
  ctx.fillText("www.drinknumo.com", 125, 872);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function NumoCan({ flavor, index }: { flavor: Flavor; index: number }) {
  const canRef = useRef<THREE.Group>(null);
  const texture = useMemo(() => makeLabelTexture(flavor), [flavor]);

  useEffect(() => () => texture.dispose(), [texture]);

  useEffect(() => {
    const can = canRef.current;
    if (!can) return;

    gsap.from(can.position, {
      y: -2.8,
      duration: 1.35,
      ease: "back.out(1.35)",
      delay: 1.05 + index * 0.12,
    });

    gsap.from(can.scale, {
      x: 0.65,
      y: 0.65,
      z: 0.65,
      duration: 1.35,
      ease: "back.out(1.35)",
      delay: 1.05 + index * 0.12,
    });
  }, [index]);

  useFrame(({ clock }) => {
    const can = canRef.current;
    if (!can) return;

    const time = clock.elapsedTime;
    can.position.y = Math.sin(time * 1.25 + index * 1.2) * 0.08;
    can.rotation.y += 0.006 + index * 0.0015;
  });

  return (
    <group
      ref={canRef}
      position={[flavor.x, 0, 0]}
      rotation={[0, 0, flavor.rotate]}
    >
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.68, 0.68, 2.35, 128, 1, false]} />
        <meshPhysicalMaterial
          clearcoat={0.68}
          clearcoatRoughness={0.25}
          map={texture}
          metalness={0.06}
          roughness={0.38}
        />
      </mesh>

      <mesh castShadow position={[0, 1.23, 0]}>
        <cylinderGeometry args={[0.7, 0.68, 0.13, 128]} />
        <meshPhysicalMaterial
          color="#c7c2b7"
          metalness={0.82}
          roughness={0.22}
        />
      </mesh>

      <mesh castShadow position={[0, -1.23, 0]}>
        <cylinderGeometry args={[0.68, 0.7, 0.12, 128]} />
        <meshPhysicalMaterial
          color="#b9b4aa"
          metalness={0.82}
          roughness={0.25}
        />
      </mesh>

      <mesh
        castShadow
        position={[0, 1.32, 0.14]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.17, 0.034, 12, 36]} />
        <meshPhysicalMaterial
          color="#d5d1c6"
          metalness={0.88}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0, 1.315, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.1, 0.03, 0.22]} />
        <meshPhysicalMaterial
          color="#b7b2a7"
          metalness={0.8}
          roughness={0.24}
        />
      </mesh>
    </group>
  );
}

function CansRig() {
  const scrollRef = useRef<THREE.Group>(null);
  const pointerRef = useRef<THREE.Group>(null);
  const { pointer, scene, size } = useThree();

  useEffect(() => {
    const rig = scrollRef.current;
    if (!rig) return;

    const tween = gsap.to(rig.rotation, {
      x: -0.16,
      y: Math.PI * 0.32,
      ease: "none",
      scrollTrigger: {
        trigger: scene.userData.mountElement ?? undefined,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [scene]);

  useFrame(() => {
    const pointerRig = pointerRef.current;
    const scrollRig = scrollRef.current;
    if (!pointerRig || !scrollRig) return;

    pointerRig.rotation.y += (pointer.x * 0.18 - pointerRig.rotation.y) * 0.035;
    pointerRig.rotation.x +=
      (-pointer.y * 0.08 - pointerRig.rotation.x) * 0.035;
    scrollRig.scale.setScalar(size.width < 720 ? 0.7 : 1);
  });

  return (
    <group ref={scrollRef}>
      <group ref={pointerRef}>
        {flavors.map((flavor, index) => (
          <NumoCan flavor={flavor} index={index} key={flavor.label} />
        ))}
      </group>
    </group>
  );
}

export function CanScene() {
  const wrapRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapRef} className="h-full min-h-112 w-full">
      <Canvas
        camera={{ fov: 35, position: [0, 0.2, 7.8] }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ scene }) => {
          scene.userData.mountElement = wrapRef.current;
        }}
        shadows
      >
        <ambientLight intensity={1.15} />
        <hemisphereLight args={["#fff8cf", "#317d99", 2.35]} />
        <directionalLight castShadow intensity={3.5} position={[3.2, 4.5, 5]} />
        <directionalLight
          intensity={1.4}
          position={[-4, 1.5, 3]}
          color="#f6b8c9"
        />
        <CansRig />
      </Canvas>
    </div>
  );
}
