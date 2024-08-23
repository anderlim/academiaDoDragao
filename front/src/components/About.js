import BlogFooter from "./BlogFooter";
const About = () => {
  return (
    <div className="">
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 min-h-screen">
        <div className="flex justify-between px-4 mx-auto max-w-6xl ">
          <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <section class="bg-white dark:bg-gray-900">
              <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:pt-16 pb-16 lg:grid-cols-12">
                <div class="mr-auto place-self-center lg:col-span-7">
                  <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                    <span class="text-transparent bg-clip-text bg-black dark:bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400">
                      Forum App da Academia do Dragão
                    </span>
                  </h1>
                  {/* <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                    Purpose-built for the 21st century, with user experience in
                    mind.
                  </p> */}
                  {/* <a
                    href="/posts"
                    class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                  >
                    Get started
                    <svg
                      class="w-5 h-5 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a> */}
                </div>
              </div>
            </section>
            <section class="bg-white dark:bg-gray-900">
              <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
                  <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
                    Sobre este fórum
                  </h2>
                  <p class="mb-4 font-light">
                  O site oferece uma plataforma completa para jogadores e mestres de RPG, especialmente aqueles focados no sistema D20 e na 5ª edição de Dungeons & Dragons. Entre suas principais funcionalidades, o site conta com uma seção dedicada à criação de fichas de personagens, que pode ser realizada tanto de forma manual quanto através de um quiz interativo. Essa última opção é especialmente útil para iniciantes, pois guia os usuários passo a passo na construção de seus personagens, utilizando referências de filmes populares para facilitar o processo.
                  </p>
                  <p class="mb-4 font-light">
                  Outro ponto de destaque é o fórum do site, que serve como um espaço de socialização entre os usuários. No fórum, jogadores e mestres podem compartilhar suas experiências, tirar dúvidas, e colaborar na criação de campanhas e narrativas. Essa função é essencial para fomentar a comunidade, promovendo o aprendizado e a troca de ideias. A interação constante entre os usuários permite que tanto novatos quanto veteranos no RPG se beneficiem do conhecimento coletivo, tornando o fórum uma peça central na proposta do site de unir e educar a comunidade de jogadores.
                  </p>

                  {/* <a
                    href="https://github.com/xxdydx/forum-app"
                    target="_blank"
                    class="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700"
                  >
                    <svg
                      class="ml-1 w-6 h-6 mr-2"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>{" "}
                    View my Github
                    <svg
                      class="ml-1 w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a> */}
                </div>
              </div>
            </section>
            <section class="bg-white dark:bg-gray-900">
              <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
                  <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
                    Tecnologias Utilizadas
                  </h2>
                  <div className="">
                    <img
                      className="inline mr-2"
                      src="https://www.svgrepo.com/show/354259/react.svg"
                      width="40px"
                      alt="ReactJS"
                    />{" "}
                    <img
                      className="inline mr-2"
                      src="https://www.svgrepo.com/show/354274/redux.svg"
                      width="40px"
                      alt="Redux"
                    />{" "}
                    <img
                      className="inline mr-2"
                      src="https://www.svgrepo.com/show/354262/react-router.svg"
                      width="40px"
                      alt="React-Router"
                    />{" "}
                    <img
                      className="inline mr-2"
                      src="https://www.svgrepo.com/show/374118/tailwind.svg"
                      width="40px"
                      alt="Tailwind CSS"
                    />
                    <img
                      className="inline mr-2"
                      src="https://flowbite.com/docs/images/logo.svg"
                      width="40px"
                      alt="Flowbite UI"
                    />
                    <img
                      src="https://www.svgrepo.com/show/354118/nodejs.svg"
                      className="inline mr-2"
                      width="40px"
                      alt="NodeJS"
                    />{" "}
                    <img
                      src="https://www.svgrepo.com/show/373845/mongo.svg"
                      className="inline mr-2"
                      width="40px"
                      alt="MongoDB"
                    />
                    <img
                      src="https://user-images.githubusercontent.com/10525473/50372432-95dcd880-0611-11e9-9432-58de9be26b3b.png"
                      className="inline mr-2"
                      width="40px"
                      alt="Jest"
                    />{" "}
                    <img
                      src="https://miro.medium.com/max/364/0*JAWNOBEDxJLXxHUj.png"
                      className="inline mr-2"
                      width="40px"
                      alt="Cypress"
                    />
                  </div>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>

      <BlogFooter />
    </div>
  );
};

export default About;
