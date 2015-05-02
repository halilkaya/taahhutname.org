TAAHHUTNAME
===

Taahutname.org

TODO
====

 - [ ] Search
 - [ ] Better Sample Data (Closer to our usage)
 - [ ]   And template changes using better sample data
 
.. ?

BENCHMARK
=========

```
$ ab -n 5000 -c 10 http://127.0.0.1:8080/

This is ApacheBench, Version 2.3 <$Revision: 1604373 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 500 requests
Completed 1000 requests
Completed 1500 requests
Completed 2000 requests
Completed 2500 requests
Completed 3000 requests
Completed 3500 requests
Completed 4000 requests
Completed 4500 requests
Completed 5000 requests
Finished 5000 requests


Server Software:
Server Hostname:        127.0.0.1
Server Port:            8080

Document Path:          /
Document Length:        20888 bytes

Concurrency Level:      10
Time taken for tests:   3.934 seconds
Complete requests:      5000
Failed requests:        0
Total transferred:      105425000 bytes
HTML transferred:       104440000 bytes
Requests per second:    1270.82 [#/sec] (mean)
Time per request:       7.869 [ms] (mean)
Time per request:       0.787 [ms] (mean, across all concurrent requests)
Transfer rate:          26167.28 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       1
Processing:     5    8   2.3      7      31
Waiting:        5    8   2.3      7      31
Total:          5    8   2.3      7      31

Percentage of the requests served within a certain time (ms)
  50%      7
  66%      9
  75%      9
  80%      9
  90%     10
  95%     13
  98%     14
  99%     16
 100%     31 (longest request)
```
