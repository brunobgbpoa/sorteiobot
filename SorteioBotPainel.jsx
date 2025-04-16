src/SorteioBotPainel.jsx
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function SorteioBotPainel() {
  const [centenas, setCentenas] = useState([]);
  const [novaCentena, setNovaCentena] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [showUpgrade, setShowUpgrade] = useState(false);

  function adicionarCentena() {
    if (!whatsapp.match(/^\d{10,13}$/)) {
      alert('Informe um número de WhatsApp válido.');
      return;
    }
    if (novaCentena.match(/^\d{3}$/)) {
      if (centenas.length >= 1) {
        setShowUpgrade(true);
        return;
      }
      if (!centenas.includes(novaCentena)) {
        setCentenas([...centenas, novaCentena]);
        setNovaCentena('');
      }
    }
  }

  function removerCentena(index) {
    const copia = [...centenas];
    copia.splice(index, 1);
    setCentenas(copia);
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-12 lg:px-32 font-sans">
      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2 text-3xl font-bold tracking-tight text-gray-900">
          <img src="/logo.png" alt="SorteioBot Logo" className="w-8 h-8" />
          Sorteio<span className="text-blue-600">Bot</span>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
        <input
          type="text"
          placeholder="Seu WhatsApp (DDD + número)"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Digite a centena..."
          value={novaCentena}
          onChange={(e) => setNovaCentena(e.target.value)}
          className="w-full md:w-32 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={adicionarCentena}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          <Plus size={16} /> Adicionar
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Centenas cadastradas</h2>
        {centenas.length === 0 ? (
          <p className="text-gray-500">Nenhuma centena cadastrada ainda.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {centenas.map((centena, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm"
              >
                <span className="text-lg font-medium text-gray-800">{centena}</span>
                <button onClick={() => removerCentena(index)}>
                  <Trash2 size={18} className="text-red-500 hover:text-red-700" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showUpgrade && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Plano Premium</h3>
            <p className="text-gray-600 mb-4">
              Você já cadastrou 1 centena. Para cadastrar mais, ative o plano Premium por apenas <strong>R$ 9,99/mês</strong>.
            </p>
            <a
              href="https://buy.stripe.com/test_cN24hz3dGd6rbjO4gg"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Assinar agora
            </a>
            <div className="mt-4">
              <button className="text-sm text-gray-500 underline" onClick={() => setShowUpgrade(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
