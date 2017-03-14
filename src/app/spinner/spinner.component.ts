import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: '<i ng-if="visible" class="fa fa-spinner fa-spin fa-3x"></i>',
})
export class SpinnerComponent {
  @Input() visible = true;
}