# Lightency PowerChain: Nearcon 2023 Hackathon 

## Badges  

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)  


# Table of contents  
1. [Overview](#Overview)  
2. [Features](#Features) 
3. [Technical Architecture](#TArchitecture) 
4. [Getting started](#Gstarted)  
    1. [Prerequisites ](#Prerequisites)  

## Screenshots  

![App Screenshot](https://res.cloudinary.com/habibii/image/upload/v1698425934/9d4bc923-da38-4afa-8fa0-ff23b9dafa25_zspjqe.webp)

## Tech Stack  

**Client:** React, R**Client:** Angular, Chart.js 

**Server:** Node.js

## Overview 
![App Screenshot](https://res.cloudinary.com/habibii/image/upload/v1698425826/Components_kpjfcy.jpg)

Welcome to the Lightency Powerchain GitHub repository. Lightency Powerchain is a pioneering project dedicated to building an Energy Management System (EMS) with an innovative matching and pricing algorithm. Our objective is to facilitate seamless energy trading through a decentralized Peer-to-Peer Energy Marketplace. Additionally, we are introducing a cutting-edge Renewable Energy Certificate (REC) platform, all developed on the secure and scalable NEAR Protocol blockchain.

## System Workflow 
![App Screenshot](https://res.cloudinary.com/habibii/image/upload/v1698425826/Components_1_jjkcvj.jpg)

The Energy Management System (EMS) is integral to the Lightency Powerchain, acting as the primary data collector from hardware components such as PV solar panels, batteries, and inverters. Once this foundational data is aggregated, the Lightency micro-service is activated. This service is responsible for executing the innovative matching and pricing process, enabling seamless peer-to-peer energy trading. After the matching and pricing phase, transactions are promptly executed and then securely recorded on the NEAR Protocol blockchain. This ensures that every energy trade is not only efficient but also transparent and immutable .

## Features  
![App Screenshot](https://res.cloudinary.com/habibii/image/upload/v1698425826/Components_2_dzmc6e.jpg)


- **Blockchain:** Utilizing NEAR Protocol for decentralized and secure transactions.
other without intermediaries.
- **Frontend:** A user-friendly interface developed using Angular, allowing users to interact with the PowerChain platform.
- **Backend:** A Node.js server interfacing between the frontend and the blockchain, handling business logic and data processing.



## Run Locally  

Clone the project  

~~~bash  
    git clone https://github.com/Lightency-io/NearCon-2023.git
~~~

Navigate to the frontend directory and install dependencies: 

~~~bash  
    cd energy_management_system/Front
    npm install
~~~

Start the frontend server:

~~~bash  
    ng serve -o -c openems-backend-dev
~~~

In a new terminal, navigate to the backend directory and install dependencies:

~~~bash  
    cd energy_management_system/Backend
    npm install
~~~

Start the backend server:

~~~bash  
    node near_matching.js
~~~

## Environment Variables  

To run this project, you will need to add the following environment variables to your .env file  
`ACCOUNT_ID`  
`KEY_PATH` 
`INFLUXDB_URL`
`INFLUXDB_TOKEN`
`INFLUXDB_ORG`
`MONGODB_URI`

## License  

[MIT](https://choosealicense.com/licenses/mit/)


