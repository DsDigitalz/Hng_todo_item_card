# Todo Item Card - Test Identifiers Reference

Complete reference of all `data-testid` attributes and how to locate them for automated testing.

## Quick Reference Table

| Element        | data-testid                 | HTML Tag    | Selector                                    | Purpose                  |
| -------------- | --------------------------- | ----------- | ------------------------------------------- | ------------------------ |
| Card Container | `test-todo-card`            | `<article>` | `[data-testid="test-todo-card"]`            | Root wrapper             |
| Title          | `test-todo-title`           | `<h2>`      | `[data-testid="test-todo-title"]`           | Task name                |
| Description    | `test-todo-description`     | `<p>`       | `[data-testid="test-todo-description"]`     | Task details             |
| Priority Badge | `test-todo-priority`        | `<span>`    | `[data-testid="test-todo-priority"]`        | High/Medium/Low          |
| Status Badge   | `test-todo-status`          | `<span>`    | `[data-testid="test-todo-status"]`          | Pending/In Progress/Done |
| Due Date       | `test-todo-due-date`        | `<time>`    | `[data-testid="test-todo-due-date"]`        | Deadline                 |
| Time Remaining | `test-todo-time-remaining`  | `<span>`    | `[data-testid="test-todo-time-remaining"]`  | Countdown/Overdue        |
| Checkbox       | `test-todo-complete-toggle` | `<input>`   | `[data-testid="test-todo-complete-toggle"]` | Mark complete            |
| Tags Container | `test-todo-tags`            | `<ul>`      | `[data-testid="test-todo-tags"]`            | Tag list                 |
| Work Tag       | `test-todo-tag-work`        | `<li>`      | `[data-testid="test-todo-tag-work"]`        | Category: work           |
| Urgent Tag     | `test-todo-tag-urgent`      | `<li>`      | `[data-testid="test-todo-tag-urgent"]`      | Category: urgent         |
| Edit Button    | `test-todo-edit-button`     | `<button>`  | `[data-testid="test-todo-edit-button"]`     | Modify task              |
| Delete Button  | `test-todo-delete-button`   | `<button>`  | `[data-testid="test-todo-delete-button"]`   | Remove task              |

## Detailed Element Descriptions

### 1. Root Card Container

```html
<article class="todo-card" data-testid="test-todo-card"></article>
```

- **Type**: Container/layout element
- **Purpose**: Main wrapper for the entire card
- **Selector**: `[data-testid="test-todo-card"]`
- **Expected**: Visible, contains all other elements

### 2. Task Title

```html
<h2 class="todo-title" data-testid="test-todo-title">
  Complete project documentation
</h2>
```

- **Type**: Heading (h2)
- **Purpose**: Show task name
- **Selector**: `[data-testid="test-todo-title"]`
- **Expected**: Text content visible, changes style when completed (strikethrough)
- **Accessibility**: Semantic heading for page structure

### 3. Task Description

```html
<p class="todo-description" data-testid="test-todo-description">
  Finalize all documentation and ensure it's ready for the team review.
</p>
```

- **Type**: Paragraph (p)
- **Purpose**: Show detailed task information
- **Selector**: `[data-testid="test-todo-description"]`
- **Expected**: Text content visible
- **Accessibility**: Semantic paragraph element

### 4. Priority Badge

```html
<span
  class="priority-badge priority-high"
  data-testid="test-todo-priority"
  aria-label="Priority: High"
>
  🔴 High
</span>
```

- **Type**: Indicator/badge
- **Purpose**: Show task priority level
- **Selector**: `[data-testid="test-todo-priority"]`
- **Expected Values**: "High" (🔴), "Medium" (🟡), "Low" (🟢)
- **CSS Classes**: `priority-high`, `priority-medium`, `priority-low`
- **Accessibility**: Has aria-label for screen readers

### 5. Status Badge

```html
<span
  class="status-badge status-pending"
  data-testid="test-todo-status"
  aria-label="Task status: Pending"
>
  Pending
</span>
```

