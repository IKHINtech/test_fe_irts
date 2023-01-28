import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome To uBox',
    description: 'Kami menjual segala product Apple',
    keywords: 'beli iphone, iphone, beli elektornik, elektorinik murah',
}

export default Meta
