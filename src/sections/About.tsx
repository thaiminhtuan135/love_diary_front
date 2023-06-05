import styles from "@/styles";
import {motion} from "framer-motion";
import TypingText from "@/component/TypingText";
import {fadeIn} from "@/utils/motion";
const About = () => {
    return(
        <>
            <section className={`${styles.paddings} relative z-10`}>
                <div className={"gradient-02 z-0"}></div>
                <motion.div
                    initial={'hidden'}
                    whileInView={'show'}
                    viewport={{once: false, amount: 0.25}}
                    className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
                >
                    <TypingText title="| About Metaversus" textStyle="text-center"/>
                    <motion.p
                        variants={fadeIn('up','tween',0.1,1)}
                        className="mt-[8px] font-normal sm:text-[32px] text-[10px] text-center text-secondary-white">
                        <span className={'font-extrabold text-white'}>Metaverse </span>
                        is a new thing in the future, where you can enjoy
                        the virtual world by feeling like it's really real, you can feel what you feel in
                        this metaverse world, because this is really the madness of the metaverse of today,
                        using only VR devices you can easily explore the metaverse world you want, turn your dreams into reality.
                        Let's explore the madness of the metaverse by scrolling down
                    </motion.p>
                    <motion.img
                        variants={fadeIn('up','tween' , 0.3,1)}
                        src="/arrow-down.svg" alt={"arrow-down"}
                        className="w-[18px] h-[28px] object-contain mt-[28px]"
                    >

                    </motion.img>
                </motion.div>
            </section>
        </>
    )
}

export default About;