# 𝘹𝘧BBQ

## Database Tables

### User Table

| Property Name | Description                                     |
| ------------- | ----------------------------------------------- |
| (PK) id       | ID of user                                      |
| name          | Name of user                                    |
| hash          | Hashed password of user                         |
| type          | Type of user (Administrator, Host, or Attendee) |
| email         | Email of user                                   |
| joinDate      | Timestamp of when the user joined               |
| lastLoginDate | Timestamp of when the user last logged in       |

### BBQ Table

| Property Name | Description                               |
| ------------- | ----------------------------------------- |
| (PK) id       | ID of BBQ                                 |
| creationDate  | Timestamp of when BBQ was created         |
| heldDate      | Timestamp of when BBQ is going to be held |

### Order Table

| Property Name | Description                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| (PK) id       | ID of order                                                                                           |
| (FK) userID   | (FK to User.id) ID of user who ordered                                                                |
| (FK) bbqID    | (FK to BBQ.id) ID of BBQ this order pertains to                                                       |
| orderDate     | Timestamp of order creation                                                                           |
| - Hamburger - | ---                                                                                                   |
| meat          | What burger meat (1: Beef, 2: Turkey, 3: Vegetarian, 4: Special)                                      |
| cheese        | Amount of cheese slices                                                                               |
| doneness      | Temperature of burger meat (1: Rare, ..., 5: Well Done, 6: Special). N.B. Only Beef burgers have this |
| spicy         | Pungency of burger                                                                                    |
| - Hotdog -    | ---                                                                                                   |
| type          | Hotdog type (1: Normal, 2: Hot Link, 3: Sausage, 4: Special)                                          |
| count         | Amount of hotdogs                                                                                     |
| burnt         | Whether the hotdog is to be burnt or not                                                              |

## User Requirements

### Login View

1. All users must first log in with their name and password
   1. After logging in, _xf_ BBQ shall show the user the Attendee, Host, or Administrator view
1. If the user forgot their password, the user shall be taken to the Password Recovery View
1. If the user does not have an account, they can click the New User button to be taken to the User Registration View

### Password Recovery View

1. A user must enter their name, and then _xf_ BBQ shall send the email address associated with the user a form to change their password

### User Registration View

1. A user must enter their name and password, and then _xf_ BBQ shall add the user to the user database as an Attendee

### Attendee View

1. Shall be able to select what to order for the upcoming BBQ
1. Shall be able to view and modify only their upcoming BBQ's order, after they have ordered
1. Shall be able to view (but not modify) only their previous BBQ orders

### Host View

1. Everything in the Attendee View, but with these changes:
   1. Shall be able to view and modify **everyone's** upcoming BBQ's orders
   1. Shall be able to view (but not modify) **everyone's** previous BBQ orders
1. Shall be able to set the date of the upcoming BBQ
1. Shall be able to set the menu items appearing in the upcoming BBQ
1. Shall be able to see a table of BBQ orders, for any given BBQ
1. Shall be able to make queries against the table of BBQ orders (e.g. number of hot dog orders or number of cheeseless turkey burger orders)
1. Shall be able to push notifications and emails about upcoming BBQs to Attendees

### Administrator View

1. Everything in the Attendee and Host View, and...
1. Shall be able to create and delete users, and set their user type (Attendee, Host, or Administrator)

## Mock Views

1.
