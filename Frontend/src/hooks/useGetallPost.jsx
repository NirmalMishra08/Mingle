import { useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setPosts } from "@/redux/postslice";

const useGetallPost = () => {
    const dispatch = useDispatch();
    useEffect(() => {

        const fetchallPost = async () => {
            try {
                
                const res = await axios.get('http://localhost:8000/api/v1/post/all', {
                    withCredentials: true
                })
                if (res.data.success) {
                    
                    dispatch(setPosts(res.data.posts))
                }
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchallPost()
    }, []);
};
export default useGetallPost;