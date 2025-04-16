import {Avatar, Rating} from "@mantine/core";
import {testimonials} from "@/Data/Data.tsx";

const Testimonials = () => {
    return (
        <div className={'mt-20 p-5'}>
            <div className={'text-4xl text-center font-semibold text-mine-shaft-100 mb-3 md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl'}>
                What <span className={'text-bright-sun-400'}>
                user
            </span> say's about us ?
            </div>
            <div className={'flex justify-evenly md-mx:flex-wrap'}>

            {
                testimonials.map((data, index) => (
                    <div key={index}
                         className={'flex flex-col gap-3 w-[23%] border rounded-xl mt-10 border-bright-sun-400 p-3 md-mx:w-[46%] xs-mx:w-full'}>
                        <div className={'flex gap-2 items-center'}>
                            <Avatar className={'!h-14 !w-14'} src="/dist/assets/avatar.png" alt={"it's me"}/>
                            <div>
                                <div className={'text-lg text-mine-shaft-100 font-semibold sm-mx:text-base xs-mx:text-sm'}>{data.name}</div>
                                <Rating value={3.5} fractions={2} readOnly/>
                            </div>
                        </div>
                        <div className={'text-xs text-mine-shaft-300'}>
                            {data.testimonial}
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}
export default Testimonials
