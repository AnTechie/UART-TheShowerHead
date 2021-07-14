import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { EmployeeFormPermissions, FamilyFormPermissions, JwtGroupsFormPermissions, SpecialAccessFormPermissions, UnlocksFormPermissions } from './common/rbac-utils/form-permissions.enum';

const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'Employee',
    data: {
      permissions: {
        only: EmployeeFormPermissions.viewEmployee
      }
    },
    canLoad: [NgxPermissionsGuard],
    loadChildren: () => import('./components/general/edit-employee/edit-employee.module').then(m => m.EditEmployeeModule)
  },
  {
    path: 'Family',
    data: {
      permissions: {
        only: FamilyFormPermissions.viewFamily,
      }
    },
    canLoad: [NgxPermissionsGuard],
    loadChildren: () => import('./components/general/edit-family/edit-family.module').then(m => m.EditFamilyModule)
  },
  {
    path: 'MemberRewards',
    data: {
      permissions: {
        only: UnlocksFormPermissions.addUnlocks,
      }
    },
    canLoad: [NgxPermissionsGuard],
    loadChildren: () => import('./components/general/member-rewards/member-rewards.module').then(m => m.MemberRewardsModule)
  },
  {
    path: 'SpecialAccess',
    data: {
      permissions: {
        only: SpecialAccessFormPermissions.viewSpecialAccess,
      }
    },
    canLoad: [NgxPermissionsGuard],
    loadChildren: () => import('./components/general/edit-special-access/edit-special-access.module').then(m => m.EditSpecialAccessModule)
  },
  {
    path: 'JwtGroups',
    data: {
      permissions: {
        only: JwtGroupsFormPermissions.viewJwtGroups,
      }
    },
    canLoad: [NgxPermissionsGuard],
    loadChildren: () => import('./components/general/utilities/jwt-groups.module').then(m => m.JwtGroupsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class AppRoutingModule { }
