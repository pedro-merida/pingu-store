"use client";

import Image from "next/image";
import Link from "next/link";

import { ReactNode } from "react";

interface SocialItem {
  icon: ReactNode;
  color: string;
  link: string;
}

interface AboutSectionProps {
  imagePosition?: "left" | "right";
  title: string;
  highlightName?: string;
  description: ReactNode;
  imageSrc: string;
  socials?: SocialItem[];
  buttonVariant?: "icons" | "cta"; // 👈 nuevo
}

const AboutSection = ({
  imagePosition = "right",
  title,
  highlightName,
  description,
  imageSrc,
  socials = [],
  buttonVariant = "icons",
}: AboutSectionProps) => {
  return (
    <section className="w-full px-6 md:px-20 pt-14 bg-[#0B0F1A]">
      <div className="mx-auto">
        <div
          className={`flex flex-col ${
            imagePosition === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
          } items-center gap-10 bg-[#111827] rounded-2xl p-8 md:p-12 border border-gray-700 shadow-xl`}
        >
          {/* Imagen */}
          <div className="w-full lg:w-1/3">
            <div className="relative w-full h-62.5 md:h-87.5 rounded-xl overflow-hidden">
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
                quality={100}
              />
            </div>
          </div>

          {/* Texto */}
          <div className="w-full lg:w-2/3 text-white text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {highlightName ? (
                <>
                  {title}{" "}
                  <span className="font-bold text-lime-400 drop-shadow-[0_0_6px_rgba(163,230,53,0.6)]">
                    {highlightName}
                  </span>
                </>
              ) : (
                title
              )}
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed">
              {description}
            </p>

            {socials.length > 0 && (
              <div className="mt-8">
                {buttonVariant === "icons" && (
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    {socials.map((social, i) => (
                      <a
                        key={i}
                        href={social.link}
                        target="_blank"
                        className={`w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 ${social.color} transition hover:scale-110`}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                )}

                {buttonVariant === "cta" && socials[0] && (
                  <Link
                    href={socials[0].link}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-[#7f7b17] hover:bg-[#6d6d15] text-white font-semibold rounded-lg shadow-lg transition hover:scale-105"
                  >
                    Pedir una Skin
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;