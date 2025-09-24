<script>
/**
 * Navbar component (toggle is a native button now so it's in tab order)
 */
export default {
  data() {
    return {
      isCondensed: false,
      isDark: false, // slider state
    };
  },
  props: {
    isWhiteNavbar: {
      type: Boolean,
    },
    navLight: {
      type: Boolean,
    },
    isIcons: {
      type: Boolean,
    },
  },

  mounted() {
    // --- Sticky header + back-to-top ---
    window.onscroll = function () {
      onwindowScroll();
    };

    function onwindowScroll() {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        document.getElementById("topnav").classList.add("nav-sticky");
      } else {
        document.getElementById("topnav").classList.remove("nav-sticky");
      }

      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        document.getElementById("back-to-top").style.display = "inline";
      } else {
        document.getElementById("back-to-top").style.display = "none";
      }
    }

    // --- Keyboard navigation helpers (preserve original behavior) ---
    const isVisible = (el) => {
      if (!el) return false;
      const cs = window.getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return false;
      if (el.offsetParent === null && cs.position !== "fixed") return false;
      return true;
    };

    // Top-level menu anchors
    const menuList = document.querySelectorAll(".navigation-menu > li > a");

    menuList.forEach((menu) => {
      const parentLi = menu.parentElement;

      // If it has a submenu
      if (parentLi.classList.contains("has-submenu")) {
        const submenu = parentLi.querySelector(".submenu");

        menu.addEventListener("keydown", (e) => {
          const isSubVisible =
            submenu &&
            (submenu.style.display === "block" ||
              window.getComputedStyle(submenu).visibility === "visible");

          // Arrow navigation only inside submenu when visible
          if (isSubVisible && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            e.preventDefault();
            const focusable = submenu.querySelectorAll("a");
            const currentIndex = Array.from(focusable).indexOf(document.activeElement);

            let nextIndex = currentIndex;
            if (e.key === "ArrowDown" && currentIndex < focusable.length - 1) {
              nextIndex = currentIndex + 1;
              focusable[nextIndex].focus();
            } else if (e.key === "ArrowUp") {
              if (currentIndex > 0) {
                nextIndex = currentIndex - 1;
                focusable[nextIndex].focus();
              } else {
                // At first submenu item → go back to parent menu link
                menu.focus();
              }
            }
            return;
          }

          // Tab handling on EACH top-level link
          if (e.key === "Tab") {
            const menuListArr = Array.from(
              document.querySelectorAll(".navigation-menu > li > a")
            ).filter(isVisible);
            const currentIndex = menuListArr.indexOf(menu);
            if (currentIndex === -1) return;

            const atFirst = currentIndex === 0;
            const atLast = currentIndex === menuListArr.length - 1;

            if ((!e.shiftKey && atLast) || (e.shiftKey && atFirst)) {
              return; // allow escape from navbar
            }

            e.preventDefault();
            const nextIndex = e.shiftKey ? currentIndex - 1 : currentIndex + 1;
            const next = menuListArr[nextIndex];
            if (next) next.focus();
            return;
          }
        });

        // Allow submenu items themselves to handle arrow navigation
        if (submenu) {
          submenu.addEventListener("keydown", (e) => {
            const isSubVisible =
              submenu.style.display === "block" ||
              window.getComputedStyle(submenu).visibility === "visible";

            if (!isSubVisible) return;

            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              const focusable = submenu.querySelectorAll("a");
              const currentIndex = Array.from(focusable).indexOf(document.activeElement);

              if (e.key === "ArrowDown") {
                if (currentIndex < focusable.length - 1) {
                  focusable[currentIndex + 1].focus();
                }
              } else if (e.key === "ArrowUp") {
                if (currentIndex > 0) {
                  focusable[currentIndex - 1].focus();
                } else {
                  // At first submenu item → return to parent menu link
                  parentLi.querySelector("a").focus();
                }
              }
            }
          });
        }
      } else {
        // Items WITHOUT submenu still need Tab handling
        menu.addEventListener("keydown", (e) => {
          if (e.key !== "Tab") return;

          const menuListArr = Array.from(
            document.querySelectorAll(".navigation-menu > li > a, .navigation-menu > li > button")
          ).filter(isVisible);
          const currentIndex = menuListArr.indexOf(menu);
          if (currentIndex === -1) return;

          const atFirst = currentIndex === 0;
          const atLast = currentIndex === menuListArr.length - 1;

          if ((!e.shiftKey && atLast) || (e.shiftKey && atFirst)) {
            return; // escape nav
          }

          e.preventDefault();
          const nextIndex = e.shiftKey ? currentIndex - 1 : currentIndex + 1;
          const next = menuListArr[nextIndex];
          if (next) next.focus();
        });
      }
    });

    // --- Active link detection (preserve original) ---
    var links = document.getElementsByClassName("side-nav-link-ref");
    var matchingMenuItem = null;
    for (var i = 0; i < links.length; i++) {
      if (window.location.pathname === links[i].pathname) {
        matchingMenuItem = links[i];
        break;
      }
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add("active");
      var parent = matchingMenuItem.parentElement;

      if (parent) {
        parent.classList.add("active");
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.add("active");
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.add("active");
            const parent4 = parent3.parentElement;
            if (parent4) {
              const parent5 = parent4.parentElement;
              parent5.classList.add("active");
            }
          }
        }
      }
    }

    // --- Initialize toggle position from current theme link (if present) ---
    const themeLink = document.getElementById("theme-opt");
    if (themeLink && themeLink.getAttribute("href")) {
      const href = themeLink.getAttribute("href");
      if (href.indexOf("dark") !== -1) {
        this.isDark = true;
      } else {
        this.isDark = false;
      }
    }
  },

  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      if (this.isDark) {
        this.setDark();
      } else {
        this.setLight();
      }
    },

    onToggleKeydown(e) {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        this.toggleTheme();
      } else if (e.key === "ArrowLeft") {
        if (this.isDark) {
          this.isDark = false;
          this.setLight();
        }
      } else if (e.key === "ArrowRight") {
        if (!this.isDark) {
          this.isDark = true;
          this.setDark();
        }
      }
    },

    setDark() {
      const el = document.getElementById("theme-opt");
      if (el) {
        el.setAttribute("href", "./css/style-dark.css");
      }
    },
    setLight() {
      const el = document.getElementById("theme-opt");
      if (el) {
        el.setAttribute("href", "./css/style.css");
      }
    },

    toggleMenu() {
      this.isCondensed = !this.isCondensed;
      if (this.isCondensed) {
        document.getElementById("navigation").style.display = "block";
      } else document.getElementById("navigation").style.display = "none";
    },

    onMenuClick(event) {
      event.preventDefault();
      const nextEl = event.target.nextSibling.nextSibling;

      if (nextEl && !nextEl.classList.contains("open")) {
        const parentEl = event.target.parentNode;
        if (parentEl) {
          parentEl.classList.remove("open");
        }
        nextEl.classList.add("open");
      } else if (nextEl) {
        nextEl.classList.remove("open");
      }
      return false;
    },
  },
};
</script>

