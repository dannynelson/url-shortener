# URL Shortner

A URL shortener app, similar to bitly or TinyURL.

## Usage

Make sure you have [docker installed](https://docs.docker.com/get-docker/).

Build and start the server, then navigate to http://localhost:8080:

```
make server
```

Alternatively, run a dev server with hot reloading:

```
make dev
```

Run the tests:

```
make test
```

## Application Requirements

- When navigating to the root path (e.g. http://localhost:8080/) of the app in a browser a user should be presented with a form that allows them to paste in a (presumably long) URL (e.g. https://www.google.com/search?q=url+shortener&oq=google+u&aqs=chrome.0.69i59j69i60l3j0j69i57.1069j0j7&sourceid=chrome&ie=UTF-8).
- When a user submits the form they should be presented with a simplified URL of the form http://localhost:8080/{slug} (e.g. http://localhost:8080/h40Xg2). The format and method of generation of the slug is up to your discretion.
- When a user navigates to a shortened URL that they have been provided by the app (e.g. http://localhost:8080/h40Xg2) they should be redirected to the original URL that yielded that short URL (e.g [https://www.google.com/search?q=url+shortener&oq=google+u&aqs=chrome.0.69i59j69i60l3j0j69i57.1069j0j7&sourceid=chrome&ie=UTF-8](https://www.google.com/search?q=url+shortener&oq=google+u&aqs=chrome.0.69i59j69i60l3j0j69i57.1069j0j7&sourceid=chrome&ie=UTF-8)).
- Only allow valid URLs (e.g., start with http(s)://{domain}/ )\*\*

## Tech Stack

- React / Next.js
- Redis
- Typescript
- Jest unit testing
- Puppeteer e2e testing
- Prettier
- ESLint
- Docker
