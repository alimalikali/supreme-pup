type GlobalLayoutProps = {
    children: React.ReactNode;
    noPadding?: boolean; // Optional prop to disable padding
  };
  
  export default function GlobalLayout({ children, noPadding = false }: GlobalLayoutProps) {
    return (
      <div className={noPadding ? "w-full" : "w-full px-3 sm:px-12 lg:px-20"}>
        {children}
      </div>
    );
  }
  