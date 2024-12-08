import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviosUsuariosComponent } from './envios-usuarios.component';

describe('EnviosUsuariosComponent', () => {
  let component: EnviosUsuariosComponent;
  let fixture: ComponentFixture<EnviosUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviosUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviosUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
