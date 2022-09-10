import useSWR from 'swr';
import { DotLoading, Card, Image } from 'antd-mobile'

type ExhibitionProps = {
    limit?: number;
}

type Exhibit = {
    id: number;
    image_url: string;
    image_id: string | null;
    gallery_title: string;
    gallery_id: number;
    is_featured: boolean;
    status: string;
    short_description: string | null;
    title: string;
    web_url: string;

}

const Exhibitions = (props: ExhibitionProps) => {
    const { data: payload , error, isValidating } = useSWR(`${import.meta.env.VITE_API_BASE_URL}/api/v1/exhibitions?limit=${props.limit ?? 10}`)
    
    if(error) console.error(error)
    if(isValidating) return <DotLoading className='loading'/>

    const exhibits = payload?.data?.map((e: Exhibit, i: number) => (
        <Card 
            key={i}
            title={e.title}>
            <div className='exhibit-card-body'>
                <Image
                    src={e.image_url}
                    width={64}
                    height={64}
                    fit='cover'
                    style={{ borderRadius: 8 }}
                />
                <h2>{ e.title }</h2>
                <div>at { e.gallery_title ?? 'N/A' }<a className='exhibit-link' href={ e.web_url }>Website</a></div>
                <p>{ e.short_description ?? 'No description.'}</p>
                <b>Status: { e.status }</b>
            </div>
        </Card>
    ))

    return <section className='exhibitions-page'>{ exhibits }</section>
}

export default Exhibitions