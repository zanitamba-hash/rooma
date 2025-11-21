
import React, { useEffect } from 'react';
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
import Marketplace from './pages/Marketplace';
import Community from './pages/Community';
import Blog from './pages/Blog';
import Payments from './pages/Payments';
import FindHousingChoice from './pages/FindHousingChoice';
import Concierge from './pages/Concierge';
import AdminDashboard from './pages/AdminDashboard'; // Import Admin Page
import { MessageSquare } from 'lucide-react';

const AppContent: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // Logic: Hide Footer on Messages and Admin
  const isMessagesPage = location.pathname === '/messages';
  const isAdminPage = location.pathname === '/admin';
  
  const shouldHideFooter = isMessagesPage || isAdminPage;
  const shouldHideFloatingBtn = isMessagesPage || isAdminPage;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-slate-900">
      {!isAdminPage && <Navigation />}
      
      {/* Use flex-grow to push footer down */}
      <main className={`flex-grow w-full flex flex-col ${isMessagesPage ? 'h-[calc(100vh-80px)] overflow-hidden' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find" element={<FindHousingChoice />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/colocation" element={<Colocation />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/community" element={<Community />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/add-room" element={<AddListing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/concierge" element={<Concierge />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      
      {!shouldHideFooter && (
        <div className="mt-auto">
          <Footer />
        </div>
      )}
      
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
