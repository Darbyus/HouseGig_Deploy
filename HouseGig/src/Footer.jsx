import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} HouseGig. All rights reserved.</span>
    </footer>
  );
}

export default Footer;
