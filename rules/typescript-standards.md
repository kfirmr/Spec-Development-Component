# Type System Best Practices

Use TypeScript's type system to make invalid states difficult to represent while keeping code concise and readable.

## Use Type Inference Where Possible

Let TypeScript infer a type when it is obvious from the assignment.

```ts
// Avoid redundant annotations.
const name: string = 'John';

// Let TypeScript infer string.
const name = 'John';

// Avoid redundant return types for straightforward local functions.
function add(a: number, b: number): number {
  return a + b;
}

// Let TypeScript infer the return type.
function add(a: number, b: number) {
  return a + b;
}
```

## Use Precise Type Annotations

Be explicit for public APIs, function parameters, and values whose type is not clear at the declaration site.

```ts
// Avoid untyped parameters.
function processUser(user) {
  return user.name.toUpperCase();
}

// Define the contract and use it at the boundary.
interface User {
  id: number;
  name: string;
  email?: string;
}

function processUser(user: User): string {
  return user.name.toUpperCase();
}
```

## Prefer Interfaces for Object Shapes

Use `interface` for object shapes that may be extended or implemented. Use `type` for unions, tuples, mapped types, and other compositions.

```ts
interface User {
  id: number;
  name: string;
}

interface AdminUser extends User {
  permissions: string[];
}

type UserRole = 'admin' | 'editor' | 'viewer';
type UserId = number | string;
type ReadonlyUser = Readonly<User>;
type Point = [number, number];
```

## Avoid `any`

Use a specific type whenever one is known. When a value may have any shape, prefer `unknown` and narrow it before use.

```ts
// Avoid: disables type safety.
function logValue(value: any) {
  console.log(value.toUpperCase());
}

// Better: preserve the value's type.
function logValue<T>(value: T) {
  console.log(String(value));
}

// Best when a string is required: state that requirement.
function logString(value: string) {
  console.log(value.toUpperCase());
}

// Narrow unknown values before using them.
function logUnknown(value: unknown) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  } else {
    console.log(String(value));
  }
}
```

## Use Consistent File Names

Use a descriptive feature name followed by the file's responsibility.

| File responsibility | Naming pattern | Example |
| --- | --- | --- |
| Utility | `x.utils.ts` | `date.utils.ts` |
| Constants | `x.constants.ts` | `http-status.constants.ts` |
| Interface | `x.interface.ts` | `user.interface.ts` |
| Types | `x.types.ts` | `user.types.ts` |

## Keep Functions Focused

Give each function one clear responsibility. Split validation, transformation, side effects, and notifications into focused units that can be tested independently.

```ts
// Avoid: validation, transformation, persistence, and notification are coupled.
function processUserData(userData: any) {
  if (!userData || !userData.name) {
    throw new Error('Invalid user data');
  }

  const processedData = {
    ...userData,
    name: userData.name.trim(),
    createdAt: new Date(),
  };

  saveToDatabase(processedData);
  sendNotification(processedData.email, 'Profile updated');

  return processedData;
}
```

```ts
interface UserData {
  name: string;
  email: string;
}

interface ProcessedUserData extends UserData {
  createdAt: Date;
}

function validateUserData(data: unknown): UserData {
  if (
    typeof data !== 'object' ||
    data === null ||
    !('name' in data) ||
    !('email' in data) ||
    typeof data.name !== 'string' ||
    typeof data.email !== 'string'
  ) {
    throw new Error('Invalid user data');
  }

  return { name: data.name, email: data.email };
}

function processUserData(userData: UserData): ProcessedUserData {
  return {
    ...userData,
    name: userData.name.trim(),
    createdAt: new Date(),
  };
}
```

## Handle Asynchronous Operations Deliberately

Check response status, handle errors at the appropriate boundary, and preserve the caller's ability to react to failures. Run independent operations in parallel with `Promise.all`.

```ts
// Avoid: unsuccessful HTTP responses are treated as valid results.
async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}

// Prefer: validate the response and re-throw failures for the caller.
async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}

async function fetchMultipleData<T>(urls: string[]): Promise<T[]> {
  try {
    return await Promise.all(urls.map((url) => fetchData<T>(url)));
  } catch (error) {
    console.error('One or more requests failed:', error);
    throw error;
  }
}

interface User {
  id: string;
  name: string;
  email: string;
}

function getUserData(userId: string): Promise<User> {
  return fetchData<User>(`/api/users/${userId}`);
}
```

## Avoid Nested `async`/`await`

Use early returns to keep asynchronous control flow flat. Use `Promise.all` when operations do not depend on each other.

