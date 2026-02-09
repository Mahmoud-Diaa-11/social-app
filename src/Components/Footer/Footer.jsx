function Footer() {
  return (
    <footer className="footer bg-blue-500 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xl font-semibold">Social App</p>
        <p className="text-sm opacity-80 mt-2">
          &copy; {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
