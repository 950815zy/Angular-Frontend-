import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayResourceByProjectComponent } from './display-resource-by-project.component';

describe('DisplayResourceByProjectComponent', () => {
  let component: DisplayResourceByProjectComponent;
  let fixture: ComponentFixture<DisplayResourceByProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayResourceByProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayResourceByProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
