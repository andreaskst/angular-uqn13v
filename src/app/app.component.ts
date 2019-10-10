import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Observable } from "rxjs";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  //https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  name = "Angular";
  counter: any;
  count: number;
  private subscription: Subscription;

  ngOnInit() {
    this.startObservable();
    this.callObservable();
  }

  startObservable(): any {
    this.counter = new Observable<number>(observer => {
      console.log("Subscribed");

      let index = -1;
      const interval = setInterval(() => {
        index++;
        console.log(`next: ${index}`);
        observer.next(index);
      }, 1000);

      // teardown
      // return () => {
      //   console.log("Teardown");
      //   clearInterval(interval);
      // };

      return {
        unsubscribe() {
          clearTimeout(this.timeoutId);
          console.log(observer);
        }
      };
    });
  }

  callObservable() {
    this.subscription = this.counter.subscribe(
      value => (this.count = value),
      error => console.error(error),
      () => console.log("complete")
    );
  }

  onClearSubscription() {
    this.subscription.unsubscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