<template>
  <!-- Navbar Start -->
  <header
    id="topnav"
    class="defaultscroll sticky"
    :class="{ 'bg-white': isWhiteNavbar === true }"
  >
    <span ref="backToTop" tabindex="-1" />
    <ul class="skip-links">
      <li>
        <a href="#maincontent" ref="skipLink" class="skip-link">Skip to main content</a>
      </li>
    </ul>

    <div class="container">
      <!-- Logo container -->
      <div>
        <router-link class="logo" to="/">
          <img
            :src="(isDark || navLight) ? 'images/logo-light.png' : 'images/logo-dark.png'"
            height="24"
            alt="Logo"
          />
        </router-link>
      </div>

      <!-- Mobile Toggle -->
      <div class="menu-extras">
        <div class="menu-item">
          <a
            class="navbar-toggle"
            @click="toggleMenu()"
            :class="{ open: isCondensed === true }"
          >
            <div class="lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </a>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav id="navigation">
        <ul class="navigation-menu" :class="{ 'nav-light': navLight === true }">
          <!-- Home -->
          <li>
            <router-link to="/" class="side-nav-link-ref">Home</router-link>
          </li>

          <!-- About Us -->
          <li class="has-submenu">
            <router-link to="/About-Us" @click="onMenuClick" class="side-nav-link-ref">About Us</router-link>
            <span class="menu-arrow"></span>
            <ul class="submenu">
              <li><router-link to="/" class="side-nav-link-ref">Our Story</router-link></li>
              <li><router-link to="/" class="side-nav-link-ref">Mission & Vision</router-link></li>
              <li><router-link to="/" class="side-nav-link-ref">Team</router-link></li>
              <li><router-link to="/" class="side-nav-link-ref">Testimonials</router-link></li>
            </ul>
          </li>

          <!-- Workspaces -->
          <li class="has-submenu">
            <router-link to="/Workspaces" @click="onMenuClick" class="side-nav-link-ref">
              Workspaces
            </router-link>
            <span class="menu-arrow"></span>
            <ul class="submenu">
              <li><router-link to="/" class="side-nav-link-ref">Coworking Spaces</router-link></li>
              <li><router-link to="/" class="side-nav-link-ref">Private Offices</router-link></li>
              <li><router-link to="/" class="side-nav-link-ref">Meeting Rooms</router-link></li>
              <li><router-link to="/" class="side-nav-link-ref">Virtual Office</router-link></li>
            </ul>
          </li>

          <!-- Community -->
          <li class="has-submenu">
            <router-link to="/Community" @click="onMenuClick" class="side-nav-link-ref">
              Community
            </router-link>
            <span class="menu-arrow"></span>
            <ul class="submenu">
              <li><router-link to="/Blog" class="side-nav-link-ref">Blog</router-link></li>
              <li><router-link to="/" class="side-nav-link-ref">Events</router-link></li>
              <li><router-link to="/" class="side-nav-link-ref">Workshops</router-link></li>
              <li><router-link to="/" class="side-nav-link-ref">Networking</router-link></li>
            </ul>
          </li>

          <!-- Contact -->
          <li>
            <router-link to="/Contact" class="side-nav-link-ref">
              Contact
            </router-link>
          </li>
          <!-- Dark Mode Toggle -->
          <li class="dark-toggle" aria-hidden="false">
            <button
              class="theme-toggle-btn"
              :class="{ 'is-dark': isDark }"
              @click="toggleTheme"
              @keydown="onToggleKeydown"
              role="switch"
              :aria-checked="isDark"
              aria-label="Toggle dark mode"
              type="button"
            >
              <span class="pill" aria-hidden="true">
                <span class="slider" :class="{ 'slider-right': isDark }"></span>
              </span>

              <i class="uil uil-sun option option-1" aria-hidden="true"></i>
              <i class="uil uil-moon option option-2" aria-hidden="true"></i>
            </button>
          </li>

          <!-- Login -->
          <li class="login">
            <router-link to="/Sign-in" class="btn btn-sm">
              Sign in
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- End Navigation -->
    </div>
  </header>
  <!-- Navbar End -->
