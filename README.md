install dependencies:
     $ cd rent && npm install

 run the app:
     $ DEBUG=rent:* npm start

nodemon run node js:
	 $ DEBUG=rent:* npm run devstart

If u are running with emulator use URL as http://10.0.2.2:3000/api/ instead of localhost

Running from mobile app use PC IP address http://192.168.43.216:3000/api/

starting mongoDb on local
	$ brew services start mongodb

	> show dbs
	> use rent
	> show collections
	> db.users.find()