import { initializeApp } from "firebase/app";
import { doc, getDoc, setDoc, onSnapshot, increment } from 'firebase/firestore';
import db from './firebaseConfig';

function ViewCounter({ slug }) {
  let count = 0;
  const countElement = document.createElement('div');

  function updateCountDisplay() {
    countElement.textContent = `${count} Views`;
  }

  function initializeViewCounter() {
    const docRef = doc(db, 'views', slug);
    console.log("Slug in ViewCounter:", slug);

    async function updateCount() {
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
    }

    updateCount();

    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        count = docSnapshot.data().count;
        updateCountDisplay();
      }
    }, error => console.error("Error fetching document: ", error));

    // Rückgabefunktion für das Aufräumen
    return unsubscribe;
  }

  // Initialisierung
  const unsubscribe = initializeViewCounter();

  // Aufräumfunktion
  function cleanup() {
    unsubscribe();
  }

  return {
    element: countElement,
    cleanup: cleanup
  };
}

export default ViewCounter;