- Create a PostgreSQL database using Supabase to hold all the dynamic information
that needs to be served to users on the website.

- Make it as easy as possible to update information with a "one and done" approach,
which means making a "Brother" data type. To delegate someone an exec position, you
would just select them from a list of all brothers and add a position to their "exec"
attribute.
  - Database queries can just GET all brothers who don't have null as exec and then go
    from there.

- Investigate S3 as a potential CDN / look for CDNs in general

TODO:

- set up form in admin panel to add brothers
  - figure out ui/ux for that

- do events page

- 