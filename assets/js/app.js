/*

* Portfolio interactions
* Ryan Rey Bondoc
  */

document.addEventListener("DOMContentLoaded", () => {
/* =========================================================
Elements
========================================================== */

const scrollUp = document.querySelector("#scroll-up");
const burger = document.querySelector("#burger-menu");
const navigation = document.querySelector(".navigation");
const navLinks = document.querySelectorAll(".nav-link");

/* =========================================================
Mobile Navigation
========================================================== */

if (burger && navigation) {
burger.addEventListener("click", () => {
const isOpen = navigation.classList.toggle("show");

```
  burger.setAttribute("aria-expanded", String(isOpen));

  burger.setAttribute(
    "aria-label",
    isOpen
      ? "Close navigation menu"
      : "Open navigation menu"
  );
});


/*
 * Close mobile navigation when a navigation link
 * is selected.
 */
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("show");

    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute(
      "aria-label",
      "Open navigation menu"
    );
  });
});


/*
 * Close mobile navigation when clicking outside
 * the navigation area.
 */
document.addEventListener("click", (event) => {
  const clickedInsideNavigation =
    navigation.contains(event.target);

  const clickedBurger =
    burger.contains(event.target);

  if (
    !clickedInsideNavigation &&
    !clickedBurger &&
    navigation.classList.contains("show")
  ) {
    navigation.classList.remove("show");

    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute(
      "aria-label",
      "Open navigation menu"
    );
  }
});


/*
 * Close mobile navigation with the Escape key.
 */
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    navigation.classList.contains("show")
  ) {
    navigation.classList.remove("show");

    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

    burger.focus();
  }
});
```

}

/* =========================================================
Scroll To Top
========================================================== */

if (scrollUp) {
/*
* Hide the scroll-to-top button until the user
* has moved down the page.
*/
scrollUp.style.opacity = "0";
scrollUp.style.pointerEvents = "none";
scrollUp.style.transition = "opacity 0.25s ease";

```
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollUp.style.opacity = "1";
    scrollUp.style.pointerEvents = "auto";
  } else {
    scrollUp.style.opacity = "0";
    scrollUp.style.pointerEvents = "none";
  }
});


/*
 * Scroll smoothly back to the top.
 */
scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});
```

}
});
