import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CircleFadeComponent } from './components/circle-fade/circle-fade.component';

const routes: Routes = [
    { path: 'game', component: CircleFadeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
