import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileParsingFailureComponentComponent } from './file-parsing-failure-component.component';

describe('FileParsingFailureComponentComponent', () => {
  let component: FileParsingFailureComponentComponent;
  let fixture: ComponentFixture<FileParsingFailureComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileParsingFailureComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileParsingFailureComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
