import { useState } from "react";
import TopSection from "./components/TopSection";
import DrawerComponent from "./components/DrawerComponent";
import DomainTable from "./components/DomainTableColumn";
import { ContextProvider } from "./helpers/useContext";

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
      <ContextProvider value={{ showDrawer, onClose, open }}>
        <DrawerComponent />
        <TopSection />
      </ContextProvider>
        <DomainTable />
    </div>
  );
}

export default App;
