#### Setup

1. Set up environment variables 

```bash
npm install && npm start
```
#### Key features

1. User login/signup
2. Email verification
3. Edit credentials (password,username and etc.)
4. File upload (upload profile pictures on AWS S3 bucket) using SDKv3
5. Custom error handler classes
6. validators (mongoose, custom)
7. security (using jwt, bycriptjs and etc.)
8. Send, decline, confirm, get a list of friend requests, get added friends list, delete friends.


### Used technologies

1. Express
2. mongoose
3. @aws-sdk/client-s3
4. AWS S3 bucket
4. multer
5. nodemailer
6. jsonwebtoken
etc.

#### Database Connection

1. Import mongo.js
2. Invoke in start() in "afterlife.js"
3. Setup .env in the root
4. Add MONGO_URI with correct value



Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```



#### Security

- helmet
- cors
- xss-clean
- express-rate-limit

#### Note

The project is in a development phase this is basically a base of a project. Adding features everyday.
