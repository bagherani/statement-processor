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
});
