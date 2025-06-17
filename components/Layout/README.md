# Layout Components

## BugHerd Integration

The application includes integration with BugHerd user data, which is fetched from the WordPress API endpoint. This data is made available throughout the application using React Context.

### Components

- **BugHerdProvider**: Fetches user data from the BugHerd API and provides it to all child components.
- **BugHerdUser**: An example component that displays the BugHerd user's name.

### How to Use BugHerd Data in Your Components

To access the BugHerd user data in any component:

```jsx
import { useBugHerd } from '@/components/Layout/BugHerdProvider';

function YourComponent() {
  const { user, loading, error } = useBugHerd();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !user) {
    // Handle error or no user data
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      {/* Use other user properties as needed */}
    </div>
  );
}
```

### Available Data

The BugHerd user data object contains:
- `name`: The user's name
- And potentially other fields depending on the API response

### Integration

The BugHerd provider is automatically included in the `ClientLayoutProvider`, so you don't need to wrap your components with it explicitly. Just use the `useBugHerd` hook in any client component to access the data. 