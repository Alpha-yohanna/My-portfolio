import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/navigation/Nav";
import LoadingScreen from "./components/loading/LoadingScreen";
import BookingPage from "./pages/BookingPage";
import HomePage from "./pages/HomePage";
import TermsPage from "./pages/TermsPage";
import ProductCaseStudyPage from "./pages/ProductCaseStudyPage";
import { useLenis } from "./hooks/useLenis";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useHashScroll } from "./hooks/useHashScroll";

function AppShell() {
  const [loading, setLoading] = useState(true);
  const reducedMotion = useReducedMotion();

  useLenis(!reducedMotion && !loading);
  useHashScroll();

  return (
    <div className="min-h-screen bg-obsidian font-sans text-ink">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <Nav />

      <main>
        <Routes>
          <Route path="/" element={<HomePage heroReady={!loading} />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/products/:slug" element={<ProductCaseStudyPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
