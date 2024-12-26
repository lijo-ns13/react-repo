// Notes on CSR (Client-Side Rendering) and SSR (Server-Side Rendering)

// Client-Side Rendering (CSR)
const csr = {
    definition: "Rendering happens in the browser using JavaScript after downloading a bare HTML file.",
    howItWorks: [
      "Browser gets a minimal HTML file with a <div> like <div id='root'></div>.",
      "JavaScript is downloaded and executed.",
      "JavaScript fetches data from APIs and builds the page dynamically."
    ],
    pros: [
      "Rich interactivity and dynamic behavior.",
      "Reduced server load as most rendering happens on the client side.",
      "Faster navigation for subsequent pages after the initial load."
    ],
    cons: [
      "Longer initial load time as JavaScript needs to execute first.",
      "SEO challenges as content is rendered only after JavaScript runs.",
      "Can be heavy for low-power devices."
    ],
    exampleProcess: [
      "User requests a page (e.g., example.com/products).",
      "Server sends a minimal HTML file with a JavaScript link.",
      "Browser downloads and runs the JavaScript.",
      "JavaScript fetches data and dynamically renders the content."
    ]
  };
  
  // Server-Side Rendering (SSR)
  const ssr = {
    definition: "Rendering happens on the server before sending the complete HTML to the browser.",
    howItWorks: [
      "Server generates the full HTML content for the page.",
      "Browser receives the complete HTML and displays it immediately.",
      "JavaScript enhances the page for interactivity afterward."
    ],
    pros: [
      "Faster initial load time as content is pre-rendered.",
      "SEO-friendly as search engines can index the HTML content.",
      "Lighter processing requirements for low-power devices."
    ],
    cons: [
      "Higher server load as every request triggers server-side rendering.",
      "Slower navigation for subsequent pages since new HTML is fetched each time.",
      "Less dynamic and requires more effort for interactivity."
    ],
    exampleProcess: [
      "User requests a page (e.g., example.com/products).",
      "Server fetches data and generates a complete HTML file.",
      "Server sends the HTML to the browser.",
      "Browser displays the content immediately."
    ]
  };
  
  // Why Initial Load Time Differs
  const initialLoadDifference = {
    csr: "Slower because the browser receives a bare HTML file, downloads JavaScript, and fetches data to render the page.",
    ssr: "Faster because the browser receives a fully rendered HTML page ready for display."
  };
  
  // Comparison of CSR and SSR
  const comparison = {
    initialLoadTime: {
      csr: "Slower (HTML + JS + API calls)",
      ssr: "Faster (Pre-rendered HTML)"
    },
    subsequentPages: {
      csr: "Faster (handled in-browser without reloads)",
      ssr: "Slower (each page requires server render)"
    },
    seo: {
      csr: "Poorer (JavaScript-dependent content)",
      ssr: "Better (content visible in HTML)"
    },
    devicePerformance: {
      csr: "Heavier on client devices",
      ssr: "Lighter on client devices"
    },
    serverLoad: {
      csr: "Lower (work offloaded to browser)",
      ssr: "Higher (server does rendering work)"
    },
    useCases: {
      csr: "SPAs like Gmail, dashboards",
      ssr: "Content-heavy sites like blogs, landing pages, e-commerce"
    }
  };
  
  // Hybrid Approach
  const hybridApproach = {
    definition: "Combines SSR and CSR to optimize performance and flexibility.",
    howItWorks: [
      "Critical parts of the page are server-rendered for faster load and SEO.",
      "Remaining interactivity is added via client-side JavaScript."
    ],
    examples: "Frameworks like Next.js allow using SSR for initial load and CSR for dynamic updates."
  };
  
  // Exporting the Notes for Later Use
  module.exports = { csr, ssr, initialLoadDifference, comparison, hybridApproach };
  