- **Type**: Indicator/badge
- **Purpose**: Show current task status
- **Selector**: `[data-testid="test-todo-status"]`
- **Expected Values**: "Pending", "In Progress", "Done"
- **CSS Classes**: `status-pending`, `status-in-progress`, `status-done`
- **Accessibility**: Has aria-label for screen readers
- **Updates On**: Checkbox toggle

### 6. Due Date

```html
<time
  class="todo-due-date"
  data-testid="test-todo-due-date"
  datetime="2026-02-18T18:00:00Z"
  aria-label="Due date: Feb 18, 2026"
>
  📅 Due Feb 18, 2026
</time>
```

- **Type**: Time element
- **Purpose**: Show deadline date
- **Selector**: `[data-testid="test-todo-due-date"]`
- **Attributes**:
  - `datetime`: ISO 8601 format for machine-readable date
  - `aria-label`: For assistive technologies
- **Format**: Human-readable text with emoji
- **Accessibility**: Semantic `<time>` element

### 7. Time Remaining

```html
<span
  class="todo-time-remaining"
  data-testid="test-todo-time-remaining"
  aria-live="polite"
  aria-label="Time remaining"
>
  Due in 4 days
</span>
```

- **Type**: Status text
- **Purpose**: Show friendly countdown to deadline
- **Selector**: `[data-testid="test-todo-time-remaining"]`
- **Expected Values**:
  - "Due in 3 days"
  - "Due in 5 hours"
  - "Due tomorrow"
  - "Due in 30 minutes"
  - "Due now!"
  - "Overdue by 2 hours"
  - "Overdue by 1 day"
- **Updates**: Every 60 seconds (auto-refresh)
- **CSS Classes**:
  - `time-remaining-overdue`: Red text when past due
  - `time-remaining-urgent`: Orange/yellow text when <24 hours
- **Accessibility**: `aria-live="polite"` for screen reader announcements

### 8. Checkbox Toggle

```html
<input
  type="checkbox"
  id="todo-complete"
  class="todo-checkbox"
  data-testid="test-todo-complete-toggle"
  aria-label="Mark task as complete"
/>
<label for="todo-complete" class="checkbox-label"></label>
```

- **Type**: Checkbox input
- **Purpose**: Mark task as complete/incomplete
- **Selector**: `[data-testid="test-todo-complete-toggle"]`
- **Properties**:
  - `type="checkbox"`: Native checkbox
  - `id="todo-complete"`: Unique identifier
  - Associated label: Custom styled checkbox
- **Behavior**:
  - Toggles on click
  - Toggles on Space key press (when focused)
  - Updates status badge
  - Adds strikethrough to title
- **Keyboard Access**: Tab to focus, Space/Enter to toggle
- **Focus Indicator**: Blue outline when focused
- **Accessibility**:
  - Associated label for screen readers
  - aria-label attribute
  - Fully keyboard accessible

### 9. Tags Container

```html
<ul class="todo-tags" data-testid="test-todo-tags" role="list">
  <li class="tag" data-testid="test-todo-tag-work" role="listitem">
    <span class="tag-label">work</span>
  </li>
  <li class="tag" data-testid="test-todo-tag-urgent" role="listitem">
    <span class="tag-label">urgent</span>
  </li>
  <li class="tag" role="listitem">
    <span class="tag-label">documentation</span>
  </li>
</ul>
```

- **Type**: Unordered list
- **Purpose**: Show task categories/tags
- **Selector**: `[data-testid="test-todo-tags"]`
- **Child Elements**: List items `<li>` with `data-testid` for specific tags
- **Tag Selectors**:
  - Work tag: `[data-testid="test-todo-tag-work"]`
  - Urgent tag: `[data-testid="test-todo-tag-urgent"]`
  - Custom tags: No data-testid required
- **Accessibility**: Proper `<ul>`/`<li>` structure with role attributes
- **Styling**: Chips/pills with wrap behavior

### 10. Edit Button

```html
<button
  class="btn btn-edit"
  data-testid="test-todo-edit-button"
  aria-label="Edit this task"
>
  ✏️ Edit
</button>
```

