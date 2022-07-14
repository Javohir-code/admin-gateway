import { Observable } from 'rxjs';
import { District } from '../dto/district.dto';

export interface DistrictControllerInterface {
  create(data: any): Observable<District>;
  update(data: any): Observable<District>;
  delete(data: any): Observable<{ success: boolean }>;
}
