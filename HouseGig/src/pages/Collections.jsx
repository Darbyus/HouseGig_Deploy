import './Explore.css';
import Footer from '../Footer';
import { useAuth } from '../contexts/AuthContext';
import { Button, Paper, Text, Title, Modal, TextInput, Textarea, Loader } from '@mantine/core';
import { IconBookmark, IconPlus } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { notifications } from '@mantine/notifications';

function Collections() {
  const { user } = useAuth();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const data = await api.getCollections();
      setCollections(data);
    } catch (error) {
      console.error('Error fetching collections:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to load collections',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCollection = async () => {
    if (!newCollectionName.trim()) {
      notifications.show({
        title: 'Error',
        message: 'Collection name is required',
        color: 'red',
      });
      return;
    }

    try {
      setCreating(true);
      await api.createCollection({
        name: newCollectionName,
        description: newCollectionDescription,
      });
      notifications.show({
        title: 'Success',
        message: 'Collection created successfully',
        color: 'green',
      });
      setModalOpen(false);
      setNewCollectionName('');
      setNewCollectionDescription('');
      fetchCollections();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to create collection',
        color: 'red',
      });
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <main className="explore-main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Loader size="lg" />
      </main>
    );
  }

  return (
    <main className="explore-main">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4.2rem', marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 700, lineHeight: 1.2, margin: 0 }}>My Collections</h2>
        <Button leftSection={<IconPlus size={18} />} style={{ backgroundColor: 'rgba(31, 96, 3, 0.8)' }} onClick={() => setModalOpen(true)}>
          New Collection
        </Button>
      </div>

      {collections.length === 0 ? (
        <Paper shadow="sm" p="xl" radius="md" withBorder style={{ textAlign: 'center', marginTop: '3rem' }}>
          <IconBookmark size={64} style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <Title order={3} mb="md">No Collections Yet</Title>
          <Text c="dimmed" mb="xl">
            Start organizing your favorite listings by creating your first collection!
          </Text>
          <Button style={{ backgroundColor: 'rgba(31, 96, 3, 0.8)' }} onClick={() => setModalOpen(true)}>Create Collection</Button>
        </Paper>
      ) : (
        <div className="listing-grid-responsive">
          {collections.map(collection => (
            <Paper key={collection.id} shadow="sm" p="lg" radius="md" withBorder>
              <IconBookmark size={32} style={{ marginBottom: '0.5rem', color: 'rgba(31, 96, 3, 0.8)' }} />
              <Title order={4} mb="xs">{collection.name}</Title>
              <Text c="dimmed" size="sm">{collection.description || 'No description'}</Text>
              <Text size="sm" mt="md"><strong>{collection.listing_count || 0}</strong> listings</Text>
            </Paper>
          ))}
        </div>
      )}

      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Create New Collection">
        <TextInput
          label="Collection Name"
          placeholder="My Favorite Castles"
          value={newCollectionName}
          onChange={(e) => setNewCollectionName(e.target.value)}
          required
          mb="md"
        />
        <Textarea
          label="Description"
          placeholder="Describe your collection..."
          value={newCollectionDescription}
          onChange={(e) => setNewCollectionDescription(e.target.value)}
          mb="md"
          rows={3}
        />
        <Button 
          fullWidth 
          style={{ backgroundColor: 'rgba(31, 96, 3, 0.8)' }}
          loading={creating}
          onClick={handleCreateCollection}
        >
          Create Collection
        </Button>
      </Modal>

      <Footer />
    </main>
  );
}

export default Collections;
