import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListingDetails from './pages/ListingDetails';
import AddListing from './pages/AddListing';
import Contact from './pages/Contact';
import Messages from './pages/Messages';
import Contracts from './pages/Contracts';
import Colocation from './pages/Colocation';
import Profile from './pages/Profile';
import Forum from './pages/Forum';
import Blog from './pages/Blog';
import { MessageSquare } from 'lucide-react';

// Wrapper component to handle conditional rendering based on route
const AppContent: React.FC = () => {
  const location = useLocation();
  
  // Logic: Hide Footer on Messages (for chat UI) AND Listings (for infinite scroll/cleaner UI as requested)
  const isMessagesPage = location.pathname === '/messages';
  const isListingsPage = location.pathname === '/listings' || location.pathname === '/colocation';
  
  const shouldHideFooter = isMessagesPage || isListingsPage;
  const shouldHideFloatingBtn = isMessagesPage;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-slate-900">
      <Navigation />
      
      {/* 
          On Messages page: Use specific height logic.
          On Listings page: Just standard flex grow, but footer is hidden so it takes full bottom space.
      */}
      <main className={`flex-grow ${isMessagesPage ? 'h-[calc(100vh-64px)] overflow-hidden' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/colocation" element={<Colocation />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/add-room" element={<AddListing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      
      {/* Only show Footer if NOT on messages OR listings page */}
      {!shouldHideFooter && <Footer />}
      
      {/* Floating Chat Button (AI/Support Shortcut) */}
      {!shouldHideFloatingBtn && (
        <Link to="/messages" className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-300 z-50 group">
           <MessageSquare size={28} />
           <span className="absolute right-14 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap mr-2 pointer-events-none">
             Assistant & Messages
           </span>
        </Link>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;