# 🖼️ Product Gallery Implementation Guide

## Overview

This guide explains how to add multiple images and videos to each product.

---

## Changes Required

### 1. Update Product Interface

**File: `src/data/products.ts`**

```typescript
export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string; // Keep for backward compatibility (main image)
  images: string[]; // NEW: Array of 3+ images
  video?: string; // NEW: Video URL (YouTube, Vimeo, or direct link)
  ageRange: [number, number];
  category: string;
  inStock: boolean;
  rating: number;
  badge?: string;
}
```

### 2. Update Product Data

Add images and video to each product:

```typescript
{
  id: "1",
  name: "Wooden Building Blocks Set",
  description: "50-piece colorful wooden blocks...",
  price: 450,
  originalPrice: 550,
  image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800",
  images: [
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800",
    "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800",
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800"
  ],
  video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // YouTube embed URL
  ageRange: [2, 5],
  category: "Building",
  inStock: true,
  rating: 4.8,
  badge: "Best Seller",
}
```

### 3. Create Image Gallery Component

**File: `src/components/ProductGallery.tsx`** (NEW)

```typescript
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
      {/* Main Image/Video Display */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
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

        {/* Navigation Arrows */}
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

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 text-white text-sm font-medium">
          {selectedIndex + 1} / {allMedia.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
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
```

### 4. Update ProductDetail Page

**File: `src/pages/ProductDetail.tsx`**

Replace the single image with the gallery:

```typescript
import { ProductGallery } from "@/components/ProductGallery";

// In the component, replace:
<img src={product.image} ... />

// With:
<ProductGallery 
  images={product.images} 
  video={product.video}
  productName={product.name}
/>
```

### 5. Sample Product Data with Gallery

Here's an example of how to update your products:

```typescript
export const products: Product[] = [
  {
    id: "1",
    name: "Wooden Building Blocks Set",
    description: "50-piece colorful wooden blocks for creative building and learning shapes.",
    price: 450,
    originalPrice: 550,
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800",
    images: [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800",
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800"
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    ageRange: [2, 5],
    category: "Building",
    inStock: true,
    rating: 4.8,
    badge: "Best Seller",
  },
  // ... more products
];
```

---

## Features of the Gallery

1. **Main Display**: Large image/video viewer
2. **Navigation**: Left/right arrows to browse
3. **Thumbnails**: Small preview images at bottom
4. **Video Support**: YouTube/Vimeo embeds with play button
5. **Counter**: Shows current image number (e.g., "2 / 5")
6. **Mobile Responsive**: Works great on all screen sizes
7. **Keyboard Navigation**: Arrow keys to navigate (optional enhancement)

---

## Video URL Formats

### YouTube
```
https://www.youtube.com/embed/VIDEO_ID
```

### Vimeo
```
https://player.vimeo.com/video/VIDEO_ID
```

### Direct Video File
```
https://example.com/videos/product-demo.mp4
```

---

## Implementation Steps

1. ✅ Update Product interface in `src/data/products.ts`
2. ✅ Add `images` and `video` fields to all products
3. ✅ Create `ProductGallery.tsx` component
4. ✅ Update `ProductDetail.tsx` to use gallery
5. ✅ Test on desktop and mobile
6. ✅ Add real product images and videos

---

## Where to Get Product Images

### Free Stock Photos
- [Unsplash](https://unsplash.com) - Search "toys", "kids toys", "building blocks"
- [Pexels](https://pexels.com) - Free toy images
- [Pixabay](https://pixabay.com) - Royalty-free images

### Product Videos
- Create simple product demos with your phone
- Use YouTube for hosting (free)
- Keep videos under 2 minutes
- Show product from different angles
- Demonstrate key features

---

## Benefits

✅ Better product presentation  
✅ Increased customer confidence  
✅ Higher conversion rates  
✅ Professional appearance  
✅ Reduced returns (customers know what they're buying)  
✅ SEO benefits (more images = better ranking)  

---

## Need Help?

This is a significant update. Would you like me to:
1. Implement the ProductGallery component?
2. Update a few sample products with multiple images?
3. Update the ProductDetail page?

Let me know and I'll help you implement this step by step!
