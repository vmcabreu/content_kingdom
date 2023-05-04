import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { Usuario } from '../model/usuario.model';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<any>', () => {
    let nombre= 'test';
    let  passwd: 'test'
    service.loginUser(nombre,passwd).subscribe(result => {
      expect(result).toBeDefined();
      expect(typeof result).toEqual('object');
    });
    const req = httpMock.expectOne(`${service.url}/login/login.php`);
    expect(req.request.method).toBe('POST');
    req.flush({}); // Puedes ajustar esto según lo que quieras devolver en el test
  });
});
