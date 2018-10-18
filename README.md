# MI133LecturePlanner

Regarding considerable number of students who are studying in 3 universities in Kiel, this web site aims to facilitate them reaching their classes using public transportation. The user can search between courses, selecting origin stop, and receiving possible ways to there.

The web site applies 2 services responsible for crawling in two third party API of public transportation in Schleswig-Holstine, and course schedule of the universities. The information gathered from these services is used to navigate the users to the location of the selected course.

#### To run the project:
In the "DBTracker API Server" folder:
+ npm install
+ node.js index.js

In the "Crawler" folder: 
+ go run crawler.go

Install Redux DevTools and CORS extension on Chrome.

In server and client folder: 
+ npm start
