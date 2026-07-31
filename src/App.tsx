import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Web3Provider } from './providers/Web3Provider';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { EventDetailPage } from './pages/EventDetailPage';
import { MyTicketsPage } from './pages/MyTicketsPage';
import { CreateEventPage } from './pages/CreateEventPage';

export function App() {
  return (
    <Web3Provider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#fff8f4] text-[#1f1b15] font-sans antialiased">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<ExplorePage />} />
              <Route path="/events/:id" element={<EventDetailPage />} />
              <Route path="/tickets" element={<MyTicketsPage />} />
              <Route path="/create" element={<CreateEventPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </Web3Provider>
  );
}

export default App;
