export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Waste Classification App
          </p>
        </div>
      </div>
    </footer>
  );
} 