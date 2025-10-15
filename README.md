#Event management API

##Setup
1) clone repo
2) create ".env" file inside the "config" folder
3) In that ".env" file add the following variables:
   DB_NAME=event_management
   DB_USER=event_admin
   DB_PASSWORD=...
   DB_HOST=localhost
   DB_PORT=5432
   PORT=3000
4)crete a DB and user is postgres:
  CREATE DATABASE event_management;
   CREATE USER event_admin WITH PASSWORD '...';
   GRANT ALL PRIVILEGES ON DATABASE event_management TO event_admin;
5) after doing above steps go to terminal in the folder and write the command "npm i" (or) "npm install"
6) after running that command do "npm run dev" to start the server

   ##API end points
- POST /api/users/register {name, email} — create/get user
- GET /api/users/getallusers - to get the all users
- GET /api/users/get/:id -to get the user by Id
- PUT /api/users/update/:id -to update the user details
- DELETE /api/users/delete/:id -to delete the user
- POST /api/events/create {title, dateTime (ISO), location, capacity} — create event
- GET /api/events/getevent/:id -  to get event details
- GET /api/events/upcommingevents — list upcoming (date asc, location asc)

- POST /api/events/register {eventId, userId}
- POST /api/events/cancel {eventId, userId}
- GET /api/events/:id/stats — stats
