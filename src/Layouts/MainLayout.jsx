import { useState, useEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Spinner from "../Components/Spinner";
import ScrollToTop from "../Components/ScrollToTop";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
        <Navbar />

        <ScrollToTop />

        {navigation.state === "loading" && <Spinner />}

        <main className="pt-[60px] min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
