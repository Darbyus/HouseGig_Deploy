import React from 'react';

function CollectionCover({ images = [] }) {
  // Limit to first 4 images
  const displayImages = images.slice(0, 4);
  
  if (displayImages.length === 0) {
    // Fallback placeholder
    return (
      <div style={{
        width: '100%',
        height: '300px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '3rem',
        fontWeight: 700
      }}>
        📚
      </div>
    );
  }

  const getGridStyle = () => {
    if (displayImages.length === 1) {
      return {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1px',
        height: '300px',
        placeItems: 'center'
      };
    }
    if (displayImages.length === 2) {
      return {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1px',
        height: '300px',
        placeItems: 'center'
      };
    }
    if (displayImages.length === 3) {
      return {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '1px',
        height: '300px',
        placeItems: 'center'
      };
    }
    // 4 images: 2x2 grid
    return {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      gap: '1px',
      height: '300px',
      placeItems: 'center'
    };
  };

  return (
    <div style={getGridStyle()}>
      {displayImages.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Collection item ${idx + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            gridColumn: displayImages.length === 3 && idx === 0 ? '1 / 2' : 'auto',
            gridRow: displayImages.length === 3 && idx === 0 ? '1 / 3' : 'auto'
          }}
        />
      ))}
    </div>
  );
}

export default CollectionCover;
