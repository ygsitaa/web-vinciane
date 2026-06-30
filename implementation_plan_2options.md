# Book Cover Image Migration Plans

We have two distinct approaches for shifting to image-based book covers. **Option A** maintains the current 3D WebGL environment but applies image textures to the book geometry. **Option B** completely replaces the 3D WebGL environment with a CSS-based DOM structure. 

Please review both plans below and let me know which one you would like to implement first!

---

## Option A: TresJS / WebGL Texture Mapping (Recommended)

This approach keeps your beautiful 3D lighting, shadows, and environment reflections intact, while replacing the solid colors on the covers with easily swappable images. 

### Proposed Changes

1. **`app/config/books.config.ts`**
   - Replace `coverColor` and `spineColor` properties with `frontCoverImage` and `backCoverImage` (paths to image files).
   
2. **`app/components/BookModel.vue`**
   - Import Three.js `TextureLoader` or use `@tresjs/cientos`'s `useTexture` to load images.
   - Update the `TresMeshStandardMaterial` for the front cover and back cover to use the `:map` property, mapping the respective images onto the 3D plane.
   - Make the texture loading dynamic so that when `booksStore.activeBookId` changes, the textures swap smoothly.

### Pros & Cons
- **Pros:** Keeps the premium 3D look (lighting, ground reflections, shadows). Very performant for 3D interactions.
- **Cons:** Requires images to be loaded as WebGL textures, which can be slightly harder to position/crop using traditional CSS methods (you'd have to pre-crop images or adjust UV coordinates).

---

## Option B: HTML/CSS DOM Shift

This approach completely removes the Three.js 3D canvas and relies on CSS 3D transforms (`transform-style: preserve-3d`) and standard HTML DOM elements (`<div>`, `<img>`) to build the book and animate it.

### Proposed Changes

1. **`app/config/books.config.ts`**
   - Similar to Option A, replace `coverColor` and `spineColor` properties with `frontCoverImage` and `backCoverImage`.

2. **`app/components/BookExperience.vue`**
   - Remove `<TresCanvas>`, all lights, cameras, and controls.
   - Replace with a CSS 3D container (`<div class="perspective-1000 ...">`) to house the new DOM book.

3. **`app/components/BookModel.vue`**
   - Remove all `<Tres...>` mesh components.
   - Build a CSS 3D book using `div`s for the spine, front cover, back cover, and pages block.
   - Use standard `<img>` tags or `background-image` (with `clip-path` if desired) for the front and back covers.
   - Rewrite the existing GSAP animations to target the DOM elements instead of Three.js objects.

### Pros & Cons
- **Pros:** Extremely easy to edit cover images using standard CSS (e.g., `object-fit: cover`, `clip-path`, `border-radius`). Lightweight as it removes WebGL dependencies.
- **Cons:** Loses the realistic 3D lighting, complex shading, and ground reflections. The 3D effect might look "flatter" compared to a true 3D WebGL engine.

---

## User Review Required

> [!IMPORTANT]
> **Which option would you like to proceed with?** 
> 
> * If you choose **Option A**, we keep the 3D canvas and just map images onto the covers.
> * If you choose **Option B**, we rewrite the book into a CSS/HTML 3D component.
> 
> Also, do you have any specific image files ready in your `public` folder to test with, or should I generate some placeholder images for the 3 books?
