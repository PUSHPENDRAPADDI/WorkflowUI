import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import axios from "axios";
import { apiRequest, apiSuccess, apiFailure } from "../redux/silces/apiSlice";

const useApi = (key, url, method = "GET") => {
    const dispatch = useDispatch();
    const apiState = useSelector((state) => state.apiReducer[key]);
    const memoizedApiState = useMemo(() => {
        return (
            apiState || {
                data: null,
                loading: false,
                error: null,
                status: null,
                message: null,
            }
        );
    }, [apiState]);

    const fetchData = async (body = null) => {
        dispatch(apiRequest(key));
        try {
            const response = await axios({
                url,
                method,
                data: body,
            });
            const { status, message, data } = response.data;
            dispatch(apiSuccess({ key, data }));
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Something went wrong";
            dispatch(apiFailure({ key, error: message }));
        }
    };

    return {
        ...memoizedApiState,
        fetchData,
    };
};

export default useApi;
