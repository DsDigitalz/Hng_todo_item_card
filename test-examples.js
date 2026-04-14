/**
 * Todo Item Card - Test Examples
 *
 * These are example test cases for the Todo Item Card component.
 * Can be used with testing frameworks like Jest, Vitest, Playwright, or Cypress.
 */

// ============================================
// Jest / Vitest Unit Tests (Example)
// ============================================

describe("TodoCard Component", () => {
  let todoCard;
  let container;

  beforeEach(() => {
    // Load HTML fixture
    document.body.innerHTML = `
            <article class="todo-card" data-testid="test-todo-card">
                <div class="todo-header">
                    <div class="todo-checkbox-wrapper">
                        <input 
                            type="checkbox" 
                            id="todo-complete" 
                            class="todo-checkbox"
                            data-testid="test-todo-complete-toggle"
                            aria-label="Mark task as complete"
                        >
                        <label for="todo-complete" class="checkbox-label"></label>
                    </div>
                    <h2 class="todo-title" data-testid="test-todo-title">
                        Complete project documentation
                    </h2>
                </div>

                <div class="todo-meta">
                    <span 
                        class="status-badge status-pending" 
                        data-testid="test-todo-status"
                        aria-label="Task status: Pending"
                    >
                        Pending
                    </span>
                    <span 
                        class="priority-badge priority-high" 
                        data-testid="test-todo-priority"
                        aria-label="Priority: High"
                    >
                        🔴 High
                    </span>
                </div>

                <p class="todo-description" data-testid="test-todo-description">
                    Finalize all documentation
                </p>

                <div class="todo-dates">
                    <time 
                        class="todo-due-date"
                        data-testid="test-todo-due-date"
                        datetime="2026-02-18T18:00:00Z"
                    >
                        📅 Due Feb 18, 2026
                    </time>
                    <span 
                        class="todo-time-remaining"
                        data-testid="test-todo-time-remaining"
                        aria-live="polite"
                    >
                        Due in 4 days
                    </span>
                </div>

                <ul class="todo-tags" data-testid="test-todo-tags" role="list">
                    <li class="tag" data-testid="test-todo-tag-work" role="listitem">
                        <span class="tag-label">work</span>
                    </li>
                    <li class="tag" data-testid="test-todo-tag-urgent" role="listitem">
                        <span class="tag-label">urgent</span>
                    </li>
                </ul>

                <div class="todo-actions">
                    <button data-testid="test-todo-edit-button" aria-label="Edit this task">
                        ✏️ Edit
                    </button>
                    <button data-testid="test-todo-delete-button" aria-label="Delete this task">
                        🗑️ Delete
                    </button>
                </div>
            </article>
        `;

    // Mock TodoCard for testing
    todoCard = {
      card: document.querySelector('[data-testid="test-todo-card"]'),
      checkbox: document.querySelector(
        '[data-testid="test-todo-complete-toggle"]',
      ),
      title: document.querySelector('[data-testid="test-todo-title"]'),
      statusBadge: document.querySelector('[data-testid="test-todo-status"]'),
      editBtn: document.querySelector('[data-testid="test-todo-edit-button"]'),
      deleteBtn: document.querySelector(
        '[data-testid="test-todo-delete-button"]',
      ),
      isCompleted: false,
      currentStatus: "Pending",
      dueDateObj: new Date("2026-02-18T18:00:00Z"),
    };
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  // ============================================
  // DOM Structure Tests
  // ============================================

  describe("DOM Structure", () => {
    test("should have root card container with correct data-testid", () => {
      expect(
        document.querySelector('[data-testid="test-todo-card"]'),
      ).toBeTruthy();
      expect(
        document.querySelector('[data-testid="test-todo-card"]').tagName,
      ).toBe("ARTICLE");
    });

    test("should have title with correct data-testid", () => {
      const title = document.querySelector('[data-testid="test-todo-title"]');
      expect(title).toBeTruthy();
      expect(title.tagName).toBe("H2");
      expect(title.textContent).toContain("Complete project documentation");
    });

    test("should have description with correct data-testid", () => {
      const description = document.querySelector(
        '[data-testid="test-todo-description"]',
      );
      expect(description).toBeTruthy();
      expect(description.tagName).toBe("P");
    });

    test("should have priority badge with correct data-testid", () => {
      const priority = document.querySelector(
        '[data-testid="test-todo-priority"]',
      );
      expect(priority).toBeTruthy();
      expect(priority.textContent).toContain("High");
    });

    test("should have status badge with correct data-testid", () => {
      const status = document.querySelector('[data-testid="test-todo-status"]');
      expect(status).toBeTruthy();
      expect(status.textContent).toBe("Pending");
    });

    test("should have due date with correct data-testid and datetime", () => {
      const dueDate = document.querySelector(
        '[data-testid="test-todo-due-date"]',
      );
      expect(dueDate).toBeTruthy();
      expect(dueDate.tagName).toBe("TIME");
      expect(dueDate.getAttribute("datetime")).toBe("2026-02-18T18:00:00Z");
    });

    test("should have time remaining element with aria-live", () => {
      const timeRemaining = document.querySelector(
        '[data-testid="test-todo-time-remaining"]',
      );
      expect(timeRemaining).toBeTruthy();
      expect(timeRemaining.getAttribute("aria-live")).toBe("polite");
    });
  });

  // ============================================
  // Checkbox Tests
  // ============================================

  describe("Checkbox Functionality", () => {
    test("should have checkbox input with correct data-testid", () => {
      const checkbox = document.querySelector(
        '[data-testid="test-todo-complete-toggle"]',
      );
      expect(checkbox).toBeTruthy();
      expect(checkbox.type).toBe("checkbox");
    });

    test("checkbox should be initially unchecked", () => {
      const checkbox = document.querySelector(
        '[data-testid="test-todo-complete-toggle"]',
      );
      expect(checkbox.checked).toBe(false);
    });

    test("checkbox should be focusable", () => {
      const checkbox = document.querySelector(
        '[data-testid="test-todo-complete-toggle"]',
      );
      checkbox.focus();
      expect(document.activeElement).toBe(checkbox);
    });

    test("checkbox should have associated label", () => {
      const checkbox = document.querySelector(
        '[data-testid="test-todo-complete-toggle"]',
      );
      const label = document.querySelector(`label[for="${checkbox.id}"]`);
      expect(label).toBeTruthy();
    });

    test("checkbox should have aria-label", () => {
      const checkbox = document.querySelector(
        '[data-testid="test-todo-complete-toggle"]',
      );
      expect(checkbox.getAttribute("aria-label")).toBeTruthy();
    });
  });

  // ============================================
  // Accessibility Tests
  // ============================================

  describe("Accessibility", () => {
    test("all buttons should have accessible names", () => {
      const buttons = document.querySelectorAll("button");
      buttons.forEach((btn) => {
        const hasTitle =
          btn.textContent.trim() || btn.getAttribute("aria-label");
        expect(hasTitle).toBeTruthy();
      });
    });

    test("edit button should have aria-label", () => {
      const editBtn = document.querySelector(
        '[data-testid="test-todo-edit-button"]',
      );
      expect(editBtn.getAttribute("aria-label")).toBe("Edit this task");
    });

    test("delete button should have aria-label", () => {
      const deleteBtn = document.querySelector(
        '[data-testid="test-todo-delete-button"]',
      );
      expect(deleteBtn.getAttribute("aria-label")).toBe("Delete this task");
    });

    test("priority badge should have aria-label", () => {
      const priority = document.querySelector(
        '[data-testid="test-todo-priority"]',
      );
      expect(priority.getAttribute("aria-label")).toBeTruthy();
    });

    test("status badge should have aria-label", () => {
      const status = document.querySelector('[data-testid="test-todo-status"]');
      expect(status.getAttribute("aria-label")).toBeTruthy();
    });

    test("semantic HTML should be used for structure", () => {
      expect(document.querySelector("article")).toBeTruthy();
      expect(document.querySelector("h2")).toBeTruthy();
      expect(document.querySelector("time")).toBeTruthy();
      expect(document.querySelector("button")).toBeTruthy();
      expect(document.querySelector('input[type="checkbox"]')).toBeTruthy();
      expect(document.querySelector("ul")).toBeTruthy();
    });
  });

  // ============================================
  // Tags Tests
  // ============================================

  describe("Tags", () => {
    test("should have tags container with correct data-testid", () => {
      const tags = document.querySelector('[data-testid="test-todo-tags"]');
      expect(tags).toBeTruthy();
      expect(tags.tagName).toBe("UL");
    });

    test("should have work tag with correct data-testid", () => {
      const workTag = document.querySelector(
        '[data-testid="test-todo-tag-work"]',
      );
      expect(workTag).toBeTruthy();
      expect(workTag.textContent).toContain("work");
    });

    test("should have urgent tag with correct data-testid", () => {
      const urgentTag = document.querySelector(
        '[data-testid="test-todo-tag-urgent"]',
      );
      expect(urgentTag).toBeTruthy();
      expect(urgentTag.textContent).toContain("urgent");
    });

    test("should have proper list structure", () => {
      const tags = document.querySelector('[data-testid="test-todo-tags"]');
      const listItems = tags.querySelectorAll("li");
      expect(listItems.length).toBeGreaterThan(0);
      listItems.forEach((li) => {
        expect(li.getAttribute("role")).toBe("listitem");
      });
    });
  });

  // ============================================
  // Action Buttons Tests
  // ============================================

  describe("Action Buttons", () => {
    test("edit button should exist and be clickable", () => {
      const editBtn = document.querySelector(
        '[data-testid="test-todo-edit-button"]',
      );
      expect(editBtn).toBeTruthy();
      expect(editBtn.tagName).toBe("BUTTON");
    });

    test("delete button should exist and be clickable", () => {
      const deleteBtn = document.querySelector(
        '[data-testid="test-todo-delete-button"]',
      );
      expect(deleteBtn).toBeTruthy();
      expect(deleteBtn.tagName).toBe("BUTTON");
    });

    test("edit button should be keyboard accessible", () => {
      const editBtn = document.querySelector(
        '[data-testid="test-todo-edit-button"]',
      );
      editBtn.focus();
      expect(document.activeElement).toBe(editBtn);
    });

    test("delete button should be keyboard accessible", () => {
      const deleteBtn = document.querySelector(
        '[data-testid="test-todo-delete-button"]',
      );
      deleteBtn.focus();
      expect(document.activeElement).toBe(deleteBtn);
    });
  });

  // ============================================
  // Time Remaining Tests
  // ============================================

  describe("Time Remaining Calculations", () => {
    test("should display time remaining on load", () => {
      const timeRemaining = document.querySelector(
        '[data-testid="test-todo-time-remaining"]',
      );
      expect(timeRemaining.textContent).toBeTruthy();
    });

    test("time remaining text should be meaningful", () => {
      const timeRemaining = document.querySelector(
        '[data-testid="test-todo-time-remaining"]',
      );
      const text = timeRemaining.textContent;

      // Should contain one of these patterns
      const validPatterns = [
        /Due in \d+/, // "Due in 4 days"
        /Due tomorrow/, // "Due tomorrow"
        /Due now/, // "Due now!"
        /Overdue/, // "Overdue by..."
      ];

      expect(validPatterns.some((pattern) => pattern.test(text))).toBe(true);
    });
  });
});

// ============================================
// Cypress E2E Tests (Example)
// ============================================

describe("Todo Card E2E Tests", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  describe("Page Load", () => {
    it("should load the page successfully", () => {
      cy.get('[data-testid="test-todo-card"]').should("exist");
    });

    it("should display all required elements", () => {
      cy.get('[data-testid="test-todo-card"]').should("be.visible");
      cy.get('[data-testid="test-todo-title"]').should("be.visible");
      cy.get('[data-testid="test-todo-description"]').should("be.visible");
      cy.get('[data-testid="test-todo-priority"]').should("be.visible");
      cy.get('[data-testid="test-todo-status"]').should("be.visible");
      cy.get('[data-testid="test-todo-due-date"]').should("be.visible");
      cy.get('[data-testid="test-todo-time-remaining"]').should("be.visible");
      cy.get('[data-testid="test-todo-complete-toggle"]').should("exist");
      cy.get('[data-testid="test-todo-tags"]').should("be.visible");
      cy.get('[data-testid="test-todo-edit-button"]').should("be.visible");
      cy.get('[data-testid="test-todo-delete-button"]').should("be.visible");
    });
  });

  describe("Checkbox Interaction", () => {
    it("should toggle checkbox on click", () => {
      cy.get('[data-testid="test-todo-complete-toggle"]')
        .should("not.be.checked")
        .click()
        .should("be.checked");
    });

    it("should update status to Done when checked", () => {
      cy.get('[data-testid="test-todo-complete-toggle"]').click();
      cy.get('[data-testid="test-todo-status"]').should("contain", "Done");
    });

    it("should toggle with Space key", () => {
      cy.get('[data-testid="test-todo-complete-toggle"]').focus().type(" ");
      cy.get('[data-testid="test-todo-complete-toggle"]').should("be.checked");
    });
  });

  describe("Keyboard Navigation", () => {
    it("should tab through interactive elements", () => {
      cy.get('[data-testid="test-todo-complete-toggle"]').focus();
      cy.focused().should(
        "have.attr",
        "data-testid",
        "test-todo-complete-toggle",
      );

      cy.tab();
      cy.focused().should("have.attr", "data-testid", "test-todo-edit-button");

      cy.tab();
      cy.focused().should(
        "have.attr",
        "data-testid",
        "test-todo-delete-button",
      );
    });

    it("all buttons should be focusable", () => {
      cy.get('[data-testid="test-todo-edit-button"]').focus();
      cy.focused().should("be.visible");

      cy.get('[data-testid="test-todo-delete-button"]').focus();
      cy.focused().should("be.visible");
    });
  });

  describe("Button Actions", () => {
    it("edit button should log task info on click", () => {
      cy.window().then((win) => {
        cy.spy(win.console, "log");
        cy.get('[data-testid="test-todo-edit-button"]').click();
        cy.window().its("console.log").should("be.called");
      });
    });

    it("delete button should appear and be accessible", () => {
      cy.get('[data-testid="test-todo-delete-button"]').should("be.visible");
    });
  });

  describe("Responsive Design", () => {
    it("should be visible on mobile (320px)", () => {
      cy.viewport(320, 568);
      cy.get('[data-testid="test-todo-card"]').should("be.visible");
      cy.get('[data-testid="test-todo-title"]').should("be.visible");
    });

    it("should be visible on tablet (768px)", () => {
      cy.viewport(768, 1024);
      cy.get('[data-testid="test-todo-card"]').should("be.visible");
    });

    it("should be visible on desktop (1200px)", () => {
      cy.viewport(1200, 800);
      cy.get('[data-testid="test-todo-card"]').should("be.visible");
    });

    it("should not have horizontal overflow on mobile", () => {
      cy.viewport(320, 568);
      cy.get("body").then(($body) => {
        expect($body[0].scrollWidth).to.equal($body[0].clientWidth);
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      cy.get('[data-testid="test-todo-title"]').find("h2").should("exist");
    });

    it("checkbox should have label", () => {
      cy.get('[data-testid="test-todo-complete-toggle"]')
        .should("have.attr", "id")
        .then((id) => {
          cy.get(`label[for="${id}"]`).should("exist");
        });
    });

    it("should have semantic HTML elements", () => {
      cy.get('[data-testid="test-todo-card"]').should(
        "have.prop",
        "tagName",
        "ARTICLE",
      );
      cy.get('[data-testid="test-todo-due-date"]').should(
        "have.prop",
        "tagName",
        "TIME",
      );
      cy.get('[data-testid="test-todo-tags"]').should(
        "have.prop",
        "tagName",
        "UL",
      );
    });
  });
});

// ============================================
// Manual Testing Checklist
// ============================================

/*
MANUAL TESTING CHECKLIST:

DOM & Structure:
☐ Root card container has data-testid="test-todo-card"
☐ Title has data-testid="test-todo-title" and is an h2
☐ Description has data-testid="test-todo-description" and is a p
☐ Priority badge has data-testid="test-todo-priority"
☐ Status badge has data-testid="test-todo-status"
☐ Due date has data-testid="test-todo-due-date" and is a time element
☐ Time remaining has data-testid="test-todo-time-remaining"
☐ Checkbox has data-testid="test-todo-complete-toggle"
☐ Tags container has data-testid="test-todo-tags"
☐ Work tag has data-testid="test-todo-tag-work"
☐ Urgent tag has data-testid="test-todo-tag-urgent"
☐ Edit button has data-testid="test-todo-edit-button"
☐ Delete button has data-testid="test-todo-delete-button"

Checkbox Interactive:
☐ Checkbox is visibly clickable
☐ Checkbox can be toggled by clicking
☐ Checkbox can be toggled with Space key (when focused)
☐ Checkbox has focus indicator when tabbed to
☐ Container has focus outline visible
☐ When checked, title gets strikethrough
☐ When checked, status changes to "Done"
☐ When unchecked, title strikethrough removed
☐ When unchecked, status changes to "Pending"

Accessibility:
☐ Checkbox has associated label
☐ All buttons have visible text or aria-label
☐ Can tab through: checkbox → edit → delete
☐ Shift+Tab works to navigate backwards
☐ All elements have sufficient color contrast
☐ Focus indicators are visible (blue outline)
☐ Screen reader reads all element purposes correctly

Buttons:
☐ Edit button appears and is clickable
☐ Edit button is keyboard focusable
☐ Delete button appears and is clickable
☐ Delete button is keyboard focusable
☐ Edit button console.logs task info on click
☐ Delete button shows confirmation dialog on click

Time Remaining:
☐ Time remaining shows a meaningful value
☐ Time remaining text matches one of the patterns
☐ Text includes "Due in", "Due tomorrow", "Due now!", or "Overdue by"
☐ Time remaining is roughly accurate (within a few minutes)

Responsiveness (320px mobile):
☐ No horizontal scroll
☐ All text readable
☐ All buttons clickable
☐ Checkbox accessible
☐ Tags wrap properly
☐ No text overflow

Responsiveness (768px tablet):
☐ Card looks comfortable
☐ All elements properly spaced
☐ Tags layout appropriate
☐ Buttons properly sized

Responsiveness (1200px+ desktop):
☐ Card has max-width and centers
☐ All elements properly spaced
☐ Professional appearance

Tags:
☐ Tags display correctly
☐ "work" tag has data-testid="test-todo-tag-work"
☐ "urgent" tag has data-testid="test-todo-tag-urgent"
☐ Tags are styled as chips/pills
☐ Tags wrap to next line if needed

Visual Design:
☐ Card has shadow and looks modern
☐ Colors are appealing
☐ Spacing feels balanced
☐ Gradient background looks good
☐ Badges have appropriate colors
☐ Completed state is visually distinct

*/
