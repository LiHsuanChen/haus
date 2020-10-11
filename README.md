# What's in here
1. /client folder contains all the client side code, /server folder has all the server side code running on node 12.18
2. No pretty CSS or fancy Javascript, just barebone functionalities.


# Needed to be done for production readiness

1. TypeScript + ESLint + Prettify +  for code readability and maintainability
2. Functional + integration tests for better quality of code
3. Much better error handling needed on both client and sever side
4. Sanitize API input, use appropriate response headers, use CSP, parametrized queries for basic security concerns (e.g. sql injection/XSS)
5. Add inline code comments for better maintainability
6. Use Vault or secret for sensitive data
7. Break server side code files into more modular organization
8. Deploy to a better infrastructure for scale