- **Type**: Interactive button
- **Purpose**: Trigger edit action
- **Selector**: `[data-testid="test-todo-edit-button"]`
- **Text**: "✏️ Edit" (with emoji)
- **Accessibility**:
  - aria-label for clarity
  - Keyboard accessible (Tab + Enter/Space)
  - Visible focus indicator
- **Behavior**: Logs task info to console (can be extended)

### 11. Delete Button

```html
<button
  class="btn btn-delete"
  data-testid="test-todo-delete-button"
  aria-label="Delete this task"
>
  🗑️ Delete
</button>
```

- **Type**: Interactive button
- **Purpose**: Trigger delete action
- **Selector**: `[data-testid="test-todo-delete-button"]`
- **Text**: "🗑️ Delete" (with emoji)
- **Accessibility**:
  - aria-label for clarity
  - Keyboard accessible (Tab + Enter/Space)
  - Visible focus indicator
- **Behavior**:
  - Shows confirmation dialog
  - If confirmed, animates card fade out
  - Removes card from DOM

## CSS Class Reference

### Card-wide Classes

- `.todo-card`: Main container styling
- `.todo-container`: Wrapper for layout
- `.todo-header`: Title and checkbox section

### Checkbox Classes

- `.todo-checkbox`: Input styling (hidden)
- `.checkbox-label`: Custom visual checkbox
- `.todo-checkbox:focus + .checkbox-label`: Focus indicator
- `.todo-checkbox:checked + .checkbox-label`: Checked state

### Meta/Badge Classes

- `.todo-meta`: Container for badges
- `.status-badge`: Base status badge styling
- `.status-pending`, `.status-in-progress`, `.status-done`: Status colors
- `.priority-badge`: Base priority badge styling
- `.priority-high`, `.priority-medium`, `.priority-low`: Priority colors

### Content Classes

- `.todo-title`: Task title styling
- `.todo-description`: Task description styling
- `.todo-dates`: Date section container
- `.todo-due-date`: Due date styling
- `.todo-time-remaining`: Time remaining styling

### Tag Classes

- `.todo-tags-wrapper`: Tags section wrapper
- `.todo-tags`: Tags list styling
- `.tag`: Individual tag styling
- `.tag-label`: Tag text styling

### Button Classes

- `.todo-actions`: Button container
- `.btn`: Base button styling
- `.btn-edit`: Edit button specific styling
- `.btn-delete`: Delete button specific styling

### State Classes

- `.time-remaining-overdue`: Red/urgent styling for overdue
- `.time-remaining-urgent`: Orange warning for <24 hours

## Responsive Breakpoints

### Mobile (320px–480px)

```css
@media (max-width: 480px) {
  /* Reduced spacing and sized */
}
```

### Tablet (768px–1023px)

```css
@media (min-width: 768px) {
  /* Comfortable spacing */
}
```

### Desktop (1024px+)

```css
@media (min-width: 1024px) {
  /* Generous spacing, max-width: 500px */
}
```

## Testing Queries

### Get All Required Elements

```javascript
// JavaScript/DevTools
const required = {
  card: document.querySelector('[data-testid="test-todo-card"]'),
  title: document.querySelector('[data-testid="test-todo-title"]'),
  description: document.querySelector('[data-testid="test-todo-description"]'),
  priority: document.querySelector('[data-testid="test-todo-priority"]'),
  status: document.querySelector('[data-testid="test-todo-status"]'),
  dueDate: document.querySelector('[data-testid="test-todo-due-date"]'),
  timeRemaining: document.querySelector(
    '[data-testid="test-todo-time-remaining"]',
  ),
  checkbox: document.querySelector('[data-testid="test-todo-complete-toggle"]'),
  tags: document.querySelector('[data-testid="test-todo-tags"]'),
  tagWork: document.querySelector('[data-testid="test-todo-tag-work"]'),
  tagUrgent: document.querySelector('[data-testid="test-todo-tag-urgent"]'),
  editBtn: document.querySelector('[data-testid="test-todo-edit-button"]'),
  deleteBtn: document.querySelector('[data-testid="test-todo-delete-button"]'),
};
```

### Playwright/Cypress Selectors

