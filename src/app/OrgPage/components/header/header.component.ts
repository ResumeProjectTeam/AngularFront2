import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from './header.service';
import 'rxjs/add/operator/toPromise';



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [HeaderService]
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';
    currentOrgId: string;
    errorMessage: string;

    constructor(private translate: TranslateService, public serviceHeader: HeaderService, router: Router) {



        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
/*
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
*/

    }

    ngOnInit() {
	this.loadUserId();
    }


    loadUserId(): Promise<any> {

    return this.serviceHeader.getSystemPing()
      .toPromise()
      .then((result) => {
        var Id;
        Id = result['participant'];
        Id = Id.split('#');
        this.currentOrgId = Id[1];
      })
      .catch((error) => {


          if(error == 'Server error'){
              this.errorMessage = "Failed to loadUserId";
          }
          else if(error == '404 - Not Found'){
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
          }
          else{
              this.errorMessage = error;
          }
      });

   }	

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('istestin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
