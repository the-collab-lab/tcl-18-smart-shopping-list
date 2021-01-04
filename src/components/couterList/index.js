import React from 'react';
// Firebase
import { db } from '../../lib/firebase.js';
import { useCollection } from 'react-firebase-hooks/firestore';

import Counter from '../counter';

function CounterList() {
  const query = db.collection('counters');
  const options = {
    snapshotListenOptions: { includeMetadataChanges: true },
  };
  const [value, loading, error] = useCollection(query, options);

  return (
    <section>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <span>
          {value.docs.map((doc) => (
            <Counter
              key={doc.id}
              id={doc.id}
              name={doc.data().name}
              currentValue={doc.data().value}
            />
          ))}
        </span>
      )}
    </section>
  );
}

export default CounterList;
