---
author: Manuel Fessen
pubDatetime: 2022-11-02T22:38:00Z
title: You can't escape modals
description: They are everywhere.
hero: /images/blog/modals-meme.webp
---

### Why I publicly lobby against modals  
Modals are a useful design pattern that provide quick and focused contextual interaction. They allow users to quickly complete actions without the need for additional page loading time and provide instant feedback. 
However, modals can also introduce unnecessary pain points for users if used incorrectly. In almost all cases, there is no need to force users into specific actions with modals. It is important to avoid overusing modals, code them properly, use native behavior where possible, and provide a non-JS fallback.

### When to use modals
Modals are best used for short, specific actions such as confirmation or defining a term. They should not be used for displaying large amounts of information or requiring the user to do work. If the content does not need to be overlaid, it should be moved to a new page. If context is important, consider using technology that allows the user to return to their previous location after completing the form.

### Consider Nonmodal Dialogs Instead
Nonmodal dialogs are a better alternative to modals because they allow users to continue their activity without disruption. They can be ignored if they are irrelevant. For example, Google Mail uses nonmodal windows for composing new emails, allowing users to continue working, minimize the email without losing it, and access older emails or additional information while composing.

### You still want to use a modal? Then do it properly
If you still want to use a modal, make sure to implement it properly by including a descriptive title, Cancel and Close buttons, and allowing the user to close the window through escape or clicking outside of it. The modal should also have a semi-transparent background and not be too large.
# You still want to use a modal? Then do it properly
I advise you to follow this quick guide: 
1. The modal window should have a descriptive title
2. The modal window should have a Cancel button
3. The modal window should have a Close button
4. Escape or clicking outside the modal should close the window
5. Add a semi-transparent background
6. Don't make the modal window too large