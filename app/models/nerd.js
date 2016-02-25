// grab the mongoose module
var mongoose = require('mongoose');
// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Nerd', {
	fname : {type : String, default: ''},
	lname : {type : String, default: ''},
	email : {type : String, default: ''},
	userid : {type : Number, default: ''},
	shortname :{type : String, default : ''},
	password :{type : String, default : ''},
	cnfpassword :{type : String, default : ''},
	admin :{type : Boolean}
});

