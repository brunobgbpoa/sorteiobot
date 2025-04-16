import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACQVbw-6wEC5y0LuI7HlveB8skmFA_YE",
  authDomain: "sorteiobot-36519.firebaseapp.com",
  projectId: "sorteiobot-36519",
  storageBucket: "sorteiobot-36519.appspot.com",
  messagingSenderId: "542208615923",
  appId: "1:542208615923:web:742c296b64b240b1131e86",
  measurementId: "G-J7L9JQM9XF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Dashboard() {
  const [centenas, setCentenas] = useState([]);
  const [novaCentena, setNovaCentena] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "centenas"), (snapshot) => {
      const lista = snapshot.docs.map(doc => doc.data().valor);
      setCentenas(lista);
    });
    return () => unsubscribe();
  }, []);

  const adicionarCentena = async () => {
    if (/^\d{3}$/.test(novaCentena)) {
      await addDoc(collection(db, "centenas"), { valor: novaCentena });
      setNovaCentena("");
    } else {
      alert("Digite uma centena válida (ex: 456)");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-blue-700">SorteioBot</h1>
        <span className="text-sm text-gray-400">v1.0 painel</span>
      </header>

      <div className="bg-white shadow rounded-xl p-6 max-w-xl mx-auto mb-8">
        <h2 className="text-xl font-semibold mb-4">Cadastrar nova centena</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={novaCentena}
            onChange={(e) => setNovaCentena(e.target.value)}
            placeholder="Ex: 456"
            className="border border-gray-300 p-2 rounded w-32"
          />
          <button
            onClick={adicionarCentena}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Adicionar
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-6 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Centenas cadastradas</h2>
        <ul className="list-disc ml-6 text-gray-700">
          {centenas.length === 0 ? (
            <li className="text-gray-400">Nenhuma centena cadastrada ainda.</li>
          ) : (
            centenas.map((c, idx) => <li key={idx}>{c}</li>)
          )}
        </ul>
      </div>
    </div>
  );
}
