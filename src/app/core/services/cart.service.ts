import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, switchMap, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserUtilsService } from './user-utils.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = environment.carrito_url;
  private cartId: number | null = null;

  constructor(private http: HttpClient, private cookieService: CookieService, private userUtilsService: UserUtilsService) {
  }

  getCartId(): number {
    return this.cartId!;
  }

  createCartIfNotExists(): Observable<any> {
    const cartIdFromCookie = this.cookieService.get('cartId');
    if (cartIdFromCookie) {
      this.cartId = +cartIdFromCookie;
      return of({ carrito: { id: this.cartId } });
    }

    return this.getUserIdFromToken().pipe(
      switchMap(userId => {
        if (!userId) {
          return of(null);
        }
        return this.http.post(`${this.baseUrl}/crear`, { usuario_id: userId }).pipe(
          tap((response: any) => {
            console.log('Carrito creado:', response);
            this.cartId = response.carrito.id;
            if (this.cartId !== null) {
              this.cookieService.set('cartId', this.cartId.toString());
            }
          })
        );
      })
    );
  }

  getCart(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/consultar/${id}`);
  }

  createCart(userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear`, { usuario_id: userId }).pipe(
      tap((response: any) => {
        this.cartId = response.carrito.id;
        if (this.cartId !== null) {
          this.cookieService.set('cartId', this.cartId.toString());
        }
      })
    );
  }

  addProductToCart(cartId: number, productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/agregarProducto`, {
      id_carrito: cartId,
      id_producto: productId,
      cantidad: quantity
    });
  }

  updateProductQuantity(cartId: number, productId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizarCantidad/${cartId}`, { id_producto: productId, cantidad: quantity });
  }

  removeProductFromCart(cartId: number, productId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/quitarProducto`, { id_carrito: cartId, id_producto: productId });
  }

  clearCart(cartId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/vaciarCarrito/${cartId}`);
  }

  private getUserIdFromToken(): Observable<number | null> {
    const token = this.cookieService.get('jwt');
    if (!token) {
      return of(null);
    }
    const decodedToken = new JwtHelperService().decodeToken(token);
    const email = decodedToken.sub;
    if (!email) {
      return of(null);
    }
    return this.userUtilsService.findUserByEmail(email).pipe(
      map(user =>
        user ? user.id : null
      )
    );
  }

}