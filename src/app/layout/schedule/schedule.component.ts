import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalConfig} from "../../global";
import {TypeEnum} from "../../shared/modules/editable-element/editable-element.component";
import {ScheduleResourceService} from "../../shared/services/resources/schedule-resource.service";
import {ScheduleModel} from "../../shared/model/schedule.model";
import {AuthHttp} from "angular2-jwt";

@Component({
    selector: 'app-schedule-component',
    templateUrl: './schedule.component.html',
    providers: [ScheduleResourceService]
})
export class ScheduleComponent implements OnInit {
    schedules: Array<ScheduleModel>;
    schedulesToCreate: Array<ScheduleModel> = [];
    schedulesBeingWatched: Array<ScheduleModel> = [];

    dateFormat: String = GlobalConfig.DATE_FORMAT;
    typeEnum = TypeEnum;

    constructor(
        private scheduleResource: ScheduleResourceService,
        private http: AuthHttp
    ) {}

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.scheduleResource.get().subscribe(result => this.schedules = result.data);
    }

    watchSchedule(schedule: ScheduleModel) {
        this.schedulesBeingWatched.push(schedule);
    }

    watchingScheduleDetails(schedule: ScheduleModel) {
        return this.schedulesBeingWatched.indexOf(schedule) > -1;
    }

    removeSchedule(schedule: ScheduleModel) {
        this.scheduleResource.remove(schedule).subscribe(ignore => this.loadData());
    }

    updateSchedule(schedule: ScheduleModel) {
        this.scheduleResource.update(schedule).subscribe(ignore => this.loadData());
    }

    generateFile(schedule: ScheduleModel) {
        this.scheduleResource.get(schedule.id, "/generate").subscribe(ignore => {
            this.scheduleResource.get(schedule.id).subscribe(updatedSchedule => {
                schedule = updatedSchedule;
            });
        });
    }

    runSchedule(schedule: ScheduleModel) {
        this.http.post(GlobalConfig.BASE_RUNNER_URL + "schedule/run", schedule)
            .map(response => {
                return response.json()
            })
            .subscribe();
    }

    addScheduleToCreate() {
        this.schedulesToCreate.push(new ScheduleModel())
    }

    createAllSchedulesToCreate() {
        this.schedulesToCreate.forEach(scheduleToCreate => {
            this.scheduleResource.create(scheduleToCreate).subscribe();
        });
        this.schedulesToCreate = [];
    }

    removeAllSchedulesToCreate() {
        this.schedulesToCreate = [];
    }
}
