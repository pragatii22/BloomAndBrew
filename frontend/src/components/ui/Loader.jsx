const Loader = ({ fullscreen = false, text = "" }) => {
  const spinner = (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 rounded-full border-[3px] border-primary/25" />
      <div className="absolute inset-0 rounded-full border-[3px] border-primary-dark border-t-transparent animate-spin" />
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 gap-3">
        {spinner}
        {text && <p className="text-sm text-muted font-medium">{text}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      {spinner}
      {text && <p className="text-sm text-muted font-medium">{text}</p>}
    </div>
  );
};

export default Loader;
