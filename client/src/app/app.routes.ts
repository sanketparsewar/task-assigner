import { Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddTaskComponent } from './admin/add-task/add-task.component';
import { ViewTaskComponent } from './admin/view-task/view-task.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { TaskDetailComponent } from './admin/task-detail/task-detail.component';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'admin/tasks',
        pathMatch: 'full',
    },
    {
        path: 'admin',
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'add-task', component: AddTaskComponent },
            { path: 'tasks',
                children:[
                    {
                        path:'',
                        component: ViewTaskComponent
                    },
                    {
                        path:'task-detail/:id',
                        component:TaskDetailComponent
                    }
                ]
             },
            { path: 'settings', component: ManageUserComponent },

        ]
    }
];
