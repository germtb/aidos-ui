export interface GameComponent {
  onStart(): void;
  onFrame(): void;
  onDestroy(): void;
}
