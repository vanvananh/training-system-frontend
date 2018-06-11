export class DateTimeConstants {
  public static FORMAT_DATE_MMDDYYYY = 'MM/DD/YYYY';
  public static FORMAT_DATE_DDMMYYYY = 'DD/MM/YYYY';
  public static FORMAT_DATE_YYYYMMDD = 'YYYY/MM/DD';
}

export class DateRangePiker {
  public static FORMAT_DATE_DDMMYYYY = 'DD/MM/YYYY';
  public static FORMAT_DATE_MMDDYYYY = 'MM/DD/YYYY';
  public static FORMAT_DAYOFWEEK_DDDD = 'dddd';
  public static FORMAT_HOUR_HH = 'HH';
  public static FORMAT_local_EN = 'en-gb';
  public static DAYOFWEEKFRIDAY = 'Friday';
  public static MONTH = 'month';
  public static DAY = 'day';
  public static DATE_RANGE_PICKER = 'daterangepicker';
  public static APPLY_DATE_RANGE_PICKER = 'apply.daterangepicker';
  public static CANCEL_DATE_RANGE_PICKER = 'cancel.daterangepicker';
  public static HIDECALENDAR_DATE_RANGE_PICKER = 'hideCalendar.daterangepicker';
  public static SHOWCALENDAR_DATE_RANGE_PICKER = 'showCalendar.daterangepicker';
  public static HIDE_DATE_RANGE_PICKER = 'hide.daterangepicker';
  public static SHOW_DATE_RANGE_PICKER = 'show.daterangepicker';
  public static OPTIOINS = 'options';
  public static SETTINGS = 'settings';
  public static Locale = {
    'format': 'DD/MM/YYYY',
    'separator': ' - ',
    'applyLabel': 'Apply',
    'cancelLabel': 'Cancel',
    'fromLabel': 'From',
    'toLabel': 'To',
    'customRangeLabel': 'Custom Range',
    'daysOfWeek': [
      'Su',
      'Mo',
      'Tu',
      'We',
      'Th',
      'Fr',
      'Sa'
    ],
    'monthNames': [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
  };
  public static Range = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  };
}
