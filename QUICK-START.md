# Quick Start Guide

Get the Todo Item Card component running in under 5 minutes.

## Prerequisites

- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools, dependencies, or setup required!

## 1. Start a Local Server

Open PowerShell in the project folder and run:

```powershell
# Using Python 3
python3 -m http.server 8000

# Or using Python 2
python -m SimpleHTTPServer 8000

# Or using Node.js (if you have it)
npx http-server -p 8000
```

Then open your browser to: `http://localhost:8000`

## 2. Open the Card

You'll see a beautiful Todo Card component with:

```
┌─────────────────────────────────────┐
│ ☐ Complete project documentation   │
│                                     │
│ Pending  🔴 High                   │
│                                     │
│ Finalize all documentation...       │
│                                     │
│ 📅 Due Feb 18, 2026                │
│ Due in 4 days                       │
│                                     │
│ [work] [urgent] [documentation]    │
│                                     │
│              [✏️ Edit] [🗑️ Delete]   │
└─────────────────────────────────────┘
```

## 3. Try the Interactions

### Test Checkbox

1. Click the checkbox or press Tab to focus it
2. Press Space to toggle
3. Watch the status change to "Done" and title gets strikethrough

### Test Keyboard Navigation

1. Press Tab → focuses on checkbox
2. Press Tab → focuses on Edit button
3. Press Tab → focuses on Delete button
4. Press Shift+Tab → goes backwards

### Test Buttons

1. Click "Edit" button → Opens task details in alert
2. Click "Delete" button → Prompts for confirmation

### Test Time Remaining

- Wait 60+ seconds and see the countdown update (or open DevTools)

## 4. Test in Different Sizes

### Mobile View (DevTools)

Press `F12` or `Ctrl+Shift+I` to open Developer Tools:

1. Click the device icon (top-left of DevTools)
2. Select "iPhone 12" or "Galaxy S20"
3. See the card adapt to mobile layout

### Try Different Screen Sizes

- 320px (small phone)
- 480px (large phone)
- 768px (tablet)
- 1024px (small laptop)
- 1200px+ (desktop)

## 5. Inspect Elements (Testing)

Open DevTools and run in Console:

```javascript
// Check all required elements exist
document.querySelector('[data-testid="test-todo-card"]');
document.querySelector('[data-testid="test-todo-title"]');
document.querySelector('[data-testid="test-todo-complete-toggle"]');

// Toggle checkbox programmatically
document.querySelector('[data-testid="test-todo-complete-toggle"]').click();

// Check status
document.querySelector('[data-testid="test-todo-status"]').textContent;

// Access TodoCard instance
window.todoCard;
window.todoCard.isCompleted;
window.todoCard.currentStatus;
```

## 6. File Organization

```
todo_item_card/
├── index.html           ← Open this in browser
├── styles.css           ← All styling & responsive design
├── script.js            ← Interactivity & time calculations
├── README.md            ← Full documentation
├── TEST-IDENTIFIERS.md  ← Testing reference
├── test-examples.js     ← Example test cases
└── QUICK-START.md       ← This file
```

## 7. What to Check

### Visual Features

- [x] Modern gradient background
- [x] Clean card with shadow
- [x] Status and priority badges
- [x] Tags as pill/chips
- [x] Smooth hover effects
- [x] Beautiful typography

### Functional Features

- [x] Checkbox toggles
- [x] Status updates
- [x] Title strikethrough on complete
- [x] Edit button shows task info
- [x] Delete button with confirmation
- [x] Time remaining updates

### Accessibility Features

- [x] Keyboard navigation (Tab/Shift+Tab)
- [x] Checkbox focus indicator
- [x] All buttons accessible
- [x] Screen reader support
- [x] Semantic HTML
- [x] ARIA labels

### Responsive Features

- [x] Mobile (320px) - no scroll
- [x] Tablet (768px) - comfortable
- [x] Desktop (1024px+) - centered max-width
- [x] All sizes - readable text

## 8. Customization Examples

### Change Due Date

Open `script.js` and find:

```javascript
this.dueDateObj = new Date("2026-02-18T18:00:00Z");
```

