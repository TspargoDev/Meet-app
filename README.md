# Meet-app Project

Welcome to the Meet App! This is a progressive web app that leverages serverless architecture and offline functionality in order for its users to search for events by city at any time-even offline. Using Serverless Architecture and PWA technologies means I'm building an application that is fast, reliably scalable, and available on any device.

# Key Features

- Filter Events by City: Users can search events by city with helpful suggestions.
- Show/Hide Event Details: The details of the events have an expand and collapse toggle.
- Specify Number of Events: A user can select how many events they would like to view.
- Offline Functionality: Events that have been cached are displayed when there is no internet connection.
- Home Screen Shortcut: Can be installed directly onto a users device.
- Data Visualization: Charts display how often events take place at a location and within which genres.

# Project Approach

- React & TDD: The application was built in React and utilizes Test-Driven Development.
- Serverless Backend: Utilize AWS Lambda functions instead of a regular server.
- Google Calendar API: pulling events securely using OAuth2.
- Cross-platform compatible: Optimised for every major browser and device.
- Compliance to Progressive Web App: Incl. Service worker to allow for working offline.
- App Performance Monitoring: Monitoring app performance by using appropriate tools.

# Learning objectives

With this project, I will work with serverless development, PWA standards, TDD, and data visualization. The Meet App is guiding me through how to develop a maintainable, scalable application that is user-friendly and future-ready.

This project has been an opportunity to practically get into modern web development by creating a real-world application while learning critical skills.

# Features User Stories

- Feature 2: Show/Hide Event Details

As a user,
I should be able to expand an event to see details
So that I can get more information about the event without leaving the main list.

As a user,
I should be able to collapse an event to hide details
So that I can minimize the amount of information displayed when it’s no longer needed.

- Feature 3: Specify Number of Events

As a user,
I should be able to view a default of 32 events if I don’t specify a number
So that I’m not overwhelmed by too many events but still see enough options.

As a user,
I should be able to change the number of events displayed
So that I can control how many events I want to browse at a time.

- Feature 4: Use the App When Offline

As a user,
I should be able to see cached data when there’s no internet connection
So that I can still access previously viewed events offline.

As a user,
I should see an error message if I try to change search settings without internet
So that I understand why my search results are not updating.

- Feature 5: Add an App Shortcut to the Home Screen

As a user,
I should be able to install the meet app as a shortcut on my device’s home screen
So that I can access it quickly without navigating through a browser.

- Feature 6: Display Charts Visualizing Event Details

As a user,
I should be able to see a chart showing the number of upcoming events in each city
So that I can quickly compare event availability across different cities.
