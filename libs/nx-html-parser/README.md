# NxHtmlParser

# Authors

* Name - Parag Kulkarni
* Email - parag15363@gmail.com

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/Yt9c5bixcu)


## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve app/app-html-parser
```

To create a production bundle:

```sh
npx nx build app/app-html-parser
```

To see all available targets to run for a project, run:

```sh
npx nx show project app/app-html-parser
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/angular:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/angular:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)



nx-html-parser
A security-focused utility library for Angular/Nx workspaces designed to validate HTML strings against XSS vulnerabilities. It uses a strict blacklist approach based on OWASP guidelines to ensure malicious tags are never rendered.

🚀 Installation & Download
Option 1: Via NPM (Recommended)


npm install nx-html-parser



⚙️ CompatibilityLibrary VersionAngular VersionNx Versionv1.x.x^14.0.0 - ^16.0.0^14.0.0+v2.x.x^17.0.0 - ^18.0.0^18.0.0+

📖 Usage
The library provides an InjectionToken called HtmlParser which provides the securedHTML logic.

1. Component Logic
Inject the token into your Angular component to access the validation function.


import { Component, Inject } from '@angular/core';
import { HtmlParser } from 'nx-html-parser';

@Component({
  selector: 'app-parser-demo',
  templateUrl: './app.component.html'
})
export class AppParserComponent {
  htmlContent = '<p>Safe Content</p>';

  constructor(
    @Inject(HtmlParser) public htmlParser: (input: string) => string
  ) {}
}


2. UI Implementation (HTML)
The following structure demonstrates how the parser interacts with your view:

<div class="parser-container">
  <header>
    <h1>HTML Security Parser</h1>
    <p class="description">
      This tool validates HTML input against <strong>OWASP guidelines</strong>.
      It ensures that potentially malicious tags are filtered out before rendering.
    </p>
  </header>

  <section class="status-box">
    <h3>Prohibited Tags</h3>
    <div class="tag-cloud">
      <span>script, img, body, a, iframe, svg, object, embed, details, video, 
      audio, source, input, button, textarea, select, link, style, base, form, animate</span>
    </div>
  </section>

  <main class="parser-logic">
    <div class="input-group">
      <label for="htmlInput">Validate HTML Content: {{htmlContent}}</label>
      <p [innerHTML]="htmlParser(htmlContent)"></p>
    </div>
  </main>
</div>



⚠️ Security Behavior
The HtmlParser is fail-fast.

Safe Input: Returns the string exactly as provided.

Unsafe Input: Throws an Error: XSS : Insecure HTML tags detected as per OWASP guidelines.

Note: Always wrap calls to htmlParser in a try...catch block in your component to handle security violations gracefully without breaking the UI.