Change to your date:

```javascript
this.dueDateObj = new Date("2026-04-30T17:00:00Z");
```

### Change Colors

Open `styles.css` and find:

```css
.btn-edit {
  background-color: #667eea; /* Change this */
}
```

### Change Task Title

Open `index.html` and find:

```html
<h2 class="todo-title" data-testid="test-todo-title">
  Complete project documentation
</h2>
```

Change to:

```html
<h2 class="todo-title" data-testid="test-todo-title">Your custom task title</h2>
```

## 9. Troubleshooting

### Page doesn't load?

- Make sure you're running a local server (not opening file:// directly)
- Check browser console for errors (F12)
- Try a different browser

### Checkbox doesn't work?

- Enable JavaScript in browser settings
- Make sure you're not in Private/Incognito mode
- Try full page refresh (Ctrl+F5)

### Styling looks weird?

- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS file is linked in index.html
- Try different browser

### Time remaining shows wrong value?

- The due date is Feb 18, 2026 (it's in the future)
- Time updates every 60 seconds
- Check current date in your system

### Tests won't run?

- Use Node.js with Jest: `npm install -D jest`
- Or use Playwright/Cypress for E2E tests
- See `test-examples.js` for full syntax

## 10. Next Steps

### For Development

1. Read [README.md](README.md) for complete documentation
2. Check [TEST-IDENTIFIERS.md](TEST-IDENTIFIERS.md) for testing reference
3. Review [test-examples.js](test-examples.js) for test code

### For Testing

1. Use browser DevTools (F12) for manual testing
2. Set up Jest for unit tests
3. Set up Playwright/Cypress for E2E tests
4. Run accessibility checks (axe DevTools extension)

### For Production

1. Minify CSS and JavaScript
2. Add error handling
3. Connect to backend API
4. Add more tasks/list view
5. Add local storage persistence
6. Add animations

## File Reference

| File                | Purpose                           | Lines |
| ------------------- | --------------------------------- | ----- |
| index.html          | Semantic HTML structure           | 100+  |
| styles.css          | Responsive design & styling       | 700+  |
| script.js           | Interactivity & time calculations | 300+  |
| README.md           | Full documentation                | 500+  |
| TEST-IDENTIFIERS.md | Testing reference                 | 600+  |
| test-examples.js    | Example test cases                | 400+  |

## Key Data-TestIDs (Quick Reference)

```
test-todo-card                ← Main container
test-todo-title               ← Task title
test-todo-description         ← Task description
test-todo-priority            ← Priority badge
test-todo-status              ← Status badge
test-todo-due-date            ← Due date
test-todo-time-remaining      ← Countdown
test-todo-complete-toggle     ← Checkbox
test-todo-tags                ← Tags list
test-todo-tag-work            ← Specific tag
test-todo-tag-urgent          ← Specific tag
test-todo-edit-button         ← Edit button
test-todo-delete-button       ← Delete button
```

## Common Commands

```powershell
# Start server on port 8000
python3 -m http.server 8000

# Start server on port 3000
python3 -m http.server 3000

# With Node.js
npx http-server -p 8000 -o

# View current directory
Get-ChildItem

# View file contents
Get-Content index.html
```

## Resources

- [MDN Web Docs](https://developer.mozilla.org) - HTML/CSS/JavaScript
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility
- [Playwright](https://playwright.dev) - E2E testing
- [Cypress](https://cypress.io) - E2E testing
- [Jest](https://jestjs.io) - Unit testing

## Support

If you encounter issues:

1. Check [README.md](README.md) for detailed docs
2. Review browser console errors (F12)
3. Test in different browser
4. Clear cache and refresh
5. Verify all files are present

---

**Ready to build on this?**

Each section (HTML, CSS, JavaScript) is well-documented and modular. You can:

- Add multiple cards → Create a Todo list view
- Connect to API → Make it persist data
- Add animations → Enhance transitions
- Build admin panel → Manage tasks
- Add filters/search → Improve UX

**Happy coding!** 🎉

---

**Created**: April 14, 2026  
**Version**: 1.0.0
