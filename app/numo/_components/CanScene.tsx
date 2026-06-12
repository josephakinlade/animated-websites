"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

const canPath = "/aluminium_can-_350ml.glb";

type Flavor = {
  bg: string;
  dark: string;
  fruit: "lemon" | "peach" | "raspberry";
  label: string;
};

const heroFlavor: Flavor = {
  bg: "#f7ec98",
  dark: "#e7ca22",
  fruit: "lemon",
  label: "lemon sparkling",
};

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

function drawQr(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#f4d62c";
  ctx.strokeStyle = "#17110f";
  ctx.lineWidth = 7;
  roundedRect(ctx, 0, 0, 150, 150, 22);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#17110f";
  for (let row = 0; row < 11; row += 1) {
    for (let col = 0; col < 11; col += 1) {
      if ((row * 7 + col * 11 + row * col) % 5 < 2) {
        ctx.fillRect(20 + col * 10, 20 + row * 10, 8, 8);
      }
    }
  }

  [0, 86].forEach((offsetX) => {
    [0, 86].forEach((offsetY) => {
      if (offsetX === 86 && offsetY === 86) return;
      ctx.strokeRect(20 + offsetX, 20 + offsetY, 40, 40);
      ctx.fillRect(33 + offsetX, 33 + offsetY, 15, 15);
    });
  });
  ctx.restore();
}

function drawBarcode(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const bars = [6, 2, 4, 8, 3, 5, 2, 9, 4, 3, 7, 2, 5, 8, 3, 6, 2, 5, 9, 3];
  let cursor = x;
  ctx.fillStyle = "#17110f";
  bars.forEach((width, index) => {
    if (index % 2 === 0) ctx.fillRect(cursor, y, width, 112);
    cursor += width + 4;
  });
}

function drawFruitMascot(ctx: CanvasRenderingContext2D) {
  const cx = 840;
  const cy = 520;

  ctx.save();
  ctx.strokeStyle = "#17110f";
  ctx.lineWidth = 11;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(cx - 108, cy + 110);
  ctx.lineTo(cx - 160, cy + 205);
  ctx.moveTo(cx + 95, cy + 120);
  ctx.lineTo(cx + 165, cy + 205);
  ctx.moveTo(cx - 110, cy + 24);
  ctx.lineTo(cx - 215, cy - 50);
  ctx.moveTo(cx + 110, cy + 24);
  ctx.lineTo(cx + 215, cy - 50);
  ctx.stroke();

  ctx.fillStyle = "#f4d92f";
  ctx.beginPath();
  ctx.ellipse(cx, cy, 132, 160, 0.16, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#71b75a";
  ctx.beginPath();
  ctx.ellipse(cx + 82, cy - 176, 74, 30, -0.55, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#fff9dc";
  ctx.beginPath();
  ctx.arc(cx - 44, cy - 34, 29, 0, Math.PI * 2);
  ctx.arc(cx + 43, cy - 34, 29, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#17110f";
  ctx.beginPath();
  ctx.arc(cx - 35, cy - 30, 11, 0, Math.PI * 2);
  ctx.arc(cx + 51, cy - 30, 11, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy + 34, 58, 0.15, Math.PI - 0.15);
  ctx.stroke();

  ctx.fillStyle = "#f06f78";
  ctx.beginPath();
  ctx.arc(cx - 78, cy + 34, 18, 0, Math.PI * 2);
  ctx.arc(cx + 80, cy + 34, 18, 0, Math.PI * 2);
  ctx.fill();

  drawSparkle(ctx, cx - 224, cy - 150, 23);
  drawSparkle(ctx, cx + 215, cy - 140, 22);
  drawSparkle(ctx, cx - 170, cy + 160, 19);
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
  ctx.font = "900 252px Arial Black, Impact, sans-serif";
  ctx.fillText("NUMO", 602, 224);

  ctx.fillStyle = flavor.dark;
  ctx.strokeStyle = "#17110f";
  ctx.lineWidth = 10;
  roundedRect(ctx, 770, 210, 378, 76, 38);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#17110f";
  ctx.font = "500 42px Arial Rounded MT Bold, Arial, sans-serif";
  ctx.fillText(flavor.label, 820, 260);

  ctx.font = "600 32px Arial Rounded MT Bold, Arial, sans-serif";
  ["scan", "play", "win"].forEach((label, index) => {
    ctx.fillStyle = flavor.dark;
    ctx.strokeStyle = "#17110f";
    roundedRect(ctx, 300, 90 + index * 70, 120, 48, 24);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#17110f";
    ctx.fillText(label, 333, 124 + index * 70);
  });

  ctx.font = "500 28px Arial Rounded MT Bold, Arial, sans-serif";
  ctx.fillText("Step into the world of NUMO Play", 108, 90);
  ctx.fillText("a space inspired by sparkling flavor,", 108, 128);
  ctx.fillText("bold color, and vibrant energy.", 108, 166);
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
    drawSparkle(ctx, 348, 414 + index * 55, 13);
    ctx.fillStyle = "#17110f";
    ctx.fillText(line, 382, 424 + index * 55);
  });

  drawFruitMascot(ctx);

  ctx.strokeStyle = "#17110f";
  ctx.fillStyle = "#f9ecd7";
  ctx.lineWidth = 8;
  roundedRect(ctx, 1110, 300, 330, 260, 34);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = flavor.dark;
  roundedRect(ctx, 1110, 300, 330, 64, 30);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#17110f";
  ctx.font = "700 30px Arial Rounded MT Bold, Arial, sans-serif";
  ctx.fillText("nutrition facts (per 330 ml)", 1138, 342);
  ctx.font = "500 28px Arial Rounded MT Bold, Arial, sans-serif";
  [
    "calories:                  28",
    "total carbohydrates:     7 g",
    "sugars:                    6 g",
    "sodium:                  5 mg",
  ].forEach((row, index) => ctx.fillText(row, 1140, 408 + index * 36));
  drawBarcode(ctx, 1140, 688);

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

function cloneWithMaterials(source: THREE.Group) {
  const clone = source.clone(true);

  clone.updateMatrixWorld(true);
  clone.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;

    object.castShadow = true;
    object.receiveShadow = true;
    object.material = new THREE.MeshPhysicalMaterial({
      color: "#c9c4b8",
      clearcoat: 0.6,
      metalness: 0.92,
      roughness: 0.18,
    });
  });

  const box = new THREE.Box3().setFromObject(clone);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDimension = Math.max(size.x, size.y, size.z);
  clone.position.sub(center);
  if (maxDimension > 0) {
    clone.scale.setScalar(2.65 / maxDimension);
  }

  return clone;
}

