# final-boiler-plate

This template should help get you started developing the final project running on Vue 3 with the composition API, Pinia as a state management tool, vue router, vite and lastly Supabase running on the backend.

This is meant as an advanced starter ready to plug in your supabase variables and run directly on a local server already connected to your Supabase instance. 

You are given some functions to see how the supabase ecosystem works with Vue and more specifically, pinia as a state management tool.

You can add any CSS framework of your liking like tailwindCSS, Bootstrap, MaterialUI or many of the cool libaries that exist in the web. 

## Important
This app is not setUp to be deployed to a production environment like vercel or netlify. 

Friday on August 19 we will look at how can we deploy this app to Vercels ecosystem.


## Project Setup

```sh
npm install
```

## Set Up your Environment Variables from Supabase located at the root folder of the project

```sh
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY 
```
#### Once you have added your environment variables, head to your .gitIgnore file located at the root folder and uncomment the .env file naming to avoid sharing any private access keys to your database

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Headway

#### Aug 18 2022
Fixed styles and added tailwind, styling and responsiveness will be easier.
thought about the palette too. It may change a bit, but already got the basics colors.

Now it is time to focus on Log in the app. Sign in and Sign up components plus its js and logic

#### Aug 19 2022
Sign in & sign up components done with basics styles which will change in a near future. 

#### Aug 22 2022
Created a modal window to create a new task.
fetched and displayed tasks from supabase. tasks are displayed instantly after created.

#### Aug 23 2022
implemented edit function with its styles. Now we have de U of C.R.U.D. still looking for the D =/