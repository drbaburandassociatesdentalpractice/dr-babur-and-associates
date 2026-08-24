"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  ratio: "square" | "portrait" | "landscape";
};

const cosmeticImages: GalleryImage[] = [
  {
    id: 1,
    src: "/assets/work/cosmetic-dentistry/cosmetic1.png",
    alt: "Cosmetic dentistry treatment",
    ratio: "square",
  },
  {
    id: 2,
    src: "/assets/work/cosmetic-dentistry/cosmetic2.png",
    alt: "Cosmetic dentistry result",
    ratio: "square",
  },
  {
    id: 3,
    src: "/assets/work/cosmetic-dentistry/cosmetic3.png",
    alt: "Cosmetic dental treatment",
    ratio: "square",
  },
  {
    id: 4,
    src: "/assets/work/cosmetic-dentistry/cosmetic4.png",
    alt: "Cosmetic dentistry",
    ratio: "square",
  },
];

const orthodonticImages: GalleryImage[] = [
  {
    id: 1,
    src: "/assets/work/ortho-dentistry/ortho1.png",
    alt: "Orthodontic treatment",
    ratio: "square",
  },
  {
    id: 2,
    src: "/assets/work/ortho-dentistry/ortho2.png",
    alt: "Orthodontic treatment result",
    ratio: "square",
  },
  {
    id: 3,
    src: "/assets/work/ortho-dentistry/ortho3.png",
    alt: "Orthodontic care",
    ratio: "square",
  },
  {
    id: 4,
    src: "/assets/work/ortho-dentistry/ortho4.png",
    alt: "Orthodontic treatment",
    ratio: "square",
  },
  {
    id: 5,
    src: "/assets/work/ortho-dentistry/ortho5.png",
    alt: "Orthodontic result",
    ratio: "square",
  },
  {
    id: 6,
    src: "/assets/work/ortho-dentistry/ortho6.png",
    alt: "Orthodontic treatment",
    ratio: "square",
  },
  {
    id: 7,
    src: "/assets/work/ortho-dentistry/ortho7.png",
    alt: "Orthodontic treatment",
    ratio: "square",
  },
  {
    id: 8,
    src: "/assets/work/ortho-dentistry/ortho8.png",
    alt: "Orthodontic treatment",
    ratio: "square",
  },
  {
    id: 9,
    src: "/assets/work/ortho-dentistry/ortho9.png",
    alt: "Orthodontic treatment",
    ratio: "square",
  },
  {
    id: 10,
    src: "/assets/work/ortho-dentistry/ortho10.png",
    alt: "Orthodontic treatment",
    ratio: "square",
  },
  {
    id: 11,
    src: "/assets/work/ortho-dentistry/ortho11.png",
    alt: "Orthodontic treatment",
    ratio: "square",
  },
  {
    id: 12,
    src: "/assets/work/ortho-dentistry/ortho12.png",
    alt: "Orthodontic treatment",
    ratio: "square",
  },
  {
    id: 13,
    src: "/assets/work/ortho-dentistry/ortho13.png",
    alt: "Orthodontic treatment",
    ratio: "square",
  },
  {
    id: 14,
    src: "/assets/work/ortho-dentistry/ortho14.png",
    alt: "Orthodontic treatment",
    ratio: "square",
  },
];

const galleryData = {
  cosmetic: cosmeticImages,
  orthodontist: orthodonticImages,
};

const ratioClasses = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[16/9]",
};