function LabelSleeve({ texture }: { texture: THREE.Texture }) {
  return (
    <mesh rotation={[0, -0.42, 0]}>
      <cylinderGeometry args={[0.742, 0.742, 2.22, 160, 1, true]} />
      <meshPhysicalMaterial
        clearcoat={0.78}
        clearcoatRoughness={0.16}
        map={texture}
        metalness={0.04}
        roughness={0.35}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  );
}

function FruitSlice({
  color,
  position,
  rotation,
  scale = 1,
}: {
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow>
        <torusGeometry args={[0.28, 0.035, 12, 48]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.27, 48]} />
        <meshStandardMaterial
          color="#fff6c5"
          roughness={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
      {Array.from({ length: 8 }).map((_, index) => (
        <mesh key={index} rotation={[0, 0, (index / 8) * Math.PI * 2]}>
          <boxGeometry args={[0.23, 0.008, 0.01]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

function LiquidOrbit() {
  const liquidRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const liquid = liquidRef.current;
    if (!liquid) return;
    liquid.rotation.y = clock.elapsedTime * 0.22;
    liquid.rotation.z = Math.sin(clock.elapsedTime * 0.55) * 0.08;
  });

  return (
    <group ref={liquidRef}>
      <mesh rotation={[Math.PI / 2.35, 0.1, 0]}>
        <torusGeometry args={[1.55, 0.018, 12, 160]} />
        <meshStandardMaterial
          color="#bcefff"
          emissive="#4dbce0"
          emissiveIntensity={0.34}
          transparent
          opacity={0.62}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.15, 0.2, 0.4]}>
        <torusGeometry args={[1.95, 0.012, 12, 160]} />
        <meshStandardMaterial
          color="#fff9c9"
          emissive="#ffffff"
          emissiveIntensity={0.4}
          transparent
          opacity={0.44}
        />
      </mesh>
    </group>
  );
}

function HeroCan() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef<THREE.Group>(null);
  const pointerRef = useRef<THREE.Group>(null);
  const labelTexture = useMemo(() => makeLabelTexture(heroFlavor), []);
  const gltf = useLoader(GLTFLoader, canPath);
  const model = useMemo(() => cloneWithMaterials(gltf.scene), [gltf.scene]);
  const { pointer, scene, size } = useThree();

  useEffect(() => () => labelTexture.dispose(), [labelTexture]);

  useEffect(() => {
    const group = groupRef.current;
    const scroll = scrollRef.current;
    if (!group || !scroll) return;

    gsap.set(group.scale, { x: 0.01, y: 0.01, z: 0.01 });
    gsap.set(group.position, { y: -0.2 });

    const intro = gsap.timeline({ delay: 1.25 });
    intro
      .to(group.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.35,
        ease: "back.out(1.35)",
      })
      .fromTo(
        group.rotation,
        { x: -0.6, y: -1.5, z: 0.18 },
        { x: -0.16, y: -0.28, z: -0.12, duration: 1.35, ease: "power4.out" },
        0,
      );

    const move = gsap
      .timeline({
        scrollTrigger: {
          trigger: scene.userData.smoothContent ?? undefined,
          start: "top top",
          end: "70% bottom",
          scrub: 1,
        },
      })
      .to(scroll.position, { x: size.width < 768 ? 0 : -1.85, y: -1.05, z: 0 })
      .to(scroll.rotation, { y: Math.PI * 1.2, z: 0.18 }, 0)
      .to(scroll.scale, { x: 0.62, y: 0.62, z: 0.62 }, 0);

    return () => {
      intro.kill();
      move.kill();
    };
  }, [scene, size.width]);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    const pointerGroup = pointerRef.current;
    if (!group || !pointerGroup) return;

    group.position.y = -0.06 + Math.sin(clock.elapsedTime * 1.15) * 0.08;
    pointerGroup.rotation.y +=
      (pointer.x * 0.18 - pointerGroup.rotation.y) * 0.035;
    pointerGroup.rotation.x +=
      (-pointer.y * 0.1 - pointerGroup.rotation.x) * 0.035;
  });

  return (
    <group ref={scrollRef} position={[size.width < 768 ? 0 : 1.45, -0.1, 0]}>
      <group ref={pointerRef}>
        <group ref={groupRef} rotation={[-0.16, -0.28, -0.12]} scale={1.7}>
          <primitive object={model} />
          <LabelSleeve texture={labelTexture} />
          <LiquidOrbit />
          <FruitSlice
            color="#f5d72e"
            position={[-0.9, 1.05, 0.44]}
            rotation={[0.3, 0.65, -0.5]}
            scale={0.9}
          />
          <FruitSlice
            color="#f5d72e"
            position={[0.92, -0.28, 0.62]}
            rotation={[0.6, -0.4, 0.8]}
            scale={0.72}
          />
          <FruitSlice
            color="#f5d72e"
            position={[-0.58, -1.05, 0.36]}
            rotation={[0.25, 0.2, 1.2]}
            scale={0.58}
          />
        </group>
      </group>
    </group>
  );
}

function SceneCameraRig() {
  const { camera, scene } = useThree();

  useEffect(() => {
    const tween = gsap.to(camera.position, {
      z: 6.2,
      ease: "none",
      scrollTrigger: {
        trigger: scene.userData.smoothContent ?? undefined,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [camera, scene]);

  return <HeroCan />;
}

export function CanScene() {
  const wrapRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapRef} className="pointer-events-none fixed inset-0 z-3">
      <Canvas
        camera={{ fov: 34, position: [0, 0.2, 7.4] }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ scene }) => {
          scene.userData.smoothContent = document.querySelector(
            "[data-numo-smooth-content]",
          );
        }}
        shadows
      >
        <ambientLight intensity={1.45} />
        <hemisphereLight args={["#fff8cf", "#2c9cc4", 2.65]} />
        <directionalLight castShadow intensity={4.2} position={[3.4, 4.8, 5]} />
        <directionalLight
          color="#f7b9cc"
          intensity={1.6}
          position={[-4, 1.4, 3]}
        />
        <SceneCameraRig />
      </Canvas>
    </div>
  );
}
