# Tool Example

> **Template for documenting external tools.**

---

## Overview

Use this template to document external tools used in the project.

---

## Structure

### Basic Information

```markdown
## Tool Name

**Purpose:** Brief description of what the tool does.

**Website/Repo:** [Link to official site or repository]

**Version:** Current version used in the project
```

### Installation

```markdown
## Installation

How to install the tool in the project environment.

```bash
# Example installation command
npm install tool-name
```
```

### Usage

```markdown
## Usage

How the tool is used in this specific project.

### Configuration

Any project-specific configuration.

### Examples

Code examples of how the tool is used.
```

### Important Notes

```markdown
## Important Notes

- Any caveats, tips, or project-specific considerations
```
```

---

## Example (Filled)

```markdown
## PuTTY

**Purpose:** SSH and serial connection client for accessing remote servers and devices.

**Website/Repo:** [https://www.putty.org/](https://www.putty.org/)

**Version:** 0.78

## Installation

Download installer from official website or use winget:

```bash
winget install PuTTY.PuTTY
```

## Usage

### Serial Connection

1. Open PuTTY
2. Select "Serial" connection type
3. Configure serial line (e.g., COM3) and speed (e.g., 115200)
4. Click Open

### SSH Connection

1. Open PuTTY
2. Enter hostname (e.g., 192.168.1.100)
3. Select SSH protocol
4. Click Open
5. Login with credentials

## Important Notes

- Save session configurations for frequently accessed servers
- Use Pageant for SSH key management
- Serial port can be found in Device Manager → Ports (COM & LPT)
```
```

---

## When to Create a Tool File

- ✅ New external tool added to the project
- ✅ Tool has complex configuration specific to the project
- ✅ Tool requires special knowledge for the team
- ✅ Tool is critical for development/deployment workflow

---

**File:** `tool-example.md`  
**Last Updated:** March 2026
