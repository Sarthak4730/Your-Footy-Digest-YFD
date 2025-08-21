import User from "../models/User.js";

const updateFavs = async (req, res) => {
    const { id } = req.params;
    const { favs } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { favs }, {new: true});
        if(!user) return res.status(404).json( { message: "User Not Found" } );
        res.status(200).json( { message: "Favorites Update Success", user } );
    } catch (err) {
        res.status(500).json( { message: "Favorites Update Failed", error: err.message } );
    }
}

export default updateFavs;