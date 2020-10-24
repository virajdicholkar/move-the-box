import { Component, OnInit } from '@angular/core';

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

  boxList: Array<Box> = [];

  ngOnInit(): void {
  }

  addNewBox(): void {
    const listLength = this.boxList.length;
    const boxNumber = listLength + 1;
    const zIndex = listLength ? this.boxList[listLength - 1].style['z-index'] + 1 : 1;

    const newBox: Box = {
      style: {
        'z-index': zIndex
      },
      boxNumber
    };
    console.log('newBox', newBox)
    this.boxList.push(newBox);
  }


}
