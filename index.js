#!/usr/bin/env lambchop -d
/*
function_name: call-cfn
handler: index.handler
role: arn:aws:iam::XXXXXXXXXXXX:role/lambda_basic_execution
include_files: template.json
*/
var Promise = require('bluebird');

var AWS = require("aws-sdk");
AWS.config.update({region: 'ap-northeast-1'});

var cloudformation = Promise.promisifyAll(new AWS.CloudFormation());

var fs = Promise.promisifyAll(require('fs'));

exports.handler = function(event, context) {
  var stackName = 'my-stack-' + new Date().getTime();

  fs.readFileAsync('template.json', 'utf8').then(function(data) {
    return cloudformation.createStackAsync({
      StackName: stackName,
      Parameters: [
        {
          ParameterKey: 'StackName',
          ParameterValue: stackName
        }
      ],
      TemplateBody: data
    });
  }).then(function(data) {
    console.log(data);
  }).then(function() {
    context.succeed('OK');
  }).catch(function(err) {
    context.fail(err);
  });
};
