 
;  SYNERGY DATA LANGUAGE OUTPUT
;
;  REPOSITORY     : E:\DEV\xfbbq\xfBBQ\xfBBQHarmonyCore\Repository\bin\Debug\rpsmain.ism
;                 : E:\DEV\xfbbq\xfBBQ\xfBBQHarmonyCore\Repository\bin\Debug\rpstext.ism
;                 : Version 11.1.1c
;
;  GENERATED      : 29-OCT-2020, 12:54:40
;                 : Version 11.1.1f
;  EXPORT OPTIONS : [ALL] 
 
 
Enumeration DONENESSTYPE
   Description "Temperature of burger meat"
   Members RARE 1, MEDRARE 2, MED 3, MEDWELL 4, WELLDONE 5, SPECIAL 6
 
Enumeration MEATTYPE
   Description "Type of burger meat"
   Members BEEF 1, TURKEY 2, VEGETARIAN 3, SPECIAL 4
 
Enumeration TYPETYPE
   Description "Hotdog type"
   Members NORMAL 1, HOTLINK 2, SAUSAGE 3, SPECIAL 4
 
Enumeration USERTYPE
   Description "Type of user"
   Members ADMINISTRATOR 1, HOST 2, ATTENDEE 3
 
Structure BBQ   DBL ISAM
   Description "BBQ Table"
   Long Description
      "NO_DELETE_ENDPOINT"
 
Field ID   Type DECIMAL   Size 8
   Description "ID of BBQ"
 
Field CREATIONDATE   Type DECIMAL   Size 10
   Description "Timestamp of when BBQ was created"
 
Field HELDDATE   Type DECIMAL   Size 10
   Description "Timestamp of when BBQ is going tobe held"
 
Key ID   ACCESS   Order ASCENDING   Dups NO
   Description "ID of BBQ"
   Segment FIELD   ID  SegType DECIMAL  SegOrder ASCENDING
 
Relation  1   BBQ ID   ORDER BBQID
 
Structure FAVORITE   DBL ISAM
   Description "Favorites Table"
   Long Description
      "NO_POST_ENDPOINT"
 
Field ID   Type DECIMAL   Size 8
   Description "ID of favorite"
 
Field MEAT   Type DECIMAL   Size 1
   Description "What burger meat"
 
Field CHEESE   Type DECIMAL   Size 1
   Description "Amount of cheese slices"
 
Field DONENESS   Type DECIMAL   Size 1
   Description "Temperature of burger meat"
 
Field SPICY   Type DECIMAL   Size 1
   Description "Pungency of burger"
 
Field TYPE   Type DECIMAL   Size 1
   Description "Hotdog type"
 
Field COUNT   Type DECIMAL   Size 1
   Description "Amount of hotdogs"
 
Field BURNT   Type DECIMAL   Size 1
   Description "Whehter the hotdog is to be burnt or not"
 
Field USERID   Type DECIMAL   Size 8
   Description "ID of user who favored"
 
Key ID   ACCESS   Order ASCENDING   Dups NO
   Description "ID of favorite"
   Segment FIELD   ID  SegType DECIMAL  SegOrder ASCENDING
 
Key USERID   ACCESS   Order ASCENDING   Dups YES
   Description "ID of user who favored"
   Segment FIELD   USERID
 
Relation  1   FAVORITE USERID   USER ID
 
Structure ORDER   DBL ISAM
   Description "Order Table"
   Long Description
      "NO_POST_ENDPOINT"
 
Field ID   Type DECIMAL   Size 8
   Description "ID of order"
 
Field MEAT   Type DECIMAL   Size 1
   Description "What burger meat"
 
Field CHEESE   Type DECIMAL   Size 1
   Description "Amount of cheese slices"
 
Field DONENESS   Type DECIMAL   Size 1
   Description "Temperature of burger meat"
 
Field SPICY   Type DECIMAL   Size 1
   Description "Pungency of burger"
 
Field TYPE   Type DECIMAL   Size 1
   Description "Hotdog type"
 
Field COUNT   Type DECIMAL   Size 1
   Description "Amount of hotdogs"
 
Field BURNT   Type DECIMAL   Size 1
   Description "Whehter the hotdog is to be burnt or not"
 
Field ORDERDATE   Type DECIMAL   Size 10
   Description "Timestamp of order creation"
 
Field USERID   Type DECIMAL   Size 8
   Description "ID of user who ordered"
 
Field BBQID   Type DECIMAL   Size 8
   Description "ID of BBQ this order pertains to"
 
Key ID   ACCESS   Order ASCENDING   Dups NO
   Description "ID of order"
   Segment FIELD   ID  SegType DECIMAL  SegOrder ASCENDING
 
Key USERID   ACCESS   Order ASCENDING   Dups YES
   Description "ID of user who ordered"
   Segment FIELD   USERID
 
Key BBQID   ACCESS   Order ASCENDING   Dups YES
   Description "ID of BBQ this order pertains to"
   Segment FIELD   BBQID
 
Relation  1   ORDER USERID   USER ID
 
Relation  2   ORDER BBQID   BBQ ID
 
Structure POTLUCK_FULLFILLMENT   DBL ISAM
   Description "Potluck items being brought"
 
Field ID   Type DECIMAL   Size 8
   Description "Item id"
 
Field BBQID   Type DECIMAL   Size 8
   Description "BBQ id"
 
Field ITEMID   Type DECIMAL   Size 8
   Description "Item id"
 
Field USERID   Type DECIMAL   Size 8
   Description "user id bringing item"
 
Field QTY   Type DECIMAL   Size 4
   Description "Quantity"
 
Key ID   ACCESS   Order ASCENDING   Dups NO
   Description "id"
   Segment FIELD   ID
 
