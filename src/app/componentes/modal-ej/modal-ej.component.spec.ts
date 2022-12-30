import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEjComponent } from './modal-ej.component';

describe('ModalEjComponent', () => {
  let component: ModalEjComponent;
  let fixture: ComponentFixture<ModalEjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEjComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
