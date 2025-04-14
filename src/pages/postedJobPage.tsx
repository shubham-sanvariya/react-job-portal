import PostedJob from "@/components/postedjob/postedJob.tsx";
import {Button, Divider, Drawer} from "@mantine/core";
import PostedJobDesc from "@/components/postedjob/postedJobDesc.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/store.tsx";
import {selectUser} from "@/slices/userSlice.tsx";
import {useEffect, useRef} from "react";
import {getPostedByJobsAsyncThunk} from "@/slices/postedJobSlice.ts";
import {useDisclosure, useMediaQuery} from "@mantine/hooks";


const PostedJobPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector(selectUser);
    const ref = useRef(false);
    const matches = useMediaQuery('(max-width: 767px)');

    const [opened, {open, close}] = useDisclosure(false);

    useEffect(() => {
        if (!ref.current && userState?.id !== undefined) {
            dispatch(getPostedByJobsAsyncThunk(Number(userState?.id)));
            ref.current = true;
        }
    }, [dispatch, userState?.id]);


    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-[poppins] px-5">
            <Divider size={"xs"}/>
            <Drawer opened={opened} onClose={close} title={"All Jobs"} size={240}>
                <PostedJob/>
            </Drawer>
            {matches && <Button my={"xs"} size={"xs"} autoContrast={true} onClick={open}>All Jobs</Button>}
            <div className={'flex gap-4 justify-around py-5'}>
                {!matches && <PostedJob/> }
                <PostedJobDesc/>
            </div>
        </div>
    )
}
export default PostedJobPage
