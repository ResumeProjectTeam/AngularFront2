import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard4' },
            { path: 'dashboard4', loadChildren: './dashboard4/dashboard.module#DashboardModule' },
            { path: 'Certificate4', loadChildren: './Certificate4/Certificate.module#CertificateModule' },
            { path: 'User4', loadChildren: './User4/User.module#UserModule' },
            { path: 'UserInfoInEnt4', loadChildren: './UserInfoInEnt4/UserInfoInEnt.module#UserInfoInEntModule' },
            { path: 'UserInfoInSch4', loadChildren: './UserInfoInSch4/UserInfoInSch.module#UserInfoInSchModule' },
            { path: 'School4', loadChildren: './School4/School.module#SchoolModule' },
            { path: 'ResumeInfoUser4', loadChildren: './ResumeInfoUser4/ResumeInfoUser.module#ResumeInfoUserModule' },
            { path: 'RequestResume4', loadChildren: './RequestResume4/RequestResume.module#RequestResumeModule' },
            { path: 'Organization4', loadChildren: './Organization4/Organization.module#OrganizationModule' },
            { path: 'Enterprise4', loadChildren: './Enterprise4/Enterprise.module#EnterpriseModule' },
            { path: 'AwardDetails4', loadChildren: './AwardDetails4/AwardDetails.module#AwardDetailsModule' },
            { path: 'SearchtitleCer4', loadChildren: './SearchtitleCer4/Search.module#SearchModule' },
            { path: 'SearchtitleEnt4', loadChildren: './SearchtitleEnt4/Enterprise.module#EnterpriseModule' },
            { path: 'SearchtitleSch4', loadChildren: './SearchtitleSch4/School.module#SchoolModule' },
            { path: 'SearchtitleOrg4', loadChildren: './SearchtitleOrg4/Organization.module#OrganizationModule' },
            { path: 'SearchtitleUser4', loadChildren: './SearchtitleUser4/User.module#UserModule' },
	    { path: 'SearchtitleInfoSch4', loadChildren: './SearchtitleInfoSch4/UserInfoInSch.module#UserInfoInSchModule'}


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
