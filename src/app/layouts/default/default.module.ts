import { MatExpansionModule } from '@angular/material/expansion';
import { ContactSearchModule } from './../../modules/contact-search/contact-search.module';
import { SharedModule } from './../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';

import { ContactDialogComponent } from './../../modules/contact-search/contact-dialog/contact-dialog.component';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from './../../modules/dashboard/dashboard.component';
import { ContactSearchComponent } from './../../modules/contact-search/contact-search.component';
import { PostsComponent } from './../../modules/posts/posts.component';
import { AgeOfFirmDialogComponent } from './../../modules/contact-search/age-of-firm-dialog/age-of-firm-dialog.component';
import { LocationDialogComponent } from './../../modules/contact-search/location-dialog/location-dialog.component';
import { BranchesCountDialogComponent } from './../../modules/contact-search/branches-count-dialog/branches-count-dialog.component';
import { PlantAndMachineryDialogComponent } from './../../modules/contact-search/plant-and-machinery-dialog/plant-and-machinery-dialog.component';
import { GenderDialogComponent } from './../../modules/contact-search/gender-dialog/gender-dialog.component';
import { EntityTypeDialogComponent } from './../../modules/contact-search/entity-type-dialog/entity-type-dialog.component';
import { EmployeesCountDialogComponent } from './../../modules/contact-search/employees-count-dialog/employees-count-dialog.component';
import { BankingWithDialogComponent } from './../../modules/contact-search/banking-with-dialog/banking-with-dialog.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    ContactSearchComponent,
    ContactDialogComponent,
    LocationDialogComponent,
    AgeOfFirmDialogComponent,
    EntityTypeDialogComponent,
    GenderDialogComponent,
    PlantAndMachineryDialogComponent,
    BranchesCountDialogComponent,
    EmployeesCountDialogComponent,
    BankingWithDialogComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ContactSearchModule,
    MatSidenavModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    FormsModule,
    HttpClientModule

  ],
  exports: [
  ]
})
export class DefaultModule { }
