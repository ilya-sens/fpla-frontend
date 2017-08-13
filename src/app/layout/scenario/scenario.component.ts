import {Component, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {GlobalConfig} from "../../global";

@Component({
    selector: 'app-scenario',
    templateUrl: './scenario.component.html',
    styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {
    data: any = {};

    constructor(private http: Http) {
        this.data = this.getData();
    }

    ngOnInit() {
    }

    getData() {
        return this.http.get(GlobalConfig.BASE_API_URL + "/scenarios")
            .map((res: Response) => res.json())
            .subscribe(data => {
                this.data = data._embedded.scenarios;
            });
    }

    saveData() {
        this.http.post("http://localhost:8080/api/scenario", {name: "just a script"}).map((res: Response) => res.json());
    }
}
