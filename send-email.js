var express = require('express');
var nodeMailer = require("nodemailer");
var EmailTemplate = require('email-templates').EmailTemplate;
var projectReport = require('./db/project-report');
var smtp = require('./config').smptpConfig;
var NodeGeocoder = require('node-geocoder');
var _ = require('lodash');

var options = {
    provider: 'google',
    // // Optional depending on the providers
    // httpAdapter: 'http', // Default
    // apiKey: 'AIzaSyC-0L_BVkGZVCfo3Wa1O3XDtqlvWkseNHk', // for Mapquest, OpenCage, Google Premier
    // formatter: null         // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);
var sender = smtp.sender;
var password = smtp.password;
var transporter = nodeMailer.createTransport(sender + ':' + password + '@smtp.gmail.com');


var projectReportTemplate = transporter.templateSender(
    new EmailTemplate('./templates/project-report'), {
        from: 'PrimeTech'
    });

exports.sendProjectReport = function (recipients, projectId, projectReportId, cb) {
    projectReport.PreviewReport(projectId, projectReportId)
        .then(result => {
            var companyDetails = result[0][0];
            var project = result[1][0];
            var projectTeam = result.length > 1 ? result[2]: [];
            var instList = result.length > 2 ? result[3]: [];
            var prDetails = instList.length > 0 ? instList[0]: {};
            var projectReportDetails =instList.length > 0 ?  _.uniqBy(instList, 'elementName') : [];
            var finalElmInstructioArray = [];
            projectReportDetails.forEach(element => {
                var observations = instList.filter(x => x.elementName == element.elementName);
                observations.forEach(function (item, idx) {
                    if (idx == 0) {
                        item['rowCount'] = observations.length;
                        finalElmInstructioArray.push(item);
                    }
                    else {
                        finalElmInstructioArray.push(item);
                    }
                });
            });
            console.log(finalElmInstructioArray);
            projectReportTemplate({
                // to: 'akhileshkhandelwal1207@gmail.com',
                to: recipients,
                subject: 'PrimeTech | Project :- ' + project.name + ' Report Number ' + projectReportDetails[0].reportNo
            }, {
                    user: 'Prime Tech Design Consultants',
                    company: companyDetails,
                    project: project,
                    teamData: projectTeam,
                    prDetails: prDetails,
                    prElemInstructionDetails: finalElmInstructioArray
                }, function (err, info) {
                    if (err) {
                        console.log(err);
                        cb(err)
                    } else {
                        console.log('Link sent\n' + JSON.stringify(info));
                        cb(null, info)
                    }
                });
        })
        .catch(err => {
            cb(err)
        });
};
finalSending = function (recipients, companyDetails, project, projectTeam, projectReportDetails, prDetails, formattedAddress, cb) {
    // transporter.template
    projectReportTemplate({
        to: 'akhileshkhandelwal1207@gmail.com',
        // to: recipients,
        subject: 'PrimeTech | Project :- ' + project.name + ' Report Number ' + projectReportDetails[0].reportNo
    }, {
            user: 'Akhilesh',
            company: companyDetails,
            project: project,
            teamData: projectTeam,
            prDetails: prDetails,
            prElementsDetails: projectReportDetails,
            formattedAddress: formattedAddress
        }, function (err, info) {
            if (err) {
                console.log(err);
                cb(err)
            } else {
                console.log('Link sent\n' + JSON.stringify(info));
                cb(null, info)
            }
        });
}