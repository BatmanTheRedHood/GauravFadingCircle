import { Coordinate } from "./coordinate";
import { Helper } from "./helper";

export class BubbleFade {
    private static radiusReduceFactor : number = 0.4;
    // Properties
    public position: Coordinate;
    public radius: number;
    public dx: number;
    public dy: number;
    public color: string;

    public constructor(mouse: Coordinate) {
        this.radius = Helper.random(30, 50);
        this.color = Helper.randomColor();

        this.dx = Helper.random(-1.5, 1.5);
        this.dy = Helper.random(-1.5, 1.5);
        this.position = new Coordinate(mouse.x, mouse.y);
    }

    public update(): void {
        this.radius -= BubbleFade.radiusReduceFactor;

        this.position.x += this.dx;
        this.position.y += this.dy;
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2,
            false);

        context.strokeStyle = this.color;
        context.stroke();
        context.closePath();
    }
}
