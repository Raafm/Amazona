import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { BaseService } from '../services/base.service';
import { RequestStatus } from '../shared/utils/request-status';
import { ErrorResponse } from '../shared/utils/response';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import ProductModel from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService extends BaseService {
  private productsPrefix: string = '/products';

  public productsStatus: BehaviorSubject<
    RequestStatus<ProductModel[], ErrorResponse>
  > = new BehaviorSubject<RequestStatus<ProductModel[], ErrorResponse>>(
    RequestStatus.idle()
  );
  public productsStatus$ = this.productsStatus.asObservable();

  constructor(private httpService: HttpService) {
    super();
  }

  public async getProducts(): Promise<void> {
    this.productsStatus.next(RequestStatus.loading());

    const response = await firstValueFrom(
      this.httpService.get(`${this.productsPrefix}`)
    );

    response.handle({
      onSuccess: (response) => {
        let products: ProductModel[] = [];
        if (Array.isArray(response.data)) {
          products = response.data.map((product) => {
            return new ProductModel(product);
          });
        }

        this.productsStatus.next(RequestStatus.success(products));
      },
      onFailure: (error) => {
        this.productsStatus.next(RequestStatus.failure(error));
      },
    });
  }
}
