import { Footer } from "flowbite-react";
const BlogFooter = () => {
  return (
    <div className="dark:bg-gray-800 py-1">
      <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            AK SWE Services
          </a>
          . Todos direitos reservados.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="/" className="mr-4 hover:underline md:mr-6 ">
              Sobre
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Política de Privacidade
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Licença
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contato
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default BlogFooter;
