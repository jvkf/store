# Odin Store

Yet another TOP project, this time a mock store! But this one is actually a little bit different from the others I've been doing so far: instead of doing just the "basic exercise" proposed by TOP, I strived for implementing different new tools. I'll write some highlights below and attach my Excalidraw that I created when first started this.

## Stack 🔨

- React + Typescript
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Styled Components
- React Testing Library + Vitest

## Highlights

Well, the major highlight is that this was my first TS project. It felt really natural to implement it, although it required a bit of studying to implement more complex use cases of generics and integrating type definitions provided by some libraries. A big win was giving a chance to Zod (I was not planning to try it here) because I've leveraged several tools from it that made me feel really confident about the safety of my form validation.

Also related to this subject is my abstraction for the Input in the checkout page that reduced a lot of repetitive code on the form. By the way, using React Hook Form made the experience really smooth and I was able to add functionalities like real-time validation with visual tips for the user.

Another milestone was setting my mind to think about performance and caching, that's why I opted to try:

- TanStack Query alongside the native fetch from JS.
- Zustand.

Specially for this last one, it was an exceptional experience given the utilities provided by this library. The localStorage middleware was really handy and intuitive to implement. Also, using useShallow function I was able to control unnecessary re-renders of Cards in the front page (an update to the cart doesn't trigger new renders of every single product).

Lastly, I tried to pay attention to a11y and semantic HTML. For the Cart Modal I used the <dialog> element. For the form inputs, I also added aria-invalid to keep track of validation. Aria-live was used in the Cards of products to announce amount changes. Lastly, everything is keyboard navigable.

## Excalidraw

<img src="/public/excalidraw.png">
