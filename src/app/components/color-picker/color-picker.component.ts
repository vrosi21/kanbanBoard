import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  @Input() selectedColor!: string;
  @Output() colorSelected = new EventEmitter<string>();

  colorRows: string[][] = [
    ['#808080', '#FF6347', '#FFD700', '#32CD32', '#FFA500'],
    ['#FFFF00', '#008000', '#0000FF', '#4B0082', '#800080'],
  ];

  selectColor(color: string) {
    if (this.selectedColor == color) {
      this.selectedColor = '';
    } else {
      this.selectedColor = color;
    }
    this.colorSelected.emit(this.selectedColor);
  }
}