Key BBQID   ACCESS   Order ASCENDING   Dups YES   Insert END   Krf 001
   Description "bbq id"
   Segment FIELD   BBQID
   Segment FIELD   ITEMID
 
Key USER   ACCESS   Order ASCENDING   Dups YES   Insert END   Modifiable YES
   Krf 002
   Description "user"
   Segment FIELD   USERID
   Segment FIELD   BBQID
   Segment FIELD   ITEMID
 
Key ITEMID   ACCESS   Order ASCENDING   Dups YES   Insert END   Krf 003
   Description "item id"
   Segment FIELD   ITEMID
 
Relation  1   POTLUCK_FULLFILLMENT BBQID   BBQ ID
 
Relation  2   POTLUCK_FULLFILLMENT BBQID   POTLUCK_WISHLIST BBQID
 
Relation  3   POTLUCK_FULLFILLMENT USER   USER ID
 
Relation  4   POTLUCK_FULLFILLMENT ITEMID   POTLUCK_ITEMS ID
 
Structure POTLUCK_ITEMS   DBL ISAM
   Description "Potluck items"
 
Field ID   Type DECIMAL   Size 8
   Description "Potluck Item id"
   Report Just LEFT   Input Just LEFT
 
Field DESCRIPTION   Type ALPHA   Size 200
   Description "Description"
 
Field ICON   Type ALPHA   Size 256
   Description "Icon/image URL"
 
Key ID   ACCESS   Order ASCENDING   Dups NO
   Description "id"
   Segment FIELD   ID
 
Structure POTLUCK_WISHLIST   DBL ISAM
   Description "Potluck"
 
Field ID   Type DECIMAL   Size 8
   Description "Item id"
 
Field BBQID   Type DECIMAL   Size 8
   Description "BBQ id"
 
Field ITEMID   Type DECIMAL   Size 8
   Description "Item id"
 
Field QTY   Type DECIMAL   Size 4
   Description "Quantity"
 
Field CUSTOM_ITEM   Type DECIMAL   Size 1
   Description "Custom item (not on original wishlist)"
 
Key ID   ACCESS   Order ASCENDING   Dups NO
   Description "ID"
   Segment FIELD   ID
 
Key BBQID   ACCESS   Order ASCENDING   Dups YES   Insert END   Krf 001
   Description "BBQ id"
   Segment FIELD   BBQID
   Segment FIELD   ITEMID
 
Key ITEMID   FOREIGN
   Description "item id"
   Segment FIELD   ITEMID
 
Relation  1   POTLUCK_WISHLIST BBQID   BBQ ID
 
Relation  2   POTLUCK_WISHLIST ITEMID   POTLUCK_ITEMS ID
 
Relation  3   POTLUCK_WISHLIST ITEMID   POTLUCK_FULLFILLMENT ITEMID
 
Structure SYSPARAMS   RELATIVE
   Description "System parameter file"
 
Field PARAM_NAME   Type ALPHA   Size 30
   Description "Parameter name"
 
Field PARAM_VALUE   Type DECIMAL   Size 6
   Description "Parameter value"
 
Key RECORD_NUMBER   ACCESS   Order ASCENDING   Dups NO
   Segment RECORD NUMBER
 
Structure USER   DBL ISAM
   Description "User table"
   Long Description
      "NO_POST_ENDPOINT"
      "NO_DELETE_ENDPOINT"
 
Field ID   Type DECIMAL   Size 8
   Description "ID of user"
   Required
 
Field JOINDATE   Type DECIMAL   Size 10
   Description "Timestamp of when the user joined"
   Readonly
   Nonull
 
Field TYPE   Type DECIMAL   Size 1
   Description "Type of user"
 
Field EMAIL   Type ALPHA   Size 100
   Description "Email of user"
 
Field LASTLOGINDATE   Type DECIMAL   Size 10
   Description "Timestamp of when the user last loggedin"
 
Field HASH   Type ALPHA   Size 100
   Description "Hashed password of user"
 
Field NAME   Type ALPHA   Size 100
   Description "Name of user"
 
Field RECOVERYCODE   Type ALPHA   Size 100
   Description "Recovery code of user"
 
Key ID   ACCESS   Order ASCENDING   Dups NO
   Description "User ID"
   Segment FIELD   ID  SegType DECIMAL  SegOrder ASCENDING
 
Relation  1   USER ID   FAVORITE USERID
 
Relation  2   USER ID   ORDER USERID
 
File BBQ   DBL ISAM   "DAT:BBQ.ism"
   Description "BBQ File"
   Assign BBQ
 
File FAVORITE   DBL ISAM   "DAT:FAVORITE.ism"
   Description "Favorite File"
   Assign FAVORITE
 
File ORDER   DBL ISAM   "DAT:Order.ism"
   Description "Order File"
   Assign ORDER
 
File POTLUCK_FULLFILLMENT   DBL ISAM   "DAT:POTLUCK_FULLFILLMENT.ism"
   Description "Potluck Fulfillment"
   Page Size 4096   Compress
   Assign POTLUCK_FULLFILLMENT
 
File POTLUCK_ITEMS   DBL ISAM   "DAT:POTLUCK_ITEMS.ism"
   Description "Potluck items"
   Page Size 4096   Compress
   Assign POTLUCK_ITEMS
 
File POTLUCK_WISHLIST   DBL ISAM   "DAT:POTLUCK_WISHLIST.ism"
   Description "Potluck wishlist items"
   Page Size 4096   Compress
   Assign POTLUCK_WISHLIST
 
File SYSPARAMS   RELATIVE   "DAT:sysparams.ddf"
   Description "System parameter file"
   Assign SYSPARAMS
 
File USER   DBL ISAM   "DAT:User.ism"
   Description "User File"
   Assign USER
 
