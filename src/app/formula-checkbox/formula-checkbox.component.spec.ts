import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaCheckboxComponent } from './formula-checkbox.component';

describe('FormulaCheckboxComponent', () => {
  let component: FormulaCheckboxComponent;
  let fixture: ComponentFixture<FormulaCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
