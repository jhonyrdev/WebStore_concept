import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export interface TableActionEvent {
  type: string;
  row: any;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() rowTemplate?: TemplateRef<any>;
  @Input() scrollable: boolean = false;

  @Output() action = new EventEmitter<TableActionEvent>();

  trackByIndex = (i: number) => i;

  emitActionFromTemplate = (type: string, row: any) => this.emitAction(type, row);

  emitAction(type: string, row: any) {
    this.action.emit({ type, row });
  }
}
