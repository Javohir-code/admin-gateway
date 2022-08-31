import { Observable } from 'rxjs/internal/Observable';

export interface VariantInterface {
  GetAll(data: any, metadata?: any): Observable<any>;
  GetProductVariant(data: any, metadata?: any): Observable<any>;
  GetOne(data: any, metadata?: any): Observable<any>;
  AddNew(data: any, metadata?: any): Observable<any>;
  VariantAdd(data: any, metadata?: any): Observable<any>;
  Delete(data: any, metadata?: any): Observable<any>;
  Update(data: any, metadata?: any): Observable<any>;
  GetCategories(data: any, metadata?: any): Observable<any>;
  GetTreeCategory(data?: any, metadata?: any): Observable<any>;
}
