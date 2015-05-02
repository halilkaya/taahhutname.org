TAAHHUTNAME
===

Taahutname.org


TODO
====

 - [ ] Search
 - [ ] Better Sample Data (Closer to our usage)
 - [ ]   And template changes using better sample data


INSTALL
=======

```
npm install
cp data/data.sample.json data/data.json
node app.js
```

http://localhost:8080/



BENCHMARK
=========

```
$ ab -n 5000 -c 10 http://127.0.0.1:8080/
```
