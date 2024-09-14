"use client";
import ArrowRight from "@/assets/arrow-right.svg";
import starImage from "@/assets/star.png";
import springImage from "@/assets/spring.png";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -200]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-45, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-180, 0]);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip"
    >
      <div className="container relative">
        <div className="section-heading relative pointer-events-none">
          <h2 className="section-title">Sign up for free today</h2>
          <p className="section-description mt-5">
            Start your journey with us and celebrate the joy of acomplishment
            with an app designed to motivate your efforts and actually sell
            things
          </p>
          <motion.img
            src={starImage.src}
            alt="Star Image"
            width={500}
            height={500}
            className="hidden md:block absolute md:-top-[180px] md:-left-[500px]"
            style={{ translateY, rotate, rotateY, transformStyle: "preserve-3d" }}
          />
          <motion.img
            src={springImage.src}
            alt="Spring Image"
            width={360}
            className="hidden md:block absolute md:-right-[331px] md:-bottom-[150px]"
            style={{ translateY }}
          />
        </div>
        <div className="flex gap-1 mt-10 justify-center">
          <button className="btn btn-primary">Get for free</button>
          <button className="btn btn-text gap-1">
            <span>Learn More</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
