import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesItemComponent } from './clientes-item.component';

describe('ClientesItemComponent', () => {
  let component: ClientesItemComponent;
  let fixture: ComponentFixture<ClientesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