```javascript
// Playwright
const checkbox = page.locator('[data-testid="test-todo-complete-toggle"]');
const status = page.locator('[data-testid="test-todo-status"]');

// Cypress
cy.get('[data-testid="test-todo-card"]');
cy.get('[data-testid="test-todo-title"]');
cy.get('[data-testid="test-todo-complete-toggle"]').check();
```

### Selenium XPath

```xpath
//article[@data-testid='test-todo-card']
//h2[@data-testid='test-todo-title']
//input[@data-testid='test-todo-complete-toggle']
//span[@data-testid='test-todo-status']
```

## State and Attributes Reference

### Checkbox States

| Attribute          | Unchecked        | Checked       |
| ------------------ | ---------------- | ------------- |
| `checked`          | `false`          | `true`        |
| Title style        | Normal           | Strikethrough |
| Title color        | `#222`           | `#999`        |
| Status badge text  | "Pending"        | "Done"        |
| Status badge class | `status-pending` | `status-done` |
| Card opacity       | `1`              | `0.8`         |

### Time Remaining States

| Condition             | Display              | Class                    |
| --------------------- | -------------------- | ------------------------ |
| <1 minute remaining   | "Due now!"           | `time-remaining-urgent`  |
| 1hr - 24hrs remaining | "Due in X hours"     | `time-remaining-urgent`  |
| Same day next day     | "Due tomorrow"       | (normal)                 |
| Multiple days         | "Due in X days"      | (normal)                 |
| Weeks away            | "Due in X weeks"     | (normal)                 |
| Past due              | "Overdue by X hours" | `time-remaining-overdue` |

### Priority Values

| Value  | Display     | Class             | Emoji |
| ------ | ----------- | ----------------- | ----- |
| High   | "🔴 High"   | `priority-high`   | 🔴    |
| Medium | "🟡 Medium" | `priority-medium` | 🟡    |
| Low    | "🟢 Low"    | `priority-low`    | 🟢    |

## Accessibility Attributes

```html
<!-- Time element with datetime -->
<time datetime="2026-02-18T18:00:00Z" aria-label="Due date: Feb 18, 2026">
  <!-- Checkbox with label -->
  <input id="todo-complete" aria-label="Mark task as complete" />
  <label for="todo-complete"></label>

  <!-- Live region for updates -->
  <span aria-live="polite" aria-label="Time remaining">
    <!-- Badges explanations -->
    <span aria-label="Priority: High">
      <span aria-label="Task status: Pending">
        <!-- Button accessible names -->
        <button aria-label="Edit this task">✏️ Edit</button>
        <button aria-label="Delete this task">🗑️ Delete</button>

        <!-- List structure -->
        <ul role="list" data-testid="test-todo-tags">
          <li role="listitem" data-testid="test-todo-tag-work">work</li>
        </ul></span
      ></span
    ></span
  ></time
>
```

## Common Testing Scenarios

### Scenario 1: Verify Element Existence

```bash
✓ Element exists in DOM
✓ Element is visible (not display: none)
✓ Element has correct data-testid
✓ Element has correct parent/structure
```

### Scenario 2: Verify Checkbox Behavior

```bash
✓ Checkbox is focusable (Tab key)
✓ Checkbox toggles on Space key
✓ Status changes to "Done" after toggle
✓ Title gets strikethrough after toggle
✓ Can toggle multiple times
```

### Scenario 3: Verify Accessibility

```bash
✓ Checkbox has associated label
✓ Buttons have aria-label or text content
✓ All focus indicators visible
✓ Keyboard navigation works (Tab/Shift+Tab)
✓ Screen reader reads all content
```

### Scenario 4: Verify Time Updates

```bash
✓ Time remaining shows initial value
✓ Value is reasonable (within ±5 minutes)
✓ Updates happen every 60 seconds
✓ Color changes when <24 hours
✓ Shows "Overdue" when past due date
```

### Scenario 5: Verify Responsive Layout

```bash
✓ No horizontal scroll at 320px
✓ Elements visible at all sizes
✓ Text doesn't overflow
✓ Buttons clickable at all sizes
✓ Layout adapts appropriately
```

---

**Last Updated**: April 14, 2026  
**Version**: 1.0.0 Beta
