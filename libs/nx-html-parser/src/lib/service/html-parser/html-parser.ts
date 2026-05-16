import { InjectionToken, Signal, signal } from '@angular/core';

const invalidHtmlTags = [
  'script',
  'img',
  'body',
  'a',
  'iframe',
  'svg',
  'object',
  'embed',
  'details',
  'video',
  'audio',
  'source',
  'input',
  'button',
  'textarea',
  'select',
  'link',
  'style',
  'base',
  'form',
  'animate',
];



function checkInvalidHTMLTags(str: string): boolean {
  const regex = new RegExp(`<\\s*\\/??\\s*(${invalidHtmlTags.join('|')})\\b`, 'i');
  return regex.test(str);
}

function securedHTML(input: Signal<string>): string {
  if (!input()) {
    const error = new Error('Input cannot be empty');
    throw error;
  }

  if (checkInvalidHTMLTags(input())) {
    const error = new Error('XSS : Insecure HTML tags detected as per OWASP guidelines');
    throw error;
  }
  return input();
}

export const HtmlParser = new InjectionToken<(input: string) => string>('secureHTML', {
  providedIn: 'root',
  factory: () => {
    return (rawString: string) => securedHTML(signal(rawString));
  },
});
