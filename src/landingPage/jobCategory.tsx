const JobCategory = () => {
    return (
        <div className={'mt-20 pb-5'}>
            <div className={'text-4xl text-center font-semibold text-mine-shaft-100 mb-3'}>
                Browse <span className={'text-bright-sun-400'}>
                Job
            </span> Category
            </div>
            <div className={'text-lg mx-auto text-mine-shaft-300 text-center w-1/2'}>
                Explore diverse job opportunities tailored to your skills. Start your career journey today!
            </div>
            <div className={'flex flex-col items-center w-64'}>
                <div className={'px-2 bg-amber-300 rounded-full'}>
                    <img className={'h-12 w-8'} src="/src/assets/Category/Digital%20Marketing.png" alt="mar"/>
                </div>
                <div className={'text-xl font-semibold text-mine-shaft-100'}>
                    Digital Marketing
                </div>
                <div className={'text-sm text-center text-mine-shaft-300'}>
                    Explore diverse job opportunities tailored to your skills. Start your career journey today!
                </div>
                <div className={'text-xl text-bright-sun-300'}>
                    1K+ new job posted
                </div>
            </div>
        </div>
    )
}
export default JobCategory
