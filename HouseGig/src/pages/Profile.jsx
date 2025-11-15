import './Explore.css';
import Footer from '../Footer';
import { useAuth } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { Paper, Text, Title, Avatar, Button, Tabs, Loader } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import ListingCard from '../components/ListingCard';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useState, useEffect } from 'react';
import { notifications } from '@mantine/notifications';

function Profile() {
  const { user, isAuthenticated } = useAuth();
  const { userId } = useParams();
  const isOwnProfile = !userId || (isAuthenticated && user?.id === userId);

  const [profileUser, setProfileUser] = useState(user);
  const [userListings, setUserListings] = useState([]);
  const [likedListings, setLikedListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        // Fetch user profile if viewing another user
        if (!isOwnProfile && userId) {
          const userData = await api.getUserProfile(userId);
          setProfileUser(userData);
        } else {
          setProfileUser(user);
        }

        // Fetch user's listings
        if (isOwnProfile) {
          const listings = await api.getMyListings();
          setUserListings(listings);
          
          // Fetch liked listings
          const liked = await api.getMyLikedListings();
          setLikedListings(liked);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        notifications.show({
          title: 'Error',
          message: 'Failed to load profile data',
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    };

    if (user || userId) {
      fetchProfileData();
    }
  }, [userId, isOwnProfile, user]);

  if (loading) {
    return (
      <main className="explore-main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Loader size="lg" />
      </main>
    );
  }

  return (
    <main className="explore-main">
      <Paper shadow="md" p="xl" radius="md" withBorder style={{ marginBottom: '2rem', marginTop: '4.2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
          <Avatar 
            src={profileUser?.avatar_url} 
            size={100} 
            radius="md"
          />
          <div style={{ flex: 1 }}>
            <Title order={2}>{profileUser?.username || 'User'}</Title>
            <Text c="dimmed" size="sm">{profileUser?.bio || 'No bio available'}</Text>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
              <Text size="sm"><strong>{userListings.length}</strong> Listings</Text>
              <Text size="sm"><strong>0</strong> Collections</Text>
              <Text size="sm"><strong>0</strong> Followers</Text>
            </div>
          </div>
          {isOwnProfile && (
            <Button leftSection={<IconSettings size={18} />} component={Link} to="/settings" style={{ backgroundColor: 'rgba(31, 96, 3, 0.8)' }}>
              Edit Profile
            </Button>
          )}
        </div>
      </Paper>

      <Tabs defaultValue="listings" color="rgba(31, 96, 3, 0.8)">
        <Tabs.List>
          <Tabs.Tab value="listings">Listings</Tabs.Tab>
          <Tabs.Tab value="collections">Collections</Tabs.Tab>
          {isOwnProfile && <Tabs.Tab value="liked">Liked</Tabs.Tab>}
        </Tabs.List>

        <Tabs.Panel value="listings" pt="xl">
          {userListings.length === 0 ? (
            <Paper shadow="sm" p="xl" radius="md" withBorder style={{ textAlign: 'center' }}>
              <Text c="dimmed">No listings yet</Text>
            </Paper>
          ) : (
            <div className="listing-grid-responsive">
              {userListings.map(listing => (
                <Link key={listing.id} to={`/listing/${listing.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListingCard listing={listing} />
                </Link>
              ))}
            </div>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="collections" pt="xl">
          <Paper shadow="sm" p="xl" radius="md" withBorder style={{ textAlign: 'center' }}>
            <Text c="dimmed">No collections yet</Text>
          </Paper>
        </Tabs.Panel>

        {isOwnProfile && (
          <Tabs.Panel value="liked" pt="xl">
            {likedListings.length === 0 ? (
              <Paper shadow="sm" p="xl" radius="md" withBorder style={{ textAlign: 'center' }}>
                <Text c="dimmed">No liked listings yet</Text>
              </Paper>
            ) : (
              <div className="listing-grid-responsive">
                {likedListings.map(listing => (
                  <Link key={listing.id} to={`/listing/${listing.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListingCard listing={listing} />
                  </Link>
                ))}
              </div>
            )}
          </Tabs.Panel>
        )}
      </Tabs>

      <Footer />
    </main>
  );
}

export default Profile;
