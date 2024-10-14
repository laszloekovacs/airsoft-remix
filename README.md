# Community website with an event calendar




### relevant links and articles
- https://blog.logrocket.com/remix-supabase-real-time-chat-app/
- https://sergiodxa.github.io/remix-auth-github/


### releases
the project is set up so if its pushed to github on the release branch, it will build a docker image
```
git push origin HEAD:release 
```
the project doesn't automatically deploys itself, in coolify, it needs to be restarted. in my case:
https://coolify.am4.duckdns.org/project/egow0ggsw48gccco4o0wcww0/production/application/cscwgc48sowkw0oowssokkwc


### Notes & Tasks
- [x] add admin route
- [x] add claims to users
- [x] added prosemirror test page
- [x] add create event page
- [x] events list on index page
- [x] event listing
- [x] added event detail page
- [x] update docker file env variables (github, db)
- [ ] create a docker compose file
- [ ] setup deployment on home server
- [ ] use separate connection string(due to roles) for admins?
- [ ] create a new event post
- [ ] admins should log in with different connection string / credentials
- [ ] investigate proseMirror
- [ ] create a claim check function 
- [ ] create an edit form page for events
- [ ] signup to events
- [ ] comments 
- [ ] notifications
- [ ] type of roles (user, admin, organizer)
- [ ] google, facebook auth
- [ ] online indicator
- [ ] image upload
- [ ] write some type assertion functions eg: () => is string
- [ ] add event detail page
