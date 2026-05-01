(function () {
  var yearNodes = document.querySelectorAll("[data-year]");
  var year = new Date().getFullYear();
  var menuButtons = document.querySelectorAll(".menu-toggle");

  function closeMenu(topbar, button) {
    topbar.classList.remove("nav-open");
    button.setAttribute("aria-expanded", "false");
  }

  function toggleMenu(button) {
    var topbar = button.closest(".topbar");
    var isExpanded = button.getAttribute("aria-expanded") === "true";
    topbar.classList.toggle("nav-open", !isExpanded);
    button.setAttribute("aria-expanded", String(!isExpanded));
  }

  yearNodes.forEach(function (node) {
    node.textContent = String(year);
  });

  menuButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      toggleMenu(button);
    });

    var topbar = button.closest(".topbar");
    topbar.addEventListener("click", function (event) {
      if (event.target.closest("nav a")) {
        closeMenu(topbar, button);
      }
    });
  });

  document.addEventListener("click", function (event) {
    menuButtons.forEach(function (button) {
      var topbar = button.closest(".topbar");
      if (!topbar.contains(event.target)) {
        closeMenu(topbar, button);
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    menuButtons.forEach(function (button) {
      closeMenu(button.closest(".topbar"), button);
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 640) {
      menuButtons.forEach(function (button) {
        closeMenu(button.closest(".topbar"), button);
      });
    }
  });
})();
