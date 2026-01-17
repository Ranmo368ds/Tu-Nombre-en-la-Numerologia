import { Board } from "@/collaborative-board/components/Board/Board";
import { Toolbar } from "@/collaborative-board/components/Toolbar/Toolbar";

export default function Home() {
  return (
    <main style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      margin: 0,
      padding: 0
    }}>
      <Board />
      <Toolbar />
    </main>
  );
}
