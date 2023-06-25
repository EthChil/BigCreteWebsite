import {
  apply,
  navigate,
  prefetch,
  router,
} from "https://unpkg.com/million@1.11.5/dist/router.mjs"

// List of routes that do not include the SPA router
const nonSPARoutes = [
  '/construction.html',
  '/',
];

export const attachSPARouting = (init, rerender) => {
  // Attach SPA functions to the global Million namespace
  window.Million = {
    apply,
    navigate,
    prefetch,
    router,
  }

  // Modifying navigation logic
  document.body.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
      // const url = event.target.getAttribute('href');
      const url = new URL(event.target.href);
      const path = url.pathname;

      // Prevent default behavior if URL is in nonSPARoutes
      if (nonSPARoutes.includes(path)) {
        event.preventDefault();

        // If URL is in nonSPARoutes, do a traditional page load
        window.location.href = url;
      }
    }
  });

  const render = () => requestAnimationFrame(rerender)
  window.addEventListener("DOMContentLoaded", () => {
    apply((doc) => init(doc))
    init()
    router(".singlePage")
    render()
  })
  window.addEventListener("million:navigate", render)
}



// import {
//   apply,
//   navigate,
//   prefetch,
//   router,
// } from "https://unpkg.com/million@1.11.5/dist/router.mjs"
//
//
//
// export const attachSPARouting = (init, rerender) => {
//   // Attach SPA functions to the global Million namespace
//   window.Million = {
//     apply,
//     navigate,
//     prefetch,
//     router,
//   }
//
//   const render = () => requestAnimationFrame(rerender)
//   window.addEventListener("DOMContentLoaded", () => {
//     apply((doc) => init(doc))
//     init()
//     router(".singlePage")
//     render()
//   })
//   window.addEventListener("million:navigate", render)
// }
