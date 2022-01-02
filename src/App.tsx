import React from 'react';
import Sequencer from './components/Sequencer';

function App(): JSX.Element {
  return (
    <main className="w-screen h-screen">
      <section
        className="w-full h-full flex flex-col justify-center items-center"
      >
        <Sequencer />
      </section>
    </main>
  );
}

export default App;
