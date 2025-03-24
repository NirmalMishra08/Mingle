import { useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setSuggestedUsers } from "@/redux/authSlice";

const useGetallSuggestedUser = () => {
    const dispatch = useDispatch();
    useEffect(() => {

        const fetchSuggestedUsers = async () => {
            try {
                
                const res = await axios.get('https://mingle-3.onrender.com/api/v1/user/suggested', {
                    withCredentials: true
                })
                if (res.data.success) {
                    
                    dispatch(setSuggestedUsers(res.data.users))
                }
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchSuggestedUsers()
    }, []);
};
export default useGetallSuggestedUser