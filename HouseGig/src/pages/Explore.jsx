
import './Explore.css';
import ListingCard from '../components/ListingCard';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';

function Explore() {
  const [listings, setListings] = useState([])

  const fetchListingsAsync = useCallback(async () => {
    const fetchedListings = await api.getListings()
    setListings(fetchedListings);
  }, [])

  useEffect(() => { 
    fetchListingsAsync();
  }, [fetchListingsAsync]);
  
  // Determine grid columns based on number of listings
  const getGridClass = () => {
    if (listings.length === 0) return 'listing-grid-empty';
    if (listings.length === 1) return 'listing-grid-single';
    if (listings.length === 2) return 'listing-grid-double';
    return 'listing-grid-responsive';
  };

  return (
    <main className="explore-main">
      <h2 className="explore-title">Explore Listings</h2>
      <div className={getGridClass()}>
        {listings.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>No listings available yet. Be the first to create one!</p>
        ) : (
          listings.map(listing => (
            <Link key={listing.id} to={`/listing/${listing.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListingCard listing={listing} />
            </Link>
          ))
        )}
      </div>
      <Footer />
    </main>
  );
}

export default Explore;
