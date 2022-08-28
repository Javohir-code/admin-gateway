import { Observable } from 'rxjs';
import { Page } from '../dto/page.dto';

export interface PageControllerInterface {
  GetAll(data?: object): Observable<Page[]>;
  FindById(data: any): Observable<Page>;
  Create(data: any): Observable<Page>;
  Update(data: any): Observable<Page>;
  Delete(data: any): Observable<{ success: boolean }>;
}
