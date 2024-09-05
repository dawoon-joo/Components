/* Korean initialisation for the jQuery calendar extension. */
/* Written by DaeKwon Kang (ncrash.dk@gmail.com), Edited by Genie and Myeongjin Lee. */
( function( factory ) {
	"use strict";

	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "../widgets/datepicker" ], factory );
	} else {

		// Browser globals
		factory( jQuery.datepicker );
	}
} )( function( datepicker ) {
"use strict";

datepicker.regional.ko = {
	closeText: "닫기",
	prevText: "이전달",
	nextText: "다음달",
	currentText: "오늘",
	monthNames: [ "January", "February", "March", "Aprill", "May", "June",
	"July", "August", "September", "October", "November", "December" ],
	monthNamesShort: [ "Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.",
	"Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec." ],
	dayNames: [ "Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday" ],
	dayNamesShort: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
	dayNamesMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
	weekHeader: "주",
	dateFormat: "yy-mm-dd",
	firstDay: 0,
	isRTL: false,
	showMonthAfterYear: true,
	yearSuffix: "" };
datepicker.setDefaults( datepicker.regional.ko );

return datepicker.regional.ko;

} );
