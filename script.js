/**
 * Todo Item Card - Stage 1 (Interactive & Stateful)
 * Managed by Antigravity
 */

class TodoCard {
  constructor() {
    // Initial State
    this.state = {
      title: "Redesign the onboarding flow",
      description: "Update the new-user walkthrough screens to reflect the latest design system tokens, improve step clarity, and add contextual tooltips for key actions. This description is intentionally long to test the expand/collapse behavior of the card component.",
      status: "In Progress", // Allowed: "Pending", "In Progress", "Done"
      priority: "High", // Allowed: "Low", "Medium", "High"
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString().slice(0, 16), // Due in 2 days
      tags: ["Work", "Urgent", "Design"],
      isEditing: false,
      isExpanded: false
    };

    this.timer = null;
    this.init();
  }

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.render();
    this.startTimer();
  }

  cacheDOM() {
    this.card = document.querySelector('[data-testid="test-todo-card"]');
    this.displayMode = document.getElementById("todo-display-mode");
    this.editMode = document.getElementById("todo-edit-mode");
    
    // Display elements
    this.titleEl = document.getElementById("todo-title");
    this.descTextEl = document.getElementById("todo-description-text");
    this.descContainer = document.getElementById("todo-description-container");
    this.expandToggle = document.getElementById("expand-toggle");
    this.priorityIndicator = document.getElementById("priority-indicator");
    this.statusBadge = document.getElementById("status-badge");
    this.dueDateEl = document.getElementById("due-date-display");
    this.timeRemainingEl = document.getElementById("time-remaining");
    this.overdueBanner = document.getElementById("overdue-banner");
    this.tagsList = document.getElementById("todo-tags-list");
    this.checkbox = document.getElementById("complete-toggle");
    this.statusControl = document.getElementById("status-control");
    
    // Action buttons
    this.editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
    this.deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');
    
    // Form elements
    this.editForm = document.getElementById("todo-edit-mode");
    this.editTitleInput = document.getElementById("edit-title");
    this.editDescInput = document.getElementById("edit-description");
    this.editPrioritySelect = document.getElementById("edit-priority");
    this.editDueDateInput = document.getElementById("edit-due-date");
    this.cancelBtn = document.querySelector('[data-testid="test-todo-cancel-button"]');
  }

  bindEvents() {
    // Checkbox sync
    this.checkbox.addEventListener("change", (e) => {
      const newStatus = e.target.checked ? "Done" : "Pending";
      this.updateState({ status: newStatus });
    });

    // Status control sync
    this.statusControl.addEventListener("change", (e) => {
      this.updateState({ status: e.target.value });
    });

    // Expand toggle
    this.expandToggle.addEventListener("click", () => {
      this.updateState({ isExpanded: !this.state.isExpanded });
    });

    // Edit button
    this.editBtn.addEventListener("click", () => this.enterEditMode());

    // Cancel edit
    this.cancelBtn.addEventListener("click", () => this.exitEditMode(false));

    // Save edit
    this.editForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.exitEditMode(true);
    });

    // Delete button
    this.deleteBtn.addEventListener("click", () => {
      if (confirm(`Delete "${this.state.title}"?`)) {
        this.card.style.transform = "scale(0.95)";
        this.card.style.opacity = "0";
        setTimeout(() => this.card.remove(), 250);
      }
    });

    // Focus trap in edit mode (simple version)
    this.editForm.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const focusables = this.editForm.querySelectorAll('input, textarea, select, button');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
      if (e.key === 'Escape') this.exitEditMode(false);
    });
  }

  updateState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  startTimer() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => this.updateTimeDisplay(), 60000);
  }

  stopTimer() {
    if (this.timer) clearInterval(this.timer);
  }

  render() {
    const { title, description, status, priority, dueDate, tags, isEditing, isExpanded } = this.state;

    // View Toggling
    this.displayMode.style.display = isEditing ? "none" : "block";
    this.editMode.style.display = isEditing ? "flex" : "none";

    // Sync Checkbox & Status Values
    this.checkbox.checked = status === "Done";
    this.statusControl.value = status;
    
    // Status visual sync
    this.statusBadge.textContent = status;
    this.statusBadge.className = `badge ${status.toLowerCase().replace(" ", "")}`;
    this.card.classList.toggle("state-done", status === "Done");

    // Priority visual sync
    this.priorityIndicator.textContent = `${priority} Priority`;
    this.priorityIndicator.className = `badge ${priority.toLowerCase()}`;
    this.card.classList.remove("priority-high", "priority-medium", "priority-low");
    this.card.classList.add(`priority-${priority.toLowerCase()}`);

    // Text Content
    this.titleEl.textContent = title;
    this.descTextEl.textContent = description;

    // Expand/Collapse Logic
    const isOverFlown = description.length > 100; // Simplified threshold
    this.expandToggle.hidden = !isOverFlown;
    this.expandToggle.textContent = isExpanded ? "Show less" : "Show more";
    this.expandToggle.setAttribute("aria-expanded", isExpanded);
    this.descContainer.classList.toggle("expanded", isExpanded);

    // Meta Information
    const dateObj = new Date(dueDate);
    this.dueDateEl.textContent = `Due ${dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
    this.updateTimeDisplay();

    // Tags
    this.tagsList.innerHTML = tags.map(tag => `
      <li><span class="tag-chip" data-testid="test-todo-tag-${tag.toLowerCase()}">${tag}</span></li>
    `).join("");

    // Done status handling
    if (status === "Done") {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  updateTimeDisplay() {
    const { status, dueDate } = this.state;
    
    if (status === "Done") {
      this.timeRemainingEl.textContent = "Completed";
      this.overdueBanner.hidden = true;
      return;
    }

    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;
    const absDiff = Math.abs(diff);

    // Precise time formatting
    let timeStr = "";
    const mins = Math.floor(absDiff / 60000);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);

    if (days > 0) timeStr = `${days} day${days > 1 ? "s" : ""}`;
    else if (hrs > 0) timeStr = `${hrs} hour${hrs > 1 ? "s" : ""}`;
    else timeStr = `${mins} minute${mins > 1 ? "s" : ""}`;

    const isOverdue = diff < 0;
    this.timeRemainingEl.textContent = isOverdue ? `Overdue by ${timeStr}` : `Due in ${timeStr}`;
    this.overdueBanner.hidden = !isOverdue;
    this.timeRemainingEl.className = isOverdue ? "text-danger" : "";
  }

  enterEditMode() {
    this.updateState({ isEditing: true });
    
    // Populate form
    this.editTitleInput.value = this.state.title;
    this.editDescInput.value = this.state.description;
    this.editPrioritySelect.value = this.state.priority;
    this.editDueDateInput.value = this.state.dueDate;

    // Accessibility: Focus title input
    setTimeout(() => this.editTitleInput.focus(), 0);
  }

  exitEditMode(save = false) {
    if (save) {
      this.updateState({
        title: this.editTitleInput.value,
        description: this.editDescInput.value,
        priority: this.editPrioritySelect.value,
        dueDate: this.editDueDateInput.value,
        isEditing: false
      });
    } else {
      this.updateState({ isEditing: false });
    }

    // Return focus to edit button
    setTimeout(() => this.editBtn.focus(), 0);
  }
}

// Instantiate
document.addEventListener("DOMContentLoaded", () => {
  window.todoApp = new TodoCard();
});

