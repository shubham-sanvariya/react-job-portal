import Sort from "@/findjobs/sort.tsx";

const Jobs = () => {
    return (
        <div className={'p-5'}>
            <div className={'flex justify-between'}>
                <div className={'text-2xl font-semibold'}>Recommended Jobs</div>
                <Sort/>
            </div>
        </div>
    )
}
export default Jobs
