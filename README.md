# Avatar: The Last API
A REST API to retreive information on the TV shows [Avatar: The Last Airbender](https://en.wikipedia.org/wiki/Avatar:_The_Last_Airbender) and [Avatar: The Legend of Korra](https://en.wikipedia.org/wiki/The_Legend_of_Korra).  Users can get information on characters, episodes, seasons as well quotes.

* [Documentation Page](https://avatar-the-last-api.herokuapp.com/)

## Features

#### <ins>Characters</ins>
Information available:
* Name
* Age (if known)
* Elements they can bend
* Links to images of them at different ages
Can sort by:
* Elements they can bend

Example:
![Character request](https://github.com/CB721/avatar-client/blob/master/src/assets/images/character-example.png?raw=true)

#### <ins>Elements</ins>
Information available:
* Type

Example:
![Element request](https://github.com/CB721/avatar-client/blob/master/src/assets/images/element-example.png?raw=true)

#### <ins>Episodes</ins>
Information available:
* Chapter Title
* Title
* Season

Example:
![Episode request](https://github.com/CB721/avatar-client/blob/master/src/assets/images/episode-example.png?raw=true)

#### <ins>Quotes</ins>
* Randomly selected from over 500 available quotes

Information available:
* Content (the quote itself)
* Character that said it
* Episode appeared in
Can sort by:
* Character
* Episode
* Season

Example:
![Quote request](https://github.com/CB721/avatar-client/blob/master/src/assets/images/quote-example.png?raw=true)

#### <ins>Seasons</ins>
Information available:
* Title
* Number of episodes

Example:
![Season request](https://github.com/CB721/avatar-client/blob/master/src/assets/images/season-example.png?raw=true)

#### Documentation Page
![Client-side documentation](https://github.com/CB721/avatar-client/blob/master/src/assets/images/v1-screenshot.png?raw=true)

##### Repositories
* [Documentation](https://github.com/CB721/avatar-client)
* [API](https://github.com/CB721/avatar-api)

### Technologies Used
#### Front-end
    1) Vue - UI/UX
    2) Axios - API requests
    3) Vue Rellax - Parallax effect on arrow
    4) Pixelmator - Create custom svgs for background
#### Back-end
    1) Express - Server and endpoints
    2) PostgreSQL - Store and query data
    3) Memory Cache - Save request to cache for faster responses
    4) CORS - Enable requests to API from any URL

## Author
* Clint Brodar

### License
Copyright © 2020 Clint Brodar All Rights Reserved