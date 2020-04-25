c = require("calendar");
cal = new c.Calendar();               
m = cal.monthDates(2020,3, function(d) {return (' '+d.getDate()).slice(-2)}, 
										       function(w) {return w.join(' | ')}
);
console.log ("Calendar for April, 2020");
for (i=0; i<m.length; i++) console.log(m[i]);