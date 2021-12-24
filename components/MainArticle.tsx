import React from 'react';
// Styles
import classes from '../styles/components/MainArticle.module.css';
// Components
import Image from 'next/image';
import ArticleMeta from './ArticleComponents/ArticleMeta';
import ArticleTitle from './ArticleComponents/ArticleTitle';
import ArticleText from './ArticleComponents/ArticleText';
import ArticleSubtitle from './ArticleComponents/ArticleSubtitle';
import ArticleQuote from './ArticleComponents/ArticleQuote';

export default function MainArticle() {
    return (
        <article className={classes.article}>
            <h1 className={classes.title}>How to Sleep Better In The City That Never Sleeps</h1>
            <ArticleMeta />
            <Image src="https://www.tracysnewyorklife.com/wp-content/uploads/2016/07/sleep1.png" height="533" width="800" />
            <ArticleTitle text="HOW TO SLEEP BETTER IN THE CITY THAT NEVER SLEEPS"/>
            <ArticleText text="Logging at least eight hours of sleep every night is tough when you live in NYC. But after spending the past six months studying the importance of shuteye and the dangerous effects sleep deprivation has on the brain, the aging process, and our overall health, sleep has definitely become more of a priority for me. Here are some ways even the most restless New Yorkers can sleep better in the city that never sleeps." />
            <ArticleSubtitle text="Use blackout courtains." textAlign='left' fontWeight={600}/>
            <ArticleText text="If you’re sensitive to light, hanging blackout curtains on your windows is a great way to turn your bedroom into a dark, peaceful sanctuary. This tip is especially helpful for any night owls who work on the other end of the clock and do most of their sleeping when the sun’s up. Blackout curtains are also handy for blocking out the glare from street lights, neighboring buildings, and random sirens that flash by in the middle of the night. " />
            <ArticleSubtitle text="Block out the noise." textAlign='center' fontWeight={400}/>
            <ArticleText text="Speaking of sirens, NYC is renowned for its noise pollution – definitely a hindrance when it comes to getting a good night’s sleep. Invest in some comfortable ear plugs or a pair of noise cancelling headphones to silence those FDNY firetrucks, construction workers, or your roommate’s boyfriend who likes to blast the television while you’re trying to drift off to dreamland." />
            <ArticleQuote text="When I worked down south, I was the smartest guy in the room. In New York, I’m just another guy in the room."/>
            <Image src="https://www.tracysnewyorklife.com/wp-content/uploads/2016/07/FDNY.jpg" height="533" width="800" />
        </article>
    )
};