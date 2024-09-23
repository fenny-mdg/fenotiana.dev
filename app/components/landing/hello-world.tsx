import {useFetcher} from '@remix-run/react';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import TypeWritter from 'typewriter-effect';
import {downloadBase64} from '~/utils/base-64-downloader.ts';

import hi from '../../../public/images/hi.svg';
import DownloadIcon from '../icon/download.tsx';
import Container from './container.tsx';
import {Button} from '@/components/ui/button.tsx';

export default function HelloWorld() {
  const {t} = useTranslation();
  const fetcher = useFetcher();
  const {data, state} = fetcher;

  useEffect(() => {
    // @ts-expect-error data is not null
    const base64 = data?.data as string;

    if (base64) {
      downloadBase64(base64, 'Fenotiana_CV', 'pdf');
    }
  }, [data]);

  return (
    <Container className="flex-col items-center justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center text-4xl md:w-[80%] md:text-6xl">
        <span className="flex gap-4">
          <h3>{t('landing.greeting')}</h3>{' '}
          <img src={hi} alt="hi" className="w-10 md:w-16" />,{' '}
          <p> {t('landing.iam')}</p>
        </span>

        <span className="mt-6">
          <TypeWritter
            options={{
              strings: [
                t('landing.skill1'),
                t('landing.skill2'),
                t('landing.skill3'),
              ],
              autoStart: true,
              loop: true,
              wrapperClassName:
                'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-4xl md:text-6xl',
              delay: 50,
            }}
          />
        </span>
      </div>

      <fetcher.Form method="get" action="get-resume" className="mb-8">
        <Button type="submit" disabled={state === 'submitting'}>
          <span className="flex items-center gap-4">
            <DownloadIcon className="!w-8" /> {t('landing.downloadResume')}
          </span>
        </Button>
      </fetcher.Form>
    </Container>
  );
}
