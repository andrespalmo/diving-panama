"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Container, SectionHeading } from "@/components/ui";

type Category = "all" | "divers" | "marine" | "landscapes" | "vibes";

const PHOTOS: Record<Exclude<Category, "all">, { src: string; alt: string }[]> = {
  divers: Array.from({ length: 28 }, (_, i) => ({
    src: `/images/gallery/divers/diver-${i + 1}.${i + 1 === 3 ? "JPG" : "jpg"}`,
    alt: `Diver ${i + 1}`,
  })),
  marine: [
    ...["fish", "fish-2", "fish-3", "fish-4", "fish-5", "fish-6", "fish-7", "fish-8", "fish-9", "fish-10",
      "fish-11", "fish-12", "fish-13", "fish-14", "fish-15", "fish-16", "fish-17", "fish-18", "fish-19",
      "fish-20", "fish-21", "fish--22"].map((f) => ({ src: `/images/gallery/marine/${f}.jpg`, alt: "Marine life" })),
    ...["shark", "shark-2", "shark-3", "shark-4", "shark-5", "shark-6", "shark-7", "shark-8"].map((f) => ({
      src: `/images/gallery/marine/${f}.jpg`, alt: "Shark",
    })),
    ...["ray", "ray-2", "ray-3"].map((f) => ({ src: `/images/gallery/marine/${f}.jpg`, alt: "Ray" })),
    ...["turtle", "turtle-2", "turtle-3", "turtle-4", "turtle-5"].map((f) => ({
      src: `/images/gallery/marine/${f}.jpg`, alt: "Sea turtle",
    })),
    ...["coral", "coral-2", "coral-3"].map((f) => ({ src: `/images/gallery/marine/${f}.jpg`, alt: "Coral" })),
    ...["starfish", "starfish-2"].map((f) => ({ src: `/images/gallery/marine/${f}.jpg`, alt: "Starfish" })),
    { src: "/images/gallery/marine/crocodile.jpg", alt: "Crocodile" },
  ],
  landscapes: [
    { src: "/images/gallery/landscapes/sea-landscape.jpg", alt: "Sea landscape" },
    ...Array.from({ length: 12 }, (_, i) => ({
      src: `/images/gallery/landscapes/sea-landscape-${i + 2}.${i + 2 === 13 ? "jpeg" : "jpg"}`,
      alt: `Sea landscape ${i + 2}`,
    })),
  ],
  vibes: [
    { src: "/images/gallery/vibes/food.jpg", alt: "Food" },
    { src: "/images/gallery/vibes/food-2.jpg", alt: "Food" },
    { src: "/images/gallery/vibes/food-3.jpg", alt: "Food" },
    { src: "/images/gallery/vibes/food-4.jpg", alt: "Food" },
    { src: "/images/gallery/vibes/panama-flag-under-sea.jpg", alt: "Panama flag" },
    { src: "/images/gallery/vibes/underwater.jpg", alt: "Underwater" },
  ],
};

const VIDEOS = [
  { src: "/videos/diving.mp4", key: "video_diving" },
  { src: "/videos/diving-for-people-with-disabilities.mp4", key: "video_adaptive" },
  { src: "/videos/morena-spotting.mp4", key: "video_morena" },
  { src: "/videos/swiming-with-turtle.mp4", key: "video_turtle" },
] as const;

const FILTER_KEYS: { key: Category; tKey: string }[] = [
  { key: "all", tKey: "filter_all" },
  { key: "divers", tKey: "filter_divers" },
  { key: "marine", tKey: "filter_marine" },
  { key: "landscapes", tKey: "filter_landscapes" },
  { key: "vibes", tKey: "filter_vibes" },
];

function getAllPhotos() {
  return [...PHOTOS.divers, ...PHOTOS.marine, ...PHOTOS.landscapes, ...PHOTOS.vibes];
}

export function GalleryClient() {
  const t = useTranslations("gallery");
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<{ photos: { src: string; alt: string }[]; index: number } | null>(null);

  const currentPhotos = activeFilter === "all" ? getAllPhotos() : PHOTOS[activeFilter];

  const openLightbox = useCallback((index: number) => {
    setLightbox({ photos: currentPhotos, index });
  }, [currentPhotos]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const navigate = useCallback((dir: 1 | -1) => {
    if (!lightbox) return;
    const newIndex = (lightbox.index + dir + lightbox.photos.length) % lightbox.photos.length;
    setLightbox({ ...lightbox, index: newIndex });
  }, [lightbox]);

  return (
    <div className="pt-28 pb-20">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTER_KEYS.map(({ key, tKey }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeFilter === key
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface text-muted border border-border hover:border-primary/20 hover:text-foreground"
              }`}
            >
              {t(tKey)}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {currentPhotos.map((photo, idx) => (
            <button
              key={`${photo.src}-${idx}`}
              onClick={() => openLightbox(idx)}
              className="block w-full rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 break-inside-avoid cursor-pointer hover:-translate-y-0.5"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </button>
          ))}
        </div>

        {/* Videos Section */}
        <div className="mt-24">
          <SectionHeading title={t("videos_title")} subtitle={t("videos_subtitle")} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VIDEOS.map(({ src, key }) => (
              <div key={key} className="rounded-2xl overflow-hidden shadow-sm border border-border bg-surface">
                <video
                  controls
                  preload="metadata"
                  className="w-full aspect-video"
                  playsInline
                >
                  <source src={src} type="video/mp4" />
                </video>
                <div className="p-4">
                  <h3 className="text-foreground font-semibold font-[family-name:var(--font-jakarta)]">
                    {t(key)}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-4xl z-10 transition-colors cursor-pointer"
            aria-label={t("close")}
          >
            &times;
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl transition-colors z-10 cursor-pointer"
            aria-label={t("previous")}
          >
            &#8249;
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl transition-colors z-10 cursor-pointer"
            aria-label={t("next")}
          >
            &#8250;
          </button>
          <div className="max-w-5xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.photos[lightbox.index].src}
              alt={lightbox.photos[lightbox.index].alt}
              width={1200}
              height={800}
              className="max-h-[90vh] w-auto object-contain rounded-xl"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
