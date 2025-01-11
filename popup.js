document.getElementById("fillFields").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: fillFormFields,
  });
});

function fillFormFields() {
  const fieldMappings = {
    utilities: "82",
    food: "873",
    "rent or mortgage": "437",
    clothing: "75",
    "household necessities": "90",
    "medical expenses": "90",
  };

  // Find all label elements
  const labels = document.getElementsByTagName("label");

  for (const label of labels) {
    // Get all text content, including nested elements
    const labelText = label.innerText.trim().toLowerCase();

    // Check if this label matches any of our mappings
    for (const [key, value] of Object.entries(fieldMappings)) {
      if (labelText.includes(key)) {
        // Find the associated input
        let input;
        if (label.getAttribute("for")) {
          input = document.getElementById(label.getAttribute("for"));
        }

        // If we found an input, fill it
        if (input) {
          input.value = value;
          // Dispatch an input event to trigger any listeners
          input.dispatchEvent(new Event("input", { bubbles: true }));
          break;
        }
      }
    }
  }
}
