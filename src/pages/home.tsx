import PageMetaData from '@components/PageMetaData';
import { Button } from '@ui/button';
import { cn } from '@utils';
import { useTranslation } from 'react-i18next';

type HomeProps = {
    title?: string;
};
export const Home = (props: HomeProps) => {
    const { title = 'Hey' } = props;
    const { t, i18n } = useTranslation('pages');

    return (
        <div className="rounded-lg bg-gray-100 p-6 shadow-md">
            <PageMetaData
                title={'Home'}
                description={'Descripción del home'}
            />
            <h1 className="text-2xl font-bold text-gray-800">
                {t('home.title')} - {title}
            </h1>
            <h2 className="mt-4 text-xl text-gray-700">This is the main content!</h2>
            <div className="mt-4 rounded-lg bg-white p-4 shadow-sm">
                <span className="text-gray-600">API KEY</span>
                <br />
                <strong className="text-blue-600">{import.meta.env.VITE_REACT_APP_API_URL}</strong>
            </div>
            <p className="mt-4 text-gray-600">{t('home.description')}</p>
            <div className={'flex gap-4'}>
                <Button
                    onClick={() => i18n.changeLanguage('en')}
                    className={cn('text-white uppercase transition-colors hover:bg-blue-500', {
                        'bg-blue-500': i18n.language === 'en',
                    })}
                >
                    En
                </Button>
                <Button
                    onClick={() => i18n.changeLanguage('es')}
                    className={cn('text-white uppercase transition-colors hover:bg-blue-500', {
                        'bg-blue-500': i18n.language === 'es',
                    })}
                >
                    Es
                </Button>
            </div>
        </div>
    );
};
