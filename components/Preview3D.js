// Preview3D.js
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Preview3D = ({ options }) => {
  const mountRef = useRef(null);
  const [loadedModel, setLoadedModel] = useState(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 500);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    let mesh;

    const updateGeometry = () => {
      if (mesh) scene.remove(mesh);

      if (loadedModel && options.shape === "custom") {
        mesh = loadedModel.scene.clone();
        mesh.scale.set(0.5, 0.5, 0.5); // Adjust the scale to fit the scene
        mesh.position.set(0, 0, 0); // Ensure the model is centered
      } else {
        const geometry = getGeometry(options);
        const material = new THREE.MeshStandardMaterial({
          color: options.color,
          roughness: 0.7,
          metalness: 0.3,
        });
        mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(options.width, options.height, options.depth);
      }

      scene.add(mesh);
    };

    updateGeometry();

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [options, loadedModel]);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      "/assets/man_in_suit/scene.gltf", // Ensure the path is correct
      (gltf) => {
        console.log("GLTF Model Loaded:", gltf); // Debug statement
        setLoadedModel(gltf);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the GLTF model:", error);
      }
    );
  }, []);

  const getGeometry = (options) => {
    switch (options.shape) {
      case "sphere":
        return new THREE.SphereGeometry(0.5, 32, 32);
      case "cylinder":
        return new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
      case "custom":
        // Custom shapes are handled by the GLTF loader
        return new THREE.BoxGeometry(0.5, 0.5, 1, 32);
      default:
        return new THREE.BoxGeometry(1, 1, 1);
    }
  };

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Preview3D;
