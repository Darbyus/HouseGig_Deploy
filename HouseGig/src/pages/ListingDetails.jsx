import './Explore.css';
import { useParams } from 'react-router-dom';
import listings from '../dummyListings';

function ListingDetails() {
  const { id } = useParams();
  const listing = listings.find(l => String(l.id) === String(id));

  if (!listing) {
    return (
      <main className="explore-main">
        <h2 className="explore-title">Listing Not Found</h2>
        <p>Sorry, this listing does not exist.</p>
      </main>
    );
  }

  return (
    <main className="explore-main">
      <h2 className="explore-title">{listing.title}</h2>
      <img src={listing.main_image_url} alt={listing.title} style={{ width: '100%', maxWidth: 600, borderRadius: 16, marginBottom: 24 }} />
      <div style={{ fontSize: '1.2rem', marginBottom: 12 }}><b>World:</b> {listing.world}</div>
      <div style={{ fontSize: '1.2rem', marginBottom: 12 }}><b>Price:</b> {listing.price}</div>
      <div style={{ fontSize: '1.2rem', marginBottom: 12 }}><b>Owner:</b> {listing.owner.username}</div>
      <div style={{ fontSize: '1.2rem', marginBottom: 12 }}><b>Description:</b> {listing.description || 'No description.'}</div>
    </main>
  );
}

export default ListingDetails;
