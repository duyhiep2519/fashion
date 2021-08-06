import {
  Home,
  Login,
  Cart,
  Detail,
  Wishlist,
  ErrorPage,
  SalePage,
  Search,
  Category,
} from "pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Footer } from "components";
import { AiOutlineArrowUp } from "react-icons/ai";
import { useEffect, useState, useRef } from "react";
import * as Scroll from "react-scroll";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function App() {
  let scroll = Scroll.animateScroll;
  const { isLogin } = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const prevY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currY = window.scrollY;

      if (prevY.current > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      prevY.current = currY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible]);
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      ></ToastContainer>
      <Header />
      <Switch>
        <Route name="Home" exact path="/" component={Home} />
        {!isLogin && <Route name="Login" path="/login" component={Login} />}
        <Route name="Cart" path="/cart" component={Cart} />
        <Route name="Detail" path="/detail/:slug" component={Detail} />
        <Route name="Wishlist" path="/wishlist" component={Wishlist} />
        <Route path="/sale" component={SalePage} />
        <Route path="/search" component={Search} />
        <Route path="/category" component={Category} />
        <Route path="*" exact={true} component={ErrorPage} />
      </Switch>
      <Footer />
      {visible && (
        <div
          className="scroll-btn"
          onClick={() => {
            scroll.scrollToTop();
          }}
        >
          <AiOutlineArrowUp />
        </div>
      )}
    </Router>
  );
}

export default App;
