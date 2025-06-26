import { useState, useEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Spinner from "../Components/Spinner";
import ScrollToTop from "../Components/ScrollToTop";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  const navigation = useNavigation();

  return (
    <div>
      <div className="min-h-screen text-gray-800">
        <Navbar />

        <ScrollToTop />

        {navigation.state === "loading" && <Spinner />}

        <main className="pt-[60px] min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
