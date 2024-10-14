# Community website with an event calendar




## notes
- return json() or redirects or throw errors, try not to use Response (investigate)


### redeployment
```
git push origin HEAD:release 
```
then hit redeploy at:

https://coolify.am4.duckdns.org/project/egow0ggsw48gccco4o0wcww0/production/application/cscwgc48sowkw0oowssokkwc


https://blog.logrocket.com/remix-supabase-real-time-chat-app/



### profile page
- should show users profile picture
- should show users username
- should show users email


-user should be able to change their username

https://sergiodxa.github.io/remix-auth-github/


### Tasks
- [x] add admin route
- [x] add claims to users
- [x] added prosemirror test page
- [x] add create event page
- [ ] update docker file env variables (github, db)
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
- [ ] event listing
