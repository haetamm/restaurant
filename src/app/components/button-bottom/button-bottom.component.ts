import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-bottom',
  imports: [],
  templateUrl: './button-bottom.component.html',
})
export class ButtonBottomComponent {
  @Input() children: any;
}
