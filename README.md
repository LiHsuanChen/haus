# What's in here
1. /client folder contains all the client side code, /server folder has all the server side code running on node 12.18
2. No pretty CSS or fancy Javascript, just barebone functionalities.
3. Simple and functional are the two main goals here.


# Needed to be done for production readiness

1. TypeScript + ESLint + Prettify for code readability and maintainability
2. Minify + uglify + CDN cache for better client side optimization
3. Can use redux for state management, but why ?
4. Functional + integration tests for better quality of code
5. Much better error handling needed on both client and sever side
6. Sanitize API input, use appropriate response headers, use CSP, parametrized queries for basic security concerns (e.g. sql injection/XSS)
7. Add inline code comments for better maintainability
8. Use Vault or secret for sensitive data
9. Break server side code files into more modular organization
10. Deploy to a better infrastructure for scale
