# Agency Downloads Manager App

This application allows MSA staff to manage Agency Downloads Selections for agency
locations. The front-end is in React deployed to AWS CloudFront+S3, while the backend
is AWS Serverless (API Gateway, Lambda functions in Python, DynamoDB).

# Setup and Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). So all CRA related processes apply as usual.

Edit `public/config.json` before you start.

In the project directory, you can run:

```
npm install
npm run build
npm start
```

And open http://localhost:3000/ in a browser to test.

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).