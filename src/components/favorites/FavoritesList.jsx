import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFavorites } from "../../redux/actions/favoriteActions";
import { loadUsers } from "../../redux/actions/userActions";
import Spinner from "../../Spinner";
import _ from "lodash";
import FavoritesTable from "./FavoritesTable";

export default function FavoritesList() {
  document.title = "𝘹𝘧BBQ - Favorites";

  // Get users and favorites
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  const favorites = useSelector(state => state.favorites);
  const users = useSelector(state => state.users);
  useEffect(() => {
    dispatch(loadFavorites());
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <div className="jumbotron">
      <h2>Favorites</h2>
      {favorites.length <= 0 || users.length <= 0 ? (
        <Spinner />
      ) : (
        <FavoritesTable
          favorites={_.sortBy(favorites.value, "Userid")}
          users={users}
          login={login}
        />
      )}
    </div>
  );
}
