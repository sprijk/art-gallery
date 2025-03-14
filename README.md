# Art Gallery - Nuxt.js Project

A modern online art gallery built with Nuxt.js and Tailwind CSS.

## Features

- Responsive design for all device sizes
- Browse artwork by categories and tags
- Search functionality for finding specific artworks
- Detailed view for each artwork with related items
- Clean and minimalist UI focused on showcasing the art

## Tech Stack

- **Framework:** [Nuxt.js 3](https://nuxt.com/)
- **CSS Framework:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Fonts:**
  - Playfair Display (headings)
  - Raleway (body text)

## Project Structure

```
art-gallery/
├── assets/
│   └── css/
│       └── main.css
├── components/
│   ├── ArtworkCard.vue
│   ├── ArtworkDetails.vue
│   ├── FilterSidebar.vue
│   ├── GalleryGrid.vue
│   └── RelatedArtworks.vue
├── layouts/
│   └── default.vue
├── pages/
│   ├── about.vue
│   ├── artwork/
│   │   └── [id].vue
│   ├── gallery.vue
│   └── index.vue
├── public/
│   └── images/
│       └── artworks/
│           └── ...
├── stores/
│   └── gallery.js
├── nuxt.config.ts
├── package.json
└── tailwind.config.js
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/art-gallery.git
cd art-gallery
```

2. Install dependencies:

```bash
npm install
```

3. Run development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Preview production build:

```bash
npm run preview
```

## Customization

### Adding Real Artwork Images

To use real artwork images, place your image files in the `public/images/artworks/` directory and update the image paths in the `stores/gallery.js` file. For example:

```javascript
{
  id: 1,
  title: 'Sunset over the Mountains',
  image: '/images/artworks/sunset-mountains.jpg',
  // ... other properties
}
```

### Adding More Artwork

To add more artwork to the gallery, edit the `artworks` array in the `stores/gallery.js` file, following the same data structure.

### Modifying Categories and Tags

You can modify the available categories and tags by updating the `categories` and `allTags` arrays in the `stores/gallery.js` file.

## Extending the Project

### Adding Authentication

To add user authentication for features like favoriting artworks or artist accounts, consider using:

- [Nuxt Auth Module](https://auth.nuxtjs.org/)
- Firebase Authentication
- Auth0

### Adding a Backend

To connect to a backend API for dynamic data:

1. Create an API folder with services
2. Use Nuxt's built-in fetch or useState composables
3. Update the store to fetch data from your API

### Adding E-commerce Features

To turn this into an art marketplace:

1. Add shopping cart functionality with Pinia
2. Implement checkout process
3. Integrate payment gateway (Stripe, PayPal, etc.)

## Image Management

### Adding Artwork Images

1. **Prepare Your Images**

   - Supported formats: JPG, PNG
   - Recommended size: 1200x800px or larger
   - Maximum file size: 5MB

2. **Upload via Web Interface**

   - Navigate to the admin section `/admin/artworks`
   - Click "Add New Artwork"
   - Fill in the artwork details
   - Click "Upload Image" and select your file
   - Click "Save" to store the artwork with image

3. **Manual File Addition**
   If you need to add images manually:

   a. Place image files in:

   ```bash
   public/images/artworks/
   ```

   b. Update the database record:

   ```sql
   UPDATE artworks
   SET image_path = '/images/artworks/your-image.jpg'
   WHERE id = artwork_id;
   ```

### Image Processing

The system automatically:

- Creates a web-optimized version
- Stores original in data/ingress for backup
- Generates appropriate thumbnails
- Updates database with correct paths

### Troubleshooting

If images don't appear:

1. Check file permissions on image directories
2. Verify image paths in database
3. Clear browser cache
4. Check server logs for upload errors

## License

This project is licensed under the MIT License - see the LICENSE file for details.
