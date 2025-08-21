import { useSelector } from "react-redux";

const Fixtures = () => {
    const user = useSelector((state) => state.user);

    return <div className="h-screen">
        <div className="bg-yellow-300 mt-40 w-1/2 mx-auto h-1/2">
            <h1>FIXTURES Page</h1>
            <p>Username: {user.username}</p>
            <p>Favourite Clubs:</p>
            <ol>
            {
                user.favs.map((f) => {
                    return <li key={f.clubName}>
                        <p>Club Name: {f.clubName}</p>
                        <p>League: {f.league}</p>
                        <p>Logo: {f.logo}</p>
                    </li>
                })
            }
            </ol>
        </div>
    </div>
}

export default Fixtures;