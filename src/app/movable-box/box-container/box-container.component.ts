import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

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
export class BoxContainerComponent implements OnInit, AfterViewInit {
  constructor() { }
  activeBox: Box;
  boxList: Array<Box> = [];
  readonly speedInPx = 10;
  movableScreenWidth = 0;
  movableScreenHeight = 0;
  boxWidth = 100;
  boxHeight = 50;
  @ViewChild('screen') screen: ElementRef;
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.movableScreenWidth = this.screen.nativeElement.offsetWidth - this.boxWidth - 2;
    this.movableScreenHeight = this.screen.nativeElement.offsetHeight - this.boxHeight - 2;
  }

  addNewBox(): void {
    const listLength = this.boxList.length;
    const lastBox = this.boxList[listLength - 1];
    const boxNumber = lastBox ? lastBox.boxNumber + 1 : 1;
    const zIndex = lastBox ? lastBox.style['z-index'] + 1 : 1;

    const newBox: Box = {
      style: {
        'z-index': zIndex,
        'height.px': this.boxHeight,
        'width.px': this.boxWidth
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
    console.log('event', event)
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

      case 'r':
        this.resetActiveBoxPosition();
        break;

      case 'Delete':
        this.deleteActiveBox();
        break;
      default:
        return;
    }
  }

  moveBoxUp(): void {
    const marginTop = this.activeBox.style['margin-top.px'] || 0;
    this.activeBox.style = { ...this.activeBox.style, 'margin-top.px': this.getNewPosition(marginTop, -this.speedInPx) };
    console.log('marginTop after', marginTop - this.speedInPx)
  }

  moveBoxDown(): void {
    const marginTop = this.activeBox.style['margin-top.px'] || 0;
    this.activeBox.style = { ...this.activeBox.style, 'margin-top.px': this.getNewPosition(marginTop) };
  }


  moveBoxLeft(): void {
    const marginLeft = this.activeBox.style['margin-left.px'] || 0;
    this.activeBox.style = { ...this.activeBox.style, 'margin-left.px': this.getNewPosition(marginLeft, -this.speedInPx, true) };
  }

  moveBoxRight(): void {
    const marginLeft = this.activeBox.style['margin-left.px'] || 0;
    this.activeBox.style = { ...this.activeBox.style, 'margin-left.px': this.getNewPosition(marginLeft, this.speedInPx, true) };
  }

  resetActiveBoxPosition(): void {
    this.activeBox.style = {
      ...this.activeBox.style,
      'margin-left.px': 0,
      'margin-top.px': 0
    };

  }

  getNewPosition(currentMargin, speed = this.speedInPx, horizontal = false): number {
    const limit = horizontal ? this.movableScreenWidth : this.movableScreenHeight;
    const newPosition = currentMargin + speed;
    if (limit > Math.abs(newPosition)) {
      return newPosition;
    }
    return Math.sign(speed) * limit;
  }
}
