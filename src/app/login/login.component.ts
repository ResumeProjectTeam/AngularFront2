import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { IpConfig } from '../IpConfig';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    constructor(public router: Router) {}

    private authGitHub;
    private authGoogle;
    ngOnInit() {
        let IpConfigObj = new IpConfig();
	this.authGitHub = IpConfigObj.getIpAuthGitHub();
        this.authGoogle = IpConfigObj.getIpAuthGoogle();
	}

    goToGitHubLogin() {
        let IpConfigObj = new IpConfig();
        this.authGitHub = IpConfigObj.getIpAuthGitHub();
   
    	return this.authGitHub;

    }
    goToGoogleLogin(){
	let IpConfigObj = new IpConfig();
        this.authGoogle = IpConfigObj.getIpAuthGoogle();

        return this.authGoogle;
    }
    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }

    onLoggedin2() {
        localStorage.setItem('istestin', 'true');
    }
    onLoggedin3() {
        localStorage.setItem('isOrgin', 'true');
    }
    onLoggedin4() {
        localStorage.setItem('isEntin', 'true');
    }
    onLoggedin5() {
        localStorage.setItem('isSchin', 'true');
    }
}
