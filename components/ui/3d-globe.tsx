"use client";
import React, { useRef, useMemo, useState, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";

export interface GlobeMarker {
  lat: number;
  lng: number;
  src: string;
  label?: string;
  size?: number;
}

export interface Globe3DConfig {
  radius?: number;
  globeColor?: string;
  textureUrl?: string;
  bumpMapUrl?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereIntensity?: number;
  atmosphereBlur?: number;
  bumpScale?: number;
  autoRotateSpeed?: number;
  enableZoom?: boolean;
  enablePan?: boolean;
  minDistance?: number;
  maxDistance?: number;
  initialRotation?: { x: number; y: number };
  markerSize?: number;
  showWireframe?: boolean;
  wireframeColor?: string;
  ambientIntensity?: number;
  pointLightIntensity?: number;
  backgroundColor?: string | null;
}

interface Globe3DProps {
  markers?: GlobeMarker[];
  config?: Globe3DConfig;
  className?: string;
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
}

const DEFAULT_EARTH_TEXTURE = "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg";
const DEFAULT_BUMP_TEXTURE  = "https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png";

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z =   radius * Math.sin(phi) * Math.sin(theta);
  const y =   radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function Marker({ marker, radius, onClick, onHover }: {
  marker: GlobeMarker; radius: number;
  onClick?: (m: GlobeMarker) => void;
  onHover?: (m: GlobeMarker | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible]  = useState(true);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const surfacePos = useMemo(() => latLngToVector3(marker.lat, marker.lng, radius * 1.001), [marker.lat, marker.lng, radius]);
  const topPos     = useMemo(() => latLngToVector3(marker.lat, marker.lng, radius * 1.18),  [marker.lat, marker.lng, radius]);
  const lineH      = topPos.distanceTo(surfacePos);

  useFrame(() => {
    if (!groupRef.current) return;
    const wp  = new THREE.Vector3(); groupRef.current.getWorldPosition(wp);
    const dot = wp.normalize().dot(camera.position.clone().normalize());
    setVisible(dot > 0.1);
  });

  const { lineCenter, lineQ } = useMemo(() => {
    const center = surfacePos.clone().lerp(topPos, 0.5);
    const dir    = topPos.clone().sub(surfacePos).normalize();
    const q      = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    return { lineCenter: center, lineQ: q };
  }, [surfacePos, topPos]);

  return (
    <group ref={groupRef} visible={visible}>
      <mesh position={lineCenter} quaternion={lineQ}>
        <cylinderGeometry args={[0.003, 0.003, lineH, 8]} />
        <meshBasicMaterial color={hovered ? "#ffffff" : "#94a3b8"} transparent opacity={0.6} />
      </mesh>
      <mesh position={surfacePos} quaternion={lineQ}>
        <coneGeometry args={[0.015, 0.04, 8]} />
        <meshBasicMaterial color={hovered ? "#f97316" : "#ef4444"} />
      </mesh>
      <group position={topPos}>
        <Html transform center sprite distanceFactor={10}
          style={{ pointerEvents: visible ? "auto" : "none", opacity: visible ? 1 : 0 }}>
          <div
            style={{ width:32, height:40, borderRadius:'50% 50% 50% 50% / 60% 60% 40% 40%', overflow:'hidden', cursor:'pointer', background:'#00E5FF', border: hovered ? '2px solid #fff' : '2px solid #00E5FF', boxShadow:'0 0 12px rgba(0,229,255,0.8)' }}
            onMouseEnter={() => { setHovered(true); onHover?.(marker); }}
            onMouseLeave={() => { setHovered(false); onHover?.(null); }}
            onClick={() => onClick?.(marker)}
          >
            <img src={marker.src} alt={marker.label} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
        </Html>
      </group>
    </group>
  );
}

function GlobeMesh({ config, markers, onMarkerClick, onMarkerHover }: {
  config: Required<Globe3DConfig>;
  markers: GlobeMarker[];
  onMarkerClick?: (m: GlobeMarker) => void;
  onMarkerHover?: (m: GlobeMarker | null) => void;
}) {
  const [earthTex, bumpTex] = useTexture([config.textureUrl, config.bumpMapUrl]);
  useMemo(() => {
    if (earthTex) earthTex.colorSpace = THREE.SRGBColorSpace;
  }, [earthTex]);
  const geo = useMemo(() => new THREE.SphereGeometry(config.radius, 64, 64), [config.radius]);
  return (
    <group>
      <mesh geometry={geo}>
        <meshStandardMaterial map={earthTex} bumpMap={bumpTex} bumpScale={config.bumpScale * 0.05} roughness={0.7} metalness={0} />
      </mesh>
      {markers.map((m, i) => (
        <Marker key={i} marker={m} radius={config.radius} onClick={onMarkerClick} onHover={onMarkerHover} />
      ))}
    </group>
  );
}

function Atmosphere({ radius, color, intensity }: { radius: number; color: string; intensity: number }) {
  const mat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      atmosphereColor: { value: new THREE.Color(color) },
      intensity: { value: intensity },
    },
    vertexShader: `varying vec3 vNormal; varying vec3 vPos;
      void main(){ vNormal=normalize(normalMatrix*normal); vPos=(modelViewMatrix*vec4(position,1.0)).xyz; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 atmosphereColor; uniform float intensity; varying vec3 vNormal; varying vec3 vPos;
      void main(){ float f=pow(1.0-abs(dot(vNormal,normalize(-vPos))),2.0); gl_FragColor=vec4(atmosphereColor,f*intensity); }`,
    side: THREE.BackSide, transparent: true, depthWrite: false,
  }), [color, intensity]);
  return <mesh scale={[1.12,1.12,1.12]}><sphereGeometry args={[radius,64,32]}/><primitive object={mat} attach="material"/></mesh>;
}

