import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../http/features/auth-features";
import { setAuth } from "../redux/auth-slice";
import { useNavigate } from "react-router-dom";

export function useLoadingWithAccessToken() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await getMe();

                dispatch(setAuth(data));

                setLoading(false);
            } catch (err) {
                console.log(err.response.data);
                navigate("/");
                setLoading(false);
            }
        })();
    }, [dispatch, navigate]);

    return { loading };
}
