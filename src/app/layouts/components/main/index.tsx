type MainProps = {
  children?: React.ReactNode;
};

/**
 * Main komponenti - asosiy content wrapper
 */
export function Main({ children }: MainProps) {
  return (
    <main className="bg-white rounded-xl p-6 overflow-auto border border-[#EBECEC]">
      {children}
    </main>
  );
}
