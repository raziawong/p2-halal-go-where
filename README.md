# Muslim Go Where

Access live demo site [here](https://muslimgowhere.netlify.app/)

<figure>
    <img src="/readme/device_mockups.png" height="450" alt="Entity Relationship Diagram">
</figure>

## Background

It is estimated that Muslims make up about 24.7% of the world's population. The Middle East-North Africa region has the highest percentage of Muslims countries[^1], while 60% of Muslims reside in Asia. These regions are more than likely to have culture, communities, food, and amenities build based on the religion, however they are often not well recorded, not gathered in databases locally and may not even be searchable. While for the rest of the world with Muslims minorities, these information are even more unreachable unless you are a local.

## Project Overview

For Muslim travellers and tourists, their main concerns mainly will be whether there are halal food, prayer spaces, and nearby mosques in a certain area. With the number of Muslims around the world and growing accessibility to the internet, it will be beneficial to allow them to share and contribute these information centrally.

---

## The Five Planes of UI/UX

### Strategy

#### Organization's Goals
As a muslim who likes to travel around myself, I always find myself spending a lot of time researching places of interests for muslim friendly travel offline by asking people and visiting various sites online. So in a attempt to overcome this, a centralized informational site will be beneficial. 

#### Users' Goals
Muslims tourism is a growing industry and usually the older generation may go on a tour with a travel agency in order to minimize the time needed for their own research. However, the younger generation and some others either with a tighter budget or prefer small groups will travel by themselves, so they will need help to ease their reseach.

1. **Organisation**
   - Objective: To have a centralized space to contribute and search for topics around Muslim travels
2. **Users: Muslim Travellers**
   - Objective: To be able to research quickly about topics around Muslim friendly locations 
   - Needs:
      - To search about food, mosques or even attractions in a city
      - To be able to contribute after their travels
   - Demographics and Characteristics:
       - Young to working adults
       - Enthusiastic about travelling
       - Very used to browsing internet
   - Pain point:
       - Need to find out about a location quickly for Muslim friendly amenities
       - Need to find out about a location quickly for halal food


User Stories | Acceptance Criteria(s)
------------ | -------------
As a muslim tourist, I am concerned about whether there is halal food in a location | Articles should be searchable by topic on food in a location
As a muslim tourist, I am concerned about praying areas in a location that may not necessary have a mosque | Articles should be searchable by topic on praying spaces and its amenities in a location
As a muslim tourist, I am interested in seeing architecture inspired by Muslim civilizations | Articles should be searchable by topic on the type of attractions
As a muslim tourist, I am interested in visiting mosque in the local area | Articles should be searchable by topic on mosques in a location

### Scope

### Database
<figure>
    <img src="/readme/erd.png" height="450" alt="Entity Relationship Diagram">
</figure>

ERD is drawn up to demonstrate the different relationship between enitities for the site before proceeding to model the database in MongoDB.

A backend server will thus be necessary in order to allow communication between the site and MongoDB. As such an Express server have been set up and deployed to [Heroku](https://www.heroku.com/). API endpoints are accessible via the base at https://muslim-go-where-api.herokuapp.com/.

#### Content
Content will be crowd sourced from public, thus presentation of data contributed to the site is essential. A landing page is also included for branding purposes and allows site visitors to have a quick glance and understanding of the site.

#### Functional
- Search function against attributes such as Title, Description, Details, and Tags
- Filter function of all articles posted on its Country, City, Categories and/or Sub-categories
- Create new article function
- Edit and Delete function on each article
- Rating function on each article
- Commenting function on each article
- Add and Remove function on a article to collection
- In order to exert control, registration/verification on email is included for actions performed on articles and collections

#### Non-functional
- Mobile responsiveness: forms and search results display should not obstruct users' experience in the site
- Accessibility: colors used are safe for colorblind, interactive elements have aria-labels for assistive technology 
- Performance: database may get larger and slower to load overtime, a loading screen is included to help bridge the gap between site and data loading

### Structure
<figure>
    <img src="/readme/sitemap.png" height="450" alt="Information Architecture and Design">
</figure>

### Skeleton
Initial prototyping can be found at the Miro board [here](https://miro.com/app/board/uXjVODlMLfM=/?share_link_id=8111450614)

The prototype is done with a mobile first approached and throughout the project it have been re-visited several times while working on the project and styling across devices. 

### Surface

In order to complement various design and layouts intended for the site, [MUI](https://mui.com/) have been chosen for its design system. Also because MUI is a set of React UI tools that are component based which will help to ease development time spent.

#### Color Scheme

<figure>
    <img src="/readme/color_scheme.png" height="450" alt="Color Scheme">
</figure>

- As green and gold are often associated with Islam, they have been chosen specifically for the site
- The rest of the colors are then randomly generated via [Coolors](https://coolors.co/)
- Brighter colors are chosen to be used emphasized content
- Darker colors are chosen to be used for text, shadows and for overlaying images
- Lighter colors are chosen to be used as background colors, and to be used as contrast text colors

#### Font
_Reem Kufi_ have been chosen as the font for headings, titles, subtitles, etc, because it was designed with the Arabic calligraphy in mind and then combined with Latin component later on. With the Arabic calligraphy system as its backbone, the font will breed familiarity with its intended users.

_Raleway_ is used for all body text meant for reading, to server as a contrast to the former font with its thinner weight and lining.

---

## Testing
Test Cases can be found [here](/readme/test_cases.xlsx)

---

## Dependencies and Sources

### Backend
1. [Express](https://expressjs.com/) as the framework for routing to project's endpoints 
2. [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/current/) for accessing database on MongoDB using their API
3. [cors](https://www.npmjs.com/package/cors) as middleware to enable CORS
4. [dotenv](https://www.npmjs.com/package/dotenv) to separate code from envrionment variables

### Frontend
1. [React](https://reactjs.org/) as the frontend framework
2. [React Router DOM](https://reactrouter.com/docs/en/v6/getting-started/overview) for routing paths in React app
3. [Axios](https://axios-http.com/) as HTTP client to Express server endpoints
4. [MUI](https://mui.com/material-ui/getting-started/installation/) served as base styles for the React app
5. [MUI RTE](https://github.com/niuware/mui-rte) is used as rich text editor in form submission
6. [Draft JS](https://draftjs.org/) is used to convert the RTE Editor State
7. [Markdown Draft JS](https://draftjs.org/) is used to convert between draftjs to markdown format to store to database
8. [React Markdown](https://remarkjs.github.io/react-markdown/) is used to convert markdown for display
9. [React MUI Carousel](https://github.com/Learus/react-material-ui-carousel) is used as carousel component
10. [React Moment](https://github.com/headzoo/react-moment) is used to convert datetime to preferable format

### Platforms and Software
1. [Git](https://git-scm.com/) for version control
2. [GitHub](http://github.com) for the repository
3. [Visual Studio Code](https://code.visualstudio.com/) for code editing
4. [Heroku](https://www.heroku.com/) for deployment of Express server
5. [Netlify](https://www.netlify.com/) for deployment of React app

### Logos and Images
1. Logo used is a composition of vectors created by and downloaded from [Freepik](https://www.freepik.com/vectors/logo-pack)
2. Homepage banner is a photo by [Victoriano Izquierdo](https://unsplash.com/photos/HoevDVvxInw) downloaded from [Unsplash](https://unsplash.com)
3. Attractions banner is a photo by [Mohamed Imran](https://www.pexels.com/photo/a-white-concrete-building-at-night-5946376/) downloaded from [Pexels](https://www.pexels.com/)
4. Mosque banner is a photo by [Konevi](https://www.pexels.com/photo/photography-of-brown-concrete-dome-building-2159549/) downloaded from [Pexels](https://www.pexels.com/)
5. Food banner is a photo by [Damia Mustafa](https://unsplash.com/photos/zbE7u3TdL2o) downloaded from [Unsplash](https://unsplash.com)
6. Praying Spaces banner is a photo by [RODNAE Productions](https://www.pexels.com/photo/person-kneeling-with-face-on-ground-7249372/) downloaded from [Pexels](https://www.pexels.com/)
7. Default photo for Attraction category is a photo by [Milad Alizadeh](https://unsplash.com/photos/ghydVxL2x7w) downloaded from [Unsplash](https://unsplash.com)
8. Default photo for Mosque category is a photo by [said alamri](https://unsplash.com/photos/cIUozi9BM34) downloaded from [Unsplash](https://unsplash.com)
9. Default photo for Food category is a photo from [Ella Olsson](https://unsplash.com/photos/KPDbRyFOTnE) downloaded from [Unsplash](https://unsplash.com)
10. Default photo for Praying Spaces category is a photo by [Ashkan Forouzani](https://unsplash.com/photos/LaCell9GykQ) downloaded from [Unsplash](https://unsplash.com)
   
### Other Attributions
1. [Paul Chor](https://github.com/kunxin-chor) for all his guidance and using his tutorials as references for the codes 
2. [Coolors](https://coolors.co/) for matching the green and mecca gold selected
3. [DataHub](https://datahub.io/core/country-list) for the data used in MongoDB's Countries population
4. [Johan Dufour](https://github.com/lutangar/cities.json) for the data used in MongoDB's Countries embedded Cities population

---

## Deployment

### Build
Backend is build using Node.js and Express. Frontend have been created with create-react-app which includes a webpack that builds the files for production environment.

### Backend Deployment
Express server is deployed using [Heroku](https://www.heroku.com/).

Prerequisites:
- Heroku is connected and authorized to Github account under "Deploy"
- Correct repository is selected under "App connected to Github"
- Automatic deploys have been enabled for continuous deployment

Steps to publish:
1. After connecting to repository, ensure edits were added, commited, and pushed to Github repository
2. Heroku will perform automatic deployments upon detecting changes

### Frontend Deployment
[![Netlify Status](https://api.netlify.com/api/v1/badges/24d0b156-5ce6-440f-832d-f37cf429d50c/deploy-status)](https://app.netlify.com/sites/muslimgowhere/deploys)

The React app is hosted using [Netlify](https://www.netlify.com/).

Prerequisites:
- Any edits were added, commited, and pushed to Github repository
- Netlify is connected and authorized to Github account
- Netlify is connected to GitHub repository via "New site from Git"
- "GitHub"  has been selected for continuous deployment

Steps to publish[^2]:
1. After connecting to repository, ensure edits were added, commited, and pushed to Github repository
2. Netlify will start to build and perform automatic deployments upon detecting changes

---

[^1]: Statistics are taken from [here](https://www.pewresearch.org/religion/2009/10/07/mapping-the-global-muslim-population/)
