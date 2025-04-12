import { Component, OnDestroy } from '@angular/core';
import { CounterStore } from '../counter.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  providers: [CounterStore]
})
export class CounterComponent implements OnDestroy {
  // Inject the LOCAL CounterStore
  constructor(public counterStore: CounterStore) { }

  increment(): void {
    this.counterStore.increment(); // Call updater
  }

  decrement(): void {
    this.counterStore.decrement(); // Call updater
  }

  reset(): void {
    this.counterStore.setCount(0); // Call updater with value
  }

  delayedIncrement(): void {
    this.counterStore.delayedIncrement(); // Trigger effect
  }

  ngOnDestroy(): void {
    console.log('CounterComponent destroyed, CounterStore will be cleaned up.');
    // ComponentStore automatically cleans up subscriptions when the component is destroyed
  }
}
