import { Component, OnInit } from '@angular/core';
import { CreateEntService } from './create-enterprise.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-create-enterprise',
  templateUrl: './create-enterprise.component.html',
  styleUrls: ['./create-enterprise.component.scss'],
  providers: [CreateEntService],
  animations: [routerTransition()]
})
export class CreateEnterpriseComponent implements OnInit {
  private isAuthentication;
  private currentType;
  private myForm: FormGroup;
  private tmpparticipant;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;
  private hello='hello fuckers';

  entId = new FormControl("", Validators.required);
  entName = new FormControl("", Validators.required);
  address = new FormControl("", Validators.required);
  contactAdress = new FormControl("", Validators.required);
  homepage = new FormControl("", Validators.required);
  numberOfemployees = new FormControl("", Validators.required);
  sales = new FormControl("", Validators.required);
  industryCategory =new FormControl("", Validators.required);
  discription = new FormControl("", Validators.required);

  constructor(private createEntService: CreateEntService, fb: FormBuilder, public router:Router) {
    this.myForm = fb.group({
      entId: this.entId,
      entName: this.entName,
      address: this.address,
      contactAdress: this.contactAdress,
      homepage: this.homepage,
      numberOfemployees: this.numberOfemployees,
      sales: this.sales,
      industryCategory: this.industryCategory,
      discription: this.discription,
    });
  }

  ngOnInit() {
  }

  addParticipant(form: any) {
    const participant = {
      $class: "hansung.ac.kr.participants.Enterprise",
      "entId": this.entId.value,
      "entName": this.entName.value,
      "address": this.address.value,
      "contactAdress": this.contactAdress.value,
      "homepage": this.homepage.value,
      "numberOfemployees": this.numberOfemployees.value,
      "sales": this.sales.value,
      "industryCategory": this.industryCategory.value,
      "discription" : this.discription.value,
      "requestResumeList": []
    }

    const issueParticipant = {
      participant: "hansung.ac.kr.participants.Enterprise#" + this.entId.value,
      userID: this.entId.value,
      options: {}
    };

    this.createEntService.addParticipant(participant)
      .then(() => {
        return this.createEntService.issueParticipant(issueParticipant).then((result) => {
          return this.createEntService.importCard(result, this.entName.value).then(() => {

            localStorage.setItem('isEntin', 'true');
            this.router.navigate(['/dashboard5']);
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
      "entId": null,
      "entName": null,
      "address": null,
      "contactAdress": null,
      "homepage": null,
      "numberOfemployees": null,
      "sales": null,
      "industryCategory": null,
      "discription" : null,
    });
  }

}


