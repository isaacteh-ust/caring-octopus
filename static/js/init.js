// Requiring function causes error during builds
// as the code tries to reference window
const module = require("module"); // Error
// Wrap the require in check for window
if (typeof window !== `undefined`) {
  const module = require("module");
}

//const module = typeof window !== `undefined` ? require("module") : null;

window.onGatsbyInitialClientRender = function () {
  // Sticky header
  var offsetY = 0;
  var ticking = false;

  window.addEventListener("scroll", function (e) {
    offsetY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleHeader(offsetY);
        ticking = false;
      });
      ticking = true;
    }
  });

  function handleHeader(scrollPos) {
    if (scrollPos > 0) {
      document.body.classList.add("has--scrolled");
    } else {
      document.body.classList.remove("has--scrolled");
    }
  }
};
