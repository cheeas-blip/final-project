const statusDiv = document.getElementById("status");
const itemList = document.getElementById("itemList");

// Load items
function loadItems() {
  statusDiv.innerText = "Loading...";

  fetch('/api/items')
    .then(res => res.json())
    .then(data => {
      itemList.innerHTML = "";
      data.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.name;
        itemList.appendChild(li);
      });
      statusDiv.innerText = "";
    })
    .catch(err => {
      statusDiv.innerText = "Error loading data";
    });
}

// Add item
function addItem() {
  const input = document.getElementById("itemInput");
  const name = input.value;

  if (!name) return;

  fetch('/api/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  })
  .then(res => res.json())
  .then(() => {
    input.value = "";
    loadItems();
  });
}

// Load on start
loadItems();