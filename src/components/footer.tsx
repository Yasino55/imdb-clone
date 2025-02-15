const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='border-t mt-20'>
      <div className='p-5 flex gap-2 justify-center'>
        &copy; {currentYear} <p>IMDb</p>
      </div>
    </footer>
  );
};

export default Footer;
