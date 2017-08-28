import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export enum TypeEnum {
    input,
    textArea
}


@Component({
    selector: 'editable-element',
    templateUrl: './editable-element.component.html',
    styleUrls: ['./editable-element.component.scss']
})
export class EditableElementComponent implements OnInit {
    @Input() value: string;
    @Input() type: TypeEnum = TypeEnum.input;
    @Input() defaultValue: string = "empty";
    @Input() editable: boolean = true;
    @Output() valueChange: EventEmitter<string> = new EventEmitter();

    public edit: boolean = false;
    public typeEnum = TypeEnum;

    public saveChanges(newValue): void {
        this.edit = false;
        this.value = newValue;
        this.valueChange.next(this.value);
    }

    ngOnInit(): void {
    }
}
