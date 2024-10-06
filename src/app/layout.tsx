import '../styles/globals.css'; 
import { CopilotKit } from "@copilotkit/react-core"; 
import { CopilotPopup } from "@copilotkit/react-ui"; 
import Header from './components/Header';
import Footer from './components/Footer';
import "@copilotkit/react-ui/styles.css"; 

export const metadata = {
  title: 'Roadmap Creator',
  description: 'Create and manage your learning roadmaps',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Header />
        <CopilotKit runtimeUrl="/api/copilotkit">
          {children}
          <CopilotPopup
            instructions="You are assisting the user with creating and managing learning roadmaps."
            labels={{ title: "Roadmap Assistant", initial: "Need help with your learning roadmap?" }}
          />
        </CopilotKit>
        <Footer />
      </body>
    </html>
  );
}
