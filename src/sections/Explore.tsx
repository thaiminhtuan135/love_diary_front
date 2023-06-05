import {useState} from "react";
import styles from "@/styles";
import {motion} from "framer-motion";
import TypingText, {TitleText} from "@/component/TypingText";
import {exploreWorlds} from "@/constant/constant";
import ExploreCard from "@/component/ExploreCard";
const Explore = () => {
    const [active, setActive] = useState('world-2');
    const handleActive = (active : string) => {
        setActive(active);
    }
    return (
        <>
            <section className={`${styles.paddings}`} id={'explore'}>
                <motion.div
                    initial={'hidden'}
                    whileInView={'show'}
                    viewport={{once: false, amount: 0.25}}
                    className={`${styles.innerWidth} mx-auto flex flex-col`}
                >
                    <TypingText title={' |The world'} textStyle={'text-center'} />
                    <TitleText title={
                        <>
                            Choose the word you want
                            <br className={'md:block hidden'}/>to explore
                        </>
                    } textStyle={'text-center'}/>
                    <div className={'mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5'}>
                        {exploreWorlds.map((world : any,index:any) => (
                            <ExploreCard
                                key={world.id}
                                id={world.id}
                                imgUrl={world.imgUrl}
                                title={world.title}
                                index={index}
                                active={active}
                                handleClick={() => handleActive(world.id)}
                            />
                        ))}
                    </div>
                </motion.div>
            </section>

        </>
    )
}

export default Explore;