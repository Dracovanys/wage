# Concept Example

> **Template for documenting concepts and business rules.**

---

## Overview

Use this template to document important concepts, business rules, knowledge domains, and contextual information needed to work on the project.

---

## Structure

### Basic Information

```markdown
## Concept Name

**Definition:** Clear and concise definition of the concept.

**Domain:** Area of knowledge (e.g., Finance, HR, Security, etc.)

**Related Concepts:** Links to related concept-*.md files.
```

### Detailed Explanation

```markdown
## Detailed Explanation

In-depth explanation of the concept, including:
- Background/context
- Why it matters for the project
- How it affects development decisions
```

### Key Terms

```markdown
## Key Terms

| Term | Definition |
|------|------------|
| Term 1 | Definition of term 1 |
| Term 2 | Definition of term 2 |
| Term 3 | Definition of term 3 |
```

### Rules/Constraints

```markdown
## Rules/Constraints

- Rule 1: Description of the rule
- Rule 2: Description of the constraint
- Regulation: Any regulatory requirements
```

### Examples

```markdown
## Examples

### Example 1: Scenario Description

Explanation of how the concept applies in this scenario.

### Example 2: Another Scenario

Another application of the concept.
```

### Impact on Development

```markdown
## Impact on Development

How this concept affects:
- Architecture decisions
- Feature implementation
- Testing strategy
- Data handling
```

### References

```markdown
## References

- [Official Documentation](link)
- [Regulation/Law](link)
- [Internal Documentation](link)
```
```

---

## Example (Filled)

```markdown
## INSS (Instituto Nacional do Seguro Social)

**Definition:** Brazilian government agency responsible for managing social security benefits, including retirement, sick leave, and unemployment benefits.

**Domain:** Finance / HR / Brazilian Labor Law

**Related Concepts:** [[concept-fgts.md]], [[concept-irrf.md]], [[concept-payroll.md]]

## Detailed Explanation

INSS is a mandatory contribution for all formal employees in Brazil. It is calculated as a percentage of the employee's salary and is capped at a maximum contribution ceiling. The contribution rate varies based on salary brackets.

For software development, understanding INSS is crucial for:
- Payroll systems
- HR management software
- Financial applications dealing with Brazilian employees

## Key Terms

| Term | Definition |
|------|------------|
| Salário de Contribuição | Base salary used for INSS calculation |
| Teto do INSS | Maximum contribution ceiling (R$ 7.786,02 in 2024) |
| Alíquota | Contribution rate percentage |
| GPS | Guia da Previdência Social (payment slip) |

## Rules/Constraints

### Contribution Rates (2024)

| Salary Range | Rate |
|--------------|------|
| Up to R$ 1.412,00 | 7.5% |
| R$ 1.412,01 to R$ 2.666,68 | 9% |
| R$ 2.666,69 to R$ 4.000,03 | 12% |
| R$ 4.000,04 to R$ 7.786,02 | 14% |

### Important Rules

- Contribution is progressive (each bracket applies only to the portion within it)
- Employer must withhold employee contribution
- Payment is due by the 20th business day of the following month
- Self-employed workers have different rates

## Examples

### Example 1: Salary R$ 3.000,00

```
Bracket 1: R$ 1.412,00 × 7.5%  = R$ 105,90
Bracket 2: R$ 1.254,68 × 9%    = R$ 112,92
Bracket 3: R$ 333,32 × 12%     = R$ 40,00
Total INSS: R$ 258,82
```

### Example 2: Salary Above Ceiling (R$ 10.000,00)

```
Maximum contribution applies
Total INSS: R$ 900,04 (capped)
```

## Impact on Development

### Architecture Decisions

- Must store historical contribution rates (they change yearly)
- Need to handle progressive calculation logic
- Must support different worker types (CLT, self-employed, etc.)

### Feature Implementation

- Payroll reports must show INSS breakdown
- Employee portal should display contributions
- Admin panel needs rate configuration

### Testing Strategy

- Test all salary brackets
- Test edge cases (exactly at bracket boundaries)
- Test ceiling scenarios
- Test yearly rate updates

### Data Handling

- Store contribution history for legal compliance (5+ years)
- Encrypt sensitive salary data
- Implement audit logs for changes

## References

- [INSS Official Site](https://www.gov.br/inss)
- [Ministry of Economy - Contribution Table](https://www.gov.br/economia)
- [Internal Payroll Documentation](./concept-payroll.md)
```
```

---

## When to Create a Concept File

- ✅ New domain knowledge required for the project
- ✅ Complex business rules that developers need to understand
- ✅ Regulatory/legal requirements affecting the software
- ✅ Onboarding documentation for new team members
- ✅ Cross-team knowledge sharing

---

**File:** `concept-example.md`  
**Last Updated:** March 2026
