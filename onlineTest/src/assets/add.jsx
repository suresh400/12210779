import { post } from "../backend/routes/urlRoutes"

write code for logging middleware api post http://20.244.56.144/evaluation-service/register
request boby ElementInternals,name,mobileNo,githubUsername,rollNo,accessCode
response ElementInternals,name,rollno,accessCode,clientID,clientSecret

authorization token api post http://20.244.56.144/evaluation-service/auth
request body ElementInternals,name,rillno,accesscode,clientID,clientSecret
response token type 'bearer' and access token expires in

log api posthttp://20.244.56.144/evaluation-service/logs
request body stack level package Message
response status 200 logID, message='log created successfully'