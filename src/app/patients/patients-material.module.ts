import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [MatButtonModule, MatCardModule, MatGridListModule, MatIconModule],
  exports: [MatButtonModule, MatCardModule, MatGridListModule, MatIconModule],
})
export class PatientsMaterialModule {}
