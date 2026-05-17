import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HtmlParser } from '@nx-all/nx-html-parser';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  innerHtmlContent= signal('')
  public htmlParser = inject(HtmlParser);
  errorMessageFlag = true;

  htmlContent = signal('<p>Hello!</p> This is <em>formatted and valid </em> <strong>HTML Tag.</strong><div>Some Example of valid HTML tags as par OWASP are as follows: <ul><li>Paragraphs: <code>&lt;p&gt;</code></li><li>Emphasis: <code>&lt;em&gt;</code></li><li>Strong: <code>&lt;strong&gt;</code></li><li>Lists: <code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>, <code>&lt;li&gt;</code></li><li>Images: <code>&lt;img&gt;</code></li><li>Divisions: <code>&lt;div&gt;</code></li><li>Spans: <code>&lt;span&gt;</code></li><li>Headings: <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code></li><li>Tables: <code>&lt;table&gt;</code>, <code>&lt;tr&gt;</code>, <code>&lt;td&gt;</code> etc.</li></ul>');
  // htmlContent = '<source>Prohibited tag block content</source>';
  // Initialize with empty text so the error box is hidden at startup
  errorMessage = signal('');

  injectProhibitedTag(tag: string) {
    // 1. Instantly overwrite the bound HTML data snippet strings
    const htmlTag = `<${tag}>Prohibited tag block content</${tag}>`;
    this.errorMessage.set(`Security Error: The tag <${tag}> is prohibited by OWASP guidelines.`);
  }

  parseContent(content: string): string | SafeHtml {

    try {
      // 2. This execution path runs on every change detection cycle now!
      const parsed = this.htmlParser(content);

      return parsed;
    } catch (error: any) {

      // The error has already successfully logged to the console red via your library!
      // Returning an empty string safely prevents the DOM template from breaking.
      return '';
    }

  }
}
