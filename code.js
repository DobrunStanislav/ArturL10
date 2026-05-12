import * as THREE from 'three';
import { MindARThree } from 'mindar-face-three';

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.querySelector("#start-btn");

    startBtn.addEventListener("click", async () => {
        startBtn.style.display = "none";

        const mindarThree = new MindARThree({
            container: document.querySelector("#container"),
        });

        const { renderer, scene, camera } = mindarThree;

        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(hemisphereLight);

        const faceMesh = mindarThree.addFaceMesh();
        const textureLoader = new THREE.TextureLoader();

        // Завантажуємо маску кота
        const maskTextureUrl = 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/face-tracking/assets/mask/mask.png';

        textureLoader.load(maskTextureUrl, (texture) => {
            faceMesh.material.map = texture;
            faceMesh.material.transparent = true;
            faceMesh.material.needsUpdate = true;
        });

        scene.add(faceMesh);

        await mindarThree.start();

        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    });
});
