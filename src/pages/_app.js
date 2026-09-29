import { useEffect } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import "flag-icons/css/flag-icons.min.css";

import { storeWrapper } from "@/redux/store";

import "@/styles/globals.css";
import "aos/dist/aos.css";


export default function App({ Component, pageProps, ...rest }) {
  const { store } = storeWrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <AppContent Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

function AppContent({ Component, pageProps }) {
  const router = useRouter();

  // Bootstrap JS (offcanvas, collapse, etc.) — CSS-only import is not enough
  useEffect(() => {
    void import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // Initialize AOS
  useEffect(() => {
    const initAos = async () => {
      const Aos = (await import("aos")).default;

      Aos.init({
        duration: 1000,
        once: true,
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(
        () => {
          void initAos();
        },
        {
          timeout: 2000,
        },
      );

      return () => {
        window.cancelIdleCallback(id);
      };
    }

    // Fallback for browsers without requestIdleCallback
    const timer = window.setTimeout(() => {
      void initAos();
    }, 1);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  // Scroll animations + sticky header
  useEffect(() => {
    function checkIfInView() {
      const animationElements = document.querySelectorAll(".animateThis, .animateOne");
      const windowHeight = window.innerHeight;
      const windowTopPosition = window.scrollY || window.pageYOffset;
      const windowBottomPosition = windowTopPosition + windowHeight;

      animationElements.forEach((element) => {
        const elementHeight = element.offsetHeight;

        const elementTopPosition =
          element.getBoundingClientRect().top + windowTopPosition + 100;
        const elementBottomPosition = elementTopPosition + elementHeight;

        if (elementTopPosition <= windowBottomPosition) {
          element.classList.add("in-view");
        } else {
          element.classList.remove("in-view");
        }
      });
    }

    function stickyRelocate() {
      const windowTop = window.scrollY || window.pageYOffset;
      const stickyElement = document.getElementById("sticky");
      const pageBody = document.querySelector(".pageBody");

      if (stickyElement && pageBody) {
        const divTop = stickyElement.getBoundingClientRect().top + windowTop;

        if (windowTop > divTop) {
          pageBody.classList.add("stick");
        } else {
          pageBody.classList.remove("stick");
        }
      }
    }

    window.addEventListener("scroll", checkIfInView);
    window.addEventListener("resize", checkIfInView);
    window.addEventListener("scroll", stickyRelocate);

    checkIfInView();
    stickyRelocate();

    return () => {
      window.removeEventListener("scroll", checkIfInView);
      window.removeEventListener("resize", checkIfInView);
      window.removeEventListener("scroll", stickyRelocate);
    };
  }, [router.asPath]);

  return <Component {...pageProps} />;
}