import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title: Observable<any>;
  fruits: any[];

  user: any;
  users: any[];

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.title = this.db.object('app-name').valueChanges();

    this.db.list('fruits', ref => ref.orderByChild('votes')).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(res => {
      console.log('fruits change');
      this.fruits = res.reverse();
    });

    this.db.list('users').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(res => {
      this.users = res;
      if (!this.user) this.selectUser(0);
    });
  }

  toggleVote(fruit: any) {
    const userRef = this.db.object('users/' + this.user.key);
    const fruitVotesRef = this.db.object('fruits/' + fruit.key + '/votes');
    const votes = this.user.votes ? this.user.votes : [];

    if (votes.indexOf(fruit.key) >= 0) {
      votes.splice(votes.indexOf(fruit.key), 1);
      fruit.votes -= 1;
    } else {
      fruit.votes += 1;
      votes.push(fruit.key);
    }
    userRef.update({ 'votes': votes });
    fruitVotesRef.set(fruit.votes);
  }

  selectUser(i) {
    this.user = this.users[i];
    console.log(this.user);
  }
}
