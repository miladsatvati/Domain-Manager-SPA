export interface DomainState {
  id: string;
  domain: string;
  isActive: boolean;
  status: "rejected" | "verified" | "pending";
  createdDate: number;
}

export interface ShowDrawerProp {
  showDrawer: () => void;
}

export interface ContextProp {
  showDrawer: () => void;
  onClose: () => void;
  open: boolean;
}