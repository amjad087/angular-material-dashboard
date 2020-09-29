import { MatExpansionModule } from '@angular/material/expansion';
import { ContactDialogComponent } from './../../modules/contact-search/contact-dialog/contact-dialog.component';
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

import { DefaultComponent } from './default.component';
import { DashboardComponent } from './../../modules/dashboard/dashboard.component';
import { ContactSearchComponent } from './../../modules/contact-search/contact-search.component';
import { PostsComponent } from './../../modules/posts/posts.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    ContactSearchComponent,
    ContactDialogComponent,

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
    FormsModule,
    HttpClientModule

  ],
  exports: [
  ]
})
export class DefaultModule { }
