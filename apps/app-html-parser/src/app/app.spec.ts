import { TestBed, ComponentFixture } from '@angular/core/testing';
import { App } from './app';
import { HtmlParser } from '@nx-html-parser/nx-html-parser';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let mockHtmlParser: jest.Mock; // Or jasmine.Spy depending on your test runner configuration

  beforeEach(async () => {
    // Create a mock function for the HtmlParser dependency
    mockHtmlParser = jest.fn((content: string) => content);

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: HtmlParser, useValue: mockHtmlParser }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  describe('injectProhibitedTag', () => {
    it('should update htmlContent and set the security error message signal', () => {
      const prohibitedTag = 'script';

      component.injectProhibitedTag(prohibitedTag);

      // Verify the HTML content was overwritten correctly
      expect(component.htmlContent).toBe('<script>Prohibited tag block content</script>');

      // Verify the error message signal was updated
      expect(component.errorMessage()).toBe(
        'Security Error: The tag <script> is prohibited by OWASP guidelines.'
      );
    });
  });

  describe('parseContent', () => {
    it('should call htmlParser with provided content and return the parsed result', () => {
      const sampleInput = '<p>Hello!</p>';
      mockHtmlParser.mockReturnValue('Processed <p>Hello!</p>');

      const result = component.parseContent(sampleInput);

      expect(mockHtmlParser).toHaveBeenCalledWith(sampleInput);
      expect(result).toBe('Processed <p>Hello!</p>');
    });

    it('should return an empty string and handle errors gracefully if htmlParser throws an exception', () => {
      // Simulate the parser throwing an error for malicious input
      mockHtmlParser.mockImplementation(() => {
        throw new Error('XSS Detected');
      });

      const result = component.parseContent('<script>alert(1)</script>');

      expect(result).toBe('');
      // Ensures the application does not crash
      expect(() => component.parseContent('<script>alert(1)</script>')).not.toThrow();
    });
  });
});
