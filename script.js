/**
 * Todo Item Card - JavaScript
 * Handles interactivity and time calculations
 */

// Due date (May 1, 2026 at 6:00 PM UTC)
const DUE = new Date("2026-05-01T18:00:00Z");

/**
 * Format and display the time remaining until due date
 */
function formatRemaining() {
  const now = new Date();
  const diff = DUE - now;
  const abs = Math.abs(diff);
  const mins = Math.round(abs / 60000);
  const hrs = Math.round(abs / 3600000);
  const days = Math.round(abs / 86400000);
  const el = document.getElementById("time-remaining");

  if (!el) return;

  let txt, cls;

  if (diff < 0) {
    // Overdue
    if (mins < 60) {
      txt = `Overdue by ${mins} min${mins !== 1 ? "s" : ""}`;
    } else if (hrs < 24) {
      txt = `Overdue by ${hrs} hr${hrs !== 1 ? "s" : ""}`;
    } else {
      txt = `Overdue by ${days} day${days !== 1 ? "s" : ""}`;
    }
    cls = "overdue";
  } else if (diff < 60000) {
    // Due in less than 1 minute
    txt = "Due now!";
    cls = "now";
  } else if (diff < 86400000) {
    // Due within today
    txt =
      hrs < 1
        ? `Due in ${mins} min${mins !== 1 ? "s" : ""}`
        : `Due in ${hrs} hr${hrs !== 1 ? "s" : ""}`;
    cls = "soon";
  } else if (days === 1) {
    // Due tomorrow
    txt = "Due tomorrow";
    cls = "soon";
  } else {
    // Due in multiple days
    txt = `Due in ${days} days`;
    cls = "ok";
  }

  el.textContent = txt;
  el.className = "time-remaining " + cls;
}

/**
 * Handle checkbox state change
 */
function setupCheckboxListener() {
  const checkbox = document.getElementById("complete-toggle");
  const title = document.getElementById("todo-title");
  const statusBadge = document.getElementById("status-badge");

  if (!checkbox) return;

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      // Mark as done
      title.classList.add("done");
      statusBadge.textContent = "Done";
      statusBadge.className = "badge badge-status done";
      statusBadge.setAttribute("aria-label", "Status: Done");
    } else {
      // Mark as in progress
      title.classList.remove("done");
      statusBadge.textContent = "In Progress";
      statusBadge.className = "badge badge-status inprogress";
      statusBadge.setAttribute("aria-label", "Status: In Progress");
    }
  });
}

/**
 * Handle edit button click
 */
function setupEditButton() {
  const editBtn = document.querySelector(
    '[data-testid="test-todo-edit-button"]',
  );
  if (!editBtn) return;

  editBtn.addEventListener("click", function () {
    const title =
      document.getElementById("todo-title")?.textContent || "Unknown";
    const description =
      document.querySelector('[data-testid="test-todo-description"]')
        ?.textContent || "";
    const priority =
      document.querySelector('[data-testid="test-todo-priority"]')
        ?.textContent || "";
    const status =
      document.querySelector('[data-testid="test-todo-status"]')?.textContent ||
      "";

    const taskInfo = `
EDIT MODE
─────────────────────
Title: ${title}
Status: ${status}
Priority: ${priority}
Description: ${description.substring(0, 50)}...

This is a demo. In production, this would open an edit modal or form.
`;

    console.log(taskInfo);
    alert(`Editing: "${title}"\n\nSee console for full details.`);
  });
}

/**
 * Handle delete button click
 */
function setupDeleteButton() {
  const deleteBtn = document.querySelector(
    '[data-testid="test-todo-delete-button"]',
  );
  if (!deleteBtn) return;

  deleteBtn.addEventListener("click", function () {
    const title =
      document.getElementById("todo-title")?.textContent || "this task";

    if (
      confirm(
        `Are you sure you want to delete "${title}"?\n\nThis action cannot be undone.`,
      )
    ) {
      const card = document.querySelector('[data-testid="test-todo-card"]');
      if (card) {
        // Animate removal
        card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        card.style.opacity = "0";
        card.style.transform = "scale(0.95)";

        // Remove after animation completes
        setTimeout(() => {
          card.remove();
          console.log(`Task "${title}" has been deleted.`);
          alert(`Task "${title}" has been deleted successfully.`);
        }, 300);
      }
    } else {
      console.log(`Delete cancelled for "${title}".`);
    }
  });
}

/**
 * Initialize on page load
 */
document.addEventListener("DOMContentLoaded", function () {
  // Initial time calculation
  formatRemaining();

  // Update every 60 seconds
  setInterval(formatRemaining, 60000);

  // Setup checkbox listener
  setupCheckboxListener();

  // Setup edit button
  setupEditButton();

  // Setup delete button
  setupDeleteButton();
});
