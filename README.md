# Aidos UI

This is a React design system library with many utilities and zero dependencies. It was built with the aim to be simple, lightweight and beautiful.

Documentation can be found [here](https://aidos-ui.vercel.app);

## Why?

Over the years I have always have many side projects, and many of them needed a UI. Back in 2019 I thought, maybe I could make my own design system, and so I did. Since then it has changed quite a bit and it is now something I am more or less proud of. It has everything I have ever needed and it is done in the way I find simplest and least convoluted. This is all ultimately very subjective, and that is fine, because the first design decision of this library was that it would be extremely opinionated. With that said, although this library does not lend it self to modification, it does tend to be fairly easy to extend and compose with it. I am now making this documentation with the vague weak conviction that someone out there may benefit from it.

---

## Who is this for?

I initially only planned to use this myself so its features and design have so far reflected the things I have been working on. However I keep extending this library, and I think that with more users it may be possible to add more ideas and usecases so that this becomes a really complete system.

---

## Design philosophy

1. <b>Opinionated</b>

First and foremost, this library is extremely opinionated. This is so because I believe HTML is too low level and error prone, CSS defaults are not beautiful enough, and the web in general too big a toolkit to make simple things work in the way you expect. So, for the sake of simplicity, this library imposes opinions at every step. These opinions will not fit everyone's needs, and that is a sacrifice that can be made for the sake of simplicity.

3. <b>Modular</b>

There is no limit to the number of features and components that can be added, as long as every piece remains modular, or at most, composed out of its simpler parts. This is important to keep bundle sizes under control and also to keep the API sane. Modular components imply abstractions that do not depend on each other. This helps keep overall complexity low, so that it is simpler to extend the system.

3. <b>Accessible</b>

By design every component should be accessible, paying attention to keyboard navigation, focusable elements, adding helpful aria properties and following wcag specificaitons as faithfully as possible.

4. <b>Dependency free</b>

As few dependencies as possible, to keep things light and under control. The only dependency right now is [iconify](https://github.com/iconify/iconify) because I am not able to re-create all icons myself.

---

## Installation

This library can be installed through npm

```bash
npm install --save aidos-ui
```

---

## How to use

- Import components from the `dist` folder (e.g. `import {Button} from 'aidos-ui/dist`)
- The `Providers` component somewhere in the application.
- If the application is running in nextjs, the `JSServerStyles` component has to be used in the \_document `<Head />`, this enables jss to work also server side.

---
