import {
  Component,
  input,
  InputSignal,
  WritableSignal,
  signal,
  output,
  OutputEmitterRef,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-launch-details',
  templateUrl: './launch-details.component.html',
  styleUrl: './launch-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchDetailsComponent {
  public readonly details: InputSignal<string | null> = input.required();

  protected readonly changedDetails: OutputEmitterRef<string> = output();

  protected readonly isEditMode: WritableSignal<boolean> = signal(false);

  protected turnEditModeOn(): void {
    this.isEditMode.set(true);
  }

  protected turnEditModeOff(): void {
    this.isEditMode.set(false);
  }

  protected emitChangedDetails(newDetails: string): void {
    this.changedDetails.emit(newDetails);
    this.turnEditModeOff();
  }

  // formattedDetails(): string {
  //   return (
  //     this.details()
  //       ?.split('')
  //       .map((char) => char.toUpperCase())
  //       .join('') ?? ''
  //   );
  // }
}
