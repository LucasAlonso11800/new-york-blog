import React from 'react'
import Head from 'next/head';

type Props = {
    title: string;
    keywords: string;
}

export default function CustomHead(props: Props) {
    const { title, keywords } = props;
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="keywords" content={`New York, NYC, Traveling, ${keywords}`} />
            <meta name="description" content="Tracysnewyorklife.com is a lifestyle and travel blog based in NYC. Creator Tracy Kaler and bloggers feature the best of living, food, culture, travel, and more to readers around the world. The blog offers the best of New York City life, Tracy's adventures in the Big Apple and beyond, as well as musings and opinions from New Yorkers. Tracy informs and entertains on this top New York-centric blog." />
            <meta name="author" content="Lucas Alonso" />
            <title>{title} Tracy Kaler's New York Life + Travel Blog | Top NYC Blog</title>
        </Head>
    )
}
