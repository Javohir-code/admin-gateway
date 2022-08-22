import { Observable } from 'rxjs/internal/Observable';

export interface CategoryControllerInterface {
  GetCategories(data: any, metadata?: any): Observable<any>;
  GetCategory(data: any, metadata?: any): Observable<any>;
  GetTreeCategory(data?: any, metadata?: any): Observable<any>;
  AddNew(data: any, metadata?: any): Observable<any>;
  Delete(data: any, metadata?: any): Observable<any>;
  Update(data: any, metadata?: any): Observable<any>;
}
