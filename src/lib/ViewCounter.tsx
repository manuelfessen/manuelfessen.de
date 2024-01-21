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

          // Inkrementieren des Zählers
          await setDoc(docRef, { count: increment(1) }, { merge: true });
          console.log("Document successfully updated");
        } else {
          // Erstellen eines neuen Dokuments, falls es nicht existiert
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

  //return <div>{count} Views</div> ;
};
export default ViewCounter;
