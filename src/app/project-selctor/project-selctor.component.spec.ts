import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSelctorComponent } from './project-selctor.component';

describe('ProjectSelctorComponent', () => {
  let component: ProjectSelctorComponent;
  let fixture: ComponentFixture<ProjectSelctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSelctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSelctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