</template>

<style scoped>
.skip-links {
  list-style: none;
}
.skip-link {
  position: absolute;
  opacity: 0;
}
.skip-link:focus {
  opacity: 1;
  background-color: white;
  padding: 0.5em;
  border: 1px solid black;
}
#navigation {
  position: relative !important;
}

/* Keep original login absolute layout (unchanged) */
.navigation-menu .login {
  position: absolute !important;
  right: 1px !important;
  left: auto !important;
  border: 0px solid red !important;
  align-self: center !important;
}
.navigation-menu .login a {
  border: 0px solid red !important;
  box-shadow: 0 3px 5px 0 rgba(47, 85, 212, 0.3);
  padding: 8px 12px !important;
  min-height: 0px !important;
}

/* Make sure nav is a positioned container for absolute children */
.navigation-menu {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 0;
  margin: 0;
  list-style: none;
}

/* DARK TOGGLE positioning */
.dark-toggle {
  display: flex;
  align-items: center;
  z-index: 50;
  padding-left: 20px;
}

/* THEME TOGGLE BUTTON (smaller pill, 3D look) */
.theme-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 20px;
  padding-inline: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 999px;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  perspective: 600px; /* enable 3D depth */
}

/* pill wrapper */
.theme-toggle-btn .pill {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(145deg, #8d8d8d, #5e5e5e);
  box-shadow:
    inset 2px 2px 4px rgba(0,0,0,0.35),
    inset -2px -2px 4px rgba(255,255,255,0.25),
    0 2px 3px rgba(0,0,0,0.4);
}

/* slider element inside pill */
.slider {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  height: 20px;
  width: 44%;
  background: linear-gradient(145deg, #f08d0c, #c76c00);
  border-radius: 999px;
  transition: transform 0.2s cubic-bezier(.2,.9,.3,1);
  box-shadow:
    inset -1px -1px 3px rgba(255,255,255,0.4),
    inset 2px 2px 5px rgba(0,0,0,0.3),
    0 2px 3px rgba(0,0,0,0.5);
}

/* move slider to right when dark */
.slider-right {
  transform: translateY(-50%) translateX(calc(100% + 5px));
}

/* icons on top of the pill */
.option {
  position: absolute;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  font-size: 12px;
  color: #f9f9f9;
  text-shadow: 0 1px 2px rgba(0,0,0,0.6);
  z-index: 60;
}

/* left icon (sun) */
.option-1 {
  left: 2px;
}

/* right icon (moon) */
.option-2 {
  right: 2px;
}
.theme-toggle-btn.is-dark .option-1 { opacity: 0.45; }
.theme-toggle-btn:not(.is-dark) .option-2 { opacity: 0.45; }

.theme-toggle-btn:focus {
  box-shadow: 0 0 0 3px rgba(47,85,212,0.14);
  border-radius: 999px;
}

@media (max-width: 992px) {
  .navigation-menu {
    flex-direction: column;
    align-items: flex-end;
    padding-bottom: 20px !important;
  }
  .navigation-menu li a{
    padding-inline: 0 !important;
  } 
  .menu-arrow{
    display:none !important;
  }

  .navigation-menu .login,
  .navigation-menu .dark-toggle {
    position: static;
    transform: none;
    right: auto;
    top: auto;
    margin-top: 10px;
  }

  .dark-toggle { 
    margin-left: 0;
    padding-top: 10px !important; 
  }

  .navigation-menu .login {
    position: static !important;
    border: 0px solid red !important;
    align-self: end !important;
    margin-top: 20px !important; 
  }
  .navigation-menu .login a {
    box-shadow: 0 3px 5px 0 rgba(47, 85, 212, 0.3);
    padding: 8px 12px !important;
    min-height: 0px !important;
  }
}
</style>
