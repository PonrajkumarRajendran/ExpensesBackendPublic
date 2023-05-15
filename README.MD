# Necessary tools and setup:

* NPM - please have NPM installed in your local machine.

* MongoDB - please ensure that you have MongoDBCompass application installed in your local machine, to view data.

# Front-end setup:

* Download the source code as zip file from the below given Github repo.
	
	Frontend repo: https://github.com/PonrajkumarRajendran/expensesFrontend

* Open the unzipped source code in an IDE or use commandprompt to enter the below commands.
		
	> npm install
		
* The above command might take some time, depending on your network connection.
		
* once the process finishes, open the code editor and replace the below given links.
	
	replace this : "https://serene-lokum-53b06d.netlify.app/.netlify/functions"

	with this: "http://localhost:5000/"
	
	leave the remaining part of the link intact, without any other code changes.
		
* After the above processes, you can start the Front-end app with the below command.
	> npm start

# Back-end setup:

* Download the zip file of this current Github repo.
* Follow the same procedure as frontend to install NPM packages in the application. Unzip, then enter, `npm install`.
* The code has been modified for localusage, so don't change any of the code other than the following.

# MongoDB Client URI: 
* You can start your local MongoDB instance thourgh MongoDB Compass. Use the connection string from the local database instance in index.js file.

# Facebook OAuth procedures: 
* You need to create a Meta for developers account, and create a app.
* Once you have an app created, you can find Cliend ID and secret key in the app, you have to enter the same in index.js file. I have marked both MongoDB and Facebook client information with comments, so that is easier for you to use.

# JWT setup:
* JWT secret key has to entered in the following locations.
	auth.js
	emailRoute.js
	verifyToken.js
* You can choose your own key, replace the existing token_secret string. Make sure they all match. 
* JWT is not setup with date constraints or anything, please let me know if you want to add further security in JWT.

# Running the application:
* If the setup is done, you can start the backend application by entering `npm start` in command line.
* If you encounter any issues, please let me know.
