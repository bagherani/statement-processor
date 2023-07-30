import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultViewComponent } from './result.view.component';
import { ValidateService } from '../../services/validate.service';
import { ReferenceDuplicationFailureComponent } from '../reference-duplication-failure/reference-duplication-failure.component';
import { BalanceFailureComponent } from '../balance-failure/balance-failure.component';
import { FileParsingFailureComponent } from '../file-parsing-failure/file-parsing-failure.component';

describe('ResultViewComponent', () => {
  let component: ResultViewComponent;
  let fixture: ComponentFixture<ResultViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FileParsingFailureComponent,
        BalanceFailureComponent,
        ReferenceDuplicationFailureComponent,
        ResultViewComponent,
      ],
      providers: [ValidateService],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display statement-validator-reference-duplication-failure if there are duplicate references', () => {
    component.validationResponse = {
      duplicatedReferences: { 1: 30, 2: 100 },
      errors: [],
      invalidRecords: {},
    };

    fixture.detectChanges();

    const expectedComponent = fixture.nativeElement.querySelector(
      'statement-validator-reference-duplication-failure'
    );
    expect(expectedComponent).toBeTruthy();
  });

  it('should display statement-validator-balance-failure if there are duplicate references', () => {
    component.validationResponse = {
      duplicatedReferences: {},
      errors: [],
      invalidRecords: { 1: { startBalance: 10, mutation: 10, endBalance: 30 } },
    };

    fixture.detectChanges();

    const expectedComponent = fixture.nativeElement.querySelector(
      'statement-validator-balance-failure'
    );
    expect(expectedComponent).toBeTruthy();
  });

  it('should displaystatement-validator-file-parsing-failure if there are duplicate references', () => {
    component.validationResponse = {
      duplicatedReferences: {},
      errors: ['file error'],
      invalidRecords: {},
    };

    fixture.detectChanges();

    const expectedComponent = fixture.nativeElement.querySelector(
      'statement-validator-file-parsing-failure'
    );
    expect(expectedComponent).toBeTruthy();
  });

  it('should display "No error found" if the validation is successful', () => {
    component.validationResponse = {
      duplicatedReferences: {},
      errors: [],
      invalidRecords: {},
    };

    fixture.detectChanges();

    const expectedComponent = fixture.nativeElement.querySelector(
      '.p-4.mb-4.text-sm.text-green-800.rounded-lg.bg-green-50'
    );
    expect(expectedComponent).toBeTruthy();
  });
});
