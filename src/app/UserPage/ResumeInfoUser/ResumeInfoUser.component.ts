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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ResumeInfoUserService } from './ResumeInfoUser.service';
import 'rxjs/add/operator/toPromise';
import { routerTransition } from '../../router.animations';
import { NullAstVisitor } from '@angular/compiler';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ResumeInfoUser',
  templateUrl: './ResumeInfoUser.component.html',
  styleUrls: ['./ResumeInfoUser.component.css'],
  providers: [ResumeInfoUserService],
  animations: [routerTransition()]

})
export class ResumeInfoUserComponent implements OnInit {
  closeResult: string;
  open(content) {
      this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }
  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }
  myForm: FormGroup;
  myForm2: FormGroup;

  private allAssets;
  private asset;
  private Transaction
  private currentId;
  private errorMessage;
  private myResumeInfoUser;


  name = new FormControl("", Validators.required);

  name2 = new FormControl("", Validators.required);

  assetId = new FormControl("", Validators.required);


  ownerId = new FormControl("", Validators.required);



  dob = new FormControl("", Validators.required);

  dob2 = new FormControl("", Validators.required);

  supportField = new FormControl("", Validators.required);


  supportField2 = new FormControl("", Validators.required);



  salaryRequirement = new FormControl("", Validators.required);

  salaryRequirement2 = new FormControl("", Validators.required);


  majorActivities = new FormControl("", Validators.required);
  majorActivities2 = new FormControl("", Validators.required);



  socialExperience = new FormControl("", Validators.required);
  socialExperience2 = new FormControl("", Validators.required);



  skillsAndCapabilities = new FormControl("", Validators.required);
  skillsAndCapabilities2 = new FormControl("", Validators.required);



  isPublic = new FormControl("", Validators.required);
  isPublic2 = new FormControl("", Validators.required);



  userId = new FormControl("test", Validators.required);



  transactionId = new FormControl("", Validators.required);



  timestamp = new FormControl("", Validators.required);




  constructor(private  modalService: NgbModal,private serviceResumeInfoUser: ResumeInfoUserService, fb: FormBuilder) {
    this.myForm = fb.group({


      name2: this.name2,


      assetId: this.assetId,


      ownerId: this.ownerId,



      dob2: this.dob2,



      supportField2: this.supportField2,



      salaryRequirement2: this.salaryRequirement2,



      majorActivities2: this.majorActivities2,



      socialExperience2: this.socialExperience2,



      skillsAndCapabilities2: this.skillsAndCapabilities2,



      isPublic2: this.isPublic2


    });

    this.myForm2 = fb.group({


      name: this.name,


      dob: this.dob,



      supportField: this.supportField,



      salaryRequirement: this.salaryRequirement,



      majorActivities: this.majorActivities,



      socialExperience: this.socialExperience,



      skillsAndCapabilities: this.skillsAndCapabilities,



      isPublic: this.isPublic,



      userId: this.userId,



    });

  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceResumeInfoUser.getSystemPing()
      .toPromise()
      .then((result) => {
        var Id;
        Id = result['participant'];
        Id = Id.split('#');
        this.currentId = Id[1];
        this.serviceResumeInfoUser.getSystemQueryResumeInfoUser("targetUserId", this.currentId)
          .toPromise()
          .then((resumeInfoUser) => {
            this.myResumeInfoUser = resumeInfoUser;
          })
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
          this.errorMessage = error;
        }
      });
  }
  transferToDate(target : string): string{

    if(target == null){
      return null;
    }


    var targetDate = new Date(target);
    var options = {
      year: "numeric", month: "short", day: "numeric"
    };
    var result = targetDate.toLocaleDateString('ko-KR', options);
     return result;
  }
	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }


  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "hansung.ac.kr.transaction.CreateResumeInfoUser",


      "dob": this.dob.value,


      "name": this.name.value,



      "supportField": this.supportField.value,



      "majorActivities": this.majorActivities.value,



      "socialExperience": this.socialExperience.value,



      "skillsAndCapabilities": this.skillsAndCapabilities.value,



      "isPublic": this.isPublic.value,



      "userId": this.userId.value,


    };

    if(this.salaryRequirement.value != null && this.salaryRequirement.value != "")
        this.Transaction.salaryRequirement = this.salaryRequirement.value;    



    this.myForm2.setValue({


      "name": null,


      "dob": null,



      "supportField": null,



      "salaryRequirement": null,



      "majorActivities": null,



      "socialExperience": null,



      "skillsAndCapabilities": null,



      "isPublic": false,



      "userId": null,



    });


    return this.serviceResumeInfoUser.addTransaction(this.Transaction)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.loadAll();
        this.myForm2.setValue({


          "name": null,


          "dob": null,



          "supportField": null,



          "salaryRequirement": null,



          "majorActivities": null,



          "socialExperience": null,



          "skillsAndCapabilities": null,



          "isPublic": false,



          "userId": null,



        });
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else {
          this.errorMessage = "입력 내용이 잘못 되었습니다.";
          alert(this.errorMessage);
        }
      });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "hansung.ac.kr.assets.ResumeInfoUser",



      "ownerId": this.ownerId.value,



      "name": this.name2.value,



      "dob": this.dob2.value,



      "supportField": this.supportField2.value,



      "salaryRequirement": this.salaryRequirement2.value,





      "majorActivities": this.majorActivities2.value,





      "socialExperience": this.socialExperience2.value,





      "skillsAndCapabilities": this.skillsAndCapabilities2.value,





      "isPublic": this.isPublic2.value



    };

    return this.serviceResumeInfoUser.updateAsset(form.get("assetId").value, this.asset)
      .toPromise()
      .then(() => {
        this.loadAll();
        this.errorMessage = null;
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
          this.errorMessage = "입력 내용이 잘못 되었습니다.";
          alert(this.errorMessage);
        }
      });
  }


  deleteAsset(): Promise<any> {

    return this.serviceResumeInfoUser.deleteAsset(this.currentId)
      .toPromise()
      .then(() => {
        this.loadAll();
        this.errorMessage = null;
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
          this.errorMessage = error;
        }
      });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceResumeInfoUser.getAsset(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        let formObject = {
          "assetId": null,
          "ownerId": null,
          "name2": null,
          "dob2": null,
          "supportField2": null,
          "salaryRequirement2": null,
          "majorActivities2": null,
          "socialExperience2": null,
          "skillsAndCapabilities2": null,
          "isPublic2": false
        };

        if (result.assetId) {

          formObject.assetId = result.assetId;

        } else {
          formObject.assetId = null;
        }

        if (result.ownerId) {

          formObject.ownerId = result.ownerId;

        } else {
          formObject.ownerId = null;
        }

        if (result.name) {

          formObject.name2 = result.name;

        } else {
          formObject.name2 = null;
        }


        if (result.dob) {

          formObject.dob2 = result.dob;

        } else {
          formObject.dob2 = null;
        }

        if (result.supportField) {

          formObject.supportField2 = result.supportField;

        } else {
          formObject.supportField2 = null;
        }

        if (result.salaryRequirement) {

          formObject.salaryRequirement2 = result.salaryRequirement;

        } else {
          formObject.salaryRequirement2 = null;
        }

        if (result.majorActivities) {

          formObject.majorActivities2 = result.majorActivities;

        } else {
          formObject.majorActivities2 = null;
        }

        if (result.socialExperience) {

          formObject.socialExperience2 = result.socialExperience;

        } else {
          formObject.socialExperience2 = null;
        }

        if (result.skillsAndCapabilities) {

          formObject.skillsAndCapabilities2 = result.skillsAndCapabilities;

        } else {
          formObject.skillsAndCapabilities2 = null;
        }

        if (result.isPublic) {

          formObject.isPublic2 = result.isPublic;

        } else {
          formObject.isPublic2 = false;
        }


        this.myForm.setValue(formObject);

      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
          this.errorMessage = error;
        }
      });

  }

  resetForm(): void {
    this.myForm.setValue({

      
      "assetId": null,


      "ownerId": null,


      "name2":null,


      "dob2": null,



      "supportField2": null,



      "salaryRequirement2": null,



      "majorActivities2": null,



      "socialExperience2": null,



      "skillsAndCapabilities2": null,



      "isPublic2": false


    });
  }

}
