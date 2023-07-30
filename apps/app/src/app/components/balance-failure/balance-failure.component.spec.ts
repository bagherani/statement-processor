import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalanceFailureComponent } from './balance-failure.component';
import { InvalidRecordType } from '@statement-validator/models';

describe('BalanceFailureComponent', () => {
  let component: BalanceFailureComponent;
  let fixture: ComponentFixture<BalanceFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BalanceFailureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the "Invalid transaction found!" message', () => {
    const alertElement: HTMLElement =
      fixture.nativeElement.querySelector('span.font-medium');
    expect(alertElement.textContent).toContain('Invalid transaction found!');
  });

  it('should display the list of invalid records', () => {
    const invalidRecords: InvalidRecordType = [
      {
        reference: '1',
        startBalance: 80,
        mutation: 20,
        expectedBalance: 100,
        endBalance: 110,
      },
      {
        reference: '2',
        startBalance: 0.1,
        mutation: 0.03,
        expectedBalance: 0.13,
        endBalance: 2,
      },
    ];

    component.invalidRecords = invalidRecords;
    fixture.detectChanges();

    const tableHeaders: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('thead tr th');
    expect(tableHeaders.length).toBe(5);
    expect(tableHeaders[0].textContent).toBe('Ref ID');
    expect(tableHeaders[1].textContent).toBe('Start Balance');
    expect(tableHeaders[2].textContent).toBe('Mutation');
    expect(tableHeaders[3].textContent).toBe('Expected End Balance');
    expect(tableHeaders[4].textContent).toBe('End Balance');

    for (let i = 0; i < invalidRecords.length; i++) {
      const tableRows: NodeListOf<HTMLElement> =
        fixture.nativeElement.querySelectorAll(
          `tbody tr:nth-child(${i + 1}) td`
        );

      expect(tableRows[0].textContent).toContain(
        String(invalidRecords[i].reference)
      );
      expect(tableRows[1].textContent).toContain(
        String(invalidRecords[i].startBalance)
      );
      expect(tableRows[2].textContent).toContain(
        String(invalidRecords[i].mutation)
      );
      expect(tableRows[3].textContent).toContain(
        String(invalidRecords[i].expectedBalance)
      );
      expect(tableRows[4].textContent).toContain(
        String(invalidRecords[i].endBalance)
      );
    }
  });
});
