# nx-html-parser

## HTML Security Parser

`nx-html-parser` is a lightweight Angular HTML security parser that validates HTML input against **OWASP guidelines**.

It helps prevent rendering unsafe or malicious HTML by filtering prohibited tags before content is rendered in the DOM.

---

## Features

- OWASP-compliant HTML validation
- Detects prohibited and unsafe HTML tags
- Prevents malicious HTML rendering
- Angular dependency injection support
- Lightweight and easy to integrate
- Safe handling of dynamic HTML content

---

## Prohibited Tags

The following HTML tags are blocked and will trigger a security validation error:

| Tags |
|------|
| `script` |
| `img` |
| `body` |
| `a` |
| `iframe` |
| `svg` |
| `object` |
| `embed` |
| `details` |
| `video` |
| `audio` |
| `source` |
| `input` |
| `button` |
| `textarea` |
| `select` |
| `link` |
| `style` |
| `base` |
| `form` |
| `animate` |

---

## Installation

```bash
npm i --save-dev @nx-all/nx-html-parser

## Usage

### Import the Parser


import { HtmlParser } from '@nx-all/nx-html-parser/dist/libs/nx-html-parser/index'

```

### Angular Example

```ts
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HtmlParser } from 'nx-html-parser';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

  public htmlParser = inject(HtmlParser);

  htmlContent = signal('<p>Hello!</p><strong>Valid HTML</strong>');

  errorMessage = signal('');

  parseContent(content: string): string | SafeHtml {

    try {

      const parsed = this.htmlParser(content);

      return parsed;

    } catch (error: any) {

      console.error(error);

      return '';
    }
  }

  injectProhibitedTag(tag: string) {

    const htmlTag = `<${tag}>Blocked content</${tag}>`;

    this.htmlContent.set(this.htmlParser(htmlTag));

    this.errorMessage.set(
      `Security Error: The tag <${tag}> is prohibited by OWASP guidelines.`
    );
  }
}
```

---

## Development

Build the library locally:

```bash
ng build nx-html-parser
```

Run tests:

```bash
nx test nx-html-parser
```

Run lint:

```bash
nx lint nx-html-parser
```


## Security

This package is designed to help reduce risks associated with:

- **Cross-site scripting (XSS)**
- **Unsafe DOM rendering**
- **Dynamic HTML injection**
- **Malicious embedded content**

Validation rules are based on **OWASP security recommendations**.
