# Action Example

> **Template for documenting best practices and actions.**

---

## Overview

Use this template to document best practices, techniques, and procedures for specific actions in the project.

---

## Structure

### Basic Information

```markdown
## Action Name

**Objective:** What this action achieves.

**When to Use:** Situations where this action should be performed.

**Related Concepts:** Links to related concept-*.md files.
```

### Prerequisites

```markdown
## Prerequisites

What is needed before performing this action:

- Required knowledge
- Required tools
- Required setup
```

### Step-by-Step

```markdown
## Step-by-Step Guide

1. **First Step**
   - Detailed instruction
   - Expected outcome

2. **Second Step**
   - Detailed instruction
   - Expected outcome

3. **Continue...**
```

### Best Practices

```markdown
## Best Practices

- ✅ Do this
- ✅ Also do this
- ❌ Avoid this
- ❌ Never do this
```

### Examples

```markdown
## Examples

### Example 1: Scenario Description

```code
// Code example here
```

### Example 2: Another Scenario

```code
// Another code example here
```
```

### Troubleshooting

```markdown
## Troubleshooting

| Problem | Solution |
|---------|----------|
| Error message X | Do Y |
| Issue Z | Check A and B |
```
```

---

## Example (Filled)

```markdown
## Create Unit Tests

**Objective:** Create comprehensive unit tests for new or existing code.

**When to Use:** 
- When creating new features
- When fixing bugs (regression tests)
- When refactoring existing code

**Related Concepts:** [[concept-testing-strategy.md]], [[concept-coverage.md]]

## Prerequisites

- Understanding of the testing framework (Jest, pytest, etc.)
- Knowledge of the code being tested
- Test environment configured

## Step-by-Step Guide

1. **Identify the Unit to Test**
   - Determine the function/class/module to test
   - Understand its inputs, outputs, and side effects

2. **Create Test File**
   - Follow naming convention: `*.test.js` or `test_*.py`
   - Place in appropriate location (usually `tests/` or alongside source)

3. **Write Test Cases**
   - Test happy path (expected behavior)
   - Test edge cases (boundary conditions)
   - Test error cases (invalid inputs)

4. **Run Tests**
   - Execute test suite
   - Verify all tests pass

5. **Review Coverage**
   - Check code coverage reports
   - Add missing tests if needed

## Best Practices

- ✅ Use descriptive test names (should_do_something_when_condition)
- ✅ Test one thing per test case
- ✅ Keep tests independent and isolated
- ✅ Use mocks/stubs for external dependencies
- ✅ Arrange-Act-Assert pattern for structure
- ❌ Don't test implementation details
- ❌ Don't skip tests without reason
- ❌ Don't write tests that depend on each other

## Examples

### Example 1: Testing a Function

```javascript
// sum.test.js
describe('sum', () => {
  it('should return the sum of two numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });

  it('should handle negative numbers', () => {
    expect(sum(-2, -3)).toBe(-5);
  });

  it('should throw error for non-number inputs', () => {
    expect(() => sum('2', 3)).toThrow();
  });
});
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Tests failing unexpectedly | Check for shared state between tests |
| Low coverage | Add tests for edge cases and error paths |
| Slow tests | Mock external dependencies, avoid I/O |
```
```

---

## When to Create an Action File

- ✅ New process/procedure established in the project
- ✅ Team needs guidance on how to perform a task
- ✅ Best practices discovered that should be shared
- ✅ Recurring mistakes that can be prevented with documentation

---

**File:** `action-example.md`  
**Last Updated:** March 2026
