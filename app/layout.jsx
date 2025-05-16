import './globals.css';

export const metadata = {
  title: 'Waste Classification App',
  description: 'Classify waste items into different categories using AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
} 