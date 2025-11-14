import './Explore.css';
import listings from '../dummyListings';
import ListingCard from '../components/ListingCard';
import { Link } from 'react-router-dom';

function Explore() {
  return (
    <main className="explore-main">
      <h2 className="explore-title">Explore Listings</h2>
      <div className="listing-grid">
        {listings.map(listing => (
          <Link key={listing.id} to={`/listing/${listing.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListingCard listing={listing} />
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Explore;
