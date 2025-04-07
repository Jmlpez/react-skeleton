import PageMetaData from '@components/PageMetaData';

type HomeProps = {
    title?: string;
};
export const Home = (props: HomeProps) => {
    const { title = 'Hey' } = props;
    return (
        <div>
            <PageMetaData
                title={'Home'}
                description={'Descripción del home'}
            />
            {title}
            <h2>This is the main content!</h2>
            <div>
                API KEY
                <br />
                <strong>{import.meta.env.VITE_REACT_APP_API_URL}</strong>
            </div>
        </div>
    );
};
