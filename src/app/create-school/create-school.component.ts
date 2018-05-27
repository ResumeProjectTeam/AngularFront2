import { Component, OnInit } from '@angular/core';
import { CreateSchService } from './create-school.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-create-school',
  templateUrl: './create-school.component.html',
  styleUrls: ['./create-school.component.scss'],
  providers:[CreateSchService],
  animations: [routerTransition()]
})
export class CreateSchoolComponent implements OnInit {
  private isAuthentication;
  private currentType;
  private myForm: FormGroup;
  private tmpparticipant;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;
  schId = new FormControl("", Validators.required);
  schName = new FormControl("", Validators.required);
  address = new FormControl("", Validators.required);
  contactAdress = new FormControl("", Validators.required);
  homepage = new FormControl("", Validators.required);

  constructor(private createSchService: CreateSchService, fb: FormBuilder,public router :Router) {
    this.myForm = fb.group({
      schId: this.schId,
      schName: this.schName,
      address: this.address,
      contactAdress: this.contactAdress,
      homepage: this.homepage,
      requestResumeList: []
    });
  };
  ngOnInit() {
  }



  addParticipant(form: any) {
   const participant = {
      $class: "hansung.ac.kr.participants.School",
      "schId" : this.schId.value,
      "schName": this.schName.value,
      "address": this.address.value,
      "contactAdress": this.contactAdress.value,
      "homepage": this.homepage.value,
      "requestResumeList": []
    }

    const issueParticipant = {
      participant: "hansung.ac.kr.participants.School#" + this.schId.value,
      userID: this.schId.value,
      options: {}
    };
    
    this.createSchService.addParticipant(participant)
      .then(() => {
        console.log(issueParticipant);
        return this.createSchService.issueParticipant(issueParticipant).then((result) => {

          return this.createSchService.importCard(result, this.schName.value).then(()=>{
            localStorage.setItem('isSchin', 'true');
            this.router.navigate(['/dashboard4']);
          });
        });
      })
      .catch((error) => {
        if (error == 'Server error') {
          alert('입력을 확인해 주세요');
        }
        else {
          alert('입력을 확인해 주세요');
        }
      });
  
    this.myForm.setValue({
      "schId": null,
      "schName": null,
      "address": null,
      "contactAdress": null,
      "homepage": null,
      "requestResumeList": []
    });
  }


}
