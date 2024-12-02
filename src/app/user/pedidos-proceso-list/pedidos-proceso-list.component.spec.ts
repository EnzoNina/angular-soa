import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosProcesoListComponent } from './pedidos-proceso-list.component';

describe('PedidosProcesoListComponent', () => {
  let component: PedidosProcesoListComponent;
  let fixture: ComponentFixture<PedidosProcesoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosProcesoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosProcesoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
