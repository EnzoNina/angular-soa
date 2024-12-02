import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, switchMap, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { UserUtilsService } from './user-utils.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = environment.carrito_url;
  private cartId: number | null = null;

  constructor(private http: HttpClient, private userUtilsService: UserUtilsService, private productService: ProductService) {
  }

  getCartId(): number {
    return this.cartId!;
  }

  createCartIfNotExists(): Observable<any> {
    const cartIdFromStorage = localStorage.getItem('cartId');
    if (cartIdFromStorage) {
      this.cartId = +cartIdFromStorage;
      return of({ id: this.cartId });
    }

    return this.getUserIdFromToken().pipe(
      switchMap(userId => {
        if (!userId) {
          return of(null);
        }
        const cartRequest = {
          usuarioId: userId,
          estado: 'Activo',
          subtotal: 0.00,
          descuento: 0.00,
          total: 0.00
        };
        return this.http.post(`${this.baseUrl}`, cartRequest).pipe(
          tap((response: any) => {
            console.log('Carrito creado:', response);
            this.cartId = response.id;
            if (this.cartId !== null) {
              localStorage.setItem('cartId', this.cartId.toString());
            }
          })
        );
      })
    );
  }

  getCart(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getCartProducts(cartId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${cartId}/productos`);
  }

  // Obtener detalles completos del carrito incluyendo los productos
  getCartWithProducts(cartId: number): Observable<any> {
    return this.getCart(cartId).pipe(
      switchMap(cart => this.getCartProducts(cartId).pipe(
        switchMap(cartProducts => {
          const productDetails$ = cartProducts.map((cartProduct: any) =>
            this.productService.getProductById(cartProduct.productoId).pipe(
              map(productDetails => ({
                ...cartProduct,
                producto: productDetails
              }))
            )
          );
          return forkJoin(productDetails$).pipe(
            map(products => ({
              ...cart,
              productos: products
            }))
          );
        })
      ))
    );
  }

  createCart(userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear`, { usuario_id: userId }).pipe(
      tap((response: any) => {
        this.cartId = response.carrito.id;
        if (this.cartId !== null) {
          localStorage.setItem('cartId', this.cartId.toString());
        }
      })
    );
  }

  addProductToCart(cartId: number, productId: number, quantity: number): Observable<any> {
    const request = {
      carritoId: cartId,
      productoId: productId,
      cantidad: quantity
    };
    return this.http.post(`${this.baseUrl}/${cartId}/producto`, request);
  }

  aplicarDescuento(cartId: number, codigoCupon: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${cartId}/descuento?codigoCupon=${codigoCupon}`, {});
  }

  updateProductQuantity(cartDetailId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/producto/${cartDetailId}?cantidad=${quantity}`, {});
  }

  removeProductFromCart(cartDetailId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/producto/${cartDetailId}`);
  }

  clearCart(cartId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${cartId}/vaciar`);
  }

  private getUserIdFromToken(): Observable<number | null> {
    const token = localStorage.getItem('jwt');
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