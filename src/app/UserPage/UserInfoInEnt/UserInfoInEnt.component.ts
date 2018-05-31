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
import { UserInfoInEntService } from './UserInfoInEnt.service';
import 'rxjs/add/operator/toPromise';
import { routerTransition } from '../../router.animations';
import { NullAstVisitor } from '@angular/compiler';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-UserInfoInEnt',
	templateUrl: './UserInfoInEnt.component.html',
	styleUrls: ['./UserInfoInEnt.component.css'],
  providers: [UserInfoInEntService],
  animations: [routerTransition()]

})
export class UserInfoInEntComponent implements OnInit {
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
  private Transaction;
  private currentId;
  private errorMessage;
  private myUserInfoInEntList;
  private myAuthenticationList;
  private isAuthentication;
  

  
      
          assetId = new FormControl("", Validators.required);
        
  
      
          ownerId = new FormControl("", Validators.required);
        
  
      
          authorizedParticipantId = new FormControl("", Validators.required);
        
  
      
          enterpriseName = new FormControl("", Validators.required);
        
  
      
          userPosition = new FormControl("", Validators.required);
        
  
      
          performingTask = new FormControl("", Validators.required);
        
  
      
          dateOfEmployment = new FormControl("", Validators.required);
        
  
      
          retirementDate = new FormControl("", Validators.required);
        
  
      
          transactionTime = new FormControl("", Validators.required);
        
  
      
          isPublic = new FormControl("", Validators.required);


          userId = new FormControl("test",Validators.required);  

    
          transactionId = new FormControl("",Validators.required);  
        
    
          timestamp = new FormControl("",Validators.required);  
        
  


