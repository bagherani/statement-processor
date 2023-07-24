import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReferenceDuplicationFailureComponentComponent } from './reference-duplication-failure-component.component';

describe('ReferenceDuplicationFailureComponentComponent', () => {
  let component: ReferenceDuplicationFailureComponentComponent;
  let fixture: ComponentFixture<ReferenceDuplicationFailureComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReferenceDuplicationFailureComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ReferenceDuplicationFailureComponentComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
