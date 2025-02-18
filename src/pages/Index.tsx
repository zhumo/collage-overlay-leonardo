
import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

const PhotoGrid = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const generateRandomAnimation = () => {
    const randomX = Math.random() * dimensions.width - dimensions.width / 2;
    const randomY = Math.random() * dimensions.height - dimensions.height / 2;
    const randomRotate = Math.random() * 360 - 180;
    const randomDuration = 15 + Math.random() * 20;

    return {
      x: [randomX, -randomX, randomX],
      y: [randomY, -randomY, randomY],
      rotate: [randomRotate, -randomRotate, randomRotate],
      transition: {
        duration: randomDuration,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.5, 1]
      }
    };
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Title Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <h1 className="text-4xl md:text-6xl font-light text-white text-center mix-blend-difference">
          Leonardo Chen
        </h1>
      </motion.div>

      {/* Flying Images */}
      <div className="relative w-full h-full">
        {[...Array(23)].map((_, index) => {
          const size = 150 + Math.random() * 200; // Random size between 150px and 350px
          const startX = Math.random() * dimensions.width;
          const startY = Math.random() * dimensions.height;

          return (
            <motion.div
              key={index}
              initial={{ 
                x: startX, 
                y: startY, 
                scale: 0,
                rotate: 0 
              }}
              animate={generateRandomAnimation()}
              style={{
                position: 'absolute',
                width: size,
                height: size,
              }}
              className="origin-center"
            >
              <img
                src={`/lovable-uploads/${imageUrls[index]}`}
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
                loading="lazy"
                onLoad={(e) => {
                  console.log(`Image ${index + 1} loaded`);
                  e.currentTarget.classList.add('loaded');
                }}
                onError={() => console.error(`Image ${index + 1} failed to load`)}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Image URLs array
const imageUrls = [
  "2f2cdda0-74e4-4b9a-8bad-341d091acafa.png",
  "13f66126-45ed-492f-b2ba-0eb7d3427be8.png",
  "f1c685ab-e7bf-4f94-865f-606966f04c56.png",
  "306fe83e-8803-4cda-92d2-c869b64a6e17.png",
  "a579b1b1-63db-45b7-b286-2e5d185d558f.png",
  "798311a3-743f-45b2-b3e6-239ac31d42c1.png",
  "3114e367-89e5-47bd-a197-433789f939e0.png",
  "c607cb3f-ad55-4950-8d9d-d548c36dcf36.png",
  "7137ff57-8200-4f45-b736-de32af7eb242.png",
  "dc1aabeb-a664-47d7-9795-bdd506a311c3.png",
  "14042cb7-b495-4dbb-b963-e09d3145c496.png",
  "3106e1db-37f1-4c01-83ee-bd33ba9459b0.png",
  "ca6d3e22-c0dd-4683-bc38-c0ee3b5d6801.png",
  "ffee7564-6402-4db9-9d92-e6f5f4189164.png",
  "0a662876-e084-4a8c-aefb-55482f9f1a05.png",
  "042903e4-2ffc-4d5d-91d0-037a51393a21.png",
  "28caca30-f94f-43cf-b794-1973adfa4c67.png",
  "6062ee04-2bc8-4c68-99a3-8f3e93ca7de6.png",
  "41fdae7b-0b14-4ed1-bea8-134b8e6bf8be.png",
  "9278ed08-b4ae-490d-bb29-eb12a64a9deb.png",
  "e776963f-f5e3-4862-8aec-d865b1e17d96.png",
  "b4c3d650-7ddc-4a2d-b7a7-972a4cfe3135.png",
  "fe782ed4-be4a-4598-b617-06be0d8a3057.png",
];

export default PhotoGrid;
