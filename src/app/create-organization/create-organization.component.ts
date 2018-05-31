import { Component, OnInit } from '@angular/core';
import { CreateOrgService } from './create-organization.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from '../router.animations';
@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.css'],
  providers: [CreateOrgService],
  animations: [routerTransition()]
})
export class CreateOrganizationComponent implements OnInit {
  private isAuthentication;
  private currentType;
  private myForm: FormGroup;
  private tmpparticipant;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  orgId = new FormControl("", Validators.required);
  orgName = new FormControl("", Validators.required);
  address = new FormControl("", Validators.required);
  contactAdress = new FormControl("", Validators.required);
  homepage = new FormControl("", Validators.required);
  discription = new FormControl("", Validators.required);

  constructor(private createOrgService: CreateOrgService, fb: FormBuilder, public router:Router) {
    this.myForm = fb.group({
      orgId: this.orgId,
      orgName: this.orgName,
      address: this.address,
      contactAdress: this.contactAdress,
      homepage: this.homepage,
      discription: this.discription,
    });
  };
  ngOnInit() {
  }


  addParticipant(form: any) {
    const participant = {
      $class: "hansung.ac.kr.participants.Organization",
      "orgId" : this.orgId.value,
      "orgName": this.orgName.value,
      "address": this.address.value,
      "contactAdress": this.contactAdress.value,
      "homepage": this.homepage.value,
      "discription": this.discription.value,
      "requestResumeList": []
    }

    const issueParticipant = {
      participant: "hansung.ac.kr.participants.Organization#" + this.orgId.value,
      userID: this.orgId.value,
      options: {}
    };
    
    this.createOrgService.addParticipant(participant)
      .then(() => {
        console.log(issueParticipant);
        return this.createOrgService.issueParticipant(issueParticipant).then((result) => {

          return this.createOrgService.importCard(result, this.orgName.value).then(()=>{
            localStorage.setItem('isOrgin', 'true');
            this.router.navigate(['/dashboard3']);
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
      "orgId": null,
      "orgName": null,
      "address": null,
      "contactAdress": null,
      "homepage": null,
      "discription": null,
    });
  }

}
