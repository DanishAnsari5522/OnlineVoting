import AnchorLink from "react-anchor-link-smooth-scroll";
import WelcomePage from "./WelcomePage";
import Sidebar from "../../components/sidebar";
import NavBar from "../../components/navbar";
import NavBarWelcomePage from "../../components/navbarWelcomePage";
import SidebarWelcomePage from "../../components/sidebarWelcomePage";

function FirstPage() {
  return (
    <div className="App">
      <div class="flex w-screen fixed">
        <NavBarWelcomePage />
        <div class="flex flex-col absolute w-screen ">
          <SidebarWelcomePage />
        </div>
      </div>
      <div class="pt-20">
        <WelcomePage />
      </div>
    </div>
  );
}

export default FirstPage;