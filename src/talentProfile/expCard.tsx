const ExpCard = () => {
    return (
        <div className={'flex flex-col gap-2'}>
            <div className={'flex justify-between'}>
                <div className={'flex items-center gap-2'}>
                    <div className={'p-2 bg-mine-shaft-800 rounded-md'}><img className={'h-7'} src={`/src/assets/Icons/microsoft.png`} alt="microsoft"/></div>
                    <div className={'flex flex-col'}>
                        <div className={'font-semibold'}>jobTitle</div>
                        <div className={'text-sm text-mine-shaft-300'}>company &#x2022; applicant Applicants</div>
                    </div>
                </div>
                <div className={'text-sm text-mine-shaft-300'}>
                    Jan 2022 - present
                </div>
            </div>
            <div className={'text-sm text-mine-shaft-300 text-justify'}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
        </div>
    )
}
export default ExpCard
