import { useEffect } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import "flag-icons/css/flag-icons.min.css";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import { storeWrapper } from "@/redux/store";

import "@/styles/globals.css";
// import "aos/dist/aos.css";
import { ToastProvider } from "@/custom-hooks/toast/ToastProvider";

export default function App({ Component, pageProps, ...rest }) {
  const { store } = storeWrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ToastProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </ToastProvider>
    </Provider>
  );
}

function AppContent({ Component, pageProps }) {
  const router = useRouter();

  // Scroll to top on navigation and prevent browser scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    };

    const handleRouteChangeStart = () => {
      scrollToTop();
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", scrollToTop);

    // Handle initial page load
    scrollToTop();

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", scrollToTop);
    };
  }, [router.events]);

  // Initialize Bootstrap
  useEffect(() => {
    void import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // Initialize AOS
  // useEffect(() => {
  //   const initAos = async () => {
  //     const Aos = (await import("aos")).default;
  //
  //     Aos.init({
  //       duration: 1000,
  //       once: true,
  //     });
  //   };
  //
  //   if (typeof window !== "undefined" && "requestIdleCallback" in window) {
  //     const id = window.requestIdleCallback(
  //       () => {
  //         void initAos();
  //       },
  //       {
  //         timeout: 2000,
  //       },
  //     );
  //
  //     return () => {
  //       window.cancelIdleCallback(id);
  //     };
  //   }
  //
  //   // Fallback for browsers without requestIdleCallback
  //   const timer = window.setTimeout(() => {
  //     void initAos();
  //   }, 1);
  //
  //   return () => {
  //     window.clearTimeout(timer);
  //   };
  // }, []);

  // Scroll animations + sticky header
  useEffect(() => {
    function checkIfInView() {
      const animationElements = document.querySelectorAll(
        ".animateThis, .animateOne",
      );

      const windowHeight = window.innerHeight;
      const windowTopPosition = window.scrollY || window.pageYOffset;
      const windowBottomPosition = windowTopPosition + windowHeight;

      animationElements.forEach((element) => {
        const elementTopPosition =
          element.getBoundingClientRect().top + windowTopPosition + 100;

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

    const headTop = document.querySelector(".headTop");
    const pageBody = document.querySelector(".pageBody");

    if (headTop && pageBody) {
      const headTopHeight = -headTop.getBoundingClientRect().height;

      pageBody.style.setProperty("--hTH", `${headTopHeight}px`);
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
