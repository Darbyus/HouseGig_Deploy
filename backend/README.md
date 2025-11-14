# HouseGig Backend

Fantasy Real Estate Platform Backend API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Fill in your Supabase credentials in `.env`

## Running

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:3000`

## API Routes

### Listings
- `GET /api/listings` - Get all listings (with filters)
- `GET /api/listings/:id` - Get listing details
- `POST /api/listings` - Create listing (auth required)
- `PUT /api/listings/:id` - Update listing (auth required)
- `DELETE /api/listings/:id` - Delete listing (auth required)

### Collections
- `POST /api/collections` - Create collection
- `GET /api/collections/user/my-collections` - Get user's collections
- `GET /api/collections/:id` - Get collection details
- `DELETE /api/collections/:id` - Delete collection
- `POST /api/collections/listing/add` - Add listing to collection
- `POST /api/collections/listing/remove` - Remove listing from collection

### Likes
- `POST /api/likes` - Like a listing
- `DELETE /api/likes` - Unlike a listing
- `GET /api/likes/:listingId/count` - Get likes count
- `GET /api/likes/:listingId/check` - Check if user liked

### Comments
- `POST /api/comments` - Create comment
- `GET /api/comments/:listingId` - Get listing comments
- `DELETE /api/comments/:id` - Delete comment

## Environment Variables

See `.env.example` for required variables.
