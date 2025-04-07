import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    const handleClick = (e) => {
      if (
        e.target.tagName === "A" &&
        e.target.getAttribute("href") === pathname
      ) {
        window.scrollTo(0, 0);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);
  return null;
}
