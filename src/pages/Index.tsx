import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PhotoGrid = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Define the image filenames that we know exist in the public/img directory
  const imageUrls = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.png",
    "12.jpg",
    "13.jpg",
    "14.jpg",
    "15.JPG",
    "16.JPG",
    "17.JPG",
    "18.JPG",
    "19.JPG",
    "20.JPG",
    "21.JPG",
    "22.JPG",
    "23.JPG",
    "24.JPG",
    "25.JPG",
    "26.JPG",
    "27.jpeg",
    "28.jpeg",
    "29.jpeg",
    "30.JPG",
    "31.jpeg",
    "32.JPG",
    "33.jpeg",
    "34.jpeg"
  ];

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

  const generateRandomInitialPosition = () => {
    const randomAngle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 500; // Random distance from center
    return {
      x: Math.cos(randomAngle) * distance,
      y: Math.sin(randomAngle) * distance,
      rotate: Math.random() * 360 // Random initial rotation
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
        {imageUrls.map((imageUrl, index) => {
          const size = 150 + Math.random() * 200; // Random size between 150px and 350px
          const initialPosition = generateRandomInitialPosition();

          return (
            <motion.div
              key={index}
              initial={{ 
                x: initialPosition.x,
                y: initialPosition.y,
                rotate: initialPosition.rotate,
                scale: 0
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
                src={`/img/${imageUrl}`}
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
                loading="lazy"
                onLoad={(e) => {
                  console.log(`Image ${imageUrl} loaded`);
                  e.currentTarget.classList.add('loaded');
                }}
                onError={() => console.error(`Image ${imageUrl} failed to load`)}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PhotoGrid;
