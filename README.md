# message-app-public

Setup: Make sure the following packages are installed: Express, bcryptjs, mongoose, helmet,connect-mongo,cookie-parser.

Replace database URLs with proper Database URL.

1) table name - user 
2) table name - message
users table
username
password

messages table
message_id
sender_username
recipient_username
message_contents

Step 4 - Designing API's
Endpoints should follow REST methodology & use the appropriate HTTP Verbs (GET, POST, PUT, DELETE) as well as return correct status codes for successes and errors. All responses should return relevant information in JSON format.
1)	/signup – once the username, password created the data should store in user table.
a.	Usernames should be unique.
b.	Passwords must be at least 6 characters long.
2)	/login – login should authenticate with session
3)	/sending message - post a message, data should store in the message table.
a.	Message should fail to send if the username of either the sender or receiver doesn’t exist in the database.
b.	Message ID should be automatically created by the webserver & be sent back to the user.
4)	/updating message - to update a single message based on ID
a.	Can only update message content, not the sender/recipient.
5)	/delete message - to delete the message, 2 cases should work
a)	Delete the particular message based on ID
b)	Delete all messages for the particular user
6)	/retrieving all message – to show all messages, 2 cases should work
a)	Retrieve all messages of the user (sent & received, separated into those two types)
b)	Retrieve message based on ID.
