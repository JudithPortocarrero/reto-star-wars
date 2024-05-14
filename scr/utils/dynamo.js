const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const putDynamo = async (params) => {
    return await dynamodb.put(params).promise();
}

const scanDynamo = async (params) => {
    return await dynamodb.scan(params).promise();
}

module.exports = { putDynamo, scanDynamo };