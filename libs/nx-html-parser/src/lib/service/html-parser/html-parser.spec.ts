import { TestBed } from '@angular/core/testing';
import { HtmlParser } from './html-parser';

describe('HtmlParser InjectionToken - Tag Validation', () => {
  let securedHtmlFn: (input: string) => string;

  // Copying the array here since it isn't exported from your source file.
  // Tip: If you add 'export' to const invalidHtmlTags in html-parser.ts,
  // you can just import it directly here instead!
  const tagsToTest = [
    'script', 'img', 'body', 'a', 'iframe', 'svg', 'object', 'embed',
    'details', 'video', 'audio', 'source', 'input', 'button', 'textarea',
    'select', 'link', 'style', 'base', 'form', 'animate'
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [], // ProvidedIn: 'root' handles injection automatically
    });
    securedHtmlFn = TestBed.inject(HtmlParser);
  });

  describe('Secure Elements', () => {
    it('should allow secure HTML tags', () => {
      expect(securedHtmlFn('<p>safe paragraph</p>')).toBe('<p>safe paragraph</p>');
      expect(securedHtmlFn('<div>safe div</div>')).toBe('<div>safe div</div>');
    });

    it('should throw an error for empty input', () => {
      expect(() => securedHtmlFn('')).toThrowError('Input cannot be empty');
    });
  });

  describe('OWASP Insecure Tags Matrix', () => {
    // Loop through each tag to ensure individual coverage
    tagsToTest.forEach((tag) => {
      it(`should block <${tag}> tags and throw OWASP XSS error`, () => {
        const maliciousInput = `<${tag}>alert(1)</${tag}>`;

        expect(() => securedHtmlFn(maliciousInput)).toThrowError(
          'XSS : Insecure HTML tags detected as per OWASP guidelines'
        );
      });

      it(`should block uppercase <${tag.toUpperCase()}> variations`, () => {
        const uppercaseInput = `<${tag.toUpperCase()}>`;

        expect(() => securedHtmlFn(uppercaseInput)).toThrowError(
          'XSS : Insecure HTML tags detected as per OWASP guidelines'
        );
      });
    });
  });
});
