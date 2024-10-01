// src/app/layout.tsx
import '../styles/globals.css';

export const metadata = {
  title: 'Roadmap Creator',
  description: 'Create and manage your learning roadmaps',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
