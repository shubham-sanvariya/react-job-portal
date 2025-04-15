import {Button, TextInput} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";

const Subscribe = () => {
    const matchesMd = useMediaQuery('max-width: 639px');
    const matchesSm = useMediaQuery('max-width: 475px');
    return (
        <div className={'mt-20 flex flex-wrap items-center justify-around bg-mine-shaft-900 mx-20 py-3 rounded-xl sm-mx:mx-5'}>
            <div className={'text-4xl w-2/5 text-center font-semibold text-mine-shaft-100  md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl bs-mx:w-4/5'}>
                Never wants to miss any <span className={'text-bright-sun-400'}>
                Job News ?
            </span>
            </div>
            <div className={'flex gap-4 bg-mine-shaft-700 px-3 py-2  rounded-xl xs-mx:flex-wrap xs-mx:flex-col xs:items-center'}>
                <TextInput
                    className="[&_input]:text-mine-shaft-100 font-semibold"
                    variant={'unstyled'}
                    placeholder={'Your@email.com'}
                    size={matchesSm ? "sm": matchesMd ? "md": 'xl'}
                />
                <Button className={'!rounded-lg'} size={matchesSm ? "sm": matchesMd ? "md":'lg'} color={'bright-sun.4'} variant={'filled'}>
                    Subscribe
                </Button>
            </div>
        </div>
    )
}
export default Subscribe