export const GallerySection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] =
    useState<keyof typeof galleryData>("cosmetic");

  const [activeIndex, setActiveIndex] = useState(0);

  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [zoom, setZoom] = useState(1);

  const images = galleryData[activeTab];

  /*
   * ----------------------------------------------------------
   * SCROLL CAROUSEL
   * ----------------------------------------------------------
   */

  const scrollCarousel = (direction: "next" | "previous") => {
    const container = carouselRef.current;

    if (!container) return;

    const amount = container.clientWidth * 0.72;

    container.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  /*
   * ----------------------------------------------------------
   * FIND ACTIVE IMAGE
   * ----------------------------------------------------------
   */

  useEffect(() => {
    const container = carouselRef.current;

    if (!container) return;

    const handleScroll = () => {
      const cards = Array.from(
        container.children
      ) as HTMLElement[];

      if (!cards.length) return;

      const containerLeft = container.getBoundingClientRect().left;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const distance = Math.abs(
          card.getBoundingClientRect().left - containerLeft
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [activeTab]);

  /*
   * ----------------------------------------------------------
   * CHANGE TAB
   * ----------------------------------------------------------
   */

  const changeTab = (
    tab: keyof typeof galleryData
  ) => {
    setActiveTab(tab);
    setActiveIndex(0);

    requestAnimationFrame(() => {
      carouselRef.current?.scrollTo({
        left: 0,
        behavior: "instant",
      });
    });
  };

  /*
   * ----------------------------------------------------------
   * OPEN LIGHTBOX
   * ----------------------------------------------------------
   */

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    setZoom(1);

    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setZoom(1);

    document.body.style.overflow = "";
  };

  /*
   * ----------------------------------------------------------
   * LIGHTBOX NAVIGATION
   * ----------------------------------------------------------
   */

  const lightboxNext = () => {
    const nextIndex =
      selectedIndex >= images.length - 1
        ? 0
        : selectedIndex + 1;

    setSelectedIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
    setZoom(1);
  };

  const lightboxPrevious = () => {
    const previousIndex =
      selectedIndex <= 0
        ? images.length - 1
        : selectedIndex - 1;

    setSelectedIndex(previousIndex);
    setSelectedImage(images[previousIndex]);
    setZoom(1);
  };

  /*
   * ----------------------------------------------------------
   * KEYBOARD CONTROLS
   * ----------------------------------------------------------
   */

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        lightboxNext();
      }

      if (event.key === "ArrowLeft") {
        lightboxPrevious();
      }

      if (event.key === "+") {
        setZoom((current) =>
          Math.min(current + 0.25, 3)
        );
      }

      if (event.key === "-") {
        setZoom((current) =>
          Math.max(current - 0.25, 1)
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, selectedIndex]);

  /*
   * ----------------------------------------------------------
   * CLEANUP
   * ----------------------------------------------------------
   */

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <section
        id="gallery"
        aria-labelledby="gallery-heading"
        className="
          relative
          overflow-hidden
          border-t
          border-black/[0.06]
          bg-white
          py-20
          sm:py-24
          lg:py-28
        "
      >
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

          {/* =====================================================
              HEADER
          ===================================================== */}

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-[#6E9CCE]"
                />

                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/40">
                  Our Work
                </span>
              </div>

              <h2
                id="gallery-heading"
                className="
                  max-w-4xl
                  text-[13vw]
                  font-light
                  leading-[0.82]
                  tracking-[-0.065em]
                  text-black
                  sm:text-7xl
                  md:text-8xl
                  lg:text-[7rem]
                  xl:text-[8rem]
                "
              >
                Dentistry,
                <br />
                <span className="text-[#6E9CCE]">
                  beautifully done.
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1,
                duration: 0.7,
              }}
              className="max-w-sm lg:pb-2"
            >
              <p className="text-sm leading-7 text-black/45 sm:text-base">
                Explore selected work from our cosmetic and
                orthodontic treatments, where precision,
                aesthetics and patient care come together.
              </p>
            </motion.div>
          </div>

          {/* =====================================================
              TABS
          ===================================================== */}

          <div className="mt-12 flex flex-col gap-5 border-b border-black/10 pb-5 sm:flex-row sm:items-center sm:justify-between">

            <div
              role="tablist"
              aria-label="Gallery categories"
              className="flex w-fit items-center gap-1 rounded-full bg-black/[0.035] p-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "cosmetic"}
                onClick={() => changeTab("cosmetic")}
                className={`
                  rounded-full
                  px-5
                  py-2.5
                  text-xs
                  font-medium
                  transition-all
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#6E9CCE]
                  ${
                    activeTab === "cosmetic"
                      ? "bg-black text-white"
                      : "text-black/45 hover:text-black"
                  }
                `}
              >
                Cosmetic
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={
                  activeTab === "orthodontist"
                }
                onClick={() =>
                  changeTab("orthodontist")
                }
                className={`
                  rounded-full
                  px-5
                  py-2.5
                  text-xs
                  font-medium
                  transition-all
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#6E9CCE]
                  ${
                    activeTab === "orthodontist"
                      ? "bg-black text-white"
                      : "text-black/45 hover:text-black"
                  }
                `}
              >
                Orthodontist
              </button>
            </div>

            <Link
              href="/gallery"
              className="
                group
                inline-flex
                w-fit
                items-center
                gap-2
                text-xs
                font-medium
                text-black
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#6E9CCE]
              "
            >
              See all work

              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/10
                  transition-all
                  group-hover:border-[#6E9CCE]
                  group-hover:bg-[#6E9CCE]
                  group-hover:text-white
                "
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>

          {/* =====================================================
              CAROUSEL
          ===================================================== */}

          <div className="relative mt-8">

            <div
              ref={carouselRef}
              className="
                flex
                gap-4
                overflow-x-auto
                overscroll-x-contain
                pb-5
                scrollbar-none
                snap-x
                snap-mandatory
                sm:gap-5
              "
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {images.map((image, index) => (
                <motion.article
                  key={`${activeTab}-${image.id}`}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.04,
                  }}
                  className={`
                    group
                    relative
                    shrink-0
                    snap-start
                    cursor-zoom-in
                    overflow-hidden
                    rounded-[22px]
                    bg-[#eef0f2]
                    ${
                      image.ratio === "portrait"
                        ? "w-[68vw] sm:w-[300px] lg:w-[320px]"
                        : image.ratio === "landscape"
                          ? "w-[82vw] sm:w-[430px] lg:w-[500px]"
                          : "w-[68vw] sm:w-[300px] lg:w-[320px]"
                    }
                  `}
                  onClick={() =>
                    openLightbox(image, index)
                  }
                >
                  <div
                    className={`
                      relative
                      w-full
                      overflow-hidden
                      ${ratioClasses[image.ratio]}
                    `}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="
                        (max-width: 640px) 80vw,
                        (max-width: 1024px) 40vw,
                        500px
                      "
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.05]
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/60
                        via-transparent
                        to-transparent
                        opacity-50
                        transition-opacity
                        group-hover:opacity-80
                      "
                    />

                    {/* Category */}

                    <div className="absolute left-4 top-4">
                      <span className="
                        rounded-full
                        bg-black/20
                        px-3
                        py-1.5
                        text-[9px]
                        uppercase
                        tracking-[0.18em]
                        text-white
                        backdrop-blur-md
                      ">
                        {activeTab === "cosmetic"
                          ? "Cosmetic"
                          : "Orthodontics"}
                      </span>
                    </div>

                    {/* Zoom icon */}

                    <div className="
                      absolute
                      right-4
                      top-4
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/25
                      bg-black/20
                      text-white
                      opacity-0
                      backdrop-blur-md
                      transition-all
                      duration-300
                      group-hover:opacity-100
                    ">
                      <Maximize2 className="h-4 w-4" />
                    </div>

                    {/* Number */}

                    <div className="absolute bottom-4 left-4">
                      <span className="
                        text-[9px]
                        font-medium
                        tracking-[0.2em]
                        text-white/70
                      ">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* ===================================================
                CONTROLS
            =================================================== */}

            <div className="mt-2 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <span className="
                  text-[10px]
                  font-medium
                  tracking-[0.15em]
                  text-black/40
                ">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>

                <div
                  className="
                    h-px
                    w-20
                    overflow-hidden
                    bg-black/10
                    sm:w-32
                  "
                >
                  <motion.div
                    className="h-full bg-[#6E9CCE]"
                    animate={{
                      width: `${
                        ((activeIndex + 1) /
                          images.length) *
                        100
                      }%`,
                    }}
                  />
                </div>

                <span className="
                  text-[10px]
                  tracking-[0.15em]
                  text-black/25
                ">
                  {String(images.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  onClick={() =>
                    scrollCarousel("previous")
                  }
                  aria-label="Previous gallery images"
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-black/10
                    bg-white
                    text-black
                    transition-all
                    hover:border-black
                    hover:bg-black
                    hover:text-white
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#6E9CCE]
                  "
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    scrollCarousel("next")
                  }
                  aria-label="Next gallery images"
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    text-white
                    transition-all
                    hover:bg-[#6E9CCE]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#6E9CCE]
                  "
                >
                  <ArrowRight className="h-4 w-4" />
                </button>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          LIGHTBOX
      ========================================================= */}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/95
              p-4
              sm:p-8
            "
            onClick={closeLightbox}
          >
            {/* Close */}

            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close image viewer"
              className="
                absolute
                right-4
                top-4
                z-20
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-white/10
                text-white
                backdrop-blur-md
                transition
                hover:bg-white
                hover:text-black
                sm:right-8
                sm:top-8
              "
            >
              <X className="h-5 w-5" />
            </button>

            {/* Image counter */}

            <div className="
              absolute
              left-5
              top-5
              text-[10px]
              tracking-[0.2em]
              text-white/50
              sm:left-8
              sm:top-8
            ">
              {String(selectedIndex + 1).padStart(2, "0")}
              {" / "}
              {String(images.length).padStart(2, "0")}
            </div>

            {/* Previous */}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                lightboxPrevious();
              }}
              aria-label="Previous image"
              className="
                absolute
                left-3
                top-1/2
                z-20
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-white/10
                text-white
                backdrop-blur-md
                transition
                hover:bg-white
                hover:text-black
                sm:left-8
              "
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            {/* Next */}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                lightboxNext();
              }}
              aria-label="Next image"
              className="
                absolute
                right-3
                top-1/2
                z-20
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-white/10
                text-white
                backdrop-blur-md
                transition
                hover:bg-white
                hover:text-black
                sm:right-8
              "
            >
              <ArrowRight className="h-5 w-5" />
            </button>

            {/* Image */}

            <motion.div
              className="
                relative
                flex
                h-[80vh]
                w-[85vw]
                max-w-6xl
                items-center
                justify-center
                overflow-hidden
              "
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{
                  scale: zoom,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  relative
                  h-full
                  w-full
                  cursor-zoom-in
                "
                onDoubleClick={() => {
                  setZoom((current) =>
                    current === 1 ? 2 : 1
                  );
                }}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  priority
                  sizes="90vw"
                  className="object-contain"
                />
              </motion.div>
            </motion.div>

            {/* Zoom Controls */}

            <div
              className="
                absolute
                bottom-5
                left-1/2
                flex
                -translate-x-1/2
                items-center
                gap-1
                rounded-full
                border
                border-white/15
                bg-white/10
                p-1
                backdrop-blur-xl
              "
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Zoom out"
                onClick={() =>
                  setZoom((current) =>
                    Math.max(current - 0.25, 1)
                  )
                }
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  text-white
                  transition
                  hover:bg-white
                  hover:text-black
                "
              >
                <ZoomOut className="h-4 w-4" />
              </button>

              <span className="
                min-w-[55px]
                text-center
                text-[10px]
                font-medium
                tracking-wider
                text-white/70
              ">
                {Math.round(zoom * 100)}%
              </span>

              <button
                type="button"
                aria-label="Zoom in"
                onClick={() =>
                  setZoom((current) =>
                    Math.min(current + 0.25, 3)
                  )
                }
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  text-white
                  transition
                  hover:bg-white
                  hover:text-black
                "
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};