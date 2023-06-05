import {fadeIn} from "@/utils/motion";
import {motion} from "framer-motion";
import styles from "@/styles";
interface propData {
    id: any;
    imgUrl: string;
    title: string;
    index: number;
    active: string;
    handleClick : (active : string) => void
}
const ExploreCard = (prop:propData) => {
    return (
        <>
            <motion.div
                variants={fadeIn('right','spring',prop.index*0.5,1)}
                onClick={() => prop.handleClick(prop.id)}
                className={`relative ${prop.active === prop.id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'}
                flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[1s] ease-out-flex cursor-pointer`}
            >
                <img src={prop.imgUrl} alt={prop.title} className={'absolute w-full h-full object-cover rounded-[24px]'}/>
                {prop.active !== prop.id ? (
                    <h3 className={"font-semibold sm:text-[26px] text-[18px] text-white absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]"}>
                        {prop.title}
                    </h3>
                ) : (
                    <div className={"absolute bottom-0 p-8 justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] lg:rounded-none rounded-[24px]"}>
                        <div className={`${styles.flexCenter} w-[60px] h-[60px] rounded-[24px] mb-[16px] glassmorphism`}>
                            <img src="/headset.svg" alt="headset" className={'w-1/2 h-1/2 object-contain'}/>
                        </div>
                        <p className={'font-normal text-[16px] leading-[20px] text-white uppercase'}>
                            Enter the Metaverse
                        </p>
                        <h2 className={"mt-[24px] font-semibold sm:text-[32px] text-white"}>{prop.title}</h2>
                    </div>
                )}
            </motion.div>
        </>
    )
}

export default ExploreCard;