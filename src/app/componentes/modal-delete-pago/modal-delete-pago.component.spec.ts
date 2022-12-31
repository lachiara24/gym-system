import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletePagoComponent } from './modal-delete-pago.component';

describe('ModalDeletePagoComponent', () => {
  let component: ModalDeletePagoComponent;
  let fixture: ComponentFixture<ModalDeletePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeletePagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeletePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
