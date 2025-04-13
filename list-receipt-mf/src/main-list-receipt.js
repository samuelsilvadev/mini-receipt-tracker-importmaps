import "./style.css";

const LIST_ITEM_TEMPLATE = `
  <li class="flex-1 min-w-0 flex items-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors p-4">
    <div>
      <h3 class="text-sm font-medium text-gray-900 truncate">
        {name}
      </h3>
      <p class="text-sm text-gray-500">{date}</p>
    </div>
    <div class="flex items-center gap-4 ml-auto">
      <span class="text-sm font-medium text-gray-900"> {price} </span>
      <button
        class="text-gray-400 hover:text-red-500 transition-colors"
      >
        🚮
      </button>
    </div>
  </li>
`;

export function render(data = []) {
  if (data.length === 0) {
    return `
    <div class="flex items-center justify-center p-4 pt-8">
      <div class="w-full max-w-md">
        <div class="bg-white shadow-xl p-8">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl font-bold text-gray-800">Recent Receipts</h2>
            <span id="amount-items" class="text-sm text-gray-500"
              >0 items</span
            >
          </div>

          <div class="space-y-4">
            <div id="empty" class="text-center py-8">
              <p class="text-gray-500">
                No receipts yet. <a href="/add">Add</a> your first one!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  }

  return `
  <div class="flex items-center justify-center p-4 pt-8">
    <div class="w-full max-w-md">
      <div class="bg-white shadow-xl p-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-gray-800">Recent Receipts</h2>
          <span id="amount-items" class="text-sm text-gray-500"
            >${data.length} items</span
          >
        </div>

        <div class="space-y-4">
          <div id="empty" class="text-center py-8">
            <p class="text-gray-500">
              No receipts yet. <a href="/add">Add</a> your first one!
            </p>
          </div>
          <div id="list-wrapper">
            <ul
              id="receipt-list"
              class="flex flex-col gap-4"
            >
              ${data
                .toReversed()
                .map((item) => {
                  return LIST_ITEM_TEMPLATE.replace("{name}", item.name)
                    .replace("{date}", item.date)
                    .replace("{price}", item.price);
                })
                .join("")}
              </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
}
