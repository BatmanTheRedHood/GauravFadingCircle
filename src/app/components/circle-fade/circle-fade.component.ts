import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { BubbleFade } from 'src/app/models/bubble-fade';
import { Coordinate } from 'src/app/models/coordinate';
import { Helper } from 'src/app/models/helper';

var gameLoop;

@Component({
    selector: 'app-circle-fade',
    templateUrl: './circle-fade.component.html',
    styleUrls: ['./circle-fade.component.css']
})
export class CircleFadeComponent implements OnInit, AfterViewInit, OnDestroy {
    private static bubbleMaxCount: number = 100;

    @ViewChild('myCanvas') public canvas: ElementRef;

    public context: CanvasRenderingContext2D;
    public bubbles: BubbleFade[];
    private mouse: Coordinate;

    public constructor() {
        this.bubbles = [];
        this.mouse = new Coordinate(Helper.maxWidth / 2, Helper.maxHeight / 2);
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
        this.setCanvas();

        this.runGame();
    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        this.mouse.x = event.x;
        this.mouse.y = event.y;
    }

    // #region Game rules
    private runGame(): void {
        gameLoop = setInterval(() => {
            //this.context.fillStyle = 'rgba(255, 255, 255, 1.0)';
            //this.context.fillRect(0, 0, Helper.maxWidth, Helper.maxHeight);
            this.context.clearRect(0, 0, Helper.maxWidth, Helper.maxHeight);

            if (this.bubbles.length < CircleFadeComponent.bubbleMaxCount) {
                this.bubbles.push(new BubbleFade(this.mouse));
            }

            for (let i = this.bubbles.length - 1; i >= 0; i--) {
                this.bubbles[i].update();

                if (this.bubbles[i].radius < 10) {
                    this.bubbles.splice(i, 1);
                }
            }

            this.drawArc();
        }, 10);
    }

    // #endregion

    // #region Draw logic

    private drawArc(): void {
        for (let i = 0; i < this.bubbles.length; i++) {
            this.bubbles[i].draw(this.context);
        }
    }

    private setCanvas(): void {
        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;

        // set the width and height
        canvasEl.width = window.innerWidth; //Helper.maxWidth;
        canvasEl.height = window.innerHeight; //Helper.maxHeight;

        this.context = this.canvas.nativeElement.getContext('2d');
    }

    // #endregion
    public ngOnDestroy(): void {
        clearInterval(gameLoop);
    }
}