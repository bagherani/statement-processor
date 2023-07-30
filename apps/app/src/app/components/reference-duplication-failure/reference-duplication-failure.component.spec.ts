import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReferenceDuplicationFailureComponent } from './reference-duplication-failure.component';

describe('ReferenceDuplicationFailureComponent', () => {
  let component: ReferenceDuplicationFailureComponent;
  let fixture: ComponentFixture<ReferenceDuplicationFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReferenceDuplicationFailureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReferenceDuplicationFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the "Duplicated reference found!" message', () => {
    const alertElement: HTMLElement = fixture.nativeElement.querySelector(
      '.p-4.mb-4.mt-5.text-sm.text-red-800.rounded-lg.bg-red-50'
    );
    expect(alertElement.textContent).toContain('Duplicated reference found!');
  });

  it('should display the list of duplicate references', () => {
    const duplicateReferences: [string, number][] = [
      ['1001', 3],
      ['1002', 2],
    ];

    component.duplicateReferences = duplicateReferences;
    fixture.detectChanges();

    const listItems: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('li');
    expect(listItems.length).toBe(2);

    expect(listItems[0].textContent).toContain(
      'Reference ID: 1001 - Duplicated 3 times'
    );
    expect(listItems[1].textContent).toContain(
      'Reference ID: 1002 - Duplicated 2 times'
    );
  });
});
