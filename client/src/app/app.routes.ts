import { Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddTaskComponent } from './admin/add-task/add-task.component';
import { ViewTaskComponent } from './admin/view-task/view-task.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { TaskDetailComponent } from './admin/task-detail/task-detail.component';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';
import { LoginComponent } from './admin/authComponents/login/login.component';
import { RegisterComponent } from './admin/authComponents/register/register.component';
import { authGuard } from './admin/guards/auth/auth.guard';
import { profileGuard } from './admin/guards/profile/profile.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'admin/tasks',
        pathMatch: 'full',
    },
    {
        path: 'admin',
        canActivate: [profileGuard],
        component: LayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'add-task', component: AddTaskComponent },
            {
                path: 'tasks',
                children: [
                    {
                        path: '',
                        component: ViewTaskComponent
                    },
                    {
                        path: 'task-detail/:id',
                        component: TaskDetailComponent
                    }
                ]
            },
            { path: 'settings', component: ManageUserComponent },

        ]
    },
    {
        path: 'admin/auth',
        canActivate: [authGuard],
        children: [
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'admin/tasks'
    }

];
