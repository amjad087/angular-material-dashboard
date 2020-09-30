import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import { Ng5SliderModule } from 'ng5-slider';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HighchartsChartModule } from 'highcharts-angular';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ChartsComponent } from './widgets/charts/charts.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ChartsComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatAutocompleteModule,
    RouterModule,
    MatFormFieldModule,
    MatSliderModule,
    Ng5SliderModule,
    MatTooltipModule,
    HighchartsChartModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MatListModule,
    MatIconModule,
    FlexLayoutModule,
    MatDividerModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSliderModule,
    Ng5SliderModule,
    MatTooltipModule,
    ChartsComponent
  ]
})
export class SharedModule { }
