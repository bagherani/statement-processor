import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploaderComponent } from './file.uploader.component';
import { HttpClientModule } from '@angular/common/http';

describe('FileUploaderComponent', () => {
  let component: FileUploaderComponent;
  let fixture: ComponentFixture<FileUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileUploaderComponent],
      imports: [HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.errorMessage = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call handleSubmit() when the form is submitted', () => {
    const handleSubmitSpy = jest.spyOn(component, 'handleSubmit');
    const formElement: HTMLFormElement =
      fixture.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should show the error message when form has an error', () => {
    component.errorMessage = 'Error';
    fixture.detectChanges();
    const errorMessageElement =
      fixture.nativeElement.querySelector('.mt-3.text-red-900');

    expect(errorMessageElement).toBeTruthy();
  });

  it('should update selectedFile when a file is selected', () => {
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input[type="file"]');
    const fileChangeEvent = new Event('change');
    Object.defineProperty(inputElement, 'files', { value: [file] });
    inputElement.dispatchEvent(fileChangeEvent);
    fixture.detectChanges();

    expect(component.selectedFile).toBe(file);
  });

  it('should set selectedFile to null when no file is selected', () => {
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input[type="file"]');
    const fileChangeEvent = new Event('change');
    Object.defineProperty(inputElement, 'files', { value: [] });
    inputElement.dispatchEvent(fileChangeEvent);
    fixture.detectChanges();

    expect(component.selectedFile).toBeNull();
  });

  it('should disable the "Validate" button when selectedFile is null', () => {
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input[type="file"]');

    Object.defineProperty(inputElement, 'files', {
      value: null,
    });

    const fileChangeEvent = new Event('change', { bubbles: true });
    inputElement.dispatchEvent(fileChangeEvent);
    fixture.detectChanges();

    const isValid = fixture.nativeElement.querySelector('form').checkValidity();

    const buttonElement: HTMLButtonElement =
      fixture.nativeElement.querySelector('button[type="submit"]');
    expect(buttonElement.disabled).not.toBe(isValid);
  });

  it('should enable the "Validate" button when a file is selected', () => {
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input[type="file"]');

    Object.defineProperty(inputElement, 'files', {
      value: [{ name: 'filename', filename: 'filename' }],
    });

    const fileChangeEvent = new Event('change', { bubbles: true });
    inputElement.dispatchEvent(fileChangeEvent);
    fixture.detectChanges();

    const isValid = fixture.nativeElement.querySelector('form').checkValidity();

    const buttonElement: HTMLButtonElement =
      fixture.nativeElement.querySelector('button[type="submit"]');
    expect(buttonElement.disabled).not.toBe(isValid);
  });
});
