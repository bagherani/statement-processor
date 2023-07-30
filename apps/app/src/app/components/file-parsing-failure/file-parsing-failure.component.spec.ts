import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileParsingFailureComponent } from './file-parsing-failure.component';

describe('FileParsingFailureComponent', () => {
  let component: FileParsingFailureComponent;
  let fixture: ComponentFixture<FileParsingFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileParsingFailureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileParsingFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the "File error found!" message', () => {
    const alertElement: HTMLElement =
      fixture.nativeElement.querySelector('span.font-medium');
    expect(alertElement.textContent).toContain('File error found!');
  });

  it('should display the list of error messages', () => {
    const errorMessages: string[] = ['Error 1', 'Error 2', 'Error 3'];

    component.fileErrors = errorMessages;
    fixture.detectChanges();

    const listItems: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('li');
    expect(listItems.length).toBe(3);

    expect(listItems[0].textContent).toContain(errorMessages[0]);
    expect(listItems[1].textContent).toContain(errorMessages[1]);
    expect(listItems[2].textContent).toContain(errorMessages[2]);
  });
});
