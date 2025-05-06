import { useState } from "react";
import TopSection from "./components/TopSection";
import DrawerComponent from "./components/DrawerComponent";

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
      <DrawerComponent onClose={onClose} open={open} />
      <TopSection showDrawer={showDrawer} />
      
    </div>
  );
}

export default App;
