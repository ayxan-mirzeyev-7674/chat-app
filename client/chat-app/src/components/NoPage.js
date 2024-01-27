import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NoPage() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/chat")
    }, [navigate])

    return ( <>NoPage</> );
}

export default NoPage;