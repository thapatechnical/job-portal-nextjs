Part 1: Gather Session Properties
This part involves collecting all the necessary information to create a new, unique session record.

Generate the Raw Session Token:

Use the built-in crypto module (e.g., crypto.randomBytes()) to create a long, cryptographically strong, raw session token.

Note: This raw token is the value that will be sent back to the user's browser in a secure cookie.

Retrieve User Agent:

Access the request headers (in-built feature in Next.js API routes).

Extract the User-Agent string, which provides details about the client's browser and operating system.

Retrieve IP Address:

Extract the client's IP address from the request object, typically found in request properties or headers like x-forwarded-for.

Obtain the User ID:

This ID is passed as a parameter or variable, usually retrieved immediately after successful user authentication (login).

Part 2: Secure Session Creation and Storage
Once all four properties are gathered, a function is called to store the session data securely in the sessionTable.

Hash the Session Token:

Crucial Step: Before storing the token, use the built-in crypto module (e.g., crypto.createHash('sha256')) to hash the raw token securely.

The raw token is never stored in the database.

Insert Data using Drizzle:

Call the simple insert method of Drizzle ORM targeting the sessionTable.

Pass the following values to the insert query:

The User ID.

The Hashed Token (not the raw token).

The IP Address.

The User Agent.

Note: Also ensure you pass the necessary Drizzle timestamp properties, such as engine.At equivalents, for createdAt, updatedAt, and expiresAt (session expiration).

Client Response:

Set the raw token as an HttpOnly, Secure cookie in the response headers to be stored on the client's browser.