```ts
// Avoid: nested conditions obscure the successful path.
async function processUser(userId: string) {
  const user = await getUser(userId);

  if (user) {
    const orders = await getOrders(user.id);

    if (orders.length > 0) {
      const latestOrder = orders[0];
      const items = await getOrderItems(latestOrder.id);

      return { user, latestOrder, items };
    }
  }

  return null;
}

// Prefer: early returns make each exit condition explicit.
async function processUser(userId: string) {
  const user = await getUser(userId);

  if (!user) return null;

  const orders = await getOrders(user.id);

  if (orders.length === 0) {
    return { user, latestOrder: null, items: [] };
  }

  const latestOrder = orders[0];
  const items = await getOrderItems(latestOrder.id);

  return { user, latestOrder, items };
}

// Best: fetch independent data in parallel.
async function processUser(userId: string) {
  const [user, orders] = await Promise.all([
    getUser(userId),
    getOrders(userId),
  ]);

  if (!user) return null;

  if (orders.length === 0) {
    return { user, latestOrder: null, items: [] };
  }

  const latestOrder = orders[0];
  const items = await getOrderItems(latestOrder.id);

  return { user, latestOrder, items };
}
```

## Writing Testable Code

Inject external dependencies instead of constructing them inside business logic. This makes dependencies explicit, allows focused unit tests, and avoids requiring real infrastructure during tests.

```ts
// Avoid: the concrete dependency cannot be replaced in a unit test.
class PaymentProcessor {
  async processPayment(amount: number) {
    const paymentGateway = new PaymentGateway();
    return paymentGateway.charge(amount);
  }
}
```

```ts
// Prefer: depend on an interface and inject its implementation.
interface PaymentGateway {
  charge(amount: number): Promise<boolean>;
}

class PaymentProcessor {
  constructor(private readonly paymentGateway: PaymentGateway) {}

  async processPayment(amount: number): Promise<boolean> {
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }

    return this.paymentGateway.charge(amount);
  }
}
```

```ts
// Jest: replace the external gateway with a controlled test double.
describe('PaymentProcessor', () => {
  let processor: PaymentProcessor;
  let mockGateway: jest.Mocked<PaymentGateway>;

  beforeEach(() => {
    mockGateway = {
      charge: jest.fn(),
    };
    processor = new PaymentProcessor(mockGateway);
  });

  it('processes a valid payment', async () => {
    mockGateway.charge.mockResolvedValue(true);

    const result = await processor.processPayment(100);

    expect(result).toBe(true);
    expect(mockGateway.charge).toHaveBeenCalledWith(100);
  });

  it('throws for an invalid amount', async () => {
    await expect(processor.processPayment(-50)).rejects.toThrow(
      'Amount must be greater than zero',
    );
  });
});
```

## Use Type-Only Imports and Exports

Use `import type` and `export type` for symbols that exist only at compile time. This makes module boundaries explicit and prevents type-only references from being emitted as runtime imports.

```ts
// Avoid: combines a type and a runtime value in one import.
import { User, fetchUser } from './api';

// Prefer: separate type and runtime imports.
import type { User } from './api';
import { fetchUser } from './api';

// Import multiple type-only symbols when no runtime value is needed.
import type { User, UserSettings } from './types';

// Re-export a type without creating a runtime export.
export type { User };

// Export runtime values normally.
export { fetchUser };
```

Enable `"isolatedModules": true` in `tsconfig.json` to enforce module-safe TypeScript code and catch incorrect type imports.

## Avoid Excessive Type Complexity

Prefer built-in utility types and small, named interfaces over deeply nested mapped or conditional types. Complex types can be difficult to understand and slow compilation as a project grows.

```ts
// Avoid when a simpler contract will do: recursive mapped types can be costly.
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type User = {
  id: string;
  profile: {
    name: string;
    email: string;
  };
  preferences?: {
    notifications: boolean;
  };
};

// Prefer built-in utility types when a top-level partial update is sufficient.
function updateUser(updates: Partial<User>) {
  // Implementation
}
```

```ts
// Prefer named interfaces when the object structure has meaningful parts.
interface UserProfile {
  name: string;
  email: string;
}

interface UserPreferences {
  notifications: boolean;
}

interface User {
  id: string;
  profile: UserProfile;
  preferences?: UserPreferences;
}
```

## Use `const` Assertions for Literal Types

Use `as const` for fixed arrays and objects when you need narrow literal types and immutable values.

```ts
// Without a const assertion, the array is inferred as string[].
const colors = ['red', 'green', 'blue'];

// With a const assertion, each value remains a literal type.
const colors = ['red', 'green', 'blue'] as const;
// Type: readonly ['red', 'green', 'blue']

// Derive a union from the const array.
type Color = (typeof colors)[number];
// Type: 'red' | 'green' | 'blue'

const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  features: ['auth', 'notifications'],
} as const;
// Type:
// {
//   readonly apiUrl: 'https://api.example.com';
//   readonly timeout: 5000;
//   readonly features: readonly ['auth', 'notifications'];
// }
```