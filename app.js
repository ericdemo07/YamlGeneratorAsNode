var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var empty = require('is-empty');
var randomstring = require("randomstring");
//var fileUpload = require('express-fileupload');
var StringBuilder = require("string-builder");
var app = express();


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.post('/generateyaml', function(req, res) {
    var yamlAsStringBuilder = new StringBuilder();
    yamlAsStringBuilder.append("date:\n");
    console.log(req.body);
    var yamlObject = req.body;
    var bidateAsMap = yamlObject.bidates;
    var bipathAsMap = yamlObject.bipaths;
    if (empty(bidateAsMap)) {
        console.log("At least one pair of start and end date is required");
        res.send("At least one pair of start and end date is required");
        return;
    }
    if (empty(bipathAsMap)) {
        console.log("At least one path is required");
        res.send("At least one path is required");
        return;
    }
    var i = 0;
    for (var key in bidateAsMap) {
        i++;
        yamlAsStringBuilder.append(" date" + i + ":\n");
        yamlAsStringBuilder.append("  start: " + bidateAsMap[key].startdate.replace(/-/g, "/") + "\n");
        yamlAsStringBuilder.append("  end: " + bidateAsMap[key].enddate.replace(/-/g, "/") + "\n");
    }
    yamlAsStringBuilder.append("input:\n");
    yamlAsStringBuilder.append(" type: " + yamlObject.inputtype.slice(0, 1) + "\n");
    yamlAsStringBuilder.append(" device: " + yamlObject.devicetype + "\n");
    i = 0;
    for (var key in bipathAsMap) {
        i++;
        yamlAsStringBuilder.append(" path" + i + ": " + bipathAsMap[key] + "\n");
    }
    yamlAsStringBuilder.append("user.id: " + yamlObject.userid + "\n");
    yamlAsStringBuilder.append("mail.id: " + yamlObject.mailid + "\n");
    console.log(yamlAsStringBuilder.toString());
    var yamlPath = new StringBuilder();
    yamlPath.append("C:/E_Drive/WorkHouse/Admin-Tool/");
    yamlPath.append(yamlObject.userid);
    yamlPath.append(randomstring.generate());
    yamlPath.append(".yaml");

    fs.writeFile(yamlPath.toString(), yamlAsStringBuilder.toString(), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    res.send("Success");
});

//app.use(fileUpload());

// load the single view file (angular will handle the page changes on the
// front-end)
app.get('*', function(req, res) {
    res.sendFile('./public/index.html', {
        root: __dirname
    });
});

// to start express server
app.listen(4000, function() {
    console.log('yamlgenerator service started on port 3000!');
});
