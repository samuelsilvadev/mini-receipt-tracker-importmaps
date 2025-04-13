import "./style.css";
import { ReceiptsStore } from "./stores";
import { Routes } from "./routes";

console.log("main-shell.js running.");

const receiptsStore = new ReceiptsStore();

const NAVIGATION_MODULE_NAME = "@navigation";

const NAVIGATION = [
  {
    url: "/",
    modulePath: "@receipt-list",
    title: "Receipts",
  },
  {
    url: "/add",
    modulePath: "@receipt-add",
    title: "Track Receipt",
  },
];

const LOADERS_PER_ROUTE = new Map([["/", () => receiptsStore.receipts]]);
const $navigation = document.getElementById("navigation");
const $container = document.getElementById("container");

document.addEventListener("DOMContentLoaded", async () => {
  console.log("main-shell.js loaded.");

  const navigation = await import(/* @vite-ignore */ NAVIGATION_MODULE_NAME);

  if (navigation) {
    $navigation.innerHTML = navigation.render(NAVIGATION);
    navigation.hydrate();
    receiptsStore.activate();
    loadMFEByPathname();
  }
});

window.addEventListener("message", (event) => {
  if (event.data.type === "NAVIGATE") {
    const url = event.data.payload;
    Routes.push(url);
    loadMFEByPathname();
  }
});

window.addEventListener("popstate", () => {
  loadMFEByPathname();
});

function getCurrentRoute() {
  const currentPathname = window.location.pathname;

  return NAVIGATION.find(({ url }) => url === currentPathname);
}

async function loadMFEByPathname() {
  const currentRoute = getCurrentRoute();

  if (currentRoute) {
    const module = await import(/* @vite-ignore */ currentRoute.modulePath);
    const loader = LOADERS_PER_ROUTE.get(currentRoute.url);

    $container.innerHTML = module.render(loader?.());

    module.hydrate?.();
  }
}
