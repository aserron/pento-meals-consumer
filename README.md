# Pento Technical Challenge

> Original CRA readme: [Link](./docs/README.md)

**Contents**  
<!-- TOC -->
* [Pento Technical Challenge](#pento-technical-challenge)
  * [About the company and application.](#about-the-company-and-application-)
    * [Recipe App List View](#recipe-app-list-view)
      * [Description](#description)
    * [The app must have:](#the-app-must-have)
      * [Not mandatory, but it would be nice if the app had:](#not-mandatory-but-it-would-be-nice-if-the-app-had)
  * [Project Outcome: V1](#project-outcome-v1)
  * [About the new V2 solution...](#about-the-new-v2-solution)
    * [Important: Senior level code will be used.](#important-senior-level-code-will-be-used)
      * [Features NOT included.](#features-not-included)
<!-- TOC -->

---
## Introduction
Code solution for Pento's Sse. Challenged.
Features custom hooks, modern react, good practices, clean code, other sorts of good manners.

---
## About the new V2 solution...
After haven't received any feedback on the submission I felts I did not put enough love on this (may be I was on point). 
So just for academic, research and craftsmanship purposes I will redo the challenge following a higher bar. 
We pump up the requirements in terms of how to execute.


I'm going to dismiss the call for simplicity and the highlight in creativity.  

  From the definition document [(link)](./docs/pento-task-definition.md#disclaimers)

    
  > #### Disclaimers  
  > ##### Limited Time Expectation
  > We understand that this assignment is being completed under a limited timeframe.  
  > Therefore, we do not expect exhaustive, fully polished deliverables. 
  > 
  > The primary aim is to assess your approach, creativity, and fundamental skills.
  > 
  > Quality and thoughtfulness are preferred over quantity and extensive detail. 
  >
  > ##### External Tools Usage
  > In Pento we encourage the usage of tools (Stack Overflow, Copilot, ChatGPT, etc.)  to enhance performance. However for this assignment it is much preferred to primarily rely on your intrinsic knowledge and creativity and showcase your individual capabilities.
  > 
  > In case you do use code completely from any of these tools, 
  > leave a comment on which tools were used where.   
  
  *   [Read the full task definition from pento. (link)](./docs/pento-task-definition.md)

### My Personal Notes on the task definition.

Well, it's a REST consumer, paged, with hooks, search, filter, ui framework...

For a Sse. React level coder in 5 hs, requirements constraint... 

What would the looking for?
Animated UI, mobile first, full cross-platform, aria ready, internalization,... alexa integration?

Implementation of React.Query 



And why they wanted the auto-reload on a service that doesn't update the data?
Reloading and sub-component updating fits in some time sensible data feed, finance values, sensors, global debt.

Aside from reloading the content while preserving the page position and filtering 




### Workflow:
- requirements as a Stories or Feature task from JIRA.
- features branch with PR, Merge
- documenting each step, feature implementation
   
  note: 

    Also I will do a less personal useMeals hook, I feel they didn't like how I pack 
    the paging logic inside the hook.

### Updated Difficulty: Senior level code will be used.
Moving on ahead of the challenge we will use some 
more advanced practices.

#### Senior Level Extra Features.
  - Full Chakra UI implementation. 
  - State And Context
    - useContext for providing data.
    - moving out the consumer out into a context provider.
  - paging logic into a usePager hook.
  - auto-reload switch. 
  - reset controls switch.

- performance / quality optimization
  - Improved decoupling, cohesion, reusable code.  
  - Full modular design, sep. of concerns.
  - Advanced file layout, code organization.
  - EsLint TS complain.
  - TS, JS code quality observed.

#### Experimental (would be nice)
  - Cero Unneeded Re-Render.
  - Minimal component interdependency.
  - Server Side Ready code.
  - Fully decoupled look and feel.
  - Fully decoupled layout.

#### Features NOT included.
- Async side effect / libraries won't be used such a thunks.

Lastly:
- I will invite the guys to the repo, eventually they will



---

## About the company and application. 

 

I found pento application at LinkedIn without any previous knowledge on the company.
It seems to be another staff augmentation biz broking devs.

The entry was for a Sse. Full Stack.

The Chief technology officer takes on the reviewer job of your task. 
In general, that's great but here after any feedback on the task, 
In the end, after receiving a generic "not moving" email, 
its difficult avoiding feeling it was a waste of time.  





---

### Recipe App List View
> Home Assignment | Ssr Full-Stack Developer @ Pento 

#### Description
Your task is to create the list view of a recipe app in React, given a mockup and a tech specification. The app uses the The Meal DB API to retrieve the data.

### Technical Specification

#### The app must have:
  - A search bar.    
  - A list of meals that resulted from the search showing fields id, name, area, category.
  - A field to filter by category.
  - A custom hook useMeals to fetch data from the API.

#### Not mandatory, but it would be nice if the app had:
  -  Typescript.
  -  Auto refetching built from scratch on the useMeals hook, to re-validate data every 10 seconds (no libraries allowed).
  -  A field to filter by area.
  -  Pagination.

## Project Outcome: V1
Originally submitted V1 complains with all required and optional requiremnts.  
It also achieved the 5h development time limit.

> - outcome : Not moving.   
> - feedback: Not feedback provided. 
> 
