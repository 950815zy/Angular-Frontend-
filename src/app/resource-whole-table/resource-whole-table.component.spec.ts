import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceWholeTableComponent } from './resource-whole-table.component';

describe('ResourceWholeTableComponent', () => {
  let component: ResourceWholeTableComponent;
  let fixture: ComponentFixture<ResourceWholeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceWholeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceWholeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
