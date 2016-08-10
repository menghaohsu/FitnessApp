'use strict';
var Sequelize = require('sequelize');
var db = require('./db');

module.exports = db.define('fitness',{
	user: {
		type: Sequelize.STRING
	},
	pushup: {
		type: Sequelize.ARRAY(Sequelize.INTEGER)
	},
	type: {
		type: Sequelize.STRING
	}
});