import { Observable } from 'rxjs/internal/Observable';

export interface VariantFieldsInterface {
  GetAll(data: any, metadata?: any): Observable<any>;
  GetOne(data: any, metadata?: any): Observable<any>;
  Create(data: any, metadata?: any): Observable<any>;
  AddNew(data: any, metadata?: any): Observable<any>;
  Delete(data: any, metadata?: any): Observable<any>;
  Update(data: any, metadata?: any): Observable<any>;
}
