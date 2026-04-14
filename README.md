# Todo Item Card Component

A clean, modern, testable Todo/Task Card component built with semantic HTML, vanilla JavaScript, and comprehensive accessibility features.

## Features

✅ **Fully Testable** - All required elements have exact `data-testid` attributes  
✅ **Accessible** - WCAG AA compliant with keyboard navigation and screen reader support  
✅ **Responsive** - Works perfectly from 320px to 1200px+ screen widths  
✅ **Semantic HTML** - Proper use of `<article>`, `<time>`, `<button>`, `<input>`, and other semantic elements  
✅ **Live Updates** - Time remaining updates every 60 seconds automatically  
✅ **Interactive** - Checkbox toggle with visual feedback and status updates  
✅ **Modern Styling** - Beautiful gradient design with hover effects and smooth transitions  
✅ **Dark Mode** - Automatic dark mode support via CSS media queries

## Required Elements

| Element             | data-testid                 | Status |
| ------------------- | --------------------------- | ------ |
| Root card container | `test-todo-card`            | ✅     |
| Task title          | `test-todo-title`           | ✅     |
| Task description    | `test-todo-description`     | ✅     |
| Priority badge      | `test-todo-priority`        | ✅     |
| Due date            | `test-todo-due-date`        | ✅     |
| Time remaining      | `test-todo-time-remaining`  | ✅     |
| Status indicator    | `test-todo-status`          | ✅     |
| Checkbox toggle     | `test-todo-complete-toggle` | ✅     |
| Tags container      | `test-todo-tags`            | ✅     |
| Tag (work)          | `test-todo-tag-work`        | ✅     |
| Tag (urgent)        | `test-todo-tag-urgent`      | ✅     |
| Edit button         | `test-todo-edit-button`     | ✅     |
| Delete button       | `test-todo-delete-button`   | ✅     |

## File Structure

```
todo_item_card/
├── index.html      # Main HTML file with semantic markup
├── styles.css      # Comprehensive styling + responsive design
├── script.js       # JavaScript interactivity & time calculations
└── README.md       # This file
```

## How to Use

### 1. Open in Browser

Simply open `index.html` in any modern web browser:

```bash
# If you have a local server (recommended)
python3 -m http.server 8000
# Then visit: http://localhost:8000

# Or just double-click index.html (not recommended for production)
```

### 2. HTML Structure

The component uses semantic HTML:

- `<article>` as the root container
- `<input type="checkbox">` with associated `<label>` for accessibility
- `<h2>` for the task title
- `<p>` for the description
- `<time>` element with `datetime` attribute for the due date
- `<button>` elements for actions
- `<ul>` with `<li>` for tags

### 3. Accessible Checkbox

The checkbox is fully keyboard accessible:

```html
<input
  type="checkbox"
  id="todo-complete"
  data-testid="test-todo-complete-toggle"
/>
<label for="todo-complete" class="checkbox-label"></label>
```

- **Keyboard**: Press `Tab` to focus, `Space` to toggle
- **Screen Reader**: Announces "Mark task as complete"
- **Focus Indicator**: Visible blue outline when focused

### 4. Time Remaining Logic

The component calculates time remaining from a fixed due date (Feb 18, 2026 at 18:00 UTC):

```javascript
Overdue by 2 hours  // Past due date
Due now!            // Less than 1 minute
Due in 30 minutes   // 30 minutes or less remaining
Due in 5 hours      // Hours remaining
Due tomorrow        // Less than 24 hours
Due in 3 days       // Days remaining
Due in 2 weeks      // Weeks remaining
```

Updates automatically every 60 seconds.

## Testing

### Manual Testing Checklist

- [ ] All `data-testid` attributes present and visible
- [ ] Checkbox is focusable with Tab key
- [ ] Checkbox toggles on Space/Enter key press
- [ ] Checkbox toggle updates status to "Done" or "Pending"
- [ ] Title gets strikethrough when completed
- [ ] Time remaining updates periodically
- [ ] Edit button console.logs task details
- [ ] Delete button prompts for confirmation
- [ ] All elements visible at 320px width (mobile)
- [ ] No horizontal scroll at any screen size
- [ ] Buttons are keyboard accessible

