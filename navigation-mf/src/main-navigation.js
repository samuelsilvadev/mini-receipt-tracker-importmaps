import "./style.css";

const EVENT_TYPES = {
  NAVIGATE: "NAVIGATE",
};

export function render(data = []) {
  return `
  <nav id="navigation-mf" class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <span
          class="flex items-center ml-2 text-xl font-semibold text-gray-800"
        >
          ReceiptTracker
        </span>

        <ul id="navigation-list-mf" class="flex items-center space-x-8 gap-4">
          ${data
            .map((item) => {
              return `
                <li>
                  <a href="${item.url}"
                    class="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
                    data-mf-navigation-link="true">
                    ${item.title}
                  </a>
                </li>
              `;
            })
            .join("")}
        </ul>
      </div>
    </div>
  </nav>
  `;
}

export function hydrate() {
  const $links = document.querySelectorAll("[data-mf-navigation-link=true]");
  $links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      sendNavigation(link.getAttribute("href"));
    });
  });
}

function sendNavigation(data) {
  window.parent.postMessage({ type: EVENT_TYPES.NAVIGATE, payload: data }, "*");
}
