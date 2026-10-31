import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import "flag-icons/css/flag-icons.min.css";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import { storeWrapper } from "@/redux/store";

import "@/styles/globals.css";
// import "aos/dist/aos.css";
import { ToastProvider } from "@/custom-hooks/toast/ToastProvider";
import ProgressBar from "@/custom-hooks/progress-bar/ProgressBar";
import { FaArrowUp } from "react-icons/fa";

function BackToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 300);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <button
      className="back-to-top-btn"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to Top"
    >
      <FaArrowUp />
    </button>
  );
}

export default function App({ Component, pageProps, ...rest }) {
  const { store } = storeWrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ToastProvider>
        <ProgressBar />
        <AppContent Component={Component} pageProps={pageProps} />
        <style jsx global>{`
          .back-to-top-btn {
            position: fixed;
            bottom: 32px;
            right: 32px;
            z-index: 9999;
            background: black;
            color: #fff;
            border: none;
            outline: none;
            padding: 12px 16px;
            border-radius: 50%;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
            cursor: pointer;
            transition: background 0.2s;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
          }
          .back-to-top-btn:hover {
            background:rgb(233, 201, 24);
          }
          @media (max-width: 500px) {
            .back-to-top-btn {
              bottom: 18px;
              right: 18px;
              padding: 10px 13px;
              font-size: 20px;
              height: 45px;
              width: 45px;
            }
          }
        `}</style>
        <BackToTopButton />
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