### Browser DevTools Testing

```javascript
// Verify elements exist
document.querySelector('[data-testid="test-todo-card"]');
document.querySelector('[data-testid="test-todo-title"]');
document.querySelector('[data-testid="test-todo-complete-toggle"]');

// Check checkbox state
document.querySelector('[data-testid="test-todo-complete-toggle"]').checked;

// Simulate checkbox toggle
document.querySelector('[data-testid="test-todo-complete-toggle"]').click();

// Access the TodoCard instance
window.todoCard;
window.todoCard.isCompleted;
window.todoCard.currentStatus;
```

### Automated Test Query Selectors

#### For E2E Testing (Playwright/Cypress/Selenium):

```javascript
// Get all required elements
const card = page.locator('[data-testid="test-todo-card"]');
const title = page.locator('[data-testid="test-todo-title"]');
const checkbox = page.locator('[data-testid="test-todo-complete-toggle"]');
const status = page.locator('[data-testid="test-todo-status"]');
const priority = page.locator('[data-testid="test-todo-priority"]');
const dueDate = page.locator('[data-testid="test-todo-due-date"]');
const timeRemaining = page.locator('[data-testid="test-todo-time-remaining"]');
const editBtn = page.locator('[data-testid="test-todo-edit-button"]');
const deleteBtn = page.locator('[data-testid="test-todo-delete-button"]');
const tags = page.locator('[data-testid="test-todo-tags"]');
const tagWork = page.locator('[data-testid="test-todo-tag-work"]');

// Test checkbox toggle
await checkbox.check();
await expect(status).toContainText("Done");

// Test keyboard navigation
await checkbox.focus();
await keyboard.press("Space");
```

#### For Accessibility Testing:

```javascript
// Verify checkbox is labeled
const checkbox = document.querySelector(
  '[data-testid="test-todo-complete-toggle"]',
);
const label = document.querySelector(`label[for="${checkbox.id}"]`);
console.assert(label, "Checkbox must have associated label");

// Verify all buttons have names
const buttons = document.querySelectorAll("button");
buttons.forEach((btn) => {
  console.assert(
    btn.textContent.trim() || btn.getAttribute("aria-label"),
    "Button must have text or aria-label",
  );
});
```

## Accessibility Features

### Keyboard Navigation

- **Tab**: Navigate through checkbox, edit button, delete button
- **Space / Enter**: Toggle checkbox (when focused)
- **Focus visible**: All interactive elements have visible focus indicators (blue outline)

### Screen Reader Support

- Semantic HTML structure for proper navigation
- Checkbox has associated `<label>` or `aria-label`
- Buttons have visible text or `aria-label`
- Status and priority badges have `aria-label`
- Live region (`aria-live="polite"`) for time-remaining updates
- ARIA announcements for state changes (edit, delete, toggle)

### Visual Accessibility

- **Color Contrast**: WCAG AA compliant (4.5:1 for text on backgrounds)
- **Focus Styles**: Visible 3px blue outline with 2px offset
- **Text Size**: Comfortable base of 16px, scales proportionally on mobile
- **Touch Targets**: Minimum 44px height/width for buttons and checkbox (mobile-friendly)

### Responsive Accessibility

- Text doesn't overflow at any screen size
- All form controls remain accessible on mobile
- Proper spacing maintained at all breakpoints

## Responsive Design

### Breakpoints

- **Mobile (320px–480px)**: Stacked layout, reduced padding
- **Tablet (768px–1023px)**: Comfortable spacing, full features
- **Desktop (1024px+)**: Max-width 500px card, generous padding

### Mobile Considerations (320px)

