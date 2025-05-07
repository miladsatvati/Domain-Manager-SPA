import { useState } from "react";
import TopSection from "./components/TopSection";
import DrawerComponent from "./components/DrawerComponent";
import DomainTable from "./components/DomainTableColumn";

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
      <DomainTable />
    </div>
  );
}

export default App;
