import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  video?: string;
  productName: string;
}

export function ProductGallery({ images, video, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const allMedia = video ? [...images, video] : images;
  const selectedMedia = allMedia[selectedIndex];
  const isVideo = selectedIndex === images.length && video;

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1));
    setShowVideo(false);
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1));
    setShowVideo(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-muted">
        {isVideo && showVideo ? (
          <iframe
            src={video}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={isVideo ? images[0] : selectedMedia as string}
              alt={`${productName} - Image ${selectedIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {isVideo && !showVideo && (
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-primary ml-1" fill="currentColor" />
                </div>
              </button>
            )}
          </>
        )}

        {allMedia.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </>
        )}

        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 text-white text-sm font-medium">
          {selectedIndex + 1} / {allMedia.length}
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedIndex(index);
              setShowVideo(false);
            }}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              selectedIndex === index && !showVideo
                ? "border-primary scale-105"
                : "border-transparent hover:border-muted-foreground/30"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
        {video && (
          <button
            onClick={() => setSelectedIndex(images.length)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all relative ${
              selectedIndex === images.length
                ? "border-primary scale-105"
                : "border-transparent hover:border-muted-foreground/30"
            }`}
          >
            <img
              src={images[0]}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Play className="w-6 h-6 text-white" fill="currentColor" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
