import {work} from "@/Data/Data.tsx";
import {Avatar} from "@mantine/core";

const Working = () => {
    return (
        <div className={'mt-20 pb-5'}>
            <div className={'text-4xl text-center font-semibold text-mine-shaft-100 mb-3 md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl'}>
                How it <span className={'text-bright-sun-400'}>
                Works
            </span>
            </div>
            <div className={'text-lg mb-10 mx-auto text-mine-shaft-300 text-center w-1/2 sm-mx:text-base xs-mx:text-sm sm-mx:w-11/12'}>
              Effortlessly navigate through the process and land your dream job
            </div>

            <div className={'flex px-16 gap-2 justify-between items-center bs-mx:flex-col bs-mx:px-10 lg-mx:px-5 md-mx:flex-col'}>
                {/*left*/}
                <div className={'relative'}>
                    <img className={'w-[30rem]'} src="/dist/assets/Working/Girl.png" alt="girl"/>
                    <div className={'absolute top-[15%] right-0 flex flex-col items-center gap-1 border border-bright-sun-400 rounded-xl py-3 px-1 w-36 backdrop-blur-md xs-mx:top-[30%] xsm-mx:w-28'}>
                        <Avatar className={'!h-16 !w-16 xs-mx:!h-12 xs-mx:!w-12'} src="/dist/assets/avatar1.png" alt={"it's me"}/>
                        <div className={'text-sm font-semibold text-mine-shaft-200 text-center sm-mx:text-xs'}>
                            Complete your profile
                        </div><div className={'text-xs text-mine-shaft-300 text-center'}>
                            70% Completed
                        </div>
                    </div>
                </div>
                {/*right*/}
                <div className={'flex flex-col gap-10'}>
                    {
                        work.map((item,index) => (
                            <div key={index} className={'flex items-center gap-4'}>
                                <div className={'p-3 bg-bright-sun-300 rounded-full'}>
                                    <img className={'h-12 w-12 md-mx:w-9 md-mx:h-9 sm-mx:w-7 sm-mx:h-7'} src={`dist/assets/Working/${item.name}.png`} alt={item.name}/>
                                </div>
                                <div>
                                    <div className="text-mine-shaft-200 text-xl font-semibold md-mx:text-lg sm-mx:text-base">{item.name}</div>
                                    <div className={'text-mine-shaft-300 text-xl md-mx:text-sm sm-mx:text-xs'}>
                                        {item.desc}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}
export default Working
