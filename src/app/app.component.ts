import { Component, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular";
  counter: any;
  count: number;
  private subscription: Subscription;

  startObservable(): any {
          this.counter = new Observable<number>(observer => {
            console.log('Subscribed');

            let index = -1;
            const interval = setInterval(() => {
              index++;
              console.log(`next: ${index}`);
              observer.next(index);
            }, 1000);

            // teardown
            return () => {
              console.log('Teardown');
              clearInterval(interval);
            }
    
    });   
  }

  callObservable() {
    this.subscription = this.counter.subscribe(
    (value) => this.count = value,
    (error) => console.error(error),
    () => console.log('complete'));
  }
}