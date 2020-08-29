import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasFormComponent } from './gas-form.component';

describe('GasFormComponent', () => {
  let component: GasFormComponent;
  let fixture: ComponentFixture<GasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
