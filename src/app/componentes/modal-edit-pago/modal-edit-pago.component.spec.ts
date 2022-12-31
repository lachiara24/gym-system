import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditPagoComponent } from './modal-edit-pago.component';

describe('ModalEditPagoComponent', () => {
  let component: ModalEditPagoComponent;
  let fixture: ComponentFixture<ModalEditPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
