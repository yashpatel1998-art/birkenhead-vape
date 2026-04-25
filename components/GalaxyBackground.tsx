'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function GalaxyBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // ── SCENE SETUP ──
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // ── GALAXY PARAMETERS ──
    const COUNT        = 90000
    const RADIUS       = 5
    const BRANCHES     = 3
    const SPIN         = 1.2
    const RANDOMNESS   = 0.25
    const RANDOM_POWER = 3
    const STAR_SIZE    = 0.012

    // ── BUILD GEOMETRY ──
    const geometry  = new THREE.BufferGeometry()
    const positions = new Float32Array(COUNT * 3)
    const colors    = new Float32Array(COUNT * 3)

    const cCore  = new THREE.Color('#ffffff')   // bright white core
    const cMid   = new THREE.Color('#00E5FF')   // cyan arms
    const cEdge  = new THREE.Color('#BF00FF')   // violet outer edge

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3

      // Position along spiral arm
      const r           = Math.random() * RADIUS
      const spinAngle   = r * SPIN
      const branchAngle = ((i % BRANCHES) / BRANCHES) * Math.PI * 2

      // Scatter particles around the arm
      const scatter = (power: number) =>
        Math.pow(Math.random(), power) * (Math.random() < 0.5 ? 1 : -1)

      const rx = scatter(RANDOM_POWER) * RANDOMNESS * r
      const ry = scatter(RANDOM_POWER) * RANDOMNESS * r * 0.3   // flatter on Y
      const rz = scatter(RANDOM_POWER) * RANDOMNESS * r

      positions[i3]     = Math.cos(branchAngle + spinAngle) * r + rx
      positions[i3 + 1] = ry
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + rz

      // Colour: white core → cyan → violet edge
      const t     = r / RADIUS
      const mixed = new THREE.Color()
      if (t < 0.4) {
        mixed.lerpColors(cCore, cMid, t / 0.4)
      } else {
        mixed.lerpColors(cMid, cEdge, (t - 0.4) / 0.6)
      }

      colors[i3]     = mixed.r
      colors[i3 + 1] = mixed.g
      colors[i3 + 2] = mixed.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3))

    // ── MATERIAL ──
    const material = new THREE.PointsMaterial({
      size:           STAR_SIZE,
      sizeAttenuation: true,
      depthWrite:     false,
      blending:       THREE.AdditiveBlending,
      vertexColors:   true,
      transparent:    true,
      opacity:        0.85,
    })

    const galaxy = new THREE.Points(geometry, material)
    scene.add(galaxy)

    // ── EXTRA BRIGHT CORE STARS ──
    const coreGeo = new THREE.BufferGeometry()
    const corePos = new Float32Array(800 * 3)
    const coreCol = new Float32Array(800 * 3)
    for (let i = 0; i < 800; i++) {
      const i3   = i * 3
      const r    = Math.random() * 0.8
      const phi  = Math.random() * Math.PI * 2
      const tht  = Math.random() * Math.PI * 2
      corePos[i3]     = Math.sin(phi) * Math.cos(tht) * r
      corePos[i3 + 1] = Math.sin(phi) * Math.sin(tht) * r * 0.3
      corePos[i3 + 2] = Math.cos(phi) * r
      coreCol[i3] = coreCol[i3+1] = coreCol[i3+2] = 1
    }
    coreGeo.setAttribute('position', new THREE.BufferAttribute(corePos, 3))
    coreGeo.setAttribute('color',    new THREE.BufferAttribute(coreCol, 3))
    const coreMat  = new THREE.PointsMaterial({
      size: 0.025, sizeAttenuation: true, depthWrite: false,
      blending: THREE.AdditiveBlending, vertexColors: true, transparent: true, opacity: 0.9,
    })
    scene.add(new THREE.Points(coreGeo, coreMat))

    // ── CAMERA ──
    camera.position.set(0, 2.8, 5.5)
    camera.lookAt(0, 0, 0)

    // ── MOUSE PARALLAX ──
    let targetX = 0
    let targetY = 0
    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth  - 0.5) * 1.2
      targetY = (e.clientY / window.innerHeight - 0.5) * 1.2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── RESIZE ──
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // ── ANIMATION LOOP ──
    let rafId: number
    const clock = new THREE.Clock()

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Slow galaxy rotation
      galaxy.rotation.y = t * 0.04

      // Subtle tilt breathing
      galaxy.rotation.x = Math.sin(t * 0.1) * 0.05

      // Smooth mouse parallax on camera
      camera.position.x += (targetX * 0.4 - camera.position.x) * 0.025
      camera.position.y += (-targetY * 0.3 + 2.8 - camera.position.y) * 0.025
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    // ── CLEANUP ──
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      renderer.dispose()
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  )
}
