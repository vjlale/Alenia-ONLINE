import { NodeCanvas } from './components/NodeCanvas';

function App() {
  return (
    <main className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden relative cursor-none">
      <NodeCanvas nodeCount={120} maxConnectionDistance={200} />
    </main>
  );
}

export default App;
