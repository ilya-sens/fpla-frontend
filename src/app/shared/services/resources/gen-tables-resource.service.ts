import {Injectable} from '@angular/core';
import {GlobalConfig} from "../../../global";
import {AuthHttp} from "angular2-jwt";
import {Observable} from "rxjs/Observable";
import {TableDefinitionModel} from "../../model/table-definition.model";

@Injectable()
export class GenTablesResourceService {

    constructor(
        protected http : AuthHttp
    ) {}

    public get(id?: number, urlSuffix?: string): Observable<any> {
        let url: string = GlobalConfig.BASE_GENDB_URL + "table";
        url += id ? "/" + id : "";
        url += urlSuffix ? urlSuffix : "";

        return this.http.get(url).map(response => {return response.json()});
    }

    public create(tableDefinition: TableDefinitionModel, urlSuffix?: string): Observable<any> {
        let url: string = GlobalConfig.BASE_GENDB_URL + "table";
        url += urlSuffix ? urlSuffix : "";

        return this.http.post(url, tableDefinition).map(response => {return response.json()});
    }

    public update(tableDefinition: TableDefinitionModel, urlSuffix?: string): Observable<any> {
        let url: string = GlobalConfig.BASE_GENDB_URL + "table";
        url += urlSuffix ? urlSuffix : "";
        return this.http.put(url, tableDefinition).map(response => {return response.json()});
    }

    public remove(id: number, urlSuffix?: string): Observable<any> {
        let url: string = GlobalConfig.BASE_GENDB_URL + "table/" + id;
        url += urlSuffix ? urlSuffix : "";

        return this.http.delete(url).map(response => {return response});
    }
}
