---
author: Manuel Fessen
publishDate: 2024-01-14 21:58:00
title: Real-Time Blog Post Views With Astro and Firebase
description: Discover how to leverage Firebase for real-time view tracking on your blog – without spending a penny.
tags: 
- blog
- firebase
- web development
---

## Table of Contents

## Introduction
 
One metric for a website's success is the amount of traffic it receives. 
A high volume of views on articles signals the subjects that resonate most profoundly with your audience. This insight is pivotal in steering the direction of future content.

Traditionally, tracking view counts is executed via analytics tools, such as Google Analytics. Yet, the burgeoning use of ad-blocking browser extensions means these figures can be skewed, often underestimated by approximately 10% - a scenario particularly prevalent if your audience predominantly comprises tech aficionados. Imagine, though, if we could elevate the precision, enhance performance, and simultaneously champion user privacy?

This discourse will unveil the method to display real-time view counts on individual blog posts utilizing Firebase. 

## 1. Setting the Stage: Firebase Project

### Getting Started with Firebase
First things first, head over to the [Firebase website](https://firebase.google.com/) and log in with your Google account. 

### Crafting Your New Project
Click on "Add Project" and follow the prompts. Add an app. 

## 2. Integrating Firebase with Your Astro Project
In your Astro project, open up the terminal and run `npm install firebase`. 

### Configuring Firebase
Now, let's get down to business. Create a `firebaseConfig.js` file and add in your Firebase project's details like this. You can find the your exact configuration in your project settings after creating a new app:

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration goes here
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  // ...rest of your config
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
```

## 3. The Tracking Logic

### Setting Up Your Database
In Firestore, create a collection specifically for your blog articles. Each post will be a document with its own view count.

### The View Counter
To Check the live views create a new `ViewCounter.tsx` component. This is my current one:

```javascript
import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { doc, getDoc, setDoc, onSnapshot, increment } from 'firebase/firestore';
import db from './firebaseConfig';

const ViewCounter: React.FC<{ slug: string }> = ({ slug }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const docRef = doc(db, 'views', slug);
    console.log("Slug in ViewCounter:", slug);

    const updateCount = async () => {
      try {
        // Abrufen des aktuellen Dokuments
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());

          await setDoc(docRef, { count: increment(1) }, { merge: true });
          console.log("Document successfully updated");
        } else {
          await setDoc(docRef, { count: 1 });
          console.log("Document created and count set to 1");
        }
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    };

    updateCount();

    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setCount(docSnapshot.data().count);
      }
    }, error => console.error("Error fetching document: ", error));

    return () => unsubscribe();
  }, [slug]);

  return <div>{count} Views</div> ;
};
export default ViewCounter;
```

## 4. Displaying the View Count
How about showing off those view counts in real-time? Use this setup in your Astro component:

```javascript
import ViewCounter from "@lib/ViewCounter";
const slug = /* your article slug */; 

<ViewCounter slug={slug} client:load />
```

## 5. Astro: Environment Variable Configuration
If you're using Astro, remember to prefix your environment variables with `PUBLIC_` for frontend access, when using environment Variables. 

## 6. Handling High Traffic
For sites experiencing high traffic, it is necessary to transition from the Spark plan (free) to the Blaze plan (paid). The Spark plan limits to 100 simultaneous connections, whereas the Blaze plan accommodates up to 200k.

That's all there is to it! Happy blogging!