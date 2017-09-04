import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {TypeEnum} from "../../shared/modules/editable-element/editable-element.component";

@Component({
    selector: 'app-gen-tables-crud-bulk-adding',
    templateUrl: './gen-tables-crud-bulk-adding.component.html',
})
export class GenTablesCrudBulkAddingComponent {
    @Input() pattern: string;
    @Output() rowsGenerated: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
    generatedRows: Array<any> = [];
    bulkData: string;

    typeEnum = TypeEnum;

    private modalRef: NgbModalRef;

    constructor(private modalService: NgbModal) {
    }

    open(content) {
        this.modalRef = this.modalService.open(content)
    }

    apply() {
        this.generatedRows = this.parse();
        if (this.generatedRows.length > 0) {
            // this.rowsGenerated.emit(this.generatedRows);
            this.rowsGenerated.next(this.generatedRows);
            this.modalRef.close();
        }
    }

    private parse() {
        let result = [];
        let keys = [];
        let delimiters = [];
        for (let i = 0, len = this.pattern.length; i < len; i++) {
            if (this.pattern[i] == "<") {
                i++;
                let iEnd = this.pattern.indexOf(">", i);
                if (iEnd > -1) {
                    keys.push(this.pattern.substr(i, iEnd - i));
                    i = iEnd;
                }
            } else {
                let iNextStart = this.pattern.indexOf("<", i);
                if (iNextStart > -1 ) {
                    delimiters.push(this.pattern.substr(i, iNextStart - i));
                    i = iNextStart - 1;
                } else {
                    delimiters.push(this.pattern.substr(i, len - i));
                    i = len - 1;
                }
            }
        }
        console.log(delimiters);

        this.bulkData.split("\n").forEach(line => {
            let curResult = {};
            let delimiterIndex = 0;
            let curPositionIndex = 0;
            keys.forEach(key => {
                let curEndIndex = line.indexOf(delimiters[delimiterIndex], curPositionIndex);
                if (delimiterIndex < delimiters.length) {
                    curResult[key] = line.substr(curPositionIndex, curEndIndex - curPositionIndex);
                    curPositionIndex = curEndIndex + 1;
                    delimiterIndex++;
                } else {
                    curResult[key] = line.substr(curPositionIndex, line.length - curPositionIndex);
                }
            });
            result.push(curResult);
        });
        return result;
    }
}
