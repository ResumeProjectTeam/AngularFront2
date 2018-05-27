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
import { FormGroup, FormArray, FormBuilder,FormControl,
    Validators  } from '@angular/forms';
    import { SearchtitleService } from './Search.service';
    import 'rxjs/add/operator/toPromise';
import { NullAstVisitor } from '@angular/compiler';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from '../../router.animations';

@Component({
	selector: 'app-Search',
	templateUrl: './Search.component.html',
	styleUrls: ['./Search.component.css'],
  providers: [SearchtitleService],
  animations: [routerTransition()]

})
export class SearchComponent implements OnInit {
    myForm: FormGroup;
    place: string;
    language: string;
  
    private allAssets;
    private asset;
    private currentId;
    private errorMessage;
  
    
        
            assetId = new FormControl("", Validators.required);
          
    
        
            ownerId = new FormControl("", Validators.required);
          
    
        
            parentResumeId = new FormControl("", Validators.required);
          
    
        
            certificateName = new FormControl("", Validators.required);
          
    
        
            certificateScore = new FormControl("", Validators.required);
          
    
        
            issuingOrg = new FormControl("", Validators.required);
          
    
        
            organizationName = new FormControl("", Validators.required);
          
    
        
            dob = new FormControl("", Validators.required);
          
    
        
            expirationDate = new FormControl("", Validators.required);
          
    
        
            transactionTime = new FormControl("", Validators.required);
          
    
        
            publicOnOff = new FormControl("", Validators.required);
          
    
  
  
    constructor(private serviceCertificate:SearchtitleService, fb: FormBuilder) {
      this.myForm = fb.group({
      
          
            assetId:this.assetId,
          
      
          
            ownerId:this.ownerId,
          
      
          
            parentResumeId:this.parentResumeId,
          
      
          
            certificateName:this.certificateName,
          
      
          
            certificateScore:this.certificateScore,
          
      
          
            issuingOrg:this.issuingOrg,
          
      
          
            organizationName:this.organizationName,
          
      
          
            dob:this.dob,
          
      
          
            expirationDate:this.expirationDate,
          
      
          
            transactionTime:this.transactionTime,
          
      
          
            publicOnOff:this.publicOnOff
          
      
      });
    };
  
    ngOnInit(): void {
      this.loadAll();
    }
  
