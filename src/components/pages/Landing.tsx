import { useState } from 'react'
import { Swiper, DotLoading, Image, AutoCenter } from 'antd-mobile'
import useSWR from 'swr';

type LandingProps = {}
type ArtWork = {
    id: number;
    artist_display: string;
    date_display: string;
    image_id: string;
    title: string;
}

const query = '?&limit=5&fields=id,title,artist_display,date_display,image_id'
const Landing = (props: LandingProps) => {
    const [viewer, setViewer] = useState(false)
    const { data: payload, error, isValidating } = useSWR(`${import.meta.env.VITE_API_BASE_URL}/api/v1/artworks${query}`)
    const items = payload?.data.map((a: ArtWork, i: number) => (
        <Swiper.Item key={i}>
            <section className='swiper-content-container'>
                <Image 
                src={`${import.meta.env.VITE_API_IMAGE_URL}/${a.image_id}/full/843,/0/default.jpg`} 
                alt={a.title}
                height='350px'
                fit='contain'
                onClick={() => setViewer(prev => !prev)}
                placeholder={<DotLoading/>}/>
                <div className='swiper-body'>
                    <AutoCenter className='artist-name'>{a.artist_display}</AutoCenter>
                    <AutoCenter className='artist-title'>{a.title}</AutoCenter>
                    <AutoCenter className='artist-date'>{a.date_display}</AutoCenter>
                </div>
            {/* <ImageViewer
                image={`${import.meta.env.VITE_API_IMAGE_URL}/${a.image_id}/full/843,/0/default.jpg`}
                visible={viewer}
                onClose={() => setViewer(false)}
            /> */}
            </section>
        </Swiper.Item>
    ))
    
    if(error) console.error(error)
    if(isValidating) return <DotLoading className='loading'/>
    return <Swiper>{items}</Swiper>
}

export default Landing