- Reduced font sizes
- Tighter spacing (1rem padding)
- Compact badges
- Accessible touch targets

### Features at Different Sizes

- **All sizes**: Full functionality and keyboard navigation
- **Mobile**: Vertical tag layout with proper wrap
- **All sizes**: No horizontal overflow

## JavaScript API

### TodoCard Class

#### Constructor

```javascript
const todo = new TodoCard();
```

#### Properties

- `isCompleted` - Boolean for completion state
- `currentStatus` - String ("Pending" or "Done")
- `dueDateObj` - Date object for due date

#### Methods

**updateTimeRemaining()**

```javascript
// Recalculate and update time remaining display
todo.updateTimeRemaining();
```

**updateTask(updates)**

```javascript
// Update multiple fields
todo.updateTask({
  title: "New title",
  description: "New description",
  priority: "medium",
  dueDate: "2026-03-01T18:00:00Z",
});
```

**updatePriority(priority)**

```javascript
// Update priority: 'high', 'medium', or 'low'
todo.updatePriority("medium");
```

**handleCheckboxToggle(event)**

- Handles checkbox change events
- Updates visual state and status

**handleEdit()**

- Triggered by edit button
- Logs task data to console

**handleDelete()**

- Triggered by delete button
- Prompts for confirmation
- Animates removal if confirmed

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

**Not supported**: IE 11 (uses modern CSS Grid and ES6+ JavaScript)

## Customization

### Change Due Date

Edit `script.js`:

```javascript
this.dueDateObj = new Date("2026-02-18T18:00:00Z");
// Change to your desired date
```

### Change Colors

Edit `styles.css`:

```css
.btn-edit {
  background-color: #667eea; /* Change primary color */
}
```

### Change Auto-Update Interval

Edit `script.js`:

```javascript
setInterval(() => {
  this.updateTimeRemaining();
}, 60000); // Change to your desired interval in milliseconds
```

## Example Data

### Current Hardcoded Task

- **Title**: Complete project documentation
- **Description**: Finalize all documentation and ensure it's ready for the team review. Include API references, setup guides, and troubleshooting sections.
- **Priority**: High (🔴)
- **Status**: Pending
- **Due Date**: Feb 18, 2026 at 6:00 PM UTC
- **Tags**: work, urgent, documentation

## Testing Scenarios

### Scenario 1: Checkbox Toggle

1. Load the page
2. Click the checkbox
3. Verify:
   - ✅ Status changes to "Done"
   - ✅ Title gets strikethrough and gray color
   - ✅ Card opacity reduces
   - ✅ Screen reader announces change

### Scenario 2: Keyboard Navigation

1. Load the page
2. Press Tab multiple times
3. Verify:
   - ✅ Focuses on checkbox
   - ✅ Focuses on edit button
   - ✅ Focuses on delete button
   - ✅ Each element shows focus indicator

### Scenario 3: Time Remaining Updates

1. Load the page
2. Note the time remaining text
3. Wait 60+ seconds
4. Verify: Time remaining updates to accurate value

### Scenario 4: Delete Task

1. Load the page
2. Click delete button
3. See confirmation prompt
4. Click "OK"
5. Verify: Card fades out and disappears

### Scenario 5: Mobile Responsiveness

1. Open in browser
2. Resize to 320px width
3. Verify:
   - ✅ No horizontal scroll
   - ✅ All text readable
   - ✅ Buttons accessible and clickable
   - ✅ Layout stacks properly

## Performance Notes

- Lightweight (single JS class, ~8KB minified)
- No external dependencies
- Efficient DOM queries (cached)
- Time updates use `setInterval` (not animations)
- CSS uses hardware acceleration for smooth transforms

## License

MIT - Feel free to use in your projects

## Contributing

To improve this component:

1. Add more test coverage
2. Implement API integration
3. Add animation transitions
4. Support multiple tasks/list view
5. Add local storage persistence

---

**Last Updated**: April 14, 2026  
**Version**: 1.0.0
