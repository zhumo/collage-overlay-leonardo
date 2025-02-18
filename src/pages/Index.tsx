
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const PhotoGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const images = containerRef.current.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('load', () => {
        console.log(`Image loaded successfully: ${img.src}`);
        img.classList.add('loaded');
      });
      img.addEventListener('error', () => {
        console.error(`Failed to load image: ${img.src}`);
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mx-auto max-w-[1400px]"
      >
        {/* Title Overlay */}
        <div className="sticky top-0 z-50 py-6 bg-neutral-50/80 backdrop-blur-sm mb-8">
          <h1 className="text-4xl md:text-6xl font-light text-neutral-800 text-center">
            Leonardo Chen
          </h1>
        </div>

        {/* Photo Grid */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max"
        >
          {[...Array(29)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square group overflow-hidden bg-neutral-100 rounded-lg"
            >
              <img
                src={`/lovable-uploads/${imageUrls[index]}`}
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onLoad={() => console.log(`Image ${index + 1} loaded`)}
                onError={() => console.error(`Image ${index + 1} failed to load`)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
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
