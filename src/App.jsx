import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BookingPage from "./pages/BookingPage";
import HomePage from "./pages/HomePage";
import TermsPage from "./pages/TermsPage";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState("home");
  const [pendingSection, setPendingSection] = useState(null);

  useEffect(() => {
    if (view !== "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!pendingSection) return;

    window.requestAnimationFrame(() => {
      const section = document.getElementById(pendingSection);

      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      setPendingSection(null);
    });
  }, [pendingSection, view]);

  const goToView = (nextView, sectionId) => {
    setView(nextView);
    setMenuOpen(false);

    if (sectionId) {
      setPendingSection(sectionId);
    } else {
      setPendingSection(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header
        menuOpen={menuOpen}
        onNavigate={goToView}
        onToggleMenu={() => setMenuOpen((value) => !value)}
      />

      <main className="mx-auto max-w-6xl px-5">
        {view === "home" && <HomePage onNavigate={goToView} />}
        {view === "terms" && <TermsPage onNavigate={goToView} />}
        {view === "booking" && <BookingPage onNavigate={goToView} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
