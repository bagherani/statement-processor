import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalanceFailureComponentComponent } from './balance-failure-component.component';

describe('BalanceFailureComponentComponent', () => {
  let component: BalanceFailureComponentComponent;
  let fixture: ComponentFixture<BalanceFailureComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BalanceFailureComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceFailureComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
