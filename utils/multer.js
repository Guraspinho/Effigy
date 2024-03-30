const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const uuid = require('uuid').v4;


exports.s3Uploadv3 = async (file) =>
{
    const s3client = new S3Client();

    const param = 
    {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key:`uploads/${uuid()} - ${file.originalname}`,
        Body: file.buffer
    };

    await s3client.send(new PutObjectCommand(param));

    const url = `https://${param.Bucket}.s3.amazonaws.com/${encodeURIComponent(param.Key)}`;

    return url;
}