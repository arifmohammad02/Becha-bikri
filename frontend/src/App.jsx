import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <Loader />
      </div>
    );
  }

  // Footer দেখানোর জন্য শর্ত
  const shouldShowFooter = !["/login", "/register"].includes(location.pathname);

  return (
    <div>
      <ToastContainer />
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="main-content">
        <Outlet />
        {shouldShowFooter && <Footer />}
      </main>
    </div>
  );
}

export default App;
