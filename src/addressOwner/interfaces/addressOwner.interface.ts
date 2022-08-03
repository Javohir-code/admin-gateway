import { Observable } from 'rxjs/internal/Observable';

export interface AddressOwnerInterface {
  GetAll(data: any): Observable<any>;
  GetOne(data: any): Observable<any>;
  Update(data: any): Observable<any>;
  AddNew(data: any): Observable<any>;
  Delete(data: any): Observable<any>;
}
