import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCasosComponent } from './historial-casos.component';

describe('HistorialCasosComponent', () => {
  let component: HistorialCasosComponent;
  let fixture: ComponentFixture<HistorialCasosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialCasosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialCasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
