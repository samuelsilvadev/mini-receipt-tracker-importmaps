import "./style.css";

export function render() {
  return `
  <div class="flex items-center justify-center p-4 pt-8">
    <div class="w-full max-w-md">
      <div class="bg-white shadow-xl p-8">
        <div class="flex items-center justify-center mb-8">
          <h1 class="text-2xl font-bold text-gray-800 ml-3">New Receipt</h1>
        </div>

        <form id="add-receipt-form" class="space-y-6">
          <div class="space-y-2">
            <label
              for="itemName"
              class="block text-sm font-medium text-gray-700"
            >
              Item Name
            </label>
            <div class="relative">
              <input
                type="text"
                id="itemName"
                class="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                placeholder="Enter item name"
                required
                name="name"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label
              for="price"
              class="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <div class="relative">
              <input
                type="number"
                id="price"
                class="block w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
                name="price"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label
              for="date"
              class="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <div class="relative">
              <input
                type="date"
                id="date"
                class="block w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                required
                name="date"
              />
            </div>
          </div>

          <button
            id="add-receipt-form-submit"
            type="submit"
            class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-[1.02]"
          >
            Add Receipt
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
  `;
}

export function hydrate() {
  const $form = document.getElementById("add-receipt-form");
  const $submit = document.getElementById("add-receipt-form-submit");

  $form.addEventListener("submit", (event) => {
    $submit.setAttribute("disabled", true);
    event.preventDefault();

    const formData = new FormData($form);

    const name = formData.get("name");
    const price = formData.get("price");
    const date = formData.get("date");

    if (!name || !price || !date) {
      return;
    }

    window.parent.postMessage(
      { type: "REGISTER_RECEIPT", payload: { name, price, date } },
      "*",
    );

    $form.reset();
    $submit.removeAttribute("disabled");
  });
}
