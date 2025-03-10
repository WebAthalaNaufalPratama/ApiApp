import React, { useMemo } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import getScrollAnimation from "./utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";

const features: string[] = [
  "Pembuatan API Otomatis.",
  "Desain User-Friendly.",
  "Integrasi Lancar",
  "Keamanan Terjamin.",
  "Custom Endpoint.",
  "Monitoring Real-Time.",
  "Dukungan untuk Protokol Populer.",
  "Dokumentasi API Otomatis.",
  "Manajemen Token API.",
  "Skalabilitas Tinggi."
];

const Feature: React.FC = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="feature"
    >
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 py-8 my-12">
        <ScrollAnimationWrapper className="flex w-full justify-end">
          <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
          <img
            src="/assets/Illustration2.png"
            alt="VPN Illustrasi"
            className="h-full w-full p-4"
            />
          </motion.div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <motion.div className="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12" variants={scrollAnimation}>
            <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
              Fitur Unggulan Aplikasi API OmahIOT
            </h3>
            <p className="my-2 text-black-500">
              Temukan berbagai fitur inovatif yang membantu memudahkan pengembangan dan integrasi API 
              untuk aplikasi IoT Anda. Dengan kemudahan penggunaan, keamanan tinggi, serta skalabilitas, 
              OmahIOT memberikan solusi lengkap dalam satu platform.
            </p>
            <ul className="text-black-500 self-start list-inside ml-8">
              {features.map((feature, index) => (
                <motion.li
                  className="relative circle-check custom-list"
                  custom={{ duration: 2 + index }}
                  variants={scrollAnimation}
                  key={feature}
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      duration: 0.2
                    }
                  }}
                >
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
};

export default Feature;
