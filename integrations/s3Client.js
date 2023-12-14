const config = require("../config");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: config.get("aws.accessKeyId"),
  secretAccessKey: config.get("aws.secretAccessKey"),
});
const s3 = new AWS.S3();

module.exports = {
  s3Client: s3,
};
