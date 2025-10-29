// db.getSiblingDB("admin").dropUser("admin")

// Create admin user
db.getSiblingDB("admin").createUser({user:"admin", pwd:"hyphenated-last-name", roles:["root"]})

db = db.getSiblingDB("grubb")

db.createCollection("students")
db.createCollection("individuals")
db.createCollection("facultys")
db.createCollection("overheadcharges")
db.createCollection("travelprofiles")
db.createCollection("studentaccounts")
db.createCollection("salarys")
db.createCollection("institutionalaccounts")
db.createCollection("budgets")
