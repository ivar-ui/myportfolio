<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as THREE from 'three'

// ==== TYPING EFFECT ====
const typingText = ref('')
const textsToType = ['Ivan AryaPutra.', 'Network Engineer.', 'Portfolio Page.']
let textIndex = 0
let charIndex = 0
let typingInterval

function typeNextLetter() {
  if (textIndex >= textsToType.length) textIndex = 0

  const currentText = textsToType[textIndex]
  typingText.value = currentText.slice(0, charIndex + 1)
  charIndex++

  if (charIndex === currentText.length) {
    clearInterval(typingInterval)
    setTimeout(() => {
      typingInterval = setInterval(typeNextLetter, 100)
      charIndex = 0
      textIndex++
    }, 2000)
  }
}

onMounted(() => {
  typingInterval = setInterval(typeNextLetter, 100)
})

onUnmounted(() => {
  clearInterval(typingInterval)
})

// ==== PARTICLE EFFECT ====
const canvasRef = ref(null)

let mouse = new THREE.Vector2()
let raycaster = new THREE.Raycaster()

const handleMouseMove = (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
}

function createCircleTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
  ctx.fillStyle = '#cc33ff'
  ctx.shadowColor = '#ff00ff'
  ctx.shadowBlur = 20
  ctx.fill()
  const texture = new THREE.Texture(canvas)
  texture.needsUpdate = true
  return texture
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)

  nextTick(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    const width = canvas.clientWidth || window.innerWidth
    const height = canvas.clientHeight || window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(0, 0, 40)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(width, height)

    scene.background = new THREE.Color(0x03000a)
    scene.fog = new THREE.Fog(0x0a0011, 30, 80)

    const ambientLight = new THREE.AmbientLight(0x440066, 0.5)
    const pointLight = new THREE.PointLight(0xff00ff, 1, 100)
    pointLight.position.set(0, 0, 25)
    scene.add(ambientLight, pointLight)

    const bgGeometry = new THREE.BufferGeometry()
    const bgCount = 1200
    const bgPositions = new Float32Array(bgCount * 3)
    for (let i = 0; i < bgCount * 3; i++) {
      bgPositions[i] = (Math.random() - 0.5) * 100
    }
    bgGeometry.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3))
    const bgMaterial = new THREE.PointsMaterial({
      color: 0x8800cc,
      size: 0.15,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const bgParticles = new THREE.Points(bgGeometry, bgMaterial)
    scene.add(bgParticles)

    const particleCount = 4000
    const radius = 20
    const explodeRadius = 8
    const maxVelocity = 0.5

    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const initialPositions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      positions[i * 3] = x * 5
      positions[i * 3 + 1] = y * 5
      positions[i * 3 + 2] = z * 5

      initialPositions[i * 3] = x
      initialPositions[i * 3 + 1] = y
      initialPositions[i * 3 + 2] = z
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: 0xff33ff,
      size: 0.25,
      map: createCircleTexture(),
      transparent: true,
      opacity: 0.0,
      alphaTest: 0.01,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(geometry, material)
    const particleGroup = new THREE.Group()
    particleGroup.add(particles)
    scene.add(particleGroup)
    particleGroup.position.set(20, -2, 0)

    const sphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 32, 32),
      new THREE.MeshBasicMaterial({ visible: false })
    )
    particleGroup.add(sphereMesh)

    let introProgress = 0

    const animate = () => {
      requestAnimationFrame(animate)

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObject(sphereMesh)
      let mousePos3D = intersects.length > 0 ? intersects[0].point : null

      const pos = particles.geometry.attributes.position.array

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3

        if (introProgress < 1) {
          const factor = 1 - introProgress
          pos[ix] = initialPositions[ix] * factor + positions[ix] * (1 - factor)
          pos[ix + 1] = initialPositions[ix + 1] * factor + positions[ix + 1] * (1 - factor)
          pos[ix + 2] = initialPositions[ix + 2] * factor + positions[ix + 2] * (1 - factor)
        } else {
          pos[ix] += velocities[ix]
          pos[ix + 1] += velocities[ix + 1]
          pos[ix + 2] += velocities[ix + 2]
        }

        if (mousePos3D && introProgress >= 1) {
          const dx = pos[ix] - mousePos3D.x
          const dy = pos[ix + 1] - mousePos3D.y
          const dz = pos[ix + 2] - mousePos3D.z
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < explodeRadius) {
            const force = (1 - dist / explodeRadius) * 0.3
            velocities[ix] += (dx / dist) * force
            velocities[ix + 1] += (dy / dist) * force
            velocities[ix + 2] += (dz / dist) * force
          }
        }

        const dxInit = pos[ix] - initialPositions[ix]
        const dyInit = pos[ix + 1] - initialPositions[ix + 1]
        const dzInit = pos[ix + 2] - initialPositions[ix + 2]

        velocities[ix] -= dxInit * 0.05
        velocities[ix + 1] -= dyInit * 0.05
        velocities[ix + 2] -= dzInit * 0.05

        velocities[ix] *= 0.92
        velocities[ix + 1] *= 0.92
        velocities[ix + 2] *= 0.92

        const vMag = Math.sqrt(
          velocities[ix] ** 2 + velocities[ix + 1] ** 2 + velocities[ix + 2] ** 2
        )
        if (vMag > maxVelocity) {
          const scale = maxVelocity / vMag
          velocities[ix] *= scale
          velocities[ix + 1] *= scale
          velocities[ix + 2] *= scale
        }
      }

      if (introProgress < 1) {
        introProgress += 0.01
        material.opacity = introProgress
      }

      particles.geometry.attributes.position.needsUpdate = true
      particleGroup.rotation.y += 0.0025
      particleGroup.rotation.x += 0.0015

      renderer.render(scene, camera)
    }

    animate()

    window.addEventListener('resize', () => {
      const newWidth = canvas.clientWidth || window.innerWidth
      const newHeight = canvas.clientHeight || window.innerHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    })
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  clearInterval(typingInterval)
})
</script>


