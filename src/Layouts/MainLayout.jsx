import { Outlet, useNavigation } from "react-router-dom";
import Spinner from "../Components/Spinner";
import ScrollToTop from "../Components/ScrollToTop";
import NAvbar from "../Components/NAvbar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      <NAvbar></NAvbar>

      <ScrollToTop></ScrollToTop>

      {navigation.state === "loading" && <Spinner />}
      <div className="w-11/12 mx-auto min-h-screen">
        <Outlet />
      </div>

      <Footer></Footer>
    </>
  );
};

export default MainLayout;
