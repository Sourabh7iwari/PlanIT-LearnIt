import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">
          <Link href="/">LearnIT-PlaneIT</Link>
        </h1>
        <nav>
          <Link href="/dashboard" className="mx-2 hover:underline">Dashboard</Link>
          <Link href="/about" className="mx-2 hover:underline">About</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
