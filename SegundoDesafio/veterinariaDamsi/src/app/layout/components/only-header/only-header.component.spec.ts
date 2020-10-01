import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyHeaderComponent } from './only-header.component';

describe('OnlyHeaderComponent', () => {
  let component: OnlyHeaderComponent;
  let fixture: ComponentFixture<OnlyHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlyHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
