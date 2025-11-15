# DATABASE vs FRONTEND/BACKEND SCHEMA COMPARISON

## CURRENT STATE

### Database Tables (Supabase):
✅ **auth.users** (Supabase Auth system)
   - Built-in Supabase authentication table
   - 3 users currently in database
   - user_metadata can store: username, avatar_url, bio

✅ **public.users** (Custom table)
   - Status: EXISTS but SCHEMA CACHE ERROR (PGRST205)
   - Cannot be accessed via REST API
   - Backend NOW uses auth.users instead

✅ **listings**
   - Status: EXISTS and accessible
   - ERROR: Missing columns that code expects

✅ **collections**
   - Status: EXISTS and accessible

✅ **collection_listings**  
   - Status: EXISTS and accessible

✅ **likes**
   - Status: EXISTS and accessible

✅ **comments**
   - Status: EXISTS and accessible

---

## SCHEMA MISMATCHES

### LISTINGS TABLE ISSUES:

**Frontend/Backend expects these columns:**
- title ✅
- description ✅
- price ❌ MISSING (error: "column listings.price does not exist")
- world ✅
- region ✅
- property_type ✅
- size ✅
- rarity ✅
- magic_level ✅
- main_image_url ✅
- gallery_image_urls ❌ MISSING (error: "Could not find gallery_image_urls")
- tags ✅
- owner_id ✅
- created_at ✅
- updated_at ✅

**What the database likely has:**
- The listings table exists but was created with a different schema
- Missing: price, gallery_image_urls columns

---

## WHAT NEEDS TO BE FIXED

1. **Add missing columns to listings table:**
   ```sql
   ALTER TABLE listings ADD COLUMN IF NOT EXISTS price VARCHAR(100);
   ALTER TABLE listings ADD COLUMN IF NOT EXISTS gallery_image_urls TEXT[] DEFAULT '{}';
   ```

2. **Fix public.users schema cache:**
   - Option A: Drop public.users table (we're using auth.users now)
   - Option B: Reload schema cache in Supabase dashboard

---

## FRONTEND TABLE USAGE

### Upload.jsx uses:
- listings (create new)
  - title, description, price, world, region, property_type, size, rarity, magic_level
  - main_image_url, gallery_image_urls, tags

### Explore.jsx uses:
- listings (fetch all with filters)
  - id, title, world, region, property_type, price, main_image_url, rarity, magic_level
  - owner_id, created_at

### ListingDetails.jsx uses:
- listings (fetch single)
- comments (fetch and create)
- likes (check, create, delete)

### Profile.jsx uses:
- listings (fetch user's listings)
- likes (fetch user's liked listings)

### Collections.jsx uses:
- collections (fetch, create)
- collection_listings (manage listings in collections)

---

## BACKEND SERVICES USING TABLES

### authService.js
- auth.users (via supabase.auth.admin)

### userService.js
- auth.users (via supabase.auth.admin)

### listingService.js
- listings table
- auth.users for owner info

### commentService.js
- comments table
- auth.users for user info

### likeService.js
- likes table

### collectionService.js
- collections table
- collection_listings table
