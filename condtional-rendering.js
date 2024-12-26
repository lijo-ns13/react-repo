// Notes on Conditional Rendering in React

// 1. Using if Statement (Block-Level Rendering)
// For more complex conditions, use the standard if statement inside a function.
function GreetingIfStatement({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please log in.</h1>;
  }
}

// 2. Using Ternary Operator (Inline Rendering)
// Best for simple conditional rendering.
function GreetingTernary({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please log in.</h1>}
    </div>
  );
}

// 3. Using Logical && (Short-Circuit Rendering)
// When you only want to render something if the condition is true.
function NotificationLogicalAnd({ hasNewMessages }) {
  return (
    <div>
      {hasNewMessages && <h2>You have new messages!</h2>}
    </div>
  );
}

// Note: This approach does not render anything when hasNewMessages is false.
// Be careful if hasNewMessages can return 0 or null as these values might still render unexpectedly.

// 4. Using || for Default Rendering
// Use the logical || operator to display a default value when the condition is falsy.
function UserName({ name }) {
  return <h1>{name || "Guest"}</h1>;
}

// 5. Using an Immediately Invoked Function (IIFE)
// For more complex or nested conditions.
function DashboardIIFE({ role }) {
  return (
    <div>
      {(() => {
        if (role === "admin") return <h1>Welcome, Admin!</h1>;
        if (role === "user") return <h1>Welcome, User!</h1>;
        return <h1>Please sign in.</h1>;
      })()}
    </div>
  );
}

// 6. Using Conditional Components
// For cleaner JSX, break conditional logic into smaller components.
function AdminPanel() {
  return <h1>Admin Panel</h1>;
}

function UserPanel() {
  return <h1>User Panel</h1>;
}

function DashboardConditionalComponents({ role }) {
  return <div>{role === "admin" ? <AdminPanel /> : <UserPanel />}</div>;
}

// 7. Returning null for No Rendering
// If you want a component to render nothing, return null.
function NotificationNull({ show }) {
  if (!show) return null;
  return <h2>You have new notifications!</h2>;
}

// Which Approach Should You Use?
const recommendations = {
  ternary: "For simple, concise conditional rendering.",
  ifStatements: "For more complex logic or multiple conditions.",
  logicalAnd: "For rendering something based on a single true condition.",
  conditionalComponents: "For better readability when rendering different UI blocks."
};

// Exporting the Notes for Later Use
module.exports = {
  GreetingIfStatement,
  GreetingTernary,
  NotificationLogicalAnd,
  UserName,
  DashboardIIFE,
  AdminPanel,
  UserPanel,
  DashboardConditionalComponents,
  NotificationNull,
  recommendations
};
