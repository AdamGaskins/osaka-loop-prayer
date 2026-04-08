<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, useTemplateRef } from 'vue'

const { rotation = Math.PI / 2 } = defineProps<{
    rotation?: number
}>()

const parentEl = useTemplateRef('parentEl')

let scene: THREE.Scene | null = null

onMounted(initScene)

function initScene() {
    // Scene
    const scene = new THREE.Scene()

    // Camera
    // const camera = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   1000
    // );
    const width = 2
    const height = 2
    const camera = new THREE.OrthographicCamera(
        width / -2, // left
        width / 2, // right
        height / 2, // top
        height / -2, // bottom
        1, // near
        100, // far
    )
    camera.position.z = 3

    // Renderer with transparency
    const renderer = new THREE.WebGLRenderer({
        alpha: true, // enables transparency
        antialias: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(64, 64)

    // IMPORTANT: make background transparent
    renderer.setClearColor(0x000000, 0) // 0 = fully transparent

    parentEl.value!.appendChild(renderer.domElement)

    // Cube
    const geometry = new THREE.BoxGeometry(0.7, 0.7, 1.25)
    const material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
    })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 2)
    dirLight.position.set(5, 3, 0) // x, y, z
    scene.add(dirLight)

    // Animation loop
    function animate() {
        requestAnimationFrame(animate)

        cube.rotation.x = 0.5
        cube.rotation.y = rotation

        renderer.render(scene, camera)
    }

    animate()
}
</script>

<template>
    <div ref="parentEl" class="size-16"></div>
</template>
