import Button from "./Button";

const ConfirmDialog = ({ open, title, description, confirmLabel = "Confirm", onConfirm, onCancel, danger = false }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/40 backdrop-blur-[2px] px-4">
      <div className="card rounded-xl p-6 w-full max-w-sm space-y-4 animate-scale-in">
        <h3 className="text-base font-bold text-heading">{title}</h3>
        {description && <p className="text-sm text-muted leading-relaxed">{description}</p>}
        <div className="flex gap-3 pt-2">
          <Button variant="white" className="flex-1" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant={danger ? "danger" : "primary"} className="flex-1" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
