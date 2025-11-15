import './Explore.css';
import Footer from '../Footer';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Loader, Title, Text, Button } from '@mantine/core';

function Collection() {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await api.getCollection(id);
        setCollection(data);
      } catch (e) {
        console.error('Failed to load collection', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <main className="explore-main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Loader size="lg" />
      </main>
    );
  }

  if (!collection) {
    return (
      <main className="explore-main">
        <Title order={3}>Collection not found</Title>
      </main>
    );
  }

  return (
    <main className="explore-main">
      <div style={{ marginTop: '4.2rem', marginBottom: '2rem' }}>
        <Title order={2} mb="xs">{collection.name}</Title>
        <Text c="dimmed">{collection.description || 'No description'}</Text>
        {collection.owner && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>
            by <Link to={`/profile/${collection.owner.id}`}>{collection.owner.username}</Link>
          </div>
        )}
      </div>

      {(!collection.listings || collection.listings.length === 0) ? (
        <Text c="dimmed" mt="lg">No listings in this collection yet.</Text>
      ) : (
        <div className="listing-grid-responsive">
          {collection.listings.map((listing) => (
            <div key={listing.id} className="listing-card" style={{ position: 'relative' }}>
              <a href={`/listing/${listing.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={listing.main_image_url} alt={listing.title} className="listing-image" />
                <div className="listing-info">
                  <div className="listing-title">{listing.title}</div>
                  <div className="listing-meta">
                    <span className="listing-price">{listing.price}</span>
                    {listing.owner && (
                      <span className="listing-owner">{listing.owner.username}</span>
                    )}
                  </div>
                </div>
              </a>
              <div style={{ marginTop: '0.5rem' }}>
                <Button size="xs" variant="light" color="red" onClick={async (e) => {
                  e.preventDefault();
                  try {
                    await api.removeListingFromCollection(id, listing.id);
                    setCollection(prev => ({
                      ...prev,
                      listings: prev.listings.filter(l => l.id !== listing.id),
                      listing_count: Math.max(0, (prev.listing_count || prev.listings.length) - 1)
                    }));
                  } catch (err) {
                    console.error('Failed to remove listing', err);
                  }
                }}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </main>
  );
}

export default Collection;
