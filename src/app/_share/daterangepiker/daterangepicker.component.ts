import {Directive, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {KeyValueDiffers, ElementRef, OnDestroy, DoCheck} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DaterangepickerConfig} from '../../_core/service/config.service';

import * as $ from 'jquery';
import * as moment from 'moment';
import 'bootstrap-daterangepicker';

import {DateRangePiker, DateTimeConstants} from '../../_core/common/datetime.constants';

@Directive({
  selector: '[daterangepicker]',
})
export class DaterangePickerDirective implements AfterViewInit, OnDestroy, DoCheck {

  private activeRange: any;
  private targetOptions: any = {};
  private _differ: any = {};

  public datePicker: any;

  // daterangepicker properties
  @Input() options: any = {};

  // daterangepicker events
  @Output() selected = new EventEmitter();
  @Output() cancelDaterangepicker = new EventEmitter();
  @Output() applyDaterangepicker = new EventEmitter();
  @Output() hideCalendarDaterangepicker = new EventEmitter();
  @Output() showCalendarDaterangepicker = new EventEmitter();
  @Output() hideDaterangepicker = new EventEmitter();
  @Output() showDaterangepicker = new EventEmitter();

  constructor(private input: ElementRef,
              private config: DaterangepickerConfig,
              private differs: KeyValueDiffers) {
    this._differ[DateRangePiker.OPTIOINS] = differs.find(this.options).create(null);
    this._differ[DateRangePiker.SETTINGS] = differs.find(this.config.settings).create(null);
  }

  ngAfterViewInit() {
    this.config.embedCSS();
    this.render();
    this.attachEvents();
  }
  render() {
    this.targetOptions = Object.assign({}, this.config.settings, this.options);

    // cast $ to any to avoid jquery type checking
    (<any>$(this.input.nativeElement)).daterangepicker(this.targetOptions, this.callback.bind(this));

    this.datePicker = (<any>$(this.input.nativeElement)).data(DateRangePiker.DATE_RANGE_PICKER);
  }

  attachEvents() {
    $(this.input.nativeElement).on(DateRangePiker.CANCEL_DATE_RANGE_PICKER,
      (e: any, picker: any) => {
        let event = {event: e, picker: picker};
        this.cancelDaterangepicker.emit(event);
      }
    );

    $(this.input.nativeElement).on(DateRangePiker.APPLY_DATE_RANGE_PICKER,
      (e: any, picker: any) => {
        let event = {event: e, picker: picker};
        this.applyDaterangepicker.emit(event);
      }
    );

    $(this.input.nativeElement).on(DateRangePiker.HIDECALENDAR_DATE_RANGE_PICKER,
      (e: any, picker: any) => {
        let event = {event: e, picker: picker};
        this.hideCalendarDaterangepicker.emit(event);
      }
    );

    $(this.input.nativeElement).on(DateRangePiker.SHOWCALENDAR_DATE_RANGE_PICKER,
      (e: any, picker: any) => {
        let event = {event: e, picker: picker};
        this.showCalendarDaterangepicker.emit(event);
      }
    );

    $(this.input.nativeElement).on(DateRangePiker.HIDE_DATE_RANGE_PICKER,
      (e: any, picker: any) => {
        let event = {event: e, picker: picker};
        this.hideDaterangepicker.emit(event);
      }
    );

    $(this.input.nativeElement).on(DateRangePiker.SHOW_DATE_RANGE_PICKER,
      (e: any, picker: any) => {
        let event = {event: e, picker: picker};
        this.showDaterangepicker.emit(event);
      }
    );
  }

  private callback(start?: any, end?: any, label?: any): void {
    this.activeRange = {
      start: start,
      end: end,
      label: label
    };

    this.selected.emit(this.activeRange);
  }

  destroyPicker() {
    try {
      (<any>$(this.input.nativeElement)).data(DateRangePiker.DATE_RANGE_PICKER).remove();
    } catch (e) {
    }
  }

  ngOnDestroy() {
    this.destroyPicker();
  }

  ngDoCheck() {
    let optionsChanged = this._differ[DateRangePiker.OPTIOINS].diff(this.options);
    let settingsChanged = this._differ[DateRangePiker.SETTINGS].diff(this.config.settings);

    if (optionsChanged || settingsChanged) {
      this.render();
      this.attachEvents();
      if (this.activeRange && this.datePicker) {
        this.datePicker.setStartDate(this.activeRange.start);
        this.datePicker.setEndDat
        (this.activeRange.end);
      }
    }
  }
}
