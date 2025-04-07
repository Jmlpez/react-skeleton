import { Helmet } from 'react-helmet-async';

type PageMetadataProps = {
    title?: string;
    description?: string;
    keywords?: string[];
};

const PageMetadata = (props: PageMetadataProps) => {
    const {
        title = 'Título por defecto - Mi App',
        description = 'Descripción por defecto de mi aplicación',
        keywords = ['palabra1', 'palabra2'],
    } = props;
    return (
        <Helmet>
            <title>{title}</title>
            <meta
                name="description"
                content={description}
            />
            <meta
                name="keywords"
                content={keywords.join(', ')}
            />
            {/* Open Graph tags para redes sociales */}
            <meta
                property="og:title"
                content={title}
            />
            <meta
                property="og:description"
                content={description}
            />
        </Helmet>
    );
};

export default PageMetadata;
