[ ] What is the purpose of using sessions?

Sessions allow a user to move from page to page without needing to login over and over again. Usually either a cookie or JWT stored in localstorage sent from the server.

[ ] What does bcrypt do to help us store passwords in a secure manner.

Bcrypt encrypts and verifies encrypted passwords allowing us to store a users encrypted hashed and salted password instead of their actual plain text password. If we ever get hacked, the users credentials are relatively safe - since decrypting these passwords would take a very very long time.

[ ] What does bcrypt do to slow down attackers?

Bcrypt increases the amount of time needed to crack any password by requiring the attacker have the hash, know the algorithm used, and how many rounds to reverse a hash.

[ ] What are the three parts of the JSON Web Token?

Header, Payload, Signature
