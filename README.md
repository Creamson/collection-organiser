# collection-organiser

## Frontend
* Install [nodejs 6.x](https://nodejs.org/en/download/)
* Run ```npm install -g @angular/cli@latest```
* Install dependencies with ```npm install``` from ```<project root>/frontend```
* To run server use ```ng run``` in ```<project root>/frontend```

## Backend

* install [Gradle Build Tool](https://gradle.org/)
* download [MongoDB Community Edition](https://www.mongodb.com/download-center#community)
* install MongoDB (on Windows you can follow [these instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows), outside of the "Install MongoDB for Windows" section I suggest registering a service as described in "Configure a Windows Service for MongoDB Community Edition" so you don't have to worry about launching the deamon every time you want to access Mongo)
* execute ```gradle bootRun``` in the backend project root directory (it should also take care of downloading all the dependencies)
* a server will be run at [https://localhost:8443](https://localhost:8443). Make sure to navigate there to mark the self-generated SSL certificate as trusted (open the page regardless). If you don't do this, you won't be able to access the endpoints via frontend (you will get a ```net::ERR_INSECURE_RESPONSE``` log in the console. If this ever happens, then either your backend isn't running or you will need to repeat this step)