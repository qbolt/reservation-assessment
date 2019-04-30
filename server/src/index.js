"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var ReservationModel_1 = require("./data/models/ReservationModel");
mongoose.connect('mongodb//localhost/shop');
ReservationModel_1["default"].create({ guestName: 'bob', from: new Date(), to: new Date(), hotelName: 'test' })
    .then(function () { return console.log('saved'); })["catch"](function (err) { return console.log(err); });
