const Footer: React.FC = () => {
    return (
      <footer className="bg-gray-800 text-white p-4 mt-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} LearnIT-PlaneIT. All Rights Reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  