# Pyramid Sorting & Formatting Standards

This document defines formatting rules for imports and object properties. The goal is a clean, readable pyramid aesthetic: shortest to longest.

## Import Sections and Grouping

Divide imports into logical sections separated by one empty line. Typical sections include:

1. External and third-party libraries
2. Constants and configuration
3. Interfaces and types
4. Components
5. Pages

The category order is not fixed. Arrange sections so the complete import block preserves the pyramid, from the shortest import at the top to the longest import at the bottom.

## Pyramid Sorting

Sort every import statement by line length in ascending order: shortest first, longest last. This rule applies both within a section and between sections: the longest import in one section must not be longer than the shortest import in the next section.

## Multi-Line Import Isolation

Isolate multi-line imports with one empty line before and after the statement, regardless of their position in the pyramid order.

## Object and Interface Fields

Apply pyramid sorting to properties in interfaces, types, classes, and object literals. Order fields from the shortest property definition to the longest.

---

## Code Examples

### Bad: Unordered Imports and Fields

```ts
import { DashboardPage } from './pages/DashboardPage';
import React, { useState } from 'react';
import { User } from './interfaces/User';
import { MAX_RETRIES } from './constants';
import {
  UserSession,
  AuthToken,
  PermissionRoles
} from './interfaces/Auth';
import { Button } from './components/Button';

interface UserProfile {
  dateOfBirth: string;
  id: string;
  preferences: {
    theme: string;
    notifications: boolean;
  };
  name: string;
}
```

### Good: Globally Pyramid-Sorted and Sectioned

```ts
// 1. External Libraries
import React, { useState } from 'react';

// 2. Interfaces & Types
import {
  AuthToken,
  UserSession,
  PermissionRoles
} from './interfaces/Auth';

import { User } from './interfaces/User';

// 3. Constants & Configs
import { API_URL } from './config';
import { MAX_RETRIES } from './constants';

// 4. Components
import { Button } from './components/Button';

// 5. Pages
import { DashboardPage } from './pages/DashboardPage';

// --- Object & Interface Sorting ---

interface UserProfile {
  id: string;
  name: string;
  dateOfBirth: string;
  preferences: {
    theme: string;
    notifications: boolean;
  };
}
```