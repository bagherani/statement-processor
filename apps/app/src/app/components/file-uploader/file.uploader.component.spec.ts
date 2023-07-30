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
    component.selectedFile = null;
    fixture.detectChanges();

    const buttonElement: HTMLButtonElement =
      fixture.nativeElement.querySelector('button[type="submit"]');
    expect(buttonElement.disabled).toBeTruthy();
  });

  it('should enable the "Validate" button when selectedFile is not null', () => {
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    component.selectedFile = file;
    fixture.detectChanges();

    const buttonElement: HTMLButtonElement =
      fixture.nativeElement.querySelector('button[type="submit"]');
    expect(buttonElement.disabled).toBeFalsy();
  });
});
