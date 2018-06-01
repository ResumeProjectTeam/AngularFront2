/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { UserInfoInSch, Authentication } from '../hansung.ac.kr.assets';
import 'rxjs/Rx';
import { CreateUserInfoInSch } from '../hansung.ac.kr.transaction';

// Can be injected into a constructor
@Injectable()
export class UserInfoInSchService {

	
		private NAMESPACE: string = 'UserInfoInSch';
    private NAMESPACE2: string = 'CreateUserInfoInSch';
    private NAMESPACE3: string = 'Authentication';


    constructor(
      private dataService: DataService<UserInfoInSch>,
      private dataService2: DataService<CreateUserInfoInSch>,
      private dataService3: DataService<Authentication>
    
    ) {
    };

    public getAll(): Observable<UserInfoInSch[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }
    public getAll2():  Observable<Authentication[]> {
        return this.dataService3.getAll(this.NAMESPACE3);
    }

    public getAsset(id: any): Observable<UserInfoInSch> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<UserInfoInSch> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public addTransaction(itemToAdd: any): Observable<CreateUserInfoInSch> {
      return this.dataService2.add(this.NAMESPACE2, itemToAdd);

    }

    public updateAsset(id: any, itemToUpdate: any): Observable<UserInfoInSch> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<UserInfoInSch> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

    public deleteAsset2(id: any): Observable<Authentication> {
      return this.dataService3.delete(this.NAMESPACE3, id);
    }


    public getSystemPing(): Observable<JSON> {
      return this.dataService.getSystemPing();
    }

    public getSystemQueryUserInfoInSch(parameterName: string, id: string) : Observable<UserInfoInSch[]> {
      return this.dataService.getSystemQueryUserInfoInSch("searchUserInfoInSchById", parameterName, id);
    }


    public getSystemQueryAuthentication(parameterName: string, id: string) : Observable<Authentication[]> {
      return this.dataService.getSystemQueryAuthentication("searchAuthenticationById", parameterName, id);
    }

}
