import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirTodosComponent } from './imprimir-todos.component';

describe('ImprimirTodosComponent', () => {
  let component: ImprimirTodosComponent;
  let fixture: ComponentFixture<ImprimirTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimirTodosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprimirTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
