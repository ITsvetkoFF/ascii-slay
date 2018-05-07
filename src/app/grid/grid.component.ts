import { Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { GridDimension } from '../../draw/basics';
import { gridToAscii } from '../../draw/renderers';
import { Renderer3 } from '@angular/core/src/render3/interfaces/renderer';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, AfterViewInit {

  @ViewChild('preTag') preEl: ElementRef;
  @ViewChild('overlay') overlayEl: ElementRef;

  public asciiContent: string;
  public gridHeight: number;
  public gridWidth: number;

  @Input() size: GridDimension;

  constructor(private cd: ChangeDetectorRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.asciiContent = gridToAscii(this.size);
  }

  ngAfterViewInit() {
      this.gridHeight = this.preEl.nativeElement.clientHeight;
      this.gridWidth = this.preEl.nativeElement.clientWidth;

      // this.overlayEl.nativeElement.setAttribute('style', `width:${this.gridWidth}px;height:${this.gridHeight}px;`);
      this.renderer.setStyle(this.overlayEl.nativeElement, 'width', this.gridWidth + 'px');
      this.renderer.setStyle(this.overlayEl.nativeElement, 'height', this.gridHeight + 'px');
  }

  mouseMoved(e) {
    const guessedRow = Math.ceil(e.offsetY / (this.gridHeight / this.size.height));
    const guessedColumn = Math.ceil(e.offsetX / (this.gridWidth / this.size.width));
    this.asciiContent = gridToAscii(this.size, guessedRow, guessedColumn);
  }
}
