## Setup Steps:

1. Get NodeJS from: https://nodejs.org/en/download
2. In Finder or File Explorer, right click (or ctrl+click) on the folder where you want the source code folder to go.
   - On Mac: In the right click menu click "Services" > "New Terminal at Folder"
   - On Windows: Hold Shift while you Right Click on the Folder.
3. Get this source code by typing `git clone https://github.com/myron-liu/snakes-and-apples.git` into your terminal/cmd prompt (then press return)
   - If it say something like "Git: command not found" you might need to get GIT from https://git-scm.com/downloads or the XCode Command Line tools on Mac.
4. Type `cd ./snakes-and-apples` (then press return) to get into the snakes-and-apples folder.
5. Type `npm install` (then press return) in the terminal to install dependancies (React & other JS libraries)

## Running & playing the game in development:

1. In Finder or File Explorer, right click (ctl+click) on the "snakes-and-apples" folder.
   - On Mac: In the right click menu click "Services" > "New Terminal at Folder"
   - On Windows: Hold Shift while you Right Click on the Folder.
2. Type `npm run start` in the terminal and it should build the project with create-react-app, and start a development server (so you can preview the project at a url like: http://localhost:xxxx - The exact url it will show in your terminal).

## How to deploy the game to Github Pages:

1. Open the folder in terminal or cmd prompt like you would to run the game.
2. Type `npm run build` in the terminal and it should build the project into a folder called build with the index.html.
3. Type `npm run push-to-gh-pages` and it will upload the build folder to a git branch called "gh-pages" which github automatically serves as gh-pages.
    1. If it says something like "Git not clean":
         1. Commit any changes you have to git by running `git add -A` and then `git commit -m "Put a short description of any changes you made"`
         2. Try running `npm run push-to-gh-pages` again.
         3. Ask Myron about push access to the repository
4. After 5-10 minutes, the pages url can be found on the "pages" setting for the repository on github.com.
   1. The first time around you might have to select the "gh-pages" branch and click publish on the github repo "pages" settings.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
