import { useState } from "react";
import TopSection from "./components/TopSection";

function App() {
  const [open, setOpen] = useState<boolean>(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <TopSection showDrawer={showDrawer} />
    </div>
  );
}

export default App;
