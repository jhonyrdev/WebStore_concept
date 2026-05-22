import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TabItem<T = string> {
  key: T;
  label: string;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html'
})
export class TabsComponent<T = string> {
  @Input() tabs: TabItem<T>[] = [];

  @Input() activeTab!: T;

  @Output() tabChange = new EventEmitter<T>();

  changeTab(tab: T) {
    this.tabChange.emit(tab);
  }

  isActive(tab: T): boolean {
    return this.activeTab === tab;
  }
}