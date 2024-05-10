import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  boardColors: string[][] = [
    ['#808080', '#FF6347', '#FFD700', '#32CD32', '#FFA500'],
    ['#ffbc42', '#d81159', '#8f2d56', '#218380', '#001524'],
  ];
  noteColors: string[][] = [
    ['#fdca40', '#f94144', '#08bdbd', '#abff4f', '#ff9914'],
    ['#fbf8cc', '#b9fbc0', '#90dbf4', '#cfbaf0', '#f1c0e8'],
  ];

  @Input() objectType!: string;
  @Input() selectedColor!: string;
  @Output() colorSelected = new EventEmitter<string>();

  getColors(): string[][] {
    if (this.objectType == 'board') return this.boardColors;
    if (this.objectType == 'note') return this.noteColors;

    throw new Error(`Unexpected objectType: ${this.objectType}`);
  }

  selectColor(color: string) {
    if (this.selectedColor == color) {
      this.selectedColor = '';
    } else {
      this.selectedColor = color;
    }
    this.colorSelected.emit(this.selectedColor);
  }
}
