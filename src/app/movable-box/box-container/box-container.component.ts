import { Component, HostListener, OnInit } from '@angular/core';

interface Box {
  style: any;
  boxNumber: number;
}
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'box-container',
  templateUrl: './box-container.component.html',
  styleUrls: ['./box-container.component.scss']
})
export class BoxContainerComponent implements OnInit {
  constructor() { }
  activeBox: Box;
  boxList: Array<Box> = [];
  readonly speedInPx = 10;

  ngOnInit(): void {
  }

  addNewBox(): void {
    const listLength = this.boxList.length;
    const lastBox = this.boxList[listLength - 1];
    const boxNumber = lastBox ? lastBox.boxNumber + 1 : 1;
    const zIndex = lastBox ? lastBox.style['z-index'] + 1 : 1;

    const newBox: Box = {
      style: {
        'z-index': zIndex
      },
      boxNumber
    };
    console.log('newBox', newBox)
    this.boxList.push(newBox);
  }

  selectBox(box: Box): void {
    this.activeBox = box;
  }

  deleteActiveBox(): void {
    const selectedBoxIndex = this.boxList.findIndex(box => box.boxNumber === this.activeBox.boxNumber);
    this.boxList.splice(selectedBoxIndex, 1);
    this.selectBox(null);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.activeBox) {
      return;
    }
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
        this.moveBoxUp();
        break;

      case 'ArrowDown':
      case 's':
        this.moveBoxDown();
        break;

      case 'ArrowLeft':
      case 'a':
        this.moveBoxLeft();
        break;

      case 'ArrowRight':
      case 'd':
        this.moveBoxRight();
        break;

      default:
        return;
    }
  }

  moveBoxUp(): void {
    const marginTop = this.activeBox.style['margin-top.px'] || 0;
    this.activeBox.style = { ...this.activeBox.style, 'margin-top.px': marginTop - this.speedInPx };
  }

  moveBoxDown(): void {
    const marginTop = this.activeBox.style['margin-top.px'] || 0;
    this.activeBox.style = { ...this.activeBox.style, 'margin-top.px': marginTop + this.speedInPx };
  }

  moveBoxLeft(): void {
    const marginLeft = this.activeBox.style['margin-left.px'] || 0;
    this.activeBox.style = { ...this.activeBox.style, 'margin-left.px': marginLeft - this.speedInPx };
  }

  moveBoxRight(): void {
    const marginLeft = this.activeBox.style['margin-left.px'] || 0;
    this.activeBox.style = { ...this.activeBox.style, 'margin-left.px': marginLeft + this.speedInPx };
  }
}
