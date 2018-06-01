import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard5' },
            { path: 'dashboard5', loadChildren: './dashboard5/dashboard.module#DashboardModule' },
            { path: 'Certificate5', loadChildren: './Certificate5/Certificate.module#CertificateModule' },
            { path: 'User5', loadChildren: './User5/User.module#UserModule' },
            { path: 'UserInfoInEnt5', loadChildren: './UserInfoInEnt5/UserInfoInEnt.module#UserInfoInEntModule' },
            { path: 'UserInfoInSch5', loadChildren: './UserInfoInSch5/UserInfoInSch.module#UserInfoInSchModule' },
            { path: 'School5', loadChildren: './School5/School.module#SchoolModule' },
            { path: 'ResumeInfoUser5', loadChildren: './ResumeInfoUser5/ResumeInfoUser.module#ResumeInfoUserModule' },
            { path: 'RequestResume5', loadChildren: './RequestResume5/RequestResume.module#RequestResumeModule' },
            { path: 'Organization5', loadChildren: './Organization5/Organization.module#OrganizationModule' },
            { path: 'Enterprise5', loadChildren: './Enterprise5/Enterprise.module#EnterpriseModule' },
            { path: 'AwardDetails5', loadChildren: './AwardDetails5/AwardDetails.module#AwardDetailsModule' },
            { path: 'SearchtitleCer5', loadChildren: './SearchtitleCer5/Search.module#SearchModule' },
            { path: 'SearchtitleEnt5', loadChildren: './SearchtitleEnt5/Enterprise.module#EnterpriseModule' },
            { path: 'SearchtitleSch5', loadChildren: './SearchtitleSch5/School.module#SchoolModule' },
            { path: 'SearchtitleOrg5', loadChildren: './SearchtitleOrg5/Organization.module#OrganizationModule' },
            { path: 'SearchtitleUser5', loadChildren: './SearchtitleUser5/User.module#UserModule' }




        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
