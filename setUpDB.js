// db.getSiblingDB("admin").dropUser("admin")

// Create admin user
db.getSiblingDB("admin").createUser({user:"admin", pwd:"hyphenated-last-name", roles:["root"]})

db = db.getSiblingDB("grubb")

db.createCollection("student")
db.createCollection("individual")
db.createCollection("faculty")
db.createCollection("overhead_charges")
db.createCollection("travel_profiles")
db.createCollection("student_accounts")
db.createCollection("salary")
db.createCollection("institutional_account")
db.createCollection("budgets")
