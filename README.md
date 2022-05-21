# Polititrack

By Ari Greenberg (aripg2)

## Abstract

### Project Purpose

Politrack is designed to improve public knowledge and involvement by providing ordinary citizens with a convenient way to recieve updates on bills that matter to them at different levels of jursidiction.

### Project Motivation

Many people, including myself, do not have a firm understanding of the day to day schedule of our legislators and do not know what types of legislation are being discussed, unless the bill is significant enough to be in the mainstream news. Politrack would allow users to select certain categories of interest and track bills off those topics in their state and federal jurisdictions (based on location or search). It would also allow the user to find and contact their legislators (based on location or search) to ask them to sponsor/not sponsor specific bills. It would also the user to share the bill on social media and write a status about it.

## Technical Specification

- Platform: Cross-platform app (React Native)
- Programming Languages: JavaScript
- Stylistic Conventions: Airbnb JavaScript Style Guide
- API: https://docs.openstates.org/en/latest/api/v3, Geolocation API, ReactJSFacebook
- SDK: Java/Android Studio SDK
- IDE: Visual Studio Code
- Tools/Interfaces: Mobile devices
- Target Audience: Broad-range audience

## Functional Specification

### Features

- It allows the user to find jurisdictions by search
- It allows the user to find their representatives by location
- It allows the user to track bills brought up in their state and federal jurisdictions based on a certain list of "favorite" topics
- It allows the user to contact their representative to support/not support a bill.
- It allows the user to share the bill on social media and write a status about it

### Scope of the project

- Limitations include the inability to use an iOS SDK because I'm on a Windows machine.
- Assumptions include the categories provided by the API must be accurate and bills must be categorized correctly on their end.

## Brief Timeline

- Week 1: Create mockups of home page, my jurisdictions page, jurisdiction search page, and profile page. Connect to openstates API to add jurisdictions by location. Store the user's jurisdictions in their profile and in their device storage. Also store their other profile information in their device storage.
- Week 2: Create my bills page, favorite bill category selection page, bill search page, and individual bill detail viewing page. Use the API to get the most recent bills in the user's favorite categories and store their favorite bill categories and bills in their profile and in their device storage.
- Week 3: Create a mockup of legislator search page, my legislators page, and settings page. Allow user to search for their legislators and add them to My Legislators. Store their legislators in the device storage.
- Week 4: Create a social media sharing page (Facebook). Implement settings and notification features.

## Detailed Timeline

### Week 1

|Category|Implemented?|
|-----|-----|
| Mockup of my jurisdictions page, jurisdictions search page, jurisdiction detail page, and profile page                    | Yes |
| Implemented the design of the my jurisdictions page, legsilatures search page, jurisdiction details page and profile page | Yes |
| Successfully uses the Openstates API with interfaces set up to handle results.                                            |     Yes |  
| Implemented jurisdiction search with dynamic page setup and manual selection options                                      |       Yes |
| Profile data, including the user's jurisdiction is saved to their device                                                  |   Yes |        

### Week 2

| Category | Implemented? |
| ----- | ----- |
| Mockup of my bills page, favorite bill category selection page, bill search page, and individual bill detail viewing page. |Yes|
| Implemented design of my bills page, favorite bill category selection page, bill search page, and individual bill detail viewing page, and allows users to navigate between these pages and all other pages. |Yes| 
| Allows the user to add favorite bill categories to their jurisdictions and successfully gets the most recent bills in those categories using the Openstates API. This list is displayed on the favorite bill categories page. There is a clean separation between model and view components. |Yes|
| Users can add bills from the favorite bills page or the bill search to a list of bills to be tracked. These tracked bills will be displayed on my bills page.|Yes| 

### Week 3

| Category | Implemented |                                                                                              
|-----|-----|
| Mockup of legislator search page, my legislators page, and settings page | Yes |
| Implemented the design of the legislator search page, my legislators page, and settings page in React. Connect these pages to all of the other pages and allows users to navigate in between them. Note that the settings page does not have to be functioning this week. Link to "My legislators" page must appear on profile page, and legislators should be stored on device. | Yes | 
| Allows the user to search for their legislator using Geolocation API. Results must be stored in an appropriate interface with clean separation of model and view. | Yes | 
| Allows the user to send the message via their native email client | Yes | 


### Week 4

|Category|Implemented?|
|-----|-----|
| Mockup of Update Account Info page| Yes | 
| Implemented the Update Account Info page and ensure the user is able to update their account information and changes are reflected in the database | Yes | 
| User can share bills via text, Facebook etc via native share | Yes | 
| Implemented Settings page and user can set notification and bill update refresh settings, which must call the API for bill updates | Yes | 

### Upcoming Features

- Finish detail pages for the main content types.
