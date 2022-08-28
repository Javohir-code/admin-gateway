import { Observable } from 'rxjs/internal/Observable';

export interface OrderControllerInterface {
  GetOrders(data: any, metadata?: any): Observable<any>;
  GetOrder(data: any, metadata?: any): Observable<any>;
  AddNew(data: any, metadata?: any): Observable<any>;
  Update(data: any, metadata?: any): Observable<any>;
  Delete(data: any, metadata?: any): Observable<any>;
}
