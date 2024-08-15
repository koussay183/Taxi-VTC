import React, { useEffect, useState } from 'react';
import { app as db} from '../firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

function AdminDash() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('waiting');

  useEffect(() => {
    const fetchRequests = async () => {
      const q = query(collection(db, 'requests'), where('status', '==', filter));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
    };
    fetchRequests();
  }, [filter]);

  const handleStatusChange = async (id) => {
    const requestDoc = doc(db, 'requests', id);
    await updateDoc(requestDoc, { status: 'done' });
    setRequests(requests.filter(request => request.id !== id));
  };

  return (
    <div>
      <button onClick={() => setFilter('waiting')}>Waiting</button>
      <button onClick={() => setFilter('done')}>Done</button>
      <ul>
        {requests.map(request => (
          <li key={request.id}>
            {request.name} - {request.status}
            {filter === 'waiting' && <button onClick={() => handleStatusChange(request.id)}>Mark as Done</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDash