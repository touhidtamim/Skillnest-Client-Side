import { Outlet, useNavigation } from "react-router-dom";
import Spinner from "../Components/Spinner";
import ScrollToTop from "../Components/ScrollToTop";
import NAvbar from "../Components/NAvbar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  const navigation = useNavigation(); // Track navigation/loading state

  return (
    <>
      {/* Navigation bar */}
      <NAvbar />

      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Show spinner while loading */}
      {navigation.state === "loading" && <Spinner />}

      {/* Main content area with responsive width */}
      <div className="min-h-screen">
        <Outlet /> {/* Render matched child routes */}
      </div>

      {/* Footer section */}
      <Footer />
    </>
  );
};

export default MainLayout;
