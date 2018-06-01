import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormArray, FormBuilder,FormControl,
    Validators  } from '@angular/forms';
import { UserInfoInSchRoutingModule } from './UserInfoInSch-routing.module';
import { UserInfoInSchComponent } from './UserInfoInSch.component';
import 'rxjs/add/operator/toPromise';
import { PageHeaderModule } from './../../shared';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'

@NgModule({
    imports: [CommonModule, UserInfoInSchRoutingModule,FormsModule,ReactiveFormsModule],
    declarations: [UserInfoInSchComponent]
})
export class UserInfoInSchModule {}
