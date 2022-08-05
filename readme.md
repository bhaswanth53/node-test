# Documentation

**Site URL** : https://nodezero.herokuapp.com/

***

## Authentication

**Token** : $2b$10$B7Dt9TeD4EcGFHUwICXMGuCxBgf6Z0yIQrJ3WJlfFH8yiI3Dm4QKO

**Note** : Token must be included in headers.

**headers** : 

```Json
{
    "_token" : "$2b$10$B7Dt9TeD4EcGFHUwICXMGuCxBgf6Z0yIQrJ3WJlfFH8yiI3Dm4QKO"
}
```

## APIs

### 1. Add Agency & Client

**Method** : POST \
**URL** : https://nodezero.herokuapp.com/add \
**Input** :

```Json
{
    "name" : "Test Agency 8",
    "address1" : "First line address",
    "address2" : "Second Line Address",
    "state" : "Andhra Pradesh",
    "city" : "Nellore",
    "phone" : "+918919723239",
    "clients" : [
        {
            "name" : "Test Client 1",
            "email" : "clientone@gmail.com",
            "phone" : "+917896541230",
            "bill" : 4896.36
        },
        {
            "name" : "Test Client 2",
            "email" : "clienttwo@gmail.com",
            "phone" : "+917896541230",
            "bill" : 547.42
        },
        {
            "name" : "Test Client 3",
            "email" : "clientthree@gmail.com",
            "phone" : "+917896541130",
            "bill" : 8407.00
        },
        {
            "name" : "Test Client 4",
            "email" : "clientfour@gmail.com",
            "phone" : "+917896541130",
            "bill" : 827.00
        }
    ]
}
```

**Output** :


**Status** : 200

```Json
{
    "message": "Successfully added to database."
}
```

**Status** : 422

```Json
{
    "message": "Invalid form data",
    "errors": {
        "name": {
            "message": "The name field is mandatory.",
            "rule": "required"
        },
        "address1": {
            "message": "The address1 field is mandatory.",
            "rule": "required"
        },
        "state": {
            "message": "The state field is mandatory.",
            "rule": "required"
        },
        "city": {
            "message": "The city field is mandatory.",
            "rule": "required"
        },
        "phone": {
            "message": "The phone field is mandatory.",
            "rule": "required"
        }
    }
}
```

**Status** : 422

```Json
{
    "message": "Invalid API Token"
}
```

**Status** : 503

```Json
{
    "message": "Unauthorized access"
}
```


### 2. Update Client

**Method** : POST \
**URL** : https://nodezero.herokuapp.com/update \
**Input** :
```Json
{
    "id" : "62ebd2007b7b9fd7e4a8025d",
    "name" : "Test Client Ichi",
    "email" : "clienttestone@gmail.com",
    "phone" : "+917854129632",
    "bill" : 9564.87
}
```

**Output** :
**Status** : 200
```Json
{
    "message": "Successfully updated the client"
}
```

### 3. Get highest billing client

**Method** : POST \
**URL** : https://nodezero.herokuapp.com/get \
**Input** :

```Json
{}
```

**Output** :

**Status** : 200
```Json
{
    "agency_name": "Test Agency",
    "client_name": "Test Client Ichi",
    "total_bill": 9564.87
}
```