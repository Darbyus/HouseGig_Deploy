import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Header"
import Footer from "./Footer"
import Explore from "./pages/Explore"
import Profile from "./pages/Profile";
import ListingDetails from "./pages/ListingDetails";
import Collections from "./pages/Collections";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <MantineProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </MantineProvider>
  );
}

export default App;