<template>
  <div class="relative w-full h-full overflow-hidden bg-black">
    
    <canvas ref="canvasRef" class="fixed inset-0 w-full h-full block z-[-2]"></canvas>

    <div
      class="absolute right-8 top-1/2 transform -translate-y-1/2 w-24 h-24 rounded-full bg-purple-700 shadow-2xl z-20 animate-fade-in"
    ></div>

    <div
      class="fixed left-0 top-1/2 transform -translate-y-1/2 pl-10 md:pl-20 flex flex-col items-start justify-center text-white z-10 space-y-10 animate-slide-in"
    >
    <h1 class="text-5xl md:text-6xl font-bold text-white min-h-[3rem]">
  {{ typingText }}
  <span class="border-r-2 border-white animate-blink ml-1"></span>
</h1>

      <div class="flex space-x-6">
        <a href="https://www.linkedin.com/in/ivan-aryaputra" target="_blank"
          class="w-24 h-24 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition duration-300">
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" class="w-10 h-10" />
        </a>
        <a href="https://github.com/ivar-ui" target="_blank"
          class="w-24 h-24 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition duration-300">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" class="w-10 h-10 invert" />
        </a>
        <a href="https://www.behance.net/gallery/220316429/Graphic-Designer-Socmed-Specialist-Portfolio" target="_blank"
          class="w-24 h-24 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition duration-300">
          <img src="https://cdn-icons-png.flaticon.com/512/145/145799.png" class="w-10 h-10" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  0% {
    opacity: 0;
    scale: 0.95;
  }
  100% {
    opacity: 1;
    scale: 1;
  }
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 1s step-start infinite;
}

.animate-fade-in {
  animation: fade-in 1.2s ease-out forwards;
}

.animate-slide-in {
  animation: slide-in 1s ease-out forwards;
}
</style>
