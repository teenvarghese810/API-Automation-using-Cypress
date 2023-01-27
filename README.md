# API testing automated with Cypress

## Summary

This is an API test automation project using Cypress.

Cypress is a next generation front end testing tool built for the modern web .This enables you to write faster, easier and more reliable tests.
https://www.cypress.io/

The test API endpoint used for this project is /api/v1/NhsRegistration/RegisterPartialPatient and POST method is automated to validate against event IDs 200, 400, 401, 403 and 409.

## Setup

For environment setup, download and install
1. VSCode:  https://code.visualstudio.com/download
2. NPM:  https://www.npmjs.com/get-npm
3. NodeJS:  https://nodejs.org/en/download

In order to run this project follow these simple steps:

- Clone the project;
- In the root directory: run `npm install` command in order to download the general dependencies;
- (When creating a new project , run `npm init` to set up a new npm package project)
- Then download cypress using the `npm install cypress --save-dev` command;
- Integration folder contains Cypress tests
- Edit the "cypress.json" file to add baseURL for all the tests
- Run the tests using `npx cypress open` command



