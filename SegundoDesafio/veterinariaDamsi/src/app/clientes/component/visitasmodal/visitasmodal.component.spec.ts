import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasmodalComponent } from './visitasmodal.component';

describe('VisitasmodalComponent', () => {
  let component: VisitasmodalComponent;
  let fixture: ComponentFixture<VisitasmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitasmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitasmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
