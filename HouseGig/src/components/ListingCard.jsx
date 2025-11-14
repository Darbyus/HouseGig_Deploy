import './ListingCard.css';
import { useState } from 'react';

function ListingCard({ listing }) {
  const [liked, setLiked] = useState(listing.liked);
  const [likes, setLikes] = useState(listing.likes);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  return (
    <div className="listing-card">
      <img src={listing.main_image_url} alt={listing.title} className="listing-image" />
      <div className="listing-info">
        <h3 className="listing-title">{listing.title}</h3>
        <div className="listing-meta">
          <span>{listing.world}</span>
          <span className="listing-price">{listing.price}</span>
        </div>
        <div className="listing-footer">
          <div className="listing-owner">
            <img src={listing.owner.avatar_url} alt={listing.owner.username} className="owner-avatar" />
            <span className="owner-username">{listing.owner.username}</span>
          </div>
          <button className={`like-btn${liked ? ' liked' : ''}`} onClick={handleLike} aria-label="Like">
            <span className="like-count">{likes}</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={liked ? '#e25555' : 'none'} stroke={liked ? '#e25555' : '#222'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '0.5rem'}}><path d="M20.8 4.6c-1.5-1.3-3.7-1.1-5 .4l-.8.9-.8-.9c-1.3-1.5-3.5-1.7-5-.4-1.7 1.5-1.8 4.1-.2 5.7l8 8.3 8-8.3c1.6-1.6 1.5-4.2-.2-5.7z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