function Scene({ markers, config, onMarkerClick, onMarkerHover }: {
  markers: GlobeMarker[]; config: Required<Globe3DConfig>;
  onMarkerClick?: (m: GlobeMarker) => void;
  onMarkerHover?: (m: GlobeMarker | null) => void;
}) {
  const { camera } = useThree();
  React.useEffect(() => { camera.position.set(0, 0, config.radius * 3.5); camera.lookAt(0,0,0); }, [camera, config.radius]);
  return (
    <>
      <ambientLight intensity={config.ambientIntensity} />
      <directionalLight position={[10,4,10]} intensity={config.pointLightIntensity} />
      <directionalLight position={[-6,2,-4]} intensity={config.pointLightIntensity * 0.3} color="#88ccff" />
      <Suspense fallback={null}>
        <GlobeMesh config={config} markers={markers} onMarkerClick={onMarkerClick} onMarkerHover={onMarkerHover} />
      </Suspense>
      {config.showAtmosphere && <Atmosphere radius={config.radius} color={config.atmosphereColor} intensity={config.atmosphereIntensity} />}
      <OrbitControls enablePan={config.enablePan} enableZoom={config.enableZoom}
        minDistance={config.minDistance} maxDistance={config.maxDistance}
        autoRotate={config.autoRotateSpeed > 0} autoRotateSpeed={config.autoRotateSpeed}
        enableDamping dampingFactor={0.1} rotateSpeed={0.4} />
    </>
  );
}

const defaultConfig: Required<Globe3DConfig> = {
  radius: 2, globeColor: "#1a1a2e",
  textureUrl: DEFAULT_EARTH_TEXTURE, bumpMapUrl: DEFAULT_BUMP_TEXTURE,
  showAtmosphere: false, atmosphereColor: "#4da6ff", atmosphereIntensity: 0.5, atmosphereBlur: 2,
  bumpScale: 1, autoRotateSpeed: 0.3, enableZoom: false, enablePan: false,
  minDistance: 5, maxDistance: 15, initialRotation: { x: 0, y: 0 },
  markerSize: 0.06, showWireframe: false, wireframeColor: "#4a9eff",
  ambientIntensity: 0.6, pointLightIntensity: 1.5, backgroundColor: null,
};

export function Globe3D({ markers = [], config = {}, className, onMarkerClick, onMarkerHover }: Globe3DProps) {
  const merged = useMemo(() => ({ ...defaultConfig, ...config }), [config]);
  return (
    <div style={{ position:'relative', height:500, width:'100%' }} className={className}>
      <Canvas gl={{ antialias:true, alpha:true }} dpr={[1,2]}
        camera={{ fov:45, near:0.1, far:1000, position:[0,0,merged.radius*3.5] }}
        style={{ background: merged.backgroundColor || 'transparent' }}>
        <Scene markers={markers} config={merged} onMarkerClick={onMarkerClick} onMarkerHover={onMarkerHover} />
      </Canvas>
    </div>
  );
}

export default Globe3D;
