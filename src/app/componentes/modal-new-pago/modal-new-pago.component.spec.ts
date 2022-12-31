import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewPagoComponent } from './modal-new-pago.component';

describe('ModalNewPagoComponent', () => {
  let component: ModalNewPagoComponent;
  let fixture: ComponentFixture<ModalNewPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNewPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNewPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