    loadAll(): Promise<any> {
      let tempList = [];
      return this.serviceCertificate.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(asset => {
          tempList.push(asset);
        });
        this.allAssets = tempList;
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
  
    loadOption(cname: string, score: number): Promise<any> {
      let tempList = [];
      let tempList2 = [];
      
      cname =cname.toLowerCase();
      //score = score.toLowerCase();
      return this.serviceCertificate.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(asset => {
          if(asset.certificateName.toLowerCase() == cname && asset.certificateScore == score)
            tempList.push(asset);
          else if(asset.certificateName.toLowerCase() == cname)
            tempList.push(asset);
          else if(tempList.length == 0 && asset.certificateScore == score)
            tempList.push(asset);
          else tempList2.push(asset);
        });
        if(tempList.length == 0) {alert("검색결과가 없습니다. 다시 입력해주세요");
        this.allAssets = tempList;}
        else this.allAssets = tempList;
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
    addAsset(form: any): Promise<any> {
      this.asset = {
        $class: "hansung.ac.kr.assets.Certificate",
        
          
            "assetId":this.assetId.value,
          
        
          
            "ownerId":this.ownerId.value,
          
        
          
            "parentResumeId":this.parentResumeId.value,
          
        
          
            "certificateName":this.certificateName.value,
          
        
          
            "certificateScore":this.certificateScore.value,
          
        
          
            "issuingOrg":this.issuingOrg.value,
          
        
          
            "organizationName":this.organizationName.value,
          
        
          
            "dob":this.dob.value,
          
        
          
            "expirationDate":this.expirationDate.value,
          
        
          
            "transactionTime":this.transactionTime.value,
          
        
          
            "publicOnOff":this.publicOnOff.value
          
        
      };
  
      this.myForm.setValue({
        
          
            "assetId":null,
          
        
          
            "ownerId":null,
          
        
          
            "parentResumeId":null,
          
        
          
            "certificateName":null,
          
        
          
            "certificateScore":null,
          
        
          
            "issuingOrg":null,
          
        
          
            "organizationName":null,
          
        
          
            "dob":null,
          
        
          
            "expirationDate":null,
          
        
          
            "transactionTime":null,
          
        
          
            "publicOnOff":null
          
        
      });
  
      return this.serviceCertificate.addAsset(this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myForm.setValue({
        
          
            "assetId":null,
          
        
          
            "ownerId":null,
          
        
          
            "parentResumeId":null,
          
        
          
            "certificateName":null,
          
        
          
            "certificateScore":null,
          
        
          
            "issuingOrg":null,
          
        
          
            "organizationName":null,
          
        
          
            "dob":null,
          
        
          
            "expirationDate":null,
          
        
          
            "transactionTime":null,
          
        
          
            "publicOnOff":null 
          
        
        });
      })
      .catch((error) => {
          if(error == 'Server error'){
              this.errorMessage = "Could not connect to REST server. Please check your configuration details";
          }
          else{
              this.errorMessage = error;
          }
      });
    }
  
  
     updateAsset(form: any): Promise<any> {
      this.asset = {
        $class: "hansung.ac.kr.assets.Certificate",
        
          
            
          
      
          
            
              "ownerId":this.ownerId.value,
            
          
      
          
            
              "parentResumeId":this.parentResumeId.value,
            
          
      
          
            
              "certificateName":this.certificateName.value,
            
          
      
          
            
              "certificateScore":this.certificateScore.value,
            
          
      
          
            
              "issuingOrg":this.issuingOrg.value,
            
          
      
          
            
              "organizationName":this.organizationName.value,
            
          
      
          
            
              "dob":this.dob.value,
            
          
      
          
            
              "expirationDate":this.expirationDate.value,
            
          
      
          
            
              "transactionTime":this.transactionTime.value,
            
          
      
          
            
              "publicOnOff":this.publicOnOff.value
            
          
      
      };
  
      return this.serviceCertificate.updateAsset(form.get("assetId").value,this.asset)
      .toPromise()
      .then(() => {
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
          this.errorMessage = error;
        }
      });
    }
  
  
    deleteAsset(): Promise<any> {
  
      return this.serviceCertificate.deleteAsset(this.currentId)
      .toPromise()
      .then(() => {
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
          this.errorMessage = error;
        }
      });
    }
  
    setId(id: any): void{
      this.currentId = id;
    }
  
    getForm(id: any): Promise<any>{
  
      return this.serviceCertificate.getAsset(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        let formObject = {
          
            
              "assetId":null,
            
          
            
              "ownerId":null,
            
          
            
              "parentResumeId":null,
            
          
            
              "certificateName":null,
            
          
            
              "certificateScore":null,
            
          
            
              "issuingOrg":null,
            
          
            
              "organizationName":null,
            
          
            
              "dob":null,
            
          
            
              "expirationDate":null,
            
          
            
              "transactionTime":null,
            
          
            
              "publicOnOff":null 
            
          
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
        
         
        
          if(result.certificateName){
            
              formObject.certificateName = result.certificateName;
            
          }else{
            formObject.certificateName = null;
          }
        
          if(result.certificateScore){
            
              formObject.certificateScore = result.certificateScore;
            
          }else{
            formObject.certificateScore = null;
          }
        
        
          if(result.organizationName){
            
              formObject.organizationName = result.organizationName;
            
          }else{
            formObject.organizationName = null;
          }
        
          if(result.dob){
            
              formObject.dob = result.dob;
            
          }else{
            formObject.dob = null;
          }
        
          if(result.expirationDate){
            
              formObject.expirationDate = result.expirationDate;
            
          }else{
            formObject.expirationDate = null;
          }
        
          if(result.transactionTime){
            
              formObject.transactionTime = result.transactionTime;
            
          }else{
            formObject.transactionTime = null;
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
          
        
          
            "parentResumeId":null,
          
        
          
            "certificateName":null,
          
        
          
            "certificateScore":null,
          
        
          
            "issuingOrg":null,
          
        
          
            "organizationName":null,
          
        
          
            "dob":null,
          
        
          
            "expirationDate":null,
          
        
          
            "transactionTime":null,
          
        
          
            "publicOnOff":null 
          
        
        });
    }
  

}
