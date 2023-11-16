import { useLoaderData, useNavigate } from "react-router-dom";

export default function EditProfile()
{
    const {user} = useLoaderData()
    const navigate = useNavigate()

    return (
        <>
            {user.name}
            <button type="button" className="btn btn-outline-danger" onClick={() => {
                navigate(-1);
            }}>Go Back</button>

        </>
    )
}