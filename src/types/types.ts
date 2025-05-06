export interface DomainState {
  id: string;
  domain: string;
  isActive: boolean;
  status: "rejected" | "verified" | "pending";
  createdDate: string;
}

export interface ShowDrawerProp {
  showDrawer: () => void;
}
