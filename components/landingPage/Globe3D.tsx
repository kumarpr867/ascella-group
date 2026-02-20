"use client"

import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "./globe.json";

extend({ ThreeGlobe });

// Sample data for arcs connecting major cities across continents
const generateArcData = () => {
  // Major cities across continents
  const cities = [
    // North America
    { lat: 40.7128, lng: -74.0060, continent: 'NA' }, // NYC
    { lat: 34.0522, lng: -118.2437, continent: 'NA' }, // LA
    { lat: 41.8781, lng: -87.6298, continent: 'NA' }, // Chicago
    
    // South America
    { lat: -23.5505, lng: -46.6333, continent: 'SA' }, // Sao Paulo
    { lat: -34.6037, lng: -58.3816, continent: 'SA' }, // Buenos Aires
    { lat: -12.0464, lng: -77.0428, continent: 'SA' }, // Lima
    
    // Europe
    { lat: 51.5074, lng: -0.1278, continent: 'EU' }, // London
    { lat: 48.8566, lng: 2.3522, continent: 'EU' }, // Paris
    { lat: 52.5200, lng: 13.4050, continent: 'EU' }, // Berlin
    { lat: 41.9028, lng: 12.4964, continent: 'EU' }, // Rome
    
    // Asia
    { lat: 35.6762, lng: 139.6503, continent: 'AS' }, // Tokyo
    { lat: 31.2304, lng: 121.4737, continent: 'AS' }, // Shanghai
    { lat: 28.6139, lng: 77.2090, continent: 'AS' }, // Delhi
    { lat: 13.7563, lng: 100.5018, continent: 'AS' }, // Bangkok
    
    // Africa
    { lat: -26.2041, lng: 28.0473, continent: 'AF' }, // Johannesburg
    { lat: 30.0444, lng: 31.2357, continent: 'AF' }, // Cairo
    { lat: 6.5244, lng: 3.3792, continent: 'AF' }, // Lagos
    
    // Australia
    { lat: -33.8688, lng: 151.2093, continent: 'OC' }, // Sydney
    { lat: -37.8136, lng: 144.9631, continent: 'OC' }, // Melbourne
  ];

  const arcs = [];
  
  // Generate arcs between different continents
  const continentPairs = [
    ['NA', 'EU'], ['NA', 'AS'], ['NA', 'AF'],
    ['EU', 'AS'], ['EU', 'AF'], ['AS', 'OC'],
    ['AS', 'AF'], ['SA', 'EU'], ['SA', 'AF'],
    ['OC', 'AS'], ['NA', 'SA']
  ];

  continentPairs.forEach(([cont1, cont2]) => {
    const cities1 = cities.filter(c => c.continent === cont1);
    const cities2 = cities.filter(c => c.continent === cont2);
    
    // Create 1-2 arcs between these continents
    for (let i = 0; i < 2; i++) {
      const city1 = cities1[Math.floor(Math.random() * cities1.length)];
      const city2 = cities2[Math.floor(Math.random() * cities2.length)];
      
      if (city1 && city2) {
        arcs.push({
          startLat: city1.lat,
          startLng: city1.lng,
          endLat: city2.lat,
          endLng: city2.lng,
          // All arcs are now white
          color: '#ffffff',
          altitude: 0.3 + Math.random() * 0.4, // Random height between 0.3-0.7
        });
      }
    }
  });

  return arcs;
};

// Generate particle data (spaced out)
const generateParticleData = () => {
  const points = [];
  // Create a grid of points with spacing
  for (let lat = -80; lat <= 80; lat += 8) { // Spaced every 8 degrees
    for (let lng = -180; lng <= 180; lng += 12) { // Spaced every 12 degrees
      // Add some random offset to make it look more natural
      const latOffset = (Math.random() - 0.5) * 2;
      const lngOffset = (Math.random() - 0.5) * 3;
      
      points.push({
        lat: lat + latOffset,
        lng: lng + lngOffset,
        color: '#ffffff', // White particles
        size: 0.5 + Math.random() * 0.5, // Varied sizes
      });
    }
  }
  return points;
};

const GlobeComponent = ({ globeConfig, arcData, particleData }) => {
  const [globeData, setGlobeData] = useState(null);
  const globeRef = useRef(null);

  const defaultProps = {
    ...globeConfig,
  };

  useEffect(() => {
    if (typeof window !== "undefined" && globeRef.current && globeData) {
      const globe = globeRef.current;

      // Configure globe with black and white theme
      globe
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.8) // Increased margin for more space between particles
        .showAtmosphere(defaultProps.showAtmosphere)
        .atmosphereColor(defaultProps.atmosphereColor)
        .atmosphereAltitude(defaultProps.atmosphereAltitude)
        .hexPolygonColor(() => '#333333'); // Dark gray for countries

      // Add white particles
      globe
        .pointsData(globeData.points)
        .pointColor((e) => e.color)
        .pointAltitude(0.02) // Slight elevation
        .pointRadius((e) => e.size || 0.8)
        .pointsMerge(true);

      // Add white arcs (all white now)
      globe
        .arcsData(globeData.arcs)
        .arcColor(() => '#ffffff') // All arcs white
        .arcAltitude((e) => e.altitude || 0.5)
        .arcStroke(0.6) // Slightly thinner arcs
        .arcDashLength(0.8)
        .arcDashGap(0.4)
        .arcDashInitialGap(() => Math.random())
        .arcDashAnimateTime(3000); // Slower animation

      // Cleanup
      return () => {
        try {
          const renderer = globe.renderer();
          const scene = globe.scene();
          renderer?.dispose?.();
          scene?.traverse?.((obj) => {
            if (obj.geometry) obj.geometry.dispose?.();
            if (obj.material) {
              if (Array.isArray(obj.material)) {
                obj.material.forEach((m) => m.dispose?.());
              } else obj.material.dispose?.();
            }
          });
        } catch (err) {
        }
      };
    }
  }, [globeData]);

  useEffect(() => {
    if (typeof window !== "undefined" && globeRef.current) {
      // Prepare data
      setGlobeData({
        points: particleData,
        arcs: arcData,
      });
      _buildMaterial();
    }
  }, [globeRef.current, arcData, particleData]);

  const _buildMaterial = () => {
    if (!globeRef.current) return;

    const globeMaterial = globeRef.current.globeMaterial();
    globeMaterial.color = new Color(globeConfig.globeColor); // Black/dark
    globeMaterial.emissive = new Color(globeConfig.emissive);
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.2;
    globeMaterial.shininess = globeConfig.shininess || 0.3; // Less shiny for matte look
  };

  return (
    <>
      <threeGlobe ref={globeRef} />
    </>
  );
};

const ResizeCameraUpdater = () => {
  const { camera, gl, size } = useThree();
  useEffect(() => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    gl.setPixelRatio(dpr);
    gl.setSize(size.width, size.height);
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
  }, [camera, gl, size]);
  return null;
};

const World = (props) => {
  // Generate arc and particle data
  const arcData = generateArcData();
  const particleData = generateParticleData();
  
  const scene = new Scene();
  scene.fog = new Fog(0x000000, 400, 2000); // Black fog for dark theme

  // Black and white globe configuration
  const globeConfig = {
    showAtmosphere: true,
    atmosphereColor: "#333333", // Dark gray atmosphere
    atmosphereAltitude: 0.15,
    polygonColor: "#222222", // Very dark gray for countries
    globeColor: "#111111", // Almost black
    emissive: "#222222",
    emissiveIntensity: 0.2,
    shininess: 0.3,
    ambientLight: "#404040", // Dim white
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
  };

  return (
    <Canvas
      style={{ width: "100%", height: "100%", display: "block", background: "#000000" }}
      shadows={false}
      gl={{ antialias: true, alpha: false }} // Black background
      scene={scene}
      // Adjusted camera for smaller globe
      camera={new PerspectiveCamera(45, 1.5, 10, 1000)}
    >
      <ResizeCameraUpdater />
      
      {/* Lights adjusted for black and white theme */}
      <ambientLight color="#404040" intensity={0.8} />
      <directionalLight
        color="#ffffff"
        position={new Vector3(-400, 100, 400)}
        intensity={1.2}
      />
      <directionalLight
        color="#ffffff"
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <pointLight
        color="#ffffff"
        position={new Vector3(-200, 500, 200)}
        intensity={0.5}
      />
      
      <GlobeComponent 
        globeConfig={globeConfig} 
        arcData={arcData}
        particleData={particleData}
      />
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={150} // Reduced min distance
        maxDistance={300} // Reduced max distance
        autoRotateSpeed={1.5} // Slightly slower rotation
        autoRotate={true}
        rotateSpeed={0.8}
        minPolarAngle={0} // Allow full rotation
        maxPolarAngle={Math.PI}
      />
    </Canvas>
  );
};

export { GlobeComponent as Globe, World };