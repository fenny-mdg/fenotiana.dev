import {useTranslation} from 'react-i18next';

import type {SelectProps} from '~/components/select/common.ts';
import Select from '~/components/select/select.tsx';
import Toggle from '~/components/toggle.tsx';
import useTheme from '~/utils/hooks/theme.ts';
import {i18n} from '~/utils/translation/i18n.ts';
import PhoneIcon from '~/components/icon/phone.tsx';
import LocationIcon from '~/components/icon/location.tsx';
import HelloWorld from '~/components/landing/hello-world.tsx';
import flagFr from '../../../public/images/flag-fr.png';
import flagEn from '../../../public/images/flag-en.png';
import gitlab from '../../../public/images/gitlab.svg';
import github from '../../../public/images/github.svg';
import email from '../../../public/images/email.svg';
import linkedin from '../../../public/images/linkedin.svg';
import whatsapp from '../../../public/images/whatsapp.svg';
import skype from '../../../public/images/skype.svg';
import me from '../../../public/images/avatar.svg';
import Contact from '~/components/landing/contact.tsx';
import AboutMe from '~/components/landing/about-me.tsx';
import ProjectSection from '~/components/landing/project.tsx';
import Button from '~/components/button/button.tsx';

const languageOptions: SelectProps['options'] = [
  {
    label: '',
    value: 'fr',
    icon: <img className="h-4 w-4" src={flagFr} alt="flag" />,
  },
  {
    label: '',
    value: 'en',
    icon: <img className="h-4 w-4" src={flagEn} alt="flag" />,
  },
];

const contacts = [
  {icon: github, url: 'https://github.com/fenny-mdg'},
  {icon: gitlab, url: 'https://gitlab.com/fenotiana-etech'},
  {
    icon: linkedin,
    url: 'https://www.linkedin.com/in/fenotiana-andriamahenimanana-966858146/',
  },
  {icon: email, url: 'mailto:contact@fenotiana.dev'},
  {icon: skype, url: 'skype:live:fenny.etech?chat'},
  {icon: whatsapp, url: 'https://wa.me/261346411221'},
];

export default function Index() {
  const [theme, setTheme] = useTheme();
  const {t} = useTranslation();
  const handleChange = (value: boolean) => {
    setTheme?.(value ? 'light' : 'dark');
  };
  const handleLanguageChange = async (language: string | number) => {
    console.log('Language change');
    try {
      await i18n.changeLanguage(language as string);
    } catch (error) {
      console.error(error);
    }
  };
  const mapLanguage = (language: string) => {
    switch (true) {
      case language.includes('fr'):
        return 'fr';
      case language.includes('en'):
        return 'en';
      default:
        return language;
    }
  };

  return (
    <main className="relative grid h-screen w-screen grid-cols-6 bg-cover bg-center bg-no-repeat lg:gap-8 lg:bg-landing-bg lg:p-12 lg:dark:bg-landing-bg-dark ">
      <nav className="fixed right-8 top-2 z-10 flex items-center gap-4 rounded-full bg-white px-4 py-1 dark:bg-slate-800 dark:shadow-gray-900 md:top-1 lg:right-16 lg:top-7 lg:shadow-lg">
        <Button>About me</Button>
        <Button>Projects</Button>
        <Button>Contact</Button>
        <Button>Blog</Button>

        <Toggle
          checked={theme === 'light'}
          onChange={handleChange}
          screenReaderLabel="Dark mode"
        />
        <Select
          options={languageOptions}
          defaultSelected={mapLanguage(i18n.language)}
          // onChange={handleLanguageChange}
          onChange={() => console.log('Language change')}
        />
      </nav>
      <div className="col-span-6 flex h-screen flex-col justify-center overflow-x-hidden overflow-y-scroll bg-white px-8 dark:bg-slate-800 lg:col-span-2 lg:h-full lg:rounded-lg lg:shadow-lg">
        <div className="flex flex-wrap items-center gap-8">
          <img
            alt="me"
            className="h-40 w-40 rounded-full bg-slate-50 shadow-md dark:bg-slate-700 "
            src={me}
          />

          <h1 className=" font-bold">
            <span className="bg-gradient-to-r from-violet-500 via-pink-500  to-rose-600 bg-clip-text text-6xl text-transparent lg:text-5xl">
              Fenotiana
            </span>{' '}
            <br />{' '}
            <span className="text-2xl font-light text-gray-700 dark:text-gray-100 ">
              ANDRIAMAHENIMANANA
            </span>
          </h1>
        </div>

        <section className="mt-8 rounded rounded-bl-none rounded-tl-none border-l-4 border-l-violet-500 bg-gray-100 p-4 text-gray-700 dark:bg-gray-700 dark:text-white lg:text-sm">
          {t('landing.summary')}
        </section>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
          <span className="flex items-center gap-4">
            {/* <img className=" w-8" src={location} alt="location" /> */}
            <LocationIcon />
            <p>Antananarivo, Madagascar</p>
          </span>
          <span className="flex items-center gap-4">
            {/* <img className=" w-8" src={phone} alt="phone" /> */}
            <PhoneIcon />
            <p>(+261) 34 64 112 21</p>
          </span>
        </div>

        <div className="mt-8 flex gap-4 lg:gap-2">
          {contacts.map(({icon, url}) => (
            <a key={url} href={url} target="blank">
              <img
                src={icon}
                alt={url}
                className="w-10 grayscale hover:grayscale-0"
              />
            </a>
          ))}
        </div>
      </div>
      <div className="col-span-6 h-full overflow-visible lg:col-span-4 lg:overflow-scroll lg:rounded-lg lg:backdrop-blur-lg">
        <HelloWorld />
        <AboutMe />
        <ProjectSection />
        <Contact />
      </div>
    </main>
  );
}
