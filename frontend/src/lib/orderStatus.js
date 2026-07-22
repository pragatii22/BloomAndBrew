import { Clock, CheckCircle2, Truck, PackageCheck, XCircle } from "lucide-react";

export const STATUS_META = {
  pending:    { label: "Order Placed", tone: "amber", icon: Clock },
  confirmed:  { label: "Processing",   tone: "blue",  icon: CheckCircle2 },
  processing: { label: "Processing",   tone: "blue",  icon: Truck },
  delivered:  { label: "Delivered",    tone: "green", icon: PackageCheck },
  cancelled:  { label: "Cancelled",    tone: "red",   icon: XCircle },
};

// Linear tracking timeline — cancelled orders get their own dedicated state.
export const TRACKING_STEPS = [
  { key: "pending", label: "Order Placed" },
  { key: "processing", label: "Processing" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

// Maps a raw backend status to how far along the tracking timeline we are.
export const trackingIndex = (status) => {
  if (status === "pending") return 0;
  if (status === "confirmed" || status === "processing") return 1;
  if (status === "delivered") return 3;
  return 0;
};
