# react-use-navigate

Easy, flexible, and expressive hook based navigation in React.

## Features
- Tiny. Simple. Expressive.
- React framework agnostic (Next.js, Gatsby, React Router, Reach Router, etc.)
- Glob pattern matching support

## Motivation
Often times we want to navigate pages conditionally. This can easily turn into a bunch of if else statements and regex matching. Here's some code that redirects a logged out user to `/login` if they on a page under the `/app` directory. If they are logged in but not in the app, they are redirected to the app dashboard.

```
useEffect(() => {
  const inApp = new RegEx(`/${location.hostname}\/app\/([0-9A-Za-z]+\/?)+/`)
  if(!isLoggedIn && inApp) {
    return goTo('/login')
  }
  if(isLoggedIn && !inApp) {
    return goTo('/app/dashboard')
  }
}, [isLoggedIn])
```

Not complicated to follow (aside from the regex), but for something so easy to express in words, it sure doesn't look it. Using the `useNavigate()` hook, here's what the same code would look like:

```
const { replace } = useNavigate()

useEffect(() => {
  replace({
    goTo: '/login',
    when: !isLoggedIn,
    onPaths: ['/app/**'], // glob pattern matching goodness
    otherwiseGoTo: '/app/dashboard',
  })
}, [isLoggedIn])
```
This can almost be read as sentence, roughly translating to, "go to `/login` when user is not logged in while on any app directory. Otherwise, go to the app dashboard."

But what if we want to navigate a user when they *aren't* on a page in a particular directory? For example, maybe we have multiple apps like `/analytics` and `/editor`. Perhaps we want to just be general and say "send the user to login if they aren't on a marketing page". No problem, here's the same code as above with a slight modification:

```
const { replace } = useNavigate()

useEffect(() => {
  replace({
    goTo: '/login',
    when: !isLoggedIn,
    notOnPaths: ['/marketing/**'], // navigates when a user isn't on a matching page
  })
}, [isLoggedIn])
```

