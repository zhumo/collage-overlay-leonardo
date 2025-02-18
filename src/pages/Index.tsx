
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
        className="fixed top-0 left-0 w-full z-50 py-6 bg-transparent"
      >
        <h1 className="text-4xl md:text-6xl font-light text-white text-center mix-blend-difference">
          Leonardo Chen
        </h1>
      </motion.div>

      {/* Flying Images */}
      <div className="relative w-full h-full">
        {[...Array(29)].map((_, index) => {
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
  "4f0f943e-215b-45b1-90fd-73ee68bd7eba.png",
  "b86042de-96f9-4270-8f7a-9ee8bed3868b.png",
  "1233aa72-f62f-4e94-9d82-ca4abe9f53f7.png",
  "93528515-359a-4c1c-b899-970e4d54225c.png",
  "17899094-a9ca-417d-849b-ca09d3f64229.png",
  "a912b929-5839-4699-894a-99f74f839895.png",
  "4983b1f1-6011-4291-899c-9441a99593d2.png",
  "5c9c4597-7593-477a-890f-faba42616596.png",
  "7699899d-8653-469f-9999-83865e522543.png",
  "14891999-639c-407c-b91c-908793a9810a.png",
  "1964344f-9999-455a-a9c3-5c999697c958.png",
  "99242599-3999-444c-a999-49994c99999c.png",
  "29677777-7777-477a-a777-a77a7a77777a.png",
  "33333333-3333-4333-a333-a3a33333333a.png",
  "44444444-4444-444a-a444-a4a44444444a.png",
  "55555555-5555-4555-a555-a5a55555555a.png",
  "66666666-6666-4666-a666-a6a66666666a.png",
  "77777777-7777-477a-a777-a77a7a77777a.png",
  "88888888-8888-4888-a888-a8a88888888a.png",
  "99999999-9999-4999-a999-a9a99999999a.png",
  "aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa.png",
  "bbbbbbbb-bbbb-4bbb-abbb-bbbbbbbbbbbb.png",
  "cccccccc-cccc-4ccc-accc-cccccccccccc.png",
  "dddddddd-dddd-4ddd-addd-dddddddddddd.png",
  "eeeeeeee-eeee-4eee-aeee-eeeeeeeeeeee.png",
  "ffffffff-ffff-4fff-afff-ffffffffffff.png",
  "11111111-1111-4111-a111-11111111111a.png",
  "22222222-2222-4222-a222-22222222222a.png",
  "33333333-3333-4333-a333-33333333333a.png",
];

export default PhotoGrid;