  constructor( private  modalService: NgbModal,private serviceUserInfoInEnt:UserInfoInEntService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          assetId:this.assetId,
        
    
        
          ownerId:this.ownerId,
        
    
        
          authorizedParticipantId:this.authorizedParticipantId,
        
    
        
          enterpriseName:this.enterpriseName,
        
    
        
          userPosition:this.userPosition,
        
    
        
          performingTask:this.performingTask,
        
    
        
          dateOfEmployment:this.dateOfEmployment,
        
    
        
          retirementDate:this.retirementDate,
        
    
        
          transactionTime:this.transactionTime,
        
    
        
          isPublic:this.isPublic
        
    
    });

      this.myForm2 = fb.group({
    
        
        authorizedParticipantId:this.authorizedParticipantId,
    

    
          enterpriseName:this.enterpriseName,
    

    
         userPosition:this.userPosition,
    

    
         performingTask:this.performingTask,
    

    
        dateOfEmployment:this.dateOfEmployment,
    

    
        retirementDate:this.retirementDate,
    

    
        isPublic:this.isPublic,
    

    
        userId:this.userId,
    

    });
  };



  authenticationExist(approvalStatus : string){
    this.isAuthentication = approvalStatus;

  }

  printAuthentication(){

   return this.isAuthentication;
  }




  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceUserInfoInEnt.getSystemPing()
      .toPromise()
      .then((result) => {
        var Id;
        Id = result['participant'];
        Id = Id.split('#');
        this.currentId = Id[1];

        
     
        this.getMyUserInfoInEntList();
      })
      .catch((error) => {
          if(error == 'Server error'){
              this.errorMessage = "Could not connect to REST server. Please check your configuration details";
          }
          else if(error == '404 - Not Found'){
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
          }
          else{
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


  getMyUserInfoInEntList(): Promise<any> {
    return   this.serviceUserInfoInEnt.getSystemQueryUserInfoInEnt("targetUserId", this.currentId)
    .toPromise()
    .then((userInfoInEnt) => {

      this.myUserInfoInEntList = userInfoInEnt;
      this.getMyAuthenticationList();
    })
    .catch((error) => {
      console.log(error);
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


  getMyAuthenticationList(): Promise<any> {
    return   this.serviceUserInfoInEnt.getSystemQueryAuthentication("targetUserId", this.currentId)
    .toPromise()
    .then((authenticationList) => {
      this.myAuthenticationList = authenticationList;
    })
    .catch((error) => {
      console.log(error);
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
      $class: "hansung.ac.kr.transaction.CreateUserInfoInEnt",
      
        
          "authorizedParticipantId":this.authorizedParticipantId.value,
        
      
        
          "enterpriseName":this.enterpriseName.value,
        
      
        
          "userPosition":this.userPosition.value,
        
      
        
          "performingTask":this.performingTask.value,
        
      
        
          "isPublic":this.isPublic.value,
        
      
        
          "userId":this.userId.value
        
      
    };

    if(this.dateOfEmployment.value != null && this.dateOfEmployment.value != "") 
	this.Transaction.dateOfEmployment = this.dateOfEmployment.value;
    if(this.retirementDate.value != null && this.retirementDate.value != "")
	this.Transaction.retirementDate = this.retirementDate.value; 


    this.myForm2.setValue({
      
        
          "authorizedParticipantId":null,
        
      
        
          "enterpriseName":null,
        
      
        
          "userPosition":null,
        
      
        
          "performingTask":null,
        
      
        
          "dateOfEmployment":null,
        
      
        
          "retirementDate":null,
        
      
        
          "isPublic":false,
        
      
        
          "userId":null
        
    });

    return this.serviceUserInfoInEnt.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
      this.myForm2.setValue({
      
        
          "authorizedParticipantId":null,
        
      
        
          "enterpriseName":null,
        
      
        
          "userPosition":null,
        
      
        
          "performingTask":null,
        
      
        
          "dateOfEmployment":null,
        
      
        
          "retirementDate":null,
        
      
        
          "isPublic":false,
        
      
        
          "userId":null,
        
      
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
          this.errorMessage = "입력 내용이 잘못 되었습니다.";
          alert(this.errorMessage);
        }
    });
  }

   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "hansung.ac.kr.assets.UserInfoInEnt",
      
        
          
        
    
        
          
            "ownerId":this.ownerId.value,
          
        
    
        
          
            "authorizedParticipantId":this.authorizedParticipantId.value,
          
        
    
        
          
            "enterpriseName":this.enterpriseName.value,
          
        
    
        
          
            "userPosition":this.userPosition.value,
          
        
    
        
          
            "performingTask":this.performingTask.value,
          
        
    
        
          
            "dateOfEmployment":this.dateOfEmployment.value,
          
        
    
        
          
            "retirementDate":this.retirementDate.value,
          
        
    
        
          
            "transactionTime":this.transactionTime.value,
          
        
    
        
          
            "isPublic":this.isPublic.value
          
        
    
    };

    return this.serviceUserInfoInEnt.updateAsset(form.get("assetId").value,this.asset)
		.toPromise()
		.then(() => {
      this.loadAll();
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = "입력 내용이 잘못 되었습니다.";
          alert(this.errorMessage);
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceUserInfoInEnt.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
      this.loadAll();
      this.errorMessage = null;
      this.deleteAsset2();
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset2(): Promise<any> {
    return this.serviceUserInfoInEnt.deleteAsset2(this.currentId)
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





  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceUserInfoInEnt.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "assetId":null,
          
        
          
            "ownerId":null,
          
        
          
            "authorizedParticipantId":null,
          
        
          
            "enterpriseName":null,
          
        
          
            "userPosition":null,
          
        
          
            "performingTask":null,
          
        
          
            "dateOfEmployment":null,
          
        
          
            "retirementDate":null,
          
        
          
            "transactionTime":null,
          
        
          
            "isPublic":false 
          
        
      };



      
        if(result.assetId){
          
            formObject.assetId = result.assetId;
          
        }else{
          formObject.assetId = null;
        }
      
        if(result.ownerId){
          
            formObject.ownerId = result.ownerId;
          
        }else{
          formObject.ownerId = null;
        }
      
        if(result.authorizedParticipantId){
          
            formObject.authorizedParticipantId = result.authorizedParticipantId;
          
        }else{
          formObject.authorizedParticipantId = null;
        }
      
        if(result.enterpriseName){
          
            formObject.enterpriseName = result.enterpriseName;
          
        }else{
          formObject.enterpriseName = null;
        }
      
        if(result.userPosition){
          
            formObject.userPosition = result.userPosition;
          
        }else{
          formObject.userPosition = null;
        }
      
        if(result.performingTask){
          
            formObject.performingTask = result.performingTask;
          
        }else{
          formObject.performingTask = null;
        }
      
        if(result.dateOfEmployment){
          
            formObject.dateOfEmployment = result.dateOfEmployment;
          
        }else{
          formObject.dateOfEmployment = null;
        }
      
        if(result.retirementDate){
          
            formObject.retirementDate = result.retirementDate;
          
        }else{
          formObject.retirementDate = null;
        }
      
        if(result.transactionTime){
          
            formObject.transactionTime = result.transactionTime;
          
        }else{
          formObject.transactionTime = null;
        }
      
        if(result.isPublic){
          
            formObject.isPublic = result.isPublic;
          
        }else{
          formObject.isPublic = false;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "assetId":null,
        
      
        
          "ownerId":null,
        
      
        
          "authorizedParticipantId":null,
        
      
        
          "enterpriseName":null,
        
      
        
          "userPosition":null,
        
      
        
          "performingTask":null,
        
      
        
          "dateOfEmployment":null,
        
      
        
          "retirementDate":null,
        
      
        
          "transactionTime":null,
        
      
        
          "isPublic":false 
        
      
      });
  }

}
