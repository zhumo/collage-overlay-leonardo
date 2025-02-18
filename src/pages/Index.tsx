
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PhotoGrid = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

  const imageUrls = [
    "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg",
    "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg",
    "11.png", "12.jpg", "13.jpg", "14.jpg", "15.JPG",
    "16.JPG", "17.JPG", "18.JPG", "19.JPG", "20.JPG",
    "21.JPG", "22.JPG", "23.JPG", "24.JPG", "25.JPG",
    "26.JPG", "27.jpeg", "28.jpeg", "29.jpeg", "30.JPG",
    "31.jpeg", "32.JPG", "33.jpeg", "34.jpeg"
  ];

  // Function to shuffle array
  const shuffleArray = (array: number[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    // Initialize shuffled indices
    setShuffledIndices(shuffleArray([...Array(imageUrls.length)].map((_, i) => i)));

    // Set up the interval for reshuffling
    const intervalId = setInterval(() => {
      setShuffledIndices(prevIndices => shuffleArray([...prevIndices]));
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

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

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Title Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <h1 className="text-4xl md:text-6xl font-light text-white text-center mix-blend-difference drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Leonardo Chen
        </h1>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-6 h-screen w-screen">
        {shuffledIndices.map((originalIndex, currentIndex) => (
          <motion.div 
            key={originalIndex}
            className="relative aspect-square w-full h-full"
            layout
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 30
            }}
          >
            <img
              src={`/img/${imageUrls[originalIndex]}`}
              alt={`Memory ${originalIndex + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
              onLoad={(e) => {
                console.log(`Image ${imageUrls[originalIndex]} loaded`);
                e.currentTarget.classList.add('loaded');
              }}
              onError={() => console.error(`Image ${imageUrls[originalIndex]} failed to load`)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGrid;
