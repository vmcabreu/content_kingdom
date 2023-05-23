import { TestBed } from '@angular/core/testing';

import { EtiquetaPublicacionService } from './etiqueta-publicacion.service';

describe('EtiquetaPublicacionService', () => {
  let service: EtiquetaPublicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtiquetaPublicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
