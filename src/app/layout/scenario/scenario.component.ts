import {Component, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';

@Component({
    selector: 'app-scenario',
    templateUrl: './scenario.component.html',
    styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {
    data: any = {};

    constructor(private http: Http) {
        this.data = this.getData();
        console.log(this.data);
    }

    ngOnInit() {
    }

    getData() {
        return this.http.get("http://localhost:8080/api/scenario")
            .map((res: Response) => res.json())
            .subscribe(data => {console.log(data); this.data = data;});
    }

    saveData() {
        this.http.post("http://localhost:8080/api/scenario", {name: "just a script"}).map((res: Response) => res.json());
    }
}
