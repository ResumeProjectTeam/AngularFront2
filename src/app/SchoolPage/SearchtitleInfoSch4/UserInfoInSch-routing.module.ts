import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoInSchComponent } from './UserInfoInSch.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'
import { FormGroup, FormArray, FormBuilder,FormControl,
    Validators  } from '@angular/forms';
    

    const routes: Routes = [
    {
        path: '',
        component: UserInfoInSchComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserInfoInSchRoutingModule {}
