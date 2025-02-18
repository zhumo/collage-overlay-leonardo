
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PhotoGrid = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Define the image filenames that we know exist in the public/img directory
  const imageUrls = [
    "2012-06-02 22.30.00.jpg",
    "2012-07-01 15.32.32.jpg",
    "2012-07-02 12.26.19.jpg",
    "2012-07-03 21.57.03.jpg",
    "2013-06-06 21.03.52.jpg",
    "2013-06-26 09.41.51.jpg",
    "2013-06-27 13.57.12.jpg",
    "2013-08-23 08.45.09-1.jpg",
    "2013-10-21 18.18.36.jpg",
    "2014-03-01 19.05.53.jpg",
    "2014-04-18 10.54.01.png",
    "2014-06-21 16.10.06.jpg",
    "2014-09-26 20.26.35.jpg",
    "2014-11-15 17.42.37.jpg",
    "2014-11-15 18.10.00.jpg",
    "9A3ED042-9F2A-4040-8233-402E505C11DF-2379-00000117EAF19677.jpg",
    "DSCF2035.JPG",
    "DSC_0372.JPG",
    "FUJI3291.JPG",
    "FUJI4038.JPG",
    "FUJI4151.JPG",
    "FUJI4798.JPG",
    "IMG_0096.JPG",
    "IMG_0141.JPG",
    "IMG_0188.JPG",
    "IMG_0254.JPG",
    "IMG_0263.JPG",
    "IMG_0282.JPG",
    "IMG_0285.JPG",
    "IMG_0290.JPG",
    "IMG_0489.JPG",
    "IMG_0930.JPG",
    "IMG_0985.JPG",
    "IMG_1070.JPG",
    "IMG_1091.JPG",
    "IMG_1094.JPG",
    "IMG_1138.JPG",
    "IMG_1266.jpeg",
    "IMG_1283.jpeg",
    "IMG_1385.JPG",
    "IMG_1434.jpeg",
    "IMG_1613.JPG",
    "IMG_2383.jpeg",
    "IMG_2398.JPG",
    "IMG_3862.JPG",
    "IMG_4119.jpeg",
    "IMG_5701.jpeg"